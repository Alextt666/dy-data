const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack:(config)=>{
    config.resolve.alias.set('@',resolve('src'))
    config.resolve.alias.set('@comp',resolve('src/components'))
    config.module.rule('svg')
    .exclude.add(resolve('src/icons'));
    config.module.rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId:'icon-[name]'
    })
    .end()
    config.plugin('html')
    .tap(arg=>{
      arg[0].title = 'Lazy-Zone';
      return arg;
    })
  }
})
