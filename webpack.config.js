const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/App.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
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
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        compress: true,
        hot: true,
        port: 2129,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Asset Alchemy',
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
    ],
}
