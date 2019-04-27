import {getTemplateApi, common, heirarchy as heirarchyFunctions } from "budibase-core"; 
import {map, isEqual} from "lodash/fp";
import {derived} from "svelte/store";

const {$} = common;

export default (heirarchy, currentNodeKey) => 
    derived(heirarchy, currentNodeKey,
        ($heirarchy, $currentNodeKey) => {

            if(isEqual($heirarchy)({})) return {children:[]};
        
            const templateApi = getTemplateApi({$heirarchy});
            templateApi.constructHeirarchy($heirarchy);
        
            return $($currentNodeKey, [
                heirarchyFunctions.getExactNodeForPath($heirarchy)
            ]);
        }
    );