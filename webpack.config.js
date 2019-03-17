const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SassLintPlugin = require('sass-lint-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        ignored: /node_modules/
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '-',
        },
        noEmitOnErrors: true
    },
    entry: {
        index: './src/script/index.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: [{
                    loader: 'babel-loader',
                }, {
                    loader: 'eslint-loader',
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
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name(file) {
                            return './' + file.split('src')[1];
                        }
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
        new SassLintPlugin({
            files: './src/style/**'
        }),
        new MiniCssExtractPlugin({
            filename: "./style/[name].css",
            chunkFilename: "./style/global.css"
        }),
        new HtmlWebpackPlugin({
            template: 'src/toolkit.html'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './script/[name].js'
    }
};