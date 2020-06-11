module.exports = {
    // css: {
    //     loaderOptions: {
    //         // 给 sass-loader 传递选项
    //         // sass: {
    //         //     // @/ 是 src/ 的别名
    //         //     // 所以这里假设你有 `src/variables.sass` 这个文件
    //         //     // 注意：在 sass-loader v7 中，这个选项名是 "data"
    //         //     prependData: `@import "~@/styles/variables.scss"`
    //         // },
    //         // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
    //         // 因为 `scss` 语法在内部也是由 sass-loader 处理的
    //         // 但是在配置 `data` 选项的时候
    //         // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
    //         // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
    //         scss: {
    //             prependData: `@import "~@/styles/variables.scss"`
    //         },
    //         // 给 less-loader 传递 Less.js 相关选项
    //         less:{
    //             // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
    //             // `primary` is global variables fields name
    //             globalVars: {
    //                 primary: '#fff'
    //             }
    //         }
    //     }
    // },
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        open: true,
        proxy: {//配置跨域
            '/goods': {
                target: 'http://127.0.0.1:8000',//这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                secure: false,
                changOrigin: true,//允许跨域
                // pathRewrite: {
                //     '^/goods': ''
                // }
            },
            '/order':{
                target: 'http://127.0.0.1:8000',//这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                secure: false,
                changOrigin: true,//允许跨域
            }
        }
    },


};

// module.exports = {
//     devServer: {
//         disableHostCheck: true,
//         host:'127.0.0.1',
//         port: 8000,
//         proxy: {
//             '/api': {
//                 target: 'http://127.0.0.1:8000',// 你要请求的后端接口ip+port
//                 changeOrigin: true,// 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//                 ws: true,// 开启webSocket
//                 pathRewrite: {
//                     '^/api': '',// 替换成target中的地址
//                 }
//             }
//         }
//     },
//     lintOnSave: false,
//
// }