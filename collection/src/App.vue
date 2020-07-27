<template>
  <div id="app">
    <header>
      <svg
        t="1587306062924"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2136"
        width="64"
        height="64"
        @click="home"
        v-show="isHome"
      >
        <path
          d="M930.2279131 451.25493443L587.37232829 94.70375968a111.24173051 111.24173051 0 0 0-160.6203881 0L83.98952265 451.25493443c-35.40356583 37.26691139-30.83836918 68.66428425-25.06199791 81.89403779a59.62705823 59.62705823 0 0 0 58.78855272 35.40356583h50.31033039v274.28446784c0 62.23574202 44.72029367 121.11746203 108.35354487 121.11746203h145.8999581V673.45889362c0-31.11787101-4.65836393-48.44698481 27.11167804-48.44698482h115.34109076c31.86320924 0 27.11167804 17.3291138 27.11167803 48.44698482v290.30923974h145.9931254c63.54008392 0 108.35354487-58.69538545 108.35354487-121.11746202V568.55253805h50.2171631a59.62705823 59.62705823 0 0 0 58.78855272-35.40356583c5.86953855-13.22975354 10.43473518-45.0929628-24.96883064-81.89403779z"
          fill="#CE6D39"
          p-id="2137"
        />
      </svg>
      <span class="hint">{{$route.meta.title || 'Home'}}</span>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isHome: true
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    }
  },
  created() {
    this.$route.path === "/" ? (this.isHome = false) : (this.isHome = true);
  },
  watch: {
    $route(route) {
      if (route.path !== "/") this.isHome = true;
      else this.isHome = false;
    }
  }
};
</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  header {
    background: rgba(206, 109, 57, 0.2);
    // box-shadow: 0 0 1px 1px rgba(226, 226, 226, 0.5);
    padding: 0 10px;
    height: 48px;
    display: flex;
    align-items: center;
  }
  .icon {
    width: 36px;
    height: 36px;
    cursor: pointer;
  }
  .hint {
    margin-left: 20px;
    color: rgb(216, 126, 126);
    letter-spacing: 0.05em;
  }
}
</style>
