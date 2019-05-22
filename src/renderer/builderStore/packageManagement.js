import {bbWritable} from "./useLocalStorage";
import {access, readFile, 
    mkdir, writeFile} from "../common/fs-async";
import { get } from 'svelte/store';

export default (databaseStore) => {

    const writable = bbWritable(
        "packageInfo", {
            hasAppPackage: false,
            currentPackageLocation: "",
            lastSaved: null
        }
    );

    writable.savePackage = savePackage(databaseStore, writable);
    writable.choosePackageLocation = choosePackageLocation(writable);
    writable.createNewPackage = createNewPackage(writable);
    return writable;

};

const createNewPackage = packageStore => location => {
    packageStore.update(p => {
        p.hasAppPackage = true;
        p.currentPackageLocation = location;
        p.lastSaved = null;
    })
} 

const choosePackageLocation = packageStore => location => {
    packageStore.update(p => {
        p.currentPackageLocation = location;
        return p;
    });
}

const savePackage = (databaseStore, packageStore) => async (location) => {
    
    const database = get(databaseStore);
    await writeFile(location,
        JSON.stringify({
            hierarchy: database.hierarchy
        }), 
        {encoding:"utf8"}
    );

    packageStore.update(p => {
        p.lastSaved = new Date();
        return p;
    });
}