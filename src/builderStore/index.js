import {bbWritable} from "./useLocalStorage";
import {createPackage} from "./createPackage";
import getDatabaseStore from "./database";

export const hasAppPackage = bbWritable("hasAppPackage", false);

export const database = getDatabaseStore();
export const createNewPackage = () =>
    createPackage(hasAppPackage, database);

export const activeNav = bbWritable("activeNav", "database");




 
