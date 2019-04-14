import {Store} from "svelte/store.js";
import {createNewPackage} from "./createPackage";
import useLocalStorage from "./useLocalStorage";
import currentNode from "./currentNode";
import getIcon from "../common/icon";

class BuilderStore extends Store {
    createNewPackage() {
        createNewPackage(this);
    }
}

const builderStore = new BuilderStore({
    hasAppPackage:false,
    heirarchy: {},
    currentNodeKey: "/",
    activeNav: "database",
    getIcon: getIcon
});

useLocalStorage(builderStore);
currentNode(builderStore);

export default builderStore;

