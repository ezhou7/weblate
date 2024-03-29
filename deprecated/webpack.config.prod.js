const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist/app/"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: "url-loader?limit=100000"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": "'production'",
      },
    })
  ],
  optimization: {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        include: /\.js(\?.*)?$/i,
        terserOptions: {
          mangle: true,
          ie8: false,
          safari10: false
        }
      })
    ]
  }
};
