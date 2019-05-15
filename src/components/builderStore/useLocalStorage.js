// useLocalStorage.js
import {writable} from "svelte/store";

import fs from "fs";
import {join} from "path";
import {promisify} from "util";

const access = promisify(fs.access);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const budibaseFolder = join(fs.homedir(), "budibase");

const budibaseFile = filename => join(budibaseFolder, filename);

export const bbWritable = (name, initial, modifyStored) => {

    if(!modifyStored)
        modifyStored = s => s;

    const wr = writable(initial);

    const initialise = async () => {
        const localStorageKey = budibaseFile(`store_${name}.json`);
        const jsonFromStore = await getOrCreateFile(localStorageKey, initial);
        const val = modifyStored(JSON.parse(jsonFromStore));    
        wr.set(val);
    }

    wr.subscribe(v => 
        writeFileFireAndForget(
            localStorageKey, 
            JSON.stringify(v))
    );

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
        return await readFile(path);
    } catch(_) {
        await writeFile(path, defaultContent, "utf8");
        return defaultContent;
    }
}

export const writeFileFireAndForget = (path, content) => {
    fs.writeFile(path, content, "utf8", () => {});
} 