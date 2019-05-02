import {bbWritable} from "./useLocalStorage";
import {createPackage} from "./createPackage";
import {getCurrentNode, getSaveSelectedNode} from "./currentNode";
import {constructHierarchy} from "./currentNode";
import getDatabaseStore from "./database";

export const hasAppPackage = bbWritable("hasAppPackage", false);

export const database = getDatabaseStore();
export const createNewPackage = () =>
    createPackage(hasAppPackage, database);

export const activeNav = bbWritable("activeNav", "database");

//export const editingNewNode = bbWritable("editingNewNode", false);
//export const currentNode = getCurrentNode(hierarchy, selectedNodeId, editingNewNode);
//export const saveSelectedNode = getSaveSelectedNode(hierarchy, currentNode, selectedNodeId);
//export const selectedNodeId = bbWritable("selectedNodeId", "");
//export const hierarchy = bbWritable("hierarchy", null, constructHierarchy);



 
