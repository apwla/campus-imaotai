'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const CompressionPlugin = require('compression-webpack-plugin')

const name = process.env.VUE_APP_TITLE || 'campus' // 网页标题

const port = process.env.port || process.env.npm_config_port || 80 // 端口

// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    // 这个设置告诉开发服务器监听所有的网络接口。这意味着服务器不仅可以通过localhost访问，还可以通过你计算机的IP地址访问，这在你想要从同一网络中的其他设备（例如手机或平板电脑）访问你的开发环境时非常有用。
    host: '0.0.0.0',
    port: port,
    // 这个设置在开发服务器启动时会自动打开浏览器窗口，直接导航到服务器的URL。这就省去了你手动打开浏览器并输入地址的步骤。
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // 这是一个用方括号包围的变量，表示一个动态的键。它将根据环境变量VUE_APP_BASE_API的值来匹配请求路径。例如，如果VUE_APP_BASE_API的值是/api，那么所有以/api开头的请求都会被匹配。
      [process.env.VUE_APP_BASE_API]: {
        // 这指定了代理的目标服务器。在这个例子中，所有匹配的请求都会被转发到http://localhost:8160
        target: `http://localhost:8160`,
        // 这个设置用于控制Origin HTTP头的值。当设置为true时，它会将请求头中的Origin改为目标URL，这有助于绕过一些基于Origin的安全限制。
        changeOrigin: true,
        // 这个设置用于重写URL的路径部分。这里它使用了一个动态的键（基于VUE_APP_BASE_API的值），并将其替换为空字符串。这意味着，如果请求的路径是/api/something，代理会将它重写为/something，然后将请求转发到目标服务器。
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    // 这个设置用于禁用对Host头的检查。这在某些特定的开发环境中很有用，比如在云环境或某些具有复杂网络配置的环境中。但是，它会降低应用的安全性，因为它允许任何Host头的请求。因此，在生产环境中不推荐使用此设置。
    disableHostCheck: true
  },
  // 这段配置是针对Vue.js项目中的CSS预处理器设置的，特别是针对Sass
  css: {
    // 这个属性允许你指定各种CSS预处理器的配置选项。在这个例子中，它被用于配置Sass。
    loaderOptions: {
      // 这是传递给Sass编译器的选项。Sass编译器有多种配置选项，可以控制输出的CSS的各种方面。
      sass: {
        // 这个设置指定了编译后的CSS的格式。"expanded"意味着输出的CSS会有更多的空格和换行，使其更易于阅读。这对于开发环境特别有用，因为它可以帮助开发者更容易地阅读和调试生成的CSS。
        // 相对的，还有其他几种输出样式，如"compressed"，它会生成压缩的、最小化的CSS，适合用于生产环境。
        sassOptions: { outputStyle: "expanded" }
      }
    }
  },
  // 这段配置是Vue CLI项目中vue.config.js文件的一部分，用于直接修改webpack的配置。configureWebpack是一个对象，你可以在其中添加任何有效的webpack配置选项。这里的配置影响了项目构建的几个关键方面：
  configureWebpack: {
    name: name,
    // resolve配置影响了模块解析的方式。在这个对象中，你可以指定如何解析模块请求。
    resolve: {
      // 别名是一种简化模块导入路径的方法。在这里，'@'被设置为指向'src'目录的绝对路径。这意味着在项目中，你可以使用@来代替长路径，例如import MyComponent from '@/components/MyComponent.vue'
      alias: {
        '@': resolve('src')
      }
    },
    // 这个数组允许你添加额外的webpack插件，这些插件可以扩展或修改webpack的构建过程
    plugins: [
      // http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
      // 这是一个用于压缩资源的webpack插件。这个插件会在构建过程中生成.gz文件，这些文件是对应资源的gzip压缩版本。这对于减少需要通过网络发送的数据量非常有用，可以加快页面加载时间。插件配置如下：
      new CompressionPlugin({
        cache: false,                   // 不启用文件缓存, 这意味着插件不会使用文件缓存，每次构建都会重新压缩文件。
        test: /\.(js|css|html)?$/i,     // 压缩文件格式, 这是一个正则表达式，用于匹配需要压缩的文件类型。在这个例子中，它匹配任何具有.js、.css或.html扩展名的文件。
        filename: '[path].gz[query]',   // 压缩后的文件名, 这定义了压缩文件的命名模式。[path]和[query]是webpack内置的占位符，它们分别代表原始文件的路径和查询字符串。
        algorithm: 'gzip',              // 使用gzip算法压缩
        minRatio: 0.8                   // 压缩率小于1才会压缩，这是一个阈值，只有当压缩后的文件大小与原始文件大小的比率小于0.8时，才会生成压缩文件。这意味着只有在压缩可以显著减少文件大小时，才会进行压缩。
      })
    ],
  },
  // 用chainWebpack函数直接对webpack的内部配置进行链式操作。chainWebpack提供了一个更细粒度的控制方式，允许开发者修改loader和插件等配置
  chainWebpack(config) {
    // 删除预加载和预取插件: 这两行代码删除了webpack默认添加的preload和prefetch插件。这些插件通常用于告诉浏览器预先加载或预取某些资源，以加快后续加载时间。删除这些可能是为了优化加载策略或避免不必要的资源加载。
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // 配置SVG精灵加载器 start...     set svg-sprite-loader
    // 以下配置首先排除了src/assets/icons目录下的SVG文件应用默认的SVG处理规则，然后为这个目录下的SVG文件设置了svg-sprite-loader，使得这些SVG文件可以作为精灵图使用。
    // 这种方式便于管理和使用SVG图标，通过symbolId配置，可以轻松引用SVG图标。
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 配置SVG精灵加载器 end...

    // 生产环境配置
    config
      .when(process.env.NODE_ENV !== 'development',
        // 使用ScriptExtHtmlWebpackPlugin插件优化<script>标签的加载方式，例如，通过将运行时脚本内联到HTML中来减少请求。
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          // splitChunks配置用于优化包的大小，将来自node_modules的依赖库、ElementUI组件库、以及在src/components目录下被多个模块共享的组件分别打包成不同的块。
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
          // runtimeChunk: 'single'配置用于为每个入口创建一个只包含运行时的单独文件，优化长期缓存。
          config.optimization.runtimeChunk('single'),
          {
             // 防爬虫文件配置
             from: path.resolve(__dirname, './public/robots.txt'), //防爬虫文件
             to: './' //到根目录下
          }
        }
      )
  }
}
