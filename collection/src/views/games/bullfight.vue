<template>
  <div id="bullfight">
    <div>
      <span v-for="pair in pairs" :key="pair.dot">
        {{pair.dot}}-{{pair.type}}
        <br />
      </span>
    </div>
  </div>
</template>

<script>
import { Bullfight } from "@/utils/games/poker.js";
export default {
  name: "Bullfight",
  data() {
    return {
      pairs: []
    };
  },
  created() {
    let bullfight = new Bullfight(false);
    this.pairs = bullfight.pairs;
  }
};
</script>

<style lang="scss" scoped>
</style>