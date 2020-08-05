/*模块*/
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// 图片上传
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const image = require("imageinfo");

const app = express();
// 启用中间件
app.use(bodyParser.urlencoded({ extended: true }));//表单数据类型
app.use(bodyParser.json()) // json 数据
app.use(bodyParser.text({ type: "txt" })) //文本数据

app.use(cookieParser('secret'));

//模板引擎设置
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/view');
app.use(express.static(__dirname + '/public'));
app.use(express.static('upload'))//这个很重要，必须要这个才能拿到图片链接，而不是进入路由
//跨域问题
app.use(cors({
    credentials: true,
    origin: '*', // web前端服务器地址
}));


/*子路由*/
//添加数据
app.use('/add', require('./server/routers/addServerRouter'));
//获取数据
app.use('/ask', require('./server/routers/askServerRouter'));

app.listen(8888, () => {
    console.log('In the Listening ...')
});