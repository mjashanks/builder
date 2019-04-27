import {bbWritable} from "./useLocalStorage";
import {createPackage} from "./createPackage";
import currentNode from "./currentNode";

export const heirarchy = bbWritable("heirarchy", null);
export const hasAppPackage = bbWritable("hasAppPackage", false);

export const createNewPackage = () =>
    createPackage(hasAppPackage, heirarchy);

export const currentNodeKey = bbWritable("currentNodeKey","");
export const activeNav = bbWritable("activeNav", "");
export const selectedNode = bbWritable("selectedNode", null);


//useLocalStorage(builderStore);
currentNode(heirarchy, currentNodeKey);



