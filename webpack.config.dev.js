const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = () => {
  const envFilePath = path.join(__dirname, "envs", "client", ".env.dev");
  const envVars = dotenv.config({ path: envFilePath });

  return {
    devtool: "eval-cheap-source-map",
    entry: "./client/index.tsx",
    mode: "development",
    output: {
      path: path.join(__dirname, "/dist/app/"),
      filename: "main.js",
      sourceMapFilename: "main.map.js"
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
        "process.env": JSON.stringify({
          "NODE_ENV": "'development'",
          ...envVars.parsed
        })
      })
    ]
  };
};
