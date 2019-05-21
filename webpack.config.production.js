const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SassLintPlugin = require('sass-lint-webpack');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true
    },
    watchOptions: {
        ignored: [
            './node_modules',
            './dist',
            './configPublic.json'
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'global',
        },
        noEmitOnErrors: true
    },
    node: {
        path: true
    },
    entry: {
        index: './script/index.js',
        content: './script/content.js',
        plp: './script/plp.js',
        pdp: './script/pdp.js',
        unsubscribe: './script/unsubscribe.js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/i,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: [{
                    loader: 'babel-loader',
                }, {
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                }]
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './[hash]/font/',
                        publicPath: '../font/'
                    }
                }]
            },
            {
                test: /\.(gif|webp|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './[hash]/image/',
                        publicPath: '../image/'
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        optipng: {
                            enabled: true,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        webp: {
                            quality: 75
                        }
                    }
                }],
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /configPublic.json/,
            contextRegExp: /./
        }),
        new SassLintPlugin({
            files: './style/**'
        }),
        new MiniCssExtractPlugin({
            filename: "./[hash]/style/[name].css",
            chunkFilename: "./[hash]/style/global.css"
        })
        // new HtmlWebpackPlugin({
        //     template: './toolkit.html'
        // })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[hash]/script/[name].js'
    }
};
