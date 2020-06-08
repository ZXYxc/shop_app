module.exports = {
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
    }
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