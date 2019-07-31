const path = require('path')

module.exports = {
	configureWebpack: config => {
		/**
		 * 添加一些别名
		 */
		let p = path.resolve(__dirname, './src/vue/src/core/index.js')
		config.resolve.alias['vue$'] = 'vue/dist/vue.runtime.common.dev.js'
		//config.resolve.alias['vue$'] = 'vue/src/core/index.js'
		console.log(config.resolve.alias)
	}
}