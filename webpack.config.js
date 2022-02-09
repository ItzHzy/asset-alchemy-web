const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const dotenv = require('dotenv')
const webpack = require('webpack')
const SentryCliPlugin = require('@sentry/webpack-plugin')

dotenv.config()

module.exports = {
    entry: './src/index.tsx',
    mode: process.env.NODE_ENV,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[hash]-[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['*', '.tsx', '.ts', '.js', '.jsx'],
    },
    devServer: {
        static: path.resolve(__dirname, 'build'),
        compress: true,
        hot: true,
        port: process.env.PORT,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Asset Alchemy',
            hash: true,
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
}
