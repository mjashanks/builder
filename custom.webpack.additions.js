const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require("fs");
const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackMain = require('electron-webpack/webpack.renderer.config.js');
const { inspect } = require('util')

webpackMain().then(config => {
  fs.writeFileSync("./dist/renderer.config.json", JSON.stringify(config, null, 2), {encoding:"utf8"});
  console.log(inspect(config, true, 100, true));
});
// Extract CSS
const extractCSS = new ExtractTextPlugin('styles.css');

module.exports = {

    resolve: {
        extensions: [".mjs", ".js", ".json", ".svelte"]
    },

    output:{ 
        filename: '[name].js',
        path: 'C:\\code\\budibase\\builder\\dist\\renderer' 
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

            /*{ 
                test: /\.css$/,                                                                                       
                use:                                                                                                  
                 [ 'css-hot-loader',                                                                                  
                   '.\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',             
                   'css-loader' ] 
            },*/

            
            {
                test: /\.css$/,
                use: extractCSS.extract([
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
              }
        ]
    },

    plugins: [
        extractCSS,
        new webpack.DefinePlugin({                                                                                             
            definitions:                                                                                             
             { __static: '"./static"',                                            
               'process.env.NODE_ENV': '"development"' } }),
        new HtmlWebpackPlugin({
            template:                                                                                             
            '!!html-loader?minimize=false&url=false!./dist/.renderer-index-template.html',                                         
           filename: 'index.html',                                                                               
           hash: false,                                                                                          
           inject: true,                                                                                         
           compile: true,                                                                                        
           favicon: false,                                                                                       
           minify: false,                                                                                        
           cache: true,                                                                                          
           showErrors: true,                                                                                     
           chunks: 'all',                                                                                        
           excludeChunks: [],                                                                                    
           chunksSortMode: 'auto',                                                                               
           meta: {},                                                                                             
           title: 'Webpack App',                                                                                 
           xhtml: false,
        })
    ],

    devServer:                                                                                                    
    { 
        contentBase: [ './static',                                                                  
        './dist/renderer-dll' ],                                                    
     host: 'localhost',                                                                                         
     port: '9080', 
     hot: false,
     watchContentBase: true   ,                                                                                             
     overlay: true },

     optimization: undefined


};