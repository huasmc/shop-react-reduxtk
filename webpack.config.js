const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp3|wav)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							outputPath: "images/",
						},
					},
				],
			},
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./public/index.html",
			filename: "index.html",
		}),
		new webpack.DefinePlugin({
			"process.env.REACT_APP_JWT_SECRET": JSON.stringify(
				process.env.REACT_APP_JWT_SECRET
			),
			"process.env.REACT_APP_ENV": JSON.stringify(process.env.REACT_APP_ENV),
		}),
	],
};
