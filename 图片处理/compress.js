let eleFile = $('#file')[0];
// 压缩图片需要的一些元素和对象
let reader = new FileReader(),
    img = new Image();
// 选择的文件对象
let file = null;
// 缩放图片需要的canvas
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
// base64地址图片加载完毕后
img.onload = function () {
    // 图片原始尺寸
    let originWidth = this.width;
    let originHeight = this.height;
    // 最大尺寸限制(源文件的 1 / 10)
    let maxWidth = originWidth / 10, maxHeight = originHeight / 10;
    // 目标尺寸
    let targetWidth = originWidth, targetHeight = originHeight;
    // 图片尺寸超过300x300的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
    }

    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    let type = 'image/jpeg';
    //将canvas元素中的图像转变为DataURL
    let dataurl = canvas.toDataURL(type);
    $('#origin')[0].src = dataurl
    //抽取DataURL中的数据部分，从Base64格式转换为二进制格式
    let bin = atob(dataurl.split(',')[1]);
    //创建空的Uint8Array
    let buffer = new Uint8Array(bin.length);
    //将图像数据逐字节放入Uint8Array中
    for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    //利用Uint8Array创建Blob对象
    let blob = new Blob([buffer.buffer], { type: type });
    $('.compress-size').html(blob.size)
    let url = window.URL.createObjectURL(blob);
    $('.new')[0].src = url;
};

// 文件base64化，以便获知图片原始尺寸
reader.onload = function (e) {
    let resource = e.target.result; 
    img.src = resource;
};
eleFile.addEventListener('change', function (event) {
    file = event.target.files[0];
    $('.origin-size').html(file.size)
    // 选择的文件是图片
    if (file.type.indexOf("image") == 0) {
        reader.readAsDataURL(file);
    }
});
