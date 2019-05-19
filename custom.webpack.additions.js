const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Extract CSS
const extractCSS = new ExtractTextPlugin('styles.css');

module.exports = {

    resolve: {
        extensions: [".mjs", ".js", ".json", ".svelte"]
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