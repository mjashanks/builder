import {bbWritable} from "./useLocalStorage";
import {stat, readFile, 
    mkdir, writeFile} from "../common/fs-async";
import { get } from 'svelte/store';
import path from "path";
import {keyBy} from "lodash/fp";
import {constructHierarchy} from "../common/core";

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
const accessLevelsFile = folder => path.join(folder, "access_levels.json")

const savePackage = (databaseStore, packageStore) => async (location) => {
    
    const database = get(databaseStore);
    await writeFile(
        appDefinitionFile(location),
        JSON.stringify({
            hierarchy: database.hierarchy,
            actions: keyBy("name")(database.actions),
            triggers: database.triggers
        }), 
        {encoding:"utf8"}
    );

    await writeFile(
        accessLevelsFile(location),
        JSON.stringify({
            levels: database.accessLevels,
            version: !database.accessLevelsVersion ? 0 : database.accessLevelsVersion + 1
        })
    )

    packageStore.update(p => {
        p.lastSaved = new Date();
        return p;
    });
}

const openPackage = (databaseStore, packageStore) => async location => {

    let errors = [];

    if(!await stat(location)) {
        errors.push([`path ${location} does not exist`]);
    }

    if(!await stat(appDefinitionFile(location))) {
        errors.push([`appDefinition.json does not exist at ${location}`]);
    }

    if(!await stat(accessLevelsFile(location))) {
        errors.push([`access_levels.json does not exist at ${location}`]);
    }

    if(errors.length > 0) {
        packageStore.update(p => {
            p.packageManagerErrors = errors;
            return p;
        });

        return;
    }

    const appDefinition = JSON.parse(
        await readFile(appDefinitionFile(location), {encoding:"utf8"})
    );
    const accessLevels = JSON.parse(
        await readFile(accessLevelsFile(location), {encoding:"utf8"})
    );

    packageStore.update(p => {
        p.packageManagerErrors = [];
        p.lastSaved = new Date();
        p.hasAppPackage = true;
        return p;
    });

    databaseStore.update(db => {
        db.hierarchy = constructHierarchy(appDefinition.hierarchy);
        db.currentNodeIsNew = false;
        db.errors = [];
        db.currentNode= null;
        db.accessLevels = accessLevels.levels;
        db.accessLevelsVersion = accessLevels.version;
        return db;
    });
    
}