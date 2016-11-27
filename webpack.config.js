var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SwigWebpackPlugin = require('swig-webpack-plugin');
var WebpackOnBuildPlugin = require('on-build-webpack');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'client');

var config = {
    entry: {
        main: APP_DIR + '/scripts/index.jsx'
    },
    output: {
        path: BUILD_DIR,
        filename: 'scripts/[name].js?hash=[hash]',
        publicPath: '/'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                exclude: /(node_modules|vendors\.js)/,
                loader : 'babel',
                query: {
                    cacheDirectory: true,
                    plugins: ['lodash'],
                    presets: ['es2015']
                }
            }, {
                test : /\.css$/,
                loader : ExtractTextPlugin.extract("style", "css")
            }, {
                test : /\.less$/,
                loader : ExtractTextPlugin.extract("style", "css!less")
                // loader : 'css-loader!less-loader'
            }, {
                test : /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)$/,
                loader : 'file-loader?name=./assets/fonts/[name].[ext]?hash=[hash]'
            }, {
                test : /\.(gif|jpg|png)(\?.*$|$)$/,
                loader : 'file-loader?name=./images/[path][name].[ext]?hash=[hash]&context=./client/images',
                // loader : 'url-loader'
            }, {
                test : /\.(mp3|mp4|webm)(\?.*$|$)$/,
                loader : 'file-loader?name=./[path][name].[ext]?hash=[hash]&context=./client',
                // loader : 'url-loader'
            }, {
                test : /\.(csv)(\?.*$|$)$/,
                loader : 'file-loader?name=./[path][name].[ext]&context=./source',
                // loader : 'url-loader'
            }, {
                test : /jquery\/src\/selector\.js$/,
                loader : 'amd-define-factory-patcher-loader'
            }, {
                test: /\.swig$/,
                loaders: [
                    // "file?name=/pages/[name].[ext]",
                    "extract",
                    "html?" + JSON.stringify({
                        attrs: ["img:src", "link:href", "source:src"],
                        minimize: false
                    }),
                    "swig"
                ]
            }
        ]
    },
    resolve: {
        root: path.resolve(__dirname),
        modulesDirectories: ["node_modules","./source/vendors"],
        extensions: ['', '.js', '.jsx']
    },
    plugins : [
        new HtmlWebpackPlugin({
            title: 'Index',
            filename: 'index.html',
            template: APP_DIR + '/templates/index.swig'
        }),
        /*new webpack.ProvidePlugin({
         $ : "jquery",
         jQuery : "jquery",
         "window.jQuery": "jquery"
         }),*/
        new WebpackNotifierPlugin(),
        new ExtractTextPlugin("./styles/[name].css?[chunkhash]", {
            allChunks: true
        }),
        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"]),
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        ],["normal", "loader"]),
        new WebpackOnBuildPlugin(function(stats) {
            // Do whatever you want...
            //move the assets folder into build folder
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     include: /\.min\.js$/,
        //     minimize: true
        // }),
        // new LodashModuleReplacementPlugin({
        //     'collections': true,
        //     'paths': true
        // })
        // new webpack.optimize.OccurrenceOrderPlugin
    ],
    devServer: {
        inline:true,
        port: 7014
    }
};

var glob = require("glob");
var _ = require('lodash');
var path = require('path');

_.forEach(glob.sync("./client/templates/pages/*.swig"), function(file){
    var fileName = path.basename(file, '.swig');

    config.plugins.push(
        new HtmlWebpackPlugin({
            title: 'Halong Marina',
            filename: 'pages/'+fileName+'.html',
            template: APP_DIR + '/templates/pages/'+fileName+'.swig'
        })
    )
});

module.exports = config;