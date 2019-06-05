import fs from "fs";
import {promisify} from "util";

export const stat = promisify(fs.stat);
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const mkdir = promisify(fs.mkdir);

export default {
    stat, readFile, writeFile, mkdir
};