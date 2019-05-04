import {bbWritable} from "./useLocalStorage";
import {hierarchy as hierarchyFunctions, 
    common, getTemplateApi } from "budibase-core"; 
import {filter, cloneDeep, 
    find, isEmpty} from "lodash/fp";

const chain = common.$;

export default () => {
    const writable = bbWritable(
        "database", {
        hierarchy: {},
        currentNodeIsNew: false,
        currentNode: null}, 
        db => {
            if(!!db.hierarchy && !isEmpty(db.hierarchy)) {
                db.hierarchy = constructHierarchy(db.hierarchy);
                db.currentNode = getNode(
                    db.hierarchy, db.currentNode.nodeId
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
    return writable;
}     

const newRecord = (databaseStore, useRoot) => () => {
    databaseStore.update(db => {
        db.currentNodeIsNew = true;
        const shadowHierarchy = createShadowHierarchy(db.hierarchy);
        parent = useRoot ? shadowHierarchy
                 : getNode(
                    shadowHierarchy, 
                    db.currentNode.nodeId);

        db.currentNode = templateApi(shadowHierarchy)
                         .getNewRecordTemplate(parent, "", true);
        return db;
    });
}


const selectExistingNode = (databaseStore) => (nodeId) => {
    databaseStore.update(db => {
        db.currentNode = getNode(
            db.hierarchy, nodeId
        );
        db.currentNodeIsNew = false;
        return db;
    })
}

const newIndex = (databaseStore, useRoot) => () => {
    databaseStore.update(db => {
        db.currentNodeIsNew = true;
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
        const parentNode = getNode(
            db.hierarchy, db.currentNode.parent().nodeId);

        const existingNode = getNode(
            db.hierarchy, db.currentNode.nodeId);

        if(!!existingNode) {
            // remove existing
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
        return db;
    });
}

const getNode = (hierarchy, nodeId) => 
    chain(hierarchy, [
        hierarchyFunctions.getFlattenedHierarchy,
        find(n => n.nodeId === nodeId)
    ]);

const createShadowHierarchy = hierarchy => 
    constructHierarchy(cloneDeep(hierarchy));

const constructHierarchy = node => {
    if(!node) return node;
    return templateApi(node).constructHeirarchy(node);
}

const templateApi = hierarchy => getTemplateApi({heirarchy:hierarchy})