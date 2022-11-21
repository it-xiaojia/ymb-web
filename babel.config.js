const components = require('prismjs/components');
const allLanguages = Object.keys(components.languages).filter((item) => item !== 'meta');

module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset'
	],
	// 引入代码高亮插件
	plugins: [
		[
			'prismjs',
			{
				languages: allLanguages,
			},
		],
	],
}
