<style lang="less">
@import url("../less.style/home.less");
</style>
<template>
  <div class="pageFullScreen" id="homeFullScreen" ref="main">
    <Draw></Draw>
    <section id="main-content-box" class="container-box">
      <div class="head-nav-about" ref="headNav" :class="{fixedTop: fixed}">
        <div class="tool-menu-bar" @click="$router.push('/')">
          <Icon type="logo-octocat" size="40" style="margin-right: 10px; color: aquamarine;" />
        </div>
        <div class="tool-skin-bar">
          <Badge text="H" />
          <Badge text="A" />
          <Badge text="P" />
          <Badge text="P" />
          <Badge text="Y" />
        </div>
        <TopNav></TopNav>
      </div>
      <div class="toggle-components" ref="mainContent">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>
<script>
import Draw from "./other/Drawer";
import TopNav from "./other/TopNav";
export default {
  name: "home",
  data() {
    return {
      fixed: false
    };
  },
  components: {
    Draw,
    TopNav
  },
  activated() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll, false);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    handleScroll() {
      let vm = this;
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top > 0) vm.fixed = true;
      if (top == 0) vm.fixed = false;
    }
  }
};
</script>
