const path = require("node:path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
	entry: "./src/app.ts",
	resolve: {
		extensions: [".ts", ".js", ".tsx"]
	},
	module: {
		rules: [
			{
				use: 'ts-loader',
				test: /.ts$/,
				exclude: /node_modules/
			}
		]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		clean: true,
		filename: "main.[contenthash].js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			minify: false
		}
		)
	]
}