<template>
  <div id="games">
    <ul>
      <li v-for="game in games" :key="game.path" @click="$router.push(game.path)">{{game.name}}</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Games",
  data() {
    return {
      games: [
        {
          name: "斗牛牛",
          path: "/bullfight"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>