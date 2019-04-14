// useLocalStorage.js
export default function useLocalStorage(store) {
    const key = "appState";
    const json = localStorage.getItem(key);
    if (json) {
        store.set(JSON.parse(json));
    }

    store.on("state", ({current, changed, previous}) => {
        localStorage.setItem(key, JSON.stringify(current));
    });
}
