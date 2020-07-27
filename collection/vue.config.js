module.exports = {
    configureWebpack: {
        resolve: {
            // 配置路径别名 使用@是因为node_modules\@vue\cli-service\lib\config\base.js中已经配置好了@的解析路径
            alias: {
                // 'views': '@/views'
            }
        }
    }
}