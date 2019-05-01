// useLocalStorage.js
import {writable} from "svelte/store";

export const bbWritable = (name, initial, modifyStored) => {
    if(!modifyStored)
        modifyStored = s => s;

    const localStorageKey = `bbb:${name}`;
    const jsonFromStore = localStorage.getItem(localStorageKey);
    const val = !jsonFromStore
                ? initial
                : modifyStored(JSON.parse(jsonFromStore));
    const wr = writable(val);

    wr.subscribe(v => 
        localStorage.setItem(localStorageKey, JSON.stringify(v))
    );
    return wr;
}
