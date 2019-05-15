import {bbWritable, initialiseLocalFolder} from "./useLocalStorage";
import {createPackage} from "./createPackage";
import getDatabaseStore from "./database";

export const hasAppPackage = bbWritable("hasAppPackage", false);

export const database = getDatabaseStore();
export const createNewPackage = () =>
    createPackage(hasAppPackage, database);

export const activeNav = bbWritable("activeNav", "database");

export const initialise = async () => {
    await initialiseLocalFolder();

    await hasAppPackage.initialise();
    await database.initialise();
    await activeNav.initialise();
}


 
