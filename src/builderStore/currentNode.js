import {getTemplateApi, common, heirarchy as heirarchyFunctions } from "budibase-core"; 
import {map, isEqual} from "lodash/fp";

const {$} = common;

export default store => {
    store.compute(
        "currentNode",
        ["heirarchy", "currentNodeKey"],
        currentNode
    );
}


const currentNode = (heirarchy, currentNodeKey) => {

    if(isEqual(heirarchy)({})) return {children:[]};

    const templateApi = getTemplateApi({heirarchy});
    templateApi.constructHeirarchy(heirarchy);

    return $(currentNodeKey, [
        heirarchyFunctions.getExactNodeForPath(heirarchy)
    ]);
}