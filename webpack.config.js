const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/App.jsx",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    hot: true,
    port: 2129,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Asset Alchemy",
      hash: true,
    }),
  ],
};
