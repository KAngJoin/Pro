
<template>
  <div id="sum">
    <p class="title">和值分析表</p>

    <div id="echart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Sum",
  data() {
    return {
      value_x: [],
      value_y: [],
      options: "190801"
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const s = this;
      s.Ajax.post(`${window.hostDomain}ask/all`, {
        options: s.options
      }).then(({ data }) => {
        let arr = [];
        data.data.forEach(val => {
          arr.push(
            parseInt(val.one) +
              parseInt(val.two) +
              parseInt(val.three) +
              parseInt(val.four) +
              parseInt(val.five)
          );
        });
        s.anylice(arr);
      });
    },
    anylice(arr) {
      const s = this;
      s.$nextTick(() => {
        let count = [];
        arr.forEach((val, i) => {
          count.push([i + 1, val]);
        });
        let spanValue = echarts.init(document.getElementById("echart"));
        const value = {
          xAxis: {
            min: 1,
            max: 39,
            splitNumber: 40,
            name: "当日期号"
          },
          yAxis: {
            min: 0,
            max: 50,
            splitNumber: 50,
            name: "和值"
          },
          tooltip: {},
          series: [
            {
              data: count,
              type: "line"
            }
          ]
        };

        spanValue.setOption(value, true);

        window.addEventListener("resize", () => {
          spanValue.resize();
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
#sum {
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
    min-height: 850px;
  }
}
</style>