const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpackMain = require('electron-webpack/webpack.renderer.config.js')
const { inspect } = require('util')

webpackMain().then(config => {
  console.log(inspect(config, {
    showHidden: false,
    depth: null,
    colors: true
  }))
})
// Extract CSS
const extractCSS = new ExtractTextPlugin('styles.css');

module.exports = {

    resolve: {
        extensions: [".mjs", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload:true
                    }
                }
            },

            {
                test: /\.css$/,
                user: extractCSS.extract([
                    'css-loader'
                ])
            },

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
              },
        ]
    },

    plugins: [
        extractCSS
    ]

};