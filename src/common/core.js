import {hierarchy as hierarchyFunctions, 
    common, getTemplateApi } from "budibase-core"; 
import {find} from "lodash/fp";

export const chain = common.$;

export const getNode = (hierarchy, nodeId) => 
    chain(hierarchy, [
        hierarchyFunctions.getFlattenedHierarchy,
        find(n => n.nodeId === nodeId)
    ]);

export const constructHierarchy = node => {
    if(!node) return node;
    return templateApi(node).constructHeirarchy(node);
}

export const templateApi = hierarchy => getTemplateApi({heirarchy:hierarchy})

export const allTypes = templateApi({}).allTypes;

export const validate = {
    all: templateApi({}).validateAll,
    node: templateApi({}).validateNode,
    field: templateApi({}).validateField
};