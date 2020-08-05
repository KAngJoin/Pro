function Clock() {
    this.ctx = null;
    //基数
    this.r = 190;//画布宽高的一半
    //三角形
    this.c = this.r-60;
    this.a = this.c / 2;
    this.b = this.a * Math.pow(3, 1 / 2);
    //数字
    this.numArr = [
        {txt: '1', x: this.r + this.a, y: this.r - this.b},
        {txt: '2', x: this.r + this.b, y: this.r - this.a},
        {txt: '3', x: this.r + this.c, y: this.r},
        {txt: '4', x: this.r + this.b, y: this.r + this.a},
        {txt: '5', x: this.r + this.a, y: this.r + this.b},
        {txt: '6', x: this.r, y: this.r + this.c},
        {txt: '7', x: this.r - this.a, y: this.r + this.b},
        {txt: '8', x: this.r - this.b, y: this.r + this.a},
        {txt: '9', x: this.r - this.c, y: this.r},
        {txt: '10', x: this.r - this.b, y: this.r - this.a},
        {txt: '11', x: this.r - this.a, y: this.r - this.b},
        {txt: '12', x: this.r, y: this.r - this.c},
    ];
    //轴(初始值)
    this.axisArr = [
        {Color: '#000', LW: 6, LT_X: this.r, LT_Y: this.r-40, MT_X: this.r, MT_Y: this.r},
        {Color: '#000', LW: 4, LT_X: this.r, LT_Y: this.r-65, MT_X: this.r, MT_Y: this.r},
        {Color: '#f00', LW: 2, LT_X: this.r, LT_Y: this.r-115, MT_X: this.r, MT_Y: this.r+10}
    ];
    //时分秒
    this.h = 0;
    this.m = 0;
    this.s = 0;
    //模型0
    this.base_IMG = null;
    this.h_IMG = null;
    this.m_IMG = null;
    // this.s_IMG = null;

    //初始化
    this.init = function () {
        this.drawDish();
        this.drawNum();

        this.rotateDS();
        //存储基础模型base_IMG
        this.base_IMG = this.ctx.getImageData(0, 0, 400, 400);
        // console.log(typeof this.ctx.getImageData(0, 0, 400, 400))
    };
    this.drawDish = function () {//圆盘和中心点
        //表盘
        this.ctx.fillStyle = "#abcdef";
        this.ctx.beginPath();
        this.ctx.arc(this.r, this.r, this.r-18, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        //轴点
        this.ctx.fillStyle = "#000";
        this.ctx.beginPath();
        this.ctx.arc(this.r, this.r, 8, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
    };
    this.drawNum = function () {//数字
        for (var val of this.numArr) {
            this.ctx.fillStyle = "#000";
            this.ctx.font = "30px 微软雅黑";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(val.txt, val.x, val.y)
        }
    };
    this.drawScale = function (LW, END_Y) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(this.r, 20);
        this.ctx.lineTo(this.r, END_Y);
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = LW;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    };
    this.rotateDS = function () {//画刻度
        this.ctx.translate(this.r, this.r);
        var self = this;
        for (var i = 0; i < 60; i++) {
            (function (i) {
                self.ctx.save();
                self.ctx.rotate(6 * i * Math.PI / 180);
                self.ctx.translate(-self.r, -self.r);
                if (i === 0 || i === 15 || i === 30 || i === 45) {
                    self.drawScale(3, 35);
                } else if (i % 5 === 0) {
                    self.drawScale(2, 30)
                } else {
                    self.drawScale(1, 27)
                }
                self.ctx.restore();
            })(i)
        }
    };
    //工具
    this.drawAxis = function (lx, ly, col, lw, mx, my) {//时间轴
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(mx, my);
        this.ctx.lineTo(lx, ly);
        this.ctx.strokeStyle = col;
        this.ctx.lineWidth = lw;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    };
    this.drawHours = function (hour) {
        this.drawAxis(hour.LT_X, hour.LT_Y, hour.Color, hour.LW, hour.MT_X, hour.MT_Y)
    };
    this.drawMinutes = function (minut) {
        this.drawAxis(minut.LT_X, minut.LT_Y, minut.Color, minut.LW, minut.MT_X, minut.MT_Y);
        // this.runMinute();
    };
    this.drawSeconds = function (second) {//画秒针
        this.drawAxis(second.LT_X, second.LT_Y, second.Color, second.LW, second.MT_X, second.MT_Y)
    };
    //业务
    this.runS = function () {
        this.ctx.save();
        this.ctx.clearRect(-this.r, -this.r, 400, 400);
        this.ctx.putImageData(this.m_IMG, 0, 0);
        this.ctx.rotate(6 * this.s * Math.PI / 180);
        this.ctx.translate(-this.r, -this.r);
        this.drawSeconds(this.axisArr[2]);
        //这里不需要存秒的模型，因为没有下一级使用它
        //this.s_IMG = this.ctx.getImageData(0, 0, 400, 400);
        this.ctx.restore();
    };
    this.runM = function () {
        this.ctx.save();
        this.ctx.clearRect(-this.r, -this.r, 400, 400);
        this.ctx.putImageData(this.h_IMG, 0, 0);
        this.ctx.rotate(6 * this.m * Math.PI / 180);
        this.ctx.translate(-this.r, -this.r);
        this.drawMinutes(this.axisArr[1]);
        this.m_IMG = this.ctx.getImageData(0, 0, 400, 400);
        this.ctx.restore();
    };
    this.runH = function () {
        this.ctx.save();
        this.ctx.clearRect(-this.r, -this.r, 400, 400);
        //取基础模型
        this.ctx.putImageData(this.base_IMG, 0, 0);
        this.ctx.rotate(((30 * this.h) + (1 / 2 * this.m)) * Math.PI / 180);
        this.ctx.translate(-this.r, -this.r);
        //画 时(h) 的模型
        this.drawHours(this.axisArr[0]);
        //存 h_IMG
        this.h_IMG = this.ctx.getImageData(0, 0, 400, 400);
        this.ctx.restore();
    };
    this.compute = function () {
        //是否画时针和分针
        var flag_HM = true,
            //立即显示时间轴
            flag_prompt = true,
            //定时器间隔时间（初始为0），
            interval = 0;
        var self = this;
        setInterval(function () {//秒增加
            (function () {
                var date = new Date();
                self.h = date.getHours();//0-11
                self.m = date.getUTCMinutes();//0-59
                self.s = date.getUTCSeconds();//0-59
                // console.log(self.s);
            })();
            if (flag_HM) {
                self.runH();
                self.runM();
                flag_HM = false;
            }
            if (self.s === 59) {
                flag_HM = true
            }
            //初始显示后不再改变间隔时间
            if (flag_prompt) {
                interval = 1000;
                flag_prompt = false;
            }
            self.runS();
            // console.log(self.s)//这里遇到一个比较鬼畜的现象，暂时还不知道原因

            // if (self.s >= 0 && self.s <=60) {
            //     self.s++;
            //     if (self.s === 60) {
            //         self.s = 0;
            //         self.m += 1;//分增加
            //         setTimeout(function () {
            //             self.runH(); 
            //             self.runM();
            //         }, 0)
            //     }
            //     setTimeout(function () {
            //         self.runSec()
            //     }, 0);
            // }
            // console.log(self.s)
        }, interval);

    };
}
window.onload = function () {
    var clock = new Clock();
    clock.ctx = document.getElementById("clock_Canvas").getContext("2d");
    clock.init();
    clock.compute();
};