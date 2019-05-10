const { merge, clone, isUndefined } = require('lodash');

const allglobals = {
    "default": {
        "client":"(not defined)",
        "description":"default"
    },

    "desktop": {
        "client":"desktop"
    },

    "web": {
        "client":"web"
    },

    "dev" : {
        "description" : "development"
    }
}

const buildInfo = {
    nodeEnv : process.env.NODE_ENV,
    commit : "",
    timestamp : new Date()
};

const isDesktop = () => this.GLOBALS.client === "desktop";
const isWeb = () => this.GLOBALS.client === "web";

module.exports = () => {
    const nodeEnv = process.env.NODE_ENV;
    console.log(nodeEnv);
    const keys = nodeEnv.split("_");
    let globals = clone(allglobals.default);
    for(let key of keys) {
      console.log(key);
      if(!isUndefined(allglobals[key])) {
        merge(globals, allglobals[key]);
      }
    }
    console.log(JSON.stringify(globals));
    return ({ 
        GLOBALS : globals,
        BUILD_INFO: buildInfo,
        isDesktop, isWeb });
};