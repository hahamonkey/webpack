const path = require('path');
const devServer = require('webpack-dev-server');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');
const entry = require('./webpack_config/entry_webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports={
    entry:{
        index: './src/index.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'index.js',
        publicPath:'http://localhost:8001/'
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader','css-loader']
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:"css-loader",
                        options:{importLoaders:1}
                    },'postcss-loader']
                })
            },{
                test:/\.(png|jpg|gif)/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:500,
                            outputPath:'images/'
                        }
                    }
                ]
            },{
                test:/\.(htm|html)$/i,
                loader:'html-withimg-loader'
            },{
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"sass-loader"
                    }]
                })
            },{
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:["env"]
                    },
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new HtmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html',
            chunks:['index']
        }),
        new ExtractTextPlugin("css/index.css"),
        new UglifyJsPlugin(),
        new PurifyCSSPlugin({
            paths:glob.sync(path.join(__dirname),'src/*.html')
        }),
        new webpack.BannerPlugin('勇者无敌，鬣皮狼'),
        /* new webpack.ProvidePlugin({
            $:"jquery"
        }) */
        new webpack.optimize.CommonsChunkPlugin({
            name:['jquery','index'],
            filename:'js/[name].js',
            minChunks:2
        }),
        new CopyWebpackPlugin([{
            from:__dirname + '/src/public',
            to:'./public'
        }])
    ],
    devServer:{
        contentBase: path.resolve(__dirname,'dist'),
        host:'localhost',
        port:'8001'
    }
    /* loaders:[
        
    ] */
}