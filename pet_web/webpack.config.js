var path = require('path');
// entry : ['./public/js/index.js','./public/js/admin.js'],
module.exports = {
	entry : {
		index : './public/js/index.js',
		admin : './public/js/admin.js'
	},
	output : {
		path:path.resolve(__dirname,'./public/js'),
		filename:'[name].bundle.js',
	},
	module:{
		loaders:[
		{
			test:/\.js$/,
			loader:'babel-loader',
			exclude:/(node_modules)/,
			query:{
				presets:['es2015','react']
			}
		},{
			test:/\.css$/,
			loader:'style-loader!css-loader',
		}
		]
	}
}