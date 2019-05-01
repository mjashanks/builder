import {getTemplateApi, common, 
        hierarchy as hierarchyFunctions } from "budibase-core"; 
import {filter, isEqual, isNumber,
    cloneDeep, find} from "lodash/fp";
import {derived, get, set} from "svelte/store";

const chain = common.$;

export const getCurrentNode = (hierarchy, selectedNodeId, editingNewNode) => 
    derived([hierarchy, selectedNodeId],
        ([$hierarchy, $selectedNodeId]) => {

            if(isEqual($hierarchy)({}) 
               || !$selectedNodeId
               || !$hierarchy) return null;

            if(isNew($selectedNodeId)) {
                editingNewNode.set(true);
                return getNew($selectedNodeId, $hierarchy);
            }
        
            const h = constructHierarchy(cloneDeep($hierarchy));
        
            editingNewNode.set(false);
            
            return chain(h, [
                hierarchyFunctions.getFlattenedHierarchy,
                find(n => n.nodeId === $selectedNodeId)
            ]);
        }
    );

export const constructHierarchy = node => {
    if(!node) return node;
    return templateApi(node).constructHeirarchy(node);
}

export const makeNewChildRecord = parentKey =>
    `${NewChildRecord}${parentKey}`;

export const makeNewChildIndex = parentKey =>
    `${NewChildIndex}${parentKey}`;

export const NewRootRecord = `NEW:ROOT:RECORD:`;
export const NewRootIndex = `NEW:ROOT:INDEX:`;

export const getSaveSelectedNode = (hierarchyStore, currentNodeStore, selectedNodeIdStore) => () => {

    const hierarchy = get(hierarchyStore);
    const currentNode = get(currentNodeStore);

    const api = templateApi(hierarchy);

    var flattened = hierarchyFunctions.getFlattenedHierarchy(hierarchy);
    // selectednode is cloned and belongs to a cloned hierarchy - 
    // have to get it back in the real one

    const parentNode = getNode(hierarchy, currentNode.parent().nodeId);
    const existingNode = getNode(hierarchy, currentNode.nodeId);

    if(!!existingNode) {
        // remove existing
        existingNode.parent().children = chain(existingNode.parent().children, [
            filter(c => c.nodeId !== existingNode.nodeId)
        ]);
    }

    // should add node into existing hierarchy
    const cloned = cloneDeep(currentNode);
    api.constructNode(
        parentNode, 
        cloned
    );

    hierarchyStore.set(hierarchy);
    selectedNodeIdStore.set(cloned.nodeId);
}

const getNode = (hierarchy, nodeId) => 
    chain(hierarchy, [
        hierarchyFunctions.getFlattenedHierarchy,
        find(n => n.nodeId === nodeId)
    ]);

const templateApi = hierarchy => getTemplateApi({heirarchy:hierarchy})

const getNew = (key, hierarchy) => {
    
    const getParentId = () => 
        Number.parseInt(
            key.replace(NewChildRecord, "")
           .replace(NewChildIndex, "")
           .trim());
    

    const parentNode = isNewChild(key)
                       ? getNode(
                            hierarchy, 
                            getParentId()
                        )
                       : hierarchy;

    return isNewRecord(key)
           ? templateApi(hierarchy)
                .getNewRecordTemplate(parentNode, "", true)
           : templateApi(hierarchy)
                .getNewIndexTemplate(parentNode);
    
}

const NewChildRecord = `NEW:CHILD:RECORD:`;
const NewChildIndex = `NEW:CHILD:INDEX:`;

const isNew = key => !isNumber(key);
const isNewChild = key => key.startsWith("NEW:CHILD:");
const isNewRecord = key => key.includes(":RECORD:"); 
