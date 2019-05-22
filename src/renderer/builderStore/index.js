import {bbWritable, initialiseLocalFolder} from "./useLocalStorage";
import {createPackage} from "./createPackage";
import getDatabaseStore from "./database";
import getPackageStore from "./packageManagement";

export const database = getDatabaseStore();
export const packageInfo = getPackageStore(database);

export const createNewPackage = () =>
    createPackage(packageInfo, database);

export const activeNav = bbWritable("activeNav", "database");

export const initialise = async () => {
    await initialiseLocalFolder();
    await packageInfo.initialise();
    await database.initialise();
    await activeNav.initialise();
}


 
