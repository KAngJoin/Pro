
<template>
  <div id="span">
    <p class="title">跨度值分析表 {{date}}</p>
    <div class="describe">
      <pre>
          xAxis：
            当日期号, 1 --> 190824001 。
            最大：39
            最小：1

          yAxis:
            跨度值：最大值减去最小值。
            最大：11 （最小值为 1 ，最大值为12）
            最小：4 （连续五个号，例：1 2 3 4 5）
      </pre>
    </div>
    <div id="echart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Span",
  data() {
    return {
      dataAll: [],
      date: ""
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.$nextTick(() => {
      let spanValue = echarts.init(document.getElementById("echart"));
      const value = {
        grid: { width: "80%", height: "80%" },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          min: 1,
          max: 39,
          splitNumber: 40,
          name: "当日期号"
        },
        yAxis: { gridIndex: 0, min: 4, max: 11, name: "跨度值" },
        series: [
          {
            name: "22",
            type: "line",
            data: this.dataAll
          },
          {
            name: "33",
            type: "line",
            data: this.dataAll
          }
        ]
      };

      spanValue.setOption(value, true);

      window.addEventListener("resize", () => {
        spanValue.resize();
      });
    });
  },
  methods: {
    init() {
      const s = this;
      let array = JSON.parse(localStorage.getItem("data"))[3];

      if (!array && !array.length) return;
      s.date = data[0].date;
      let arr = [];
      for (let i = 0, len = data.length; i < len; i++) {
        const ele = data[i];
        arr.push([i + 1, ele.span]);
      }
      s.dataAll = arr;
    }
  }
};
</script>

<style lang="less" scoped>
#span {
  .title {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    height: 2em;
    line-height: 2em;
  }
  #echart {
    width: 100%;
    height: auto;
    min-height: 400px;
  }
  .describe {
    font-size: 16px;
  }
}
</style>