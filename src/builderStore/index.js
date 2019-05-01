import {bbWritable} from "./useLocalStorage";
import {createPackage} from "./createPackage";
import {getCurrentNode, getSaveSelectedNode} from "./currentNode";
import {constructHierarchy} from "./currentNode";

export const hierarchy = bbWritable("hierarchy", null, constructHierarchy);
export const hasAppPackage = bbWritable("hasAppPackage", false);
export const selectedNodeId = bbWritable("selectedNodeId", "");
//selectedNode.subscribe(constructHierarchy);

export const createNewPackage = () =>
    createPackage(hasAppPackage, hierarchy, selectedNodeId);

export const activeNav = bbWritable("activeNav", "database");
export const editingNewNode = bbWritable("editingNewNode", false);
//useLocalStorage(builderStore);
export const currentNode = getCurrentNode(hierarchy, selectedNodeId, editingNewNode);
export const saveSelectedNode = getSaveSelectedNode(hierarchy, currentNode, selectedNodeId);


