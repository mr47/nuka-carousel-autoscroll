"use strict";
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var progressBarPlugin = require('progress-bar-webpack-plugin');
var autoprefixer = require('autoprefixer');

var cssLoaders = [
    "css?sourceMap&modules&localIdentName=[name]---[local]---[hash:base64:5]",
    "postcss",
    "sass?sourceMap"
];

module.exports = {
    entry: {
        autoscroll: ["./src/autoScroll"],
        progressIcon: ["./src/autoScrollProgress"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "umd"
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new progressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin("autoscroll.css", {
            allChunks: true
        }),
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //}),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.scss'],
        modulesDirectories: ["node_modules", "src"]
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract("style-loader", cssLoaders.join("!"))
            }
        ]
    },
    externals: [
        {
            "react": {
                root: "React",
                commonjs2: "react",
                commonjs: "react",
                amd: "react"
            },
            "react-dom": {
                root: "ReactDom",
                commonjs2: "react-dom",
                commonjs: "react-dom",
                amd: "react-dom"
            },
            "nuka-carousel": {
                root: "NukaCarousel",
                commonjs2: "nuka-carousel",
                commonjs: "nuka-carousel",
                amd: "nuka-carousel"
            }
        }
    ],
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};
