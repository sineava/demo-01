const path = require('path')
require('events').EventEmitter.defaultMaxListeners = 0 // 解决node内存太小(感觉没卵用)
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title

const port = process.env.port || process.env.npm_config_port || 9528 // dev port
module.exports = {
  transpileDependencies: ['vue-quill-editor', 'rightmenu', 'quill'],
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    host: '',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      /**
       * 上传
       */
      '/upload': {
        changeOrigin: true,
        target: 'http://175.24.45.198:8021',
        pathRewrite: {
          '^/upload': '/'
        }
      },
      /**
       * 文件域名
       */
      '/display-host': {
        changeOrigin: true,
        target: 'http://175.24.45.198:9000',
        pathRewrite: {
          '^/display-host': '/'
        }
      },
      /**
       * 天地图web api
       */
      '/tianditu': {
        changeOrigin: true,
        target: 'http://api.tianditu.gov.cn',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/tianditu`]: '/'
        }
      },
      // 天地图瓦片
      '/pims_map_pre0': {
        changeOrigin: true,
        target: 'http://t0.tianditu.gov.cn',
        pathRewrite: {
          '^/pims_map_pre0': '/'
        }
      },
      '/pims_map_pre1': {
        changeOrigin: true,
        target: 'http://t1.tianditu.gov.cn',
        pathRewrite: {
          '^/pims_map_pre1': '/'
        }
      },
      '/pims_map_pre2': {
        changeOrigin: true,
        target: 'http://t2.tianditu.gov.cn',
        pathRewrite: {
          '^/pims_map_pre2': '/'
        }
      },
      '/pims_map_pre3': {
        changeOrigin: true,
        target: 'http://t3.tianditu.gov.cn',
        pathRewrite: {
          '^/pims_map_pre3': '/'
        }
      },
      '/pims_map_pre4': {
        changeOrigin: true,
        target: 'http://t4.tianditu.gov.cn',
        pathRewrite: {
          '^/pims_map_pre4': '/'
        }
      },
      '/pims_map_pre5': {
        changeOrigin: true,
        target: 'http://t5.tianditu.gov.cn',
        pathRewrite: {
          '^/pims_map_pre5': '/'
        }
      },
      '/pims_map_pre6': {
        changeOrigin: true,
        target: 'http://t6.tianditu.gov.cn',
        pathRewrite: {
          '^/pims_map_pre6': '/'
        }
      },
      '/pims_map_pre7': {
        changeOrigin: true,
        target: 'http://t7.tianditu.gov.cn',
        pathRewrite: {
          '^/pims_map_pre7': '/'
        }
      },
      '/styletianditu': {
        changeOrigin: true,
        target: 'http://api.tianditu.gov.cn',
        pathRewrite: {
          '^/styletianditu': '/'
        }
      },
      /**
       * 海康视频
       */
      [`${process.env.VUE_APP_BASE_API}/hkvideo`]: {
        changeOrigin: true,
        target: 'https://10.224.127.66',
        pathRewrite: {
          [process.env.VUE_APP_BASE_API]: '/'
        }
      },
      /*
       * '/report': {
       *   changeOrigin: true,
       *   target: 'http://39.130.144.180:44444',
       *   pathRewrite: {
       *     '^/report': '/'
       *   }
       * },
       */
      /**
       * 协同管理
       */
      [`${process.env.VUE_APP_BASE_API}/v1`]: {
        changeOrigin: true,
        target: 'http://175.24.45.198:8020',
        pathRewrite: {
          [process.env.VUE_APP_BASE_API]: '/'
        }
      },
      /**
       * 通用业务
       */
      [`${process.env.VUE_APP_BASE_API}/general-services`]: {
        changeOrigin: true,
         target: 'http://175.24.45.198:8022',
        // target: 'http://192.168.31.51:8022',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/general-services`]: '/'
        }
      },
      /**
       * 港口业务
       */
      [`${process.env.VUE_APP_BASE_API}/port-services`]: {
        changeOrigin: true,
        // target: 'http://175.24.45.198:8023',
        target: 'http://175.24.45.198:8023',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/port-services`]: '/'
        }
      },
      /**
       * 应急业务
       */
      [`${process.env.VUE_APP_BASE_API}/wyx-emergency-services`]: {
        changeOrigin: true,
        target: 'http://175.24.45.198:8025',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/wyx-emergency-services`]: '/'
        }
      },

      /**
       * 水路运输服务（调试接口）
       */
      [`${process.env.VUE_APP_BASE_API}/water-transportation-services`]: {
        changeOrigin: true,
        target: 'http://175.24.45.198:8024',
        // target: 'http://175.24.45.198:8024',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/water-transportation-services`]: '/'
        }
      },
      /**
       * 航道业务
       */
      [`${process.env.VUE_APP_BASE_API}/wyx-channel-services`]: {
        changeOrigin: true,
        target: 'http://175.24.45.198:8027',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/wyx-channel-services`]: '/'
        }
      },
      /**
       * 数据管理服务
       */
      [`${process.env.VUE_APP_BASE_API}/data-management`]: {
        changeOrigin: true,
        target: 'http://42.192.161.144:8028',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/data-management`]: '/'
        }
      },
      /**
       * 船检/焊工证书
       */
      [`${process.env.VUE_APP_BASE_API}/ship-inspection`]: {
        changeOrigin: true,
        target: 'http://42.192.161.144:8026',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/ship-inspection`]: '/'
        }
      },
      /**
       * 单兵信息
       */
      [`${process.env.VUE_APP_BASE_API}/individual-soldier`]: {
        changeOrigin: true,
        target: 'http://42.192.161.144:8029',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/individual-soldier`]: '/'
        }
      },
      /**
       * 安全分析模型
       */
      [`${process.env.VUE_APP_BASE_API}/analysis-model`]: {
        changeOrigin: true,
        //target: 'http://42.192.161.144:8030',
        target: 'http://192.168.31.141:8030',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/analysis-model`]: '/'
        }
      },
      /**
       * 登录日志
       */
      [`${process.env.VUE_APP_BASE_API}/log-server`]: {
        changeOrigin: true,
        target: 'http://42.192.161.144:8031',
        // target: 'http://122.112.230.245:31031',
        pathRewrite: {
          [`${process.env.VUE_APP_BASE_API}/log-server`]: '/'
        }
      },
    },
  },
  configureWebpack: config => {
    return {
      name: name,
      externals: [ {
        './cptable': 'var cptable'
      }],
      resolve: {
        alias: {
          '@': resolve('src')
        }
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        /*
         * to ignore runtime.js
         * https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
         */
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // options.compilerOptions.preserveWhitespace = true
        return {
          ...options,
          hotReload: false
        }
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
