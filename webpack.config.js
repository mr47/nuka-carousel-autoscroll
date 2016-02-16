'use strict';

var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var cssLoaders = [
    "css?sourceMap&modules&localIdentName=[name]---[local]---[hash:base64:5]",
    "postcss",
    "sass?sourceMap"
];

module.exports = {

    output: {
        path: __dirname,
        filename: 'main.js',
        publicPath: '/assets/'
    },

    cache: true,
    debug: false,
    devtool: false,
    entry: [
        './demo/app.js'
    ],

    stats: {
        colors: true,
        reasons: true
    },

    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
             {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract("style-loader", cssLoaders.join("!"))
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]

};
