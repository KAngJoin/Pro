<template>
  <div id="publish">
    <section class="header_top head-info">
      <img class="back" src="./images/back.png" alt @click="$router.back()" />
      <Button type="defalut" class="btn" :loading="loading" @click="publish">
        <span v-if="!loading">发布</span>
        <span v-else>发布中</span>
      </Button>
    </section>
    <section class="main-pub">
      <textarea
        v-model="content"
        name="txt"
        id="test"
        :disabled="contented"
        autofocus
        placeholder="说点什么..."
      ></textarea>
      <div class="source">
        <div class="item-img item" v-show="imgs.length" v-for="(item,index) in imgs" :key="index">
          <div
            class="img"
            :style="{ background: 'url('+item+')'}"
            @click="handleGallaryOpen(item,index)"
          ></div>
          <div class="del" v-show="delShow" @click="delIMG($event,index)">
            <img class="del-img" src="./images/del.png" alt />
          </div>
        </div>
        <div class="item-video item" v-show="choose_video">
          <video
            ref="ele_video"
            controls
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            :src="choose_video"
          ></video>
        </div>
        <div
          class="add item"
          @click="addIMG"
          v-show="status === 'image' ? imgs.length < 9 : !choose_video"
        >
          <input
            type="file"
            accept="image/*"
            multiple
            name
            id="choose"
            ref="choose"
            @change="chooseResource($event)"
          />
        </div>
      </div>
    </section>
    <section class="submit">
      <div class="edit" v-show="imgs.length > 0 && imgs.length <= 9 && !choose_video">
        <mt-button
          type="primary"
          size="small"
          @click="handleRemove"
          :disabled="loading"
          class="header_top"
          style="width: auto; height: inherit"
        >编辑</mt-button>
      </div>
      <div class="edit pro" v-show="!imgs.length && choose_video">
        <mt-button
          type="primary"
          size="small"
          @click="rechoose"
          :disabled="loading"
          style="width: 6em; height: inherit;margin-right: 10px"
        >重选</mt-button>
        <Progress :percent="percent" status="active" v-show="!imgs.length && choose_video"></Progress>
      </div>
    </section>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <fade-animation>
      <common-gallary
        :gallaryImgs="gallaryImgs"
        :infoItem="infoItem"
        :ind="order"
        v-show="showGallary"
        @close="handleGallaryClose"
      ></common-gallary>
    </fade-animation>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import CommonGallary from "../../../common/components/gallary/gallary.vue";
import FadeAnimation from "../../../common/components/fade/fadeAnimation.vue";
import { Actionsheet, Toast } from "mint-ui";
import lc from "../../../common/localSave";
import EXIF from "exif-js";
import Cookies from "js-cookie";
let md5 = require("js-md5");
let vue = null;
export default {
  data() {
    return {
      content: "",
      delShow: false,
      loading: false,
      contented: false,
      percent: 0,
      imgs: [],
      choose_video: "",
      imgType: ["ico", "bmp", "gif", "pjpeg", "jpg", "jpeg", "png"],
      videoType: ["mp4", "Ogg", "webm", "mpeg", "MOV"],
      sheetVisible: false,
      actions: [
        {
          name: "照片",
          method: function camera() {
            vue.getCamera();
          }
        },
        {
          name: "视频",
          method: function video() {
            vue.getVideo();
          }
        }
      ],
      status: "",
      my_data: {
        name: "123.pmp4",
        describe: "",
        course_id: "",
        resource_type: "",
        teacher_type: "school_circle",
        files: []
      },
      my_files: [],
      chunkSize: 1024 * 1024 * 0.5,
      count: 0,
      totalFiles: 0,
      //画廊控制
      gallaryImgs: [],
      infoItem: {},
      order: 0,
      showGallary: false
    };
  },
  components: {
    FadeAnimation,
    CommonGallary
  },
  mounted() {
    vue = this;
  },
  computed: {
    ...mapState([]),
    ...mapGetters([])
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
    // 编辑
    handleRemove() {
      const s = this;
      // if (s.delShow) return;
      s.delShow = !s.delShow;
    },
    // 重新选择视频
    rechoose() {
      let s = this;
      s.my_files = [];
      s.choose_video = "";
    },
    // 删除图片
    delIMG(e, i) {
      let aim = e.target || e.srcElement;
      let s = this;
      if (s.loading) return;
      s.imgs.splice(i, 1);
      s.my_files.splice(i, 1);
    },
    //添加选择文件
    addIMG() {
      const s = this;
      let input = s.$refs.choose;
      if (s.imgs.length) {
        if (s.imgs.length >= 9) return;
        input.click();
        if (s.delShow) s.delShow = false;
      } else {
        s.sheetVisible = true;
      }
    },
    // 选择类型
    chooseResource(e) {
      const s = this;
      let aim = e.target || e.srcElement;
      if (aim.files) {
        s.count = 0;
        s.totalFiles = aim.files.length;
        if (s.status === "image") {
          //最大图片数限制
          const MAX = 9;
          const CL = s.my_files.length;
          const OL = aim.files.length;
          let file;
          if (OL > MAX - CL) file = Array.from(aim.files).slice(0, MAX - CL);
          else file = aim.files;
          //添加并处理图片
          for (let val of file) {
            if (s.fileFilter(val, s.imgType)) {
              if (s.imgs.length < 9) {
                EXIF.getData(val, function() {
                  const ori = EXIF.getTag(this, "Orientation");
                  if (ori == 6) {
                    /**
                     * ios 竖着拍图片旋转 90° 问题
                     */
                    let canvas = document.createElement("canvas"),
                      ctx = canvas.getContext("2d");
                    let img = new Image();
                    img.src = s.urlTool(val);
                    img.onload = function() {
                      let reader = new FileReader();
                      let width = img.width;
                      let height = img.height;
                      canvas.width = height;
                      canvas.height = width;
                      ctx.save();
                      ctx.translate(height, 0);
                      ctx.rotate((90 * Math.PI) / 180);
                      ctx.drawImage(img, 0, 0, width, height);
                      ctx.restore();
                      let type = "image/jpeg";
                      let res = canvas.toDataURL(type);
                      s.imgs.push(res);
                      let dataimg = ctx.getImageData(0, 0, width, height);
                      for (const key in val) {
                        dataimg[key] = val[key];
                      }
                      let bin = atob(res.split(",")[1]);
                      let buffer = new Uint8Array(bin.length);
                      for (let i = 0; i < bin.length; i++) {
                        buffer[i] = bin.charCodeAt(i);
                      }
                      let blob = new Blob([buffer.buffer], { type: type });
                      dataimg._name = dataimg.name.toString();
                      dataimg.content = blob;
                      s.my_files.push(dataimg);
                    };
                  } else {
                    s.imgs.push(s.urlTool(val));
                    s.readFile(val);
                  }
                });
              }
            }
          }
        } else if (s.status === "video") {
          //视频数量限制
          if (aim.files.length !== 1) {
            Toast("一次只可上传一个视频");
            return;
          }
          let _video = document.createElement("video"),
            resource = aim.files[0],
            url = s.urlTool(resource),
            reader = new FileReader();
          _video.src = url;
          if (s.fileFilter(resource, s.videoType)) {
            let url = s.urlTool(resource);
            s.my_files = [];
            s.choose_video = url;
            /**
             * DO:
             *  选择视频后，预览播放，但在Android上无法获取用户手机内的视频播放，onsuspend()
             *  如果不加onprogress ，timeLength 这是NaN
             */
            resource.timeLength = s.formatDuration(
              new Date(_video.duration * 1000),
              "hh:mm:ss"
            );
            s.my_data.name = Math.floor(Math.random() * 1000000) + ".mp4";
            s.readFile(resource);
          }
        }
      }
    },
    // 文件格式判断
    fileFilter(file, type) {
      let s = this;
      if (!type.length) {
        return true;
      } else {
        let flag = false;
        let ext = file.name.split(".");
        ext = ext[ext.length - 1];
        if (file.size > 0) {
          type.forEach(function(val) {
            if (ext.indexOf(val) > -1) {
              flag = true;
            }
          });
        }
        if (!flag) {
          Toast({
            message: `请传文件后缀在 ${type.toString()} 中的文件,并且文件不能为空`,
            position: "center",
            duration: 3000
          });
        }
        return flag;
      }
    },
    // 读取和分割（分块处理）文件
    readFile(file) {
      let s = this;
      let reader = new FileReader();
      reader.onload = () => {
        if (file.size === 0) return;
        let chunks = [];
        let chunkTotal = Math.ceil(file.size / s.chunkSize); // 向上取整,文件总块数
        let mid = file.name.split(".");
        let type = mid[mid.length - 1];
        // 唯一的文件名，前端用来存当前块，后端用来追加文件内容
        let fileName =
          file.lastModified +
          md5(s.blobSlice(file, 0, 1024).toString()) +
          "." +
          type;
        for (let i = 1; i <= chunkTotal; i++) {
          let chunkObj = {
            fileName: fileName, // 唯一的字段，后端通过它来追加文件内容
            fileSize: file.size,
            type: type,
            chunkTotal: chunkTotal, // 文件一共被分成了多少块
            chunkIndex: i - 1, // 当前是第几块
            content: s.blobSlice(file, (i - 1) * s.chunkSize, i * s.chunkSize) // 块的内容
          };
          chunkObj.chunkSize = chunkObj.content.size;
          chunks.push(chunkObj);
        }
        file.chunks = chunks;
        file._name = file.name.toString();
        file.isPasue = false;
        file.flag = false;
        file.index = 0;
        file.nowChunkIndex = 0; // 当前传第几块
        s.my_files.push(file);
        s.count++;
        if (s.count >= s.totalFiles) {
          s.my_files.push(...file);
        }
        reader.onload = null;
      };
      reader.readAsArrayBuffer(file); // 二进制方式读文件
    },
    // 文件分割方法
    blobSlice(blob, startByte, endByte) {
      if (blob.slice) {
        return blob.slice(startByte, endByte);
      }
      // 兼容firefox
      if (blob.mozSlice) {
        return blob.mozSlice(startByte, endByte);
      }
      // 兼容webkit
      if (blob.webkitSlice) {
        return blob.webkitSlice(startByte, endByte);
      }
      return null;
    },
    //获取图片
    getCamera() {
      let input = this.$refs.choose;
      input.setAttribute("accept", "image/*");
      input.click();
      this.status = "image";
    },
    //获取视频
    getVideo() {
      let input = this.$refs.choose;
      input.setAttribute("accept", "video/*");
      input.click();
      this.status = "video";
    },
    //本地资源预览路径处理
    urlTool(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    // 发布前数据处理
    publish() {
      let s = this,
        obj,
        content = s.content.trim(),
        fd = new FormData();
      if (!s.my_files.length && !content) {
        Toast({
          message: `内容或资源不能为空`,
          position: "center",
          duration: 3000
        });
        return;
      }
      s.loading = true;
      s.contented = true;
      s.my_data.describe = content;
      s.my_data.resource_type = s.status;
      fd.append("resource_type", s.my_data.resource_type);
      fd.append("name", s.my_data.name);
      fd.append("teacher_type", s.my_data.teacher_type);
      fd.append("describe", s.my_data.describe);
      fd.append("course_id", s.my_data.course_id);
      if (s.my_files.length) {
        if (s.status == "image") {
          for (let i = 0; i < s.my_files.length; i++) {
            let file = s.my_files[i];
            obj = file.chunks ? file.chunks[file.nowChunkIndex] : file;
            fd.append("files[]", obj.content, file._name);
          }
        } else if (s.status == "video") {
          let file = s.my_files[0];
          fd.append("timeLength", file.timeLength);
          obj = file.chunks[file.nowChunkIndex];
          fd.append("files", obj.content, file._name);
          fd.append("chunks", obj.chunkTotal);
          fd.append("chunk", obj.chunkIndex);
          fd.append("chunk_size", obj.chunkSize);
          fd.append("fileName", obj.fileName);
        }
      }
      s.upload(fd, obj);
    },
    // 上传
    upload(fd, obj = {}) {
      let s = this;
      let file = s.my_files[0];
      s.Ajax.Post(`/teacher/upload`, fd)
        .then(function(data) {
          if (data.code == 0) {
            if (data.data[0] == 101) {
              if (file.nowChunkIndex <= obj.chunkTotal) {
                file.nowChunkIndex++;
                s.percent = parseFloat(
                  ((file.nowChunkIndex / (obj.chunkTotal - 1)) * 100).toFixed(1)
                );
                if (!file.flag) {
                  s.publish();
                }
              } else {
                s.count++;
                if (s.count >= s.files.length) {
                  s.loading = false;
                  s.contented = false;
                  s.count = 0;
                }
                alert(1);
              }
            } else {
              s.loading = false;
              s.contented = false;
              Toast({
                message: `发布成功`,
                position: "center",
                duration: 3000
              });
                s.$router.push({
                  path: `/teachMien/TeachMienList` + s.lc.get("zpt", "?"),
                  query: { active: 2 }
                });
            }
          } else {
            Toast({
              message: `资源错误`,
              position: "center",
              duration: 3000
            });
            s.loading = false;
            s.contented = false;
          }
        })
        .catch(function(error) {
          Toast({
            message: `网络错误或资源过大`,
            position: "center",
            duration: 3000
          });
          s.loading = false;
          s.contented = false;
        });
    },
    // 视频时长处理
    formatDuration(obj, fmt) {
      let o = {
        "M+": obj.getMonth() + 1, //月份
        "d+": obj.getDate(), //日
        "h+": obj.getUTCHours(), //小时
        "m+": obj.getMinutes(), //分
        "s+": obj.getSeconds(), //秒
        "q+": Math.floor((obj.getMonth() + 3) / 3), //季度
        S: obj.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (obj.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    },
    // 画廊关闭
    handleGallaryClose() {
      this.showGallary = false;
      document.body.removeAttribute("style");
    },
    // 画廊开启
    handleGallaryOpen(item, i) {
      const s = this;
      document.body.setAttribute("style", "height:100%;overflow:hidden;");
      s.gallaryImgs = s.imgs;
      s.order = i;
      s.infoItem = {};
      s.showGallary = true;
    }
  }
};
</script>
<style lang="less">
textarea::-webkit-input-placeholder {
  color: #bbb;
  font-size: 32px;
}
textarea::-moz-placeholder {
  color: #bbb;
  font-size: 32px;
}
textarea::-ms-input-placeholder {
  color: #bbb;
  font-size: 32px;
}
.header_top {
  width: 100%;
  height: 80px;
}
.head-info {
  width: 100%;
  height: 80px;
  position: relative;
  background: rgba(30, 173, 88, 1);
  .back {
    float: left;
    margin-left: 30px;
    margin-top: 20px;
    height: 33px;
    width: 20px;
  }
  .title-pub {
    padding: 21px 0 21px 0;
    height: 38px;
    // line-height: 38px;
    font-size: 34px;
    color: #fff;
    text-align: center;
  }
  .btn {
    float: right;
    color: #fff;
    outline: none;
    border: 0px;
    width: 25vw;
    height: 100%;
    line-height: 1em;
    font-size: 40px !important;
    background: rgba(0, 0, 0, 0) !important;
    &:hover {
      color: #fff !important;
      background: rgba(0, 0, 0, 0) !important;
      border-radius: 0 !important;
    }
    &::before {
      background: rgba(0, 0, 0, 0) !important;
    }
  }
}
.main-pub {
  width: 100%;
  height: auto;
  padding: 20px;
  .source {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      width: 30vw;
      height: 30vw;
      margin: 5px;
      position: relative;
      .del {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
        .del-img {
          width: 60px;
          height: 60px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      &:nth-of-type(3n) {
        margin-right: 0px;
      }
    }
    .add {
      background: #eee;
      position: relative;
      z-index: 100;
      #choose {
        width: 100%;
        height: 100%;
        display: block;
        visibility: hidden;
        position: absolute;
        left: 0;
        top: 0;
      }

      &::before,
      &::after {
        content: "";
        display: block;
        width: 18vw;
        height: 1.5vw;
        position: absolute;
        top: 50%;
        left: 50%;
      }
      &::before {
        background: rgb(124, 124, 124);
        transform: translate(-50%, -50%);
      }
      &::after {
        background: rgb(124, 124, 124);
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }
    .item-img {
      background: #fff;
      .img {
        position: relative;
        width: 100%;
        height: 0;
        overflow: hidden;
        margin: 0;
        padding-bottom: 100%; /* 关键就在这里 */
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
      }
    }
    .item-video {
      width: 100%;
      height: auto;
      overflow: hidden;
      video {
        width: 100%;
        max-height: 40vh;
      }
    }
  }
  #test {
    width: 100%;
    height: 240px;
    min-height: 30px;
    max-height: 500px;
    outline: 0 none;
    border: 0;
    padding: 10px 8px;
    font-size: 36px;
    text-align: justify;
    font-family: "Microsoft YaHei" "SimHei" serif;
    color: #000;
    letter-spacing: 1px;
    word-spacing: 1px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #fff;
    background-image: none;
    caret-color: rgba(72, 180, 0, 0.979);
  }
}
.submit {
  width: 100%;
  padding: 0 20px;
  padding-bottom: 30px;
  .pro {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>



