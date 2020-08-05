<template>
  <div id="app">
    <section id="addRecord" @click="modal = true">
      <Badge status="processing" />
    </section>
    <Modal v-model="modal" footer-hide fullscreen>
      <add></add>
    </Modal>
    <router-view></router-view>
    
  </div>
</template>

<script>

import qrcode from "./views/other/QRCode";
import add from "./views/other/AddModal";
export default {
  name: "App",
  data() {
    return {
      modal: false
    };
  },
  components: {
    qrcode,
    add
  },
  methods: {
    showEditModel() {}
  }
};
</script>

<style lang="less">
@import url("./less.style/app.less");
</style>
