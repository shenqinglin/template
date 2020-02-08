const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const projectConfig = require('./src/config')
const path = require('path')

const host = process.env.VUE_APP_REQUEST_HOST
const projectId = process.env.VUE_APP_MOCK_PROJECT_ID
const url = projectId ? `${host}/${projectId}` : `${host}`

const v2Url = projectId ? `${host}/${122}` : `${host}`

module.exports = {
  publicPath: process.env.NODE_ENV !== 'development' ? projectConfig.STATIC_URL : '/',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/wx/v2': {
        target: v2Url,
        changeOrigin: true
      },
      '^/wx*((?!v2).)*$': {
        target: url,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].STATIC_URL = projectConfig.STATIC_URL
      args[0].ICONFONT_URL = projectConfig.STATIC_URL + '/font/' + projectConfig.ICONFONT_VERSION
      return args
    })
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 75,
            propList: ['*']
          })
        ],
        pluginOptions: {
          'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, '/src/assests/common.less')]
          }
        }
      }
    }
  }
}
