// useLocalStorage.js
import {writable} from "svelte/store";

export const bbWritable = (name, initial, set) => {
    const localStorageKey = `bbb:${name}`;
    const jsonFromStore = localStorage.getItem(localStorageKey);
    const wr = !jsonFromStore
               ? writable(initial, set)
               : writable(JSON.parse(jsonFromStore), set);

    wr.subscribe(v => 
        localStorage.setItem(localStorageKey, JSON.stringify(v))
    );
    return wr;
}
