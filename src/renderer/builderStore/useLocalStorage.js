// useLocalStorage.js
import {writable} from "svelte/store";

import {stat, readFile, 
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
        const jsonFromStore = await getOrCreateFile(
            localStorageKey, 
            JSON.stringify(initial, null, 2));
        try{
            const val = modifyStored(JSON.parse(jsonFromStore));
            wr.set(val); 
            hasInitialised = true;   
        } catch(e) {
            console.log(e);
        }
        
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
        await stat(budibaseFolder);
    } catch(_) {
        await mkdir(budibaseFolder);
    }
}

export const getOrCreateFile = async (path, defaultContent) => {

    const writeAndReturnDefault = async () => {
        await writeFile(path, defaultContent, "utf8");
        return defaultContent;
    }

    try {
        const contents =  await readFile(path, {encoding:"utf8"});
        if(!contents) return await writeAndReturnDefault(); 
        return contents;
    } catch(_) {
        return await writeAndReturnDefault();
    }
}

const currentSavedValues = {}

export const writeFileFireAndForget = (path, content) => {
    if(currentSavedValues[path] === content) return;
    currentSavedValues[path] = content;
    fs.writeFile(path, content, "utf8", () => {});
} 