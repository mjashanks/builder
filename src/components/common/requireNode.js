import electron from "electron";
const native = electron.remote.require("./electron/nativeModules"); 

export default (mod) => {
    return native[mod]; 
}
