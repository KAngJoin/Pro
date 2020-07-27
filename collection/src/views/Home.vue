<template>
  <div id="home" ref="home">
    <router-link
      v-for="item in list"
      :key="item.name"
      :to="item.path"
      tag="div"
      class="pro-block"
    >{{item.meta.title}}</router-link>
  </div>
</template>

<script>
import routerList from "../utils/routes";
export default {
  name: "Home",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.list = routerList;
  }
};
</script>

<style lang="scss" scoped>
#home {
  max-width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .pro-block {
    width: auto;
    padding: 10px;
    margin: 0 20px;
    background: #ce6d39;
    border-radius: 6px;
    float: left;
    cursor: pointer;
    color: #fff;
    letter-spacing: 0.05em;
  }
}
</style>