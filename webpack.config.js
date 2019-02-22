const path = require('path');

module.exports = {
	entry: './src/ampersand-react-adapter.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'ampersand-react-adapter.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|bower_components|build)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	externals: {
		'react': 'commonjs react'
	}
};
