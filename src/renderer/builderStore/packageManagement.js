import {bbWritable} from "./useLocalStorage";
import {access, readFile, 
    mkdir, writeFile} from "../common/fs-async";
import { get } from 'svelte/store';
import path from "path";

export default (databaseStore) => {

    const writable = bbWritable(
        "packageInfo", {
            hasAppPackage: false,
            currentPackageLocation: "",
            lastSaved: null,
            packageManagerErrors : []
        }
    );

    writable.savePackage = savePackage(databaseStore, writable);
    writable.choosePackageLocation = choosePackageLocation(writable);
    writable.createNewPackage = createNewPackage(writable);
    writable.openPackage = openPackage(databaseStore, writable);
    return writable;

};

const createNewPackage = packageStore => location => {
    packageStore.update(p => {
        p.hasAppPackage = true;
        p.currentPackageLocation = location;
        p.lastSaved = null;
        p.packageManagerErrors = [];
        return p;
    })
} 

const choosePackageLocation = packageStore => location => {
    packageStore.update(p => {
        p.currentPackageLocation = location;
        return p;
    });
}

const appDefinitionFile = folder => path.join(folder, "appDefinition.json")

const savePackage = (databaseStore, packageStore) => async (location) => {
    
    const database = get(databaseStore);
    await writeFile(
        appDefinitionFile(location),
        JSON.stringify({
            hierarchy: database.hierarchy,
            actions: database.actions,
            triggers: database.triggers
        }), 
        {encoding:"utf8"}
    );

    packageStore.update(p => {
        p.lastSaved = new Date();
        return p;
    });
}

const openPackage = (databaseStore, packageStore) => async location => {

    let errors = [];

    if(!await fs.access(location)) {
        errors.push([`path ${location} does not exist`]);
    }

    if(!await fs.access(appDefinitionFile(location))) {
        errors.push([`appDefinition.json does not exist at ${location}`]);
    }

    if(errors.length > 0) {
        packageStore.update(p => {
            p.packageManagerErrors = errors;
        });

        return;
    }

    var appDefinition = await fs.readFile(appDefinitionFile(), {encoding:"utf8"});

    packageStore.update(p => {
        p.packageManagerErrors = [];
        P.lastSaved = new Date();
        return p;
    });

    databaseStore.update(db => {
        db.hierarchy = appDefinition.hierarchy;
        db.currentNodeIsNew = false;
        db.errors = [];
        db.currentNode= null;
        return db;
    });
    
}