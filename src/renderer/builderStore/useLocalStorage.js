// useLocalStorage.js
import {writable} from "svelte/store";

import {access, readFile, 
    mkdir, writeFile} from "../common/fs-async";
import os from "os";
import {join} from "path";
import fs from "fs";

const budibaseFolder = join(os.homedir(), "budibase");

const budibaseFile = filename => join(budibaseFolder, filename);

export const bbWritable = (name, initial, modifyStored) => {

    if(!modifyStored)
        modifyStored = s => s;

    const wr = writable(initial);
    const localStorageKey = budibaseFile(`store_${name}.json`);
    
    let hasInitialised = false;

    const initialise = async () => {
        hasInitialised = true;
        const jsonFromStore = await getOrCreateFile(
            localStorageKey, 
            JSON.stringify(initial, null, 2));
        const val = modifyStored(JSON.parse(jsonFromStore));    
        wr.set(val);
    }

    wr.subscribe(v => {
        if(!hasInitialised) return;
        writeFileFireAndForget(
            localStorageKey, 
            JSON.stringify(v, null, 2))
    });

    wr.initialise = initialise;

    return wr;
}

export const initialiseLocalFolder = async () => {
    try {
        await access(budibaseFolder);
    } catch(_) {
        await mkdir(budibaseFolder);
    }
}

export const getOrCreateFile = async (path, defaultContent) => {
    try {
        return await readFile(path, {encoding:"utf8"});
    } catch(_) {
        await writeFile(path, defaultContent, "utf8");
        return defaultContent;
    }
}

export const writeFileFireAndForget = (path, content) => {
    fs.writeFile(path, content, "utf8", () => {});
} 