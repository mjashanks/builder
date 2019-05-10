import {bbWritable} from "./useLocalStorage";
import {hierarchy as hierarchyFunctions, 
    common, getTemplateApi } from "budibase-core"; 
import {filter, cloneDeep, sortBy,
    find, isEmpty} from "lodash/fp";
import {chain, getNode, validate,
    constructHierarchy, templateApi} from "../common/core";

export const getDatabaseStore = () => {
    const writable = bbWritable(
        "database", {
        hierarchy: {},
        currentNodeIsNew: false,
        errors: [],
        currentNode: null}, 
        db => {
            if(!!db.hierarchy && !isEmpty(db.hierarchy)) {
                db.hierarchy = constructHierarchy(db.hierarchy);
                const shadowHierarchy = createShadowHierarchy(db.hierarchy);
                db.currentNode = getNode(
                    shadowHierarchy, db.currentNode.nodeId
                );
            }
            return db;
        });

    writable.newChildRecord = newRecord(writable, false);
    writable.newRootRecord = newRecord(writable, true);
    writable.selectExistingNode = selectExistingNode(writable);
    writable.newChildIndex = newIndex(writable, false);
    writable.newRootIndex = newIndex(writable, true);
    writable.saveCurrentNode = saveCurrentNode(writable);
    writable.importHierarchy = importHierarchy(writable);
    writable.deleteCurrentNode = deleteCurrentNode(writable);
    writable.saveField = saveField(writable);
    writable.deleteField = deleteField(writable);
    return writable;
} 

export default getDatabaseStore;

const newRecord = (databaseStore, useRoot) => () => {
    databaseStore.update(db => {
        db.currentNodeIsNew = true;
        const shadowHierarchy = createShadowHierarchy(db.hierarchy);
        parent = useRoot ? shadowHierarchy
                 : getNode(
                    shadowHierarchy, 
                    db.currentNode.nodeId);
        db.errors = [];
        db.currentNode = templateApi(shadowHierarchy)
                         .getNewRecordTemplate(parent, "", true);
        return db;
    });
}


const selectExistingNode = (databaseStore) => (nodeId) => {
    databaseStore.update(db => {
        const shadowHierarchy = createShadowHierarchy(db.hierarchy);
        db.currentNode = getNode(
            shadowHierarchy, nodeId
        );
        db.currentNodeIsNew = false;
        db.errors = [];
        return db;
    })
}

const newIndex = (databaseStore, useRoot) => () => {
    databaseStore.update(db => {
        db.currentNodeIsNew = true;
        db.errors = [];
        const shadowHierarchy = createShadowHierarchy(db.hierarchy);
        parent = !useRoot ? shadowHierarchy
                 : getNode(
                    shadowHierarchy, 
                    db.currentNode.nodeId);

        db.currentNode = templateApi(shadowHierarchy)
                         .getNewIndexTemplate(parent);
        return db;
    });
}

const saveCurrentNode = (databaseStore) => () => {
    databaseStore.update(db => {

        const errors = validate.node(db.currentNode);
        db.errors = errors;
        if(errors.length > 0) {
            return db;
        }

        const parentNode = getNode(
            db.hierarchy, db.currentNode.parent().nodeId);

        const existingNode = getNode(
            db.hierarchy, db.currentNode.nodeId);

        let index = parentNode.children.length;
        if(!!existingNode) {
            // remove existing
            index = existingNode.parent().children.indexOf(existingNode);
            existingNode.parent().children = chain(existingNode.parent().children, [
                filter(c => c.nodeId !== existingNode.nodeId)
            ]);
        }

        // should add node into existing hierarchy
        const cloned = cloneDeep(db.currentNode);
        templateApi(db.hierarchy).constructNode(
            parentNode, 
            cloned
        );

        const newIndexOfchild = child => {
            if(child === cloned) return index;
            const currentIndex = parentNode.children.indexOf(child);
            return currentIndex >= index ? currentIndex + 1 : currentIndex;
        }

        parentNode.children = chain(parentNode.children, [
            sortBy(newIndexOfchild)
        ]);

        return db;
    });
}

const importHierarchy = databaseStore => hierarchy => {
    databaseStore.update(db => {
        db.hierarchy = hierarchy;
        db.currentNode = hierarchy.children.length > 0
                         ? hierarchy.children[0] 
                         : null;
        db.currentNodeIsNew = false; 
        return db;
    })
} 

const deleteCurrentNode = databaseStore => () => {
    databaseStore.update(db => {
        const nodeToDelete = getNode(db.hierarchy, db.currentNode.nodeId);
        db.currentNode = hierarchyFunctions.isRoot(nodeToDelete.parent())
                         ? find(n => n != db.currentNode)
                               (db.hierarchy.children)
                         : nodeToDelete.parent();
        if(hierarchyFunctions.isRecord(nodeToDelete)) {
            nodeToDelete.parent().children = filter(c => c.nodeId !== nodeToDelete.nodeId)
                                                   (nodeToDelete.parent().children);
        } else {
            nodeToDelete.parent().indexes = filter(c => c.nodeId !== nodeToDelete.nodeId)
                                                   (nodeToDelete.parent().indexes);
        }
        db.errors = [];
        return db;
    });
}

const saveField = databaseStore => (field) => {
    databaseStore.update(db => {
        db.currentNode.fields = filter(f => f.name !== field.name)
                                      (db.currentNode.fields);
            
        templateApi(db.hierarchy).addField(db.currentNode, field);
        return db;
    });
}


const deleteField = databaseStore => field => {
    databaseStore.update(db => {
        db.currentNode.fields = filter(f => f.name !== field.name)
                                      (db.currentNode.fields);

        return db;
    });
}

const createShadowHierarchy = hierarchy => 
    constructHierarchy(JSON.parse(JSON.stringify(hierarchy)));

