import fs from "fs";
import {promisify} from "util";

export const access = promisify(fs.access);
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const mkdir = promisify(fs.mkdir);

export default {
    access, readFile, writeFile, mkdir
};