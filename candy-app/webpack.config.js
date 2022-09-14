const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: "babel-loader",
      options: { presets: ["@babel/env", "@babel/preset-react"] }
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    },
    {
      test: /\.less$/i,
      use: [
        // compiles Less to CSS
        "style-loader",
        "css-loader",
        "less-loader",
      ],
    }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    port: 3100,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
