const path = require("path");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
// const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");

module.exports = {
    entry: {
        main: "src/index.tsx"
    },
    output: {
        publicPath: "/dist/",
        filename: "[name].tsx",
        path: "dist"
    },

    // Source maps support ('inline-source-map' also works)
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            }, {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
        // new CleanWebpackPlugin(["dist"]),
        // new ContextReplacementPlugin(
        //   /(.+)?angular(\\|\/)core(.+)?/,
        //   path.resolve(__dirname, "../src")
        // )

    ],
    externals: []
};