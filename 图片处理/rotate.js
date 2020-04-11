let imgs = new Image(), rotateFile = $('#rotate-choose')[0]
imgs.onload = function(){
    const [OW, OH] = [imgs.width, imgs.height]
    let cvs = document.createElement('canvas'), ctx = cvs.getContext('2d')
    cvs.width = OH;
    cvs.height = OW;

    ctx.save();//保存状态
    ctx.translate(OH, 0);//设置画布上的(0,0)位置，也就是旋转的中心点
    ctx.rotate(90 * Math.PI / 180);//把画布旋转90度
    // 执行Canvas的drawImage语句
    ctx.drawImage(imgs, 0, 0, OW, OH);//把图片绘制在画布translate之前的中心点，
    ctx.restore();//恢复状态
    
    let url = cvs.toDataURL()
    $('.rotate-img').attr('src', url)
}
rotateFile.addEventListener('change',function(){
    file = event.target.files[0];
    let url = window.URL.createObjectURL(file);
    $('.normal-img').attr('src',url)
    imgs.src = url
})