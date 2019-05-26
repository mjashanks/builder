import {hierarchy as hierarchyFunctions, 
    common, getTemplateApi } from "budibase-core"; 
import {find, filter, includes, flatten, map} from "lodash/fp";

export const chain = common.$;

export const getNode = (hierarchy, nodeId) => 
    chain(hierarchy, [
        hierarchyFunctions.getFlattenedHierarchy,
        find(n => n.nodeId === nodeId || n.nodeKey() === nodeId)
    ]);

export const constructHierarchy = node => {
    if(!node) return node;
    return templateApi(node).constructHeirarchy(node);
}

export const createNewHeirarchy = () => {
    return templateApi().getNewRootLevel();
}

export const templateApi = hierarchy => getTemplateApi({heirarchy:hierarchy})

export const allTypes = templateApi({}).allTypes;

export const validate = {
    all: templateApi({}).validateAll,
    node: templateApi({}).validateNode,
    field: templateApi({}).validateField
};

export const getPotentialReverseReferenceIndexes = (hierarchy, refIndex) => 
    chain(hierarchy, [
        hierarchyFunctions.getFlattenedHierarchy,
        filter(n => includes(n.nodeId)(refIndex.allowedRecordNodeIds)),
        map(n => n.indexes),
        flatten,
        filter(hierarchyFunctions.isReferenceIndex)
    ]);

export const getPotentialReferenceIndexes = (hierarchy, record) =>
    chain(hierarchy, [
        hierarchyFunctions.getFlattenedHierarchy,
        filter(hierarchyFunctions.isAncestorIndex),
        filter(i => hierarchyFunctions.isAncestor(record)(i)
                    || i.parent().nodeId === record.parent().nodeId
                    || hierarchyFunctions.isRoot(i.parent()))
    ]);

export const getDefaultTypeOptions = type => 
    !type ? {} : allTypes[type].getDefaultOptions();

export const getNewAction = () => templateApi({}).createAction();
export const getNewTrigger = () => templateApi({}).createTrigger();

export const validateActions = actions => templateApi({}).validateActions(actions);