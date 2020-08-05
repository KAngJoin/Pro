function SWEEPMine() {
    //基础数据
    this.col = 10;
    this.row = 10;

    this.sumMine = 20;
    this.surplusMine = this.sumMine;
    this.mineMap = [];//雷的索引
}
SWEEPMine.prototype.creatBox = function () {
    //创建游戏单元格
    for (var i = 0; i < this.col; i++) {
        for (var j = 0; j < this.row; j++) {
            var sBox = document.createElement("div");
            sBox.classList.add("s-box");
            sBox.setAttribute("id", i + '-' + j);
            this.gameBox.appendChild(sBox);
            this.mineMap.push({ mine: 0 })
        }
    }
}
SWEEPMine.prototype.mineIndex = function () {
    //随机雷，并保持其位置
    while (this.sumMine) {
        var m_ind = Math.floor(Math.random() * this.col * this.row);
        if (this.mineMap[m_ind].mine === 0) {
            this.mineMap[m_ind].mine = 1;
            this.s_box[m_ind].classList.add("isL");
            this.mineMap[m_ind].islei = true;
            this.sumMine--;
        }
    }
}
function Mine() {
    //继承父类
    SWEEPMine.call(this)

    //dom
    this.gameBox = document.getElementById("game-box");
    this.s_box = document.getElementsByClassName("s-box");
    this.startBTN = document.getElementById("start");
    this.surMineBox = document.getElementById("surplus-mine");
    this.surMineBox_num = document.getElementById("surM-num");
    this.alertBox = document.getElementById("alertBox");
    this.replay = document.getElementById("replay");
    this.gameover_text = document.getElementById("over-showT");

    //构造器
    this.creatBox();
    this.mineIndex()
}

if (!Object.create) {//如果Object.create()方法不存在，重写此方法
    Object.create = function (proto) {
        if (proto == null) throw TypeError();
        var temp = typeof proto;
        if (temp !== 'object' && temp !== 'function') throw TypeError();
        //空对象作为中介，几乎不占内存。
        function Foo() { }
        Foo.prototype = proto;
        return new Foo;
    }
}
Mine.prototype = Object.create(SWEEPMine.prototype);
Mine.prototype.constructor = Mine;

//业务
Mine.prototype.Init = function () {
    // console.log(this)
    //显示
    this.startBTN.style.display = "none";
    this.surMineBox.style.display = 'block';
    this.gameBox.style.display = "block";
    this.surMineBox_num.innerHTML = this.surplusMine;
    
    //阻止默认上下文menu
    this.gameBox.oncontextmenu = function (e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false)
        // return false
    }
    
    //
    this.bindEvent()
}
Mine.prototype.bindEvent = function(){
    var self = this;
    //鼠标点击
    this.gameBox.onmousedown = function (e) {
        // console.log(this)
        var event = e.target || e.srcElement;
        // console.log(e.which)
        if (e.which == 1) {
            self.leftClick(event)
        } else if (e.which == 3) {
            self.Sign(event)
        }
    }

    //再玩一次
    this.replay.onclick = function () {
        self.alertBox.style.display = "none";
        self.gameBox.style.display = "none";
        self.startBTN.style.display = "block";
        self.surMineBox.style.display = 'none';
        self.gameBox.innerHTML = '';
    }
}
Mine.prototype.leftClick = function (dom) {
    //左击，扫雷
    var isLei = document.getElementsByClassName("isL")
    if (dom && dom.classList.contains("isL")) {
        // dom.classList.add('show-mine');
        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show-mine')
        }
        this.alertBox.style.display = "block"
    } else {
        //显示数字
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('show-num')
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isL')) {
                    n++
                }
            }
        }
        // dom && (n == 0 ? (dom.innerHTML = "") : (dom.innerHTML = n))
        if (dom) {
            dom.style.background = 'rgba(0,0,0,0.1)';
            dom.innerHTML = n
            if (n == 0) {
                dom.innerHTML = ''
            }
        }
        //扩散
        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            this.leftClick(nearBox)
                        }
                    }
                }
            }
        }

    }
}
Mine.prototype.Sign = function (dom) {
    //标记
    if (dom.classList.contains('show-num')) {
        return
    }
    dom.classList.toggle('flag');
    if (dom.classList.contains('isL') && dom.classList.contains('flag')) {
        this.surplusMine--;
        // this.surMineBox_num.innerHTML = this.surplusMine;
        if (this.surplusMine == 0) {
            self.alertBox.style.display = "block";
            this.gameover_text.innerHTML = '恭喜你';
        }
    }
    if (dom.classList.contains('isL') && !dom.classList.contains('flag')) {
        this.surplusMine++;
        // this.surMineBox_num.innerHTML = this.surplusMine;
    }
    
}




