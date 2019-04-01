import {Store} from "svelte/store.js";
import {createNewPackage} from "./createPackage";

class BuilderStore extends Store {
    createNewPackage() {
        createNewPackage(this);
    }
}

export default new BuilderStore({
    hasAppPackage:false,
    heirarchy: {},
});

