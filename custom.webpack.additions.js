
const fs = require("fs");

const { inspect } = require('util')
const webpackMain = require('electron-webpack/webpack.renderer.config.js');
webpackMain().then(config => {
  //fs.writeFileSync("./dist/renderer.config.json", JSON.stringify(config, null, 2), {encoding:"utf8"});
  //console.log(inspect(config, true, 100, true));
});


module.exports = config => {
    //console.log(inspect(config, true, 100, true));
    config.resolve.extensions = [".mjs", ".js", ".json", ".svelte", ".node", ".css"];

    config.module.rules = [
        {
            test: /\.svelte$/,
            exclude: /node_modules/,
            use: {
                loader: 'svelte-loader',
                options: {
                    emitCss: true,
                    hotReload:false
                }
            }
        },

        ...config.module.rules,

        {
            test: /\.(png|jpe?g|gif|woff2)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]'
                },
              },
            ],
        }
    ]
    
    return config;
}