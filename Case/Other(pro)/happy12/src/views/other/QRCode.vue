<template>
  <div>
    <h1>二维码生成器</h1>
    <canvas id="qrcode-canvas"></canvas>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "qrcode",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.useqrcode();
  },
  methods: {
    useqrcode() {
      let cvs = document.getElementById("qrcode-canvas");
      QRCode.toCanvas(cvs, "https://www.baidu.com", function(err) {
        if (err) console.error(err);
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>