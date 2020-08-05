<template>
  <div>
    <Table border max-height="600" :columns="columns" :data="datas"></Table>
    <pre style="font-size: 16px">
      
      分析：

      1.跨度值在下期开出的概率 ({{span*100}}%) ,可以列为排除值。
    </pre>
  </div>
</template>

<script>
import { datas } from "./double.js";
export default {
  name: "Double",
  data() {
    const s = this;
    return {
      datas: datas,
      columns: [
        {
          title: "序号",
          key: "i",
          sortable: true,
          width: "140",
          align: "center"
        },
        {
          title: "日期",
          key: "date",
          width: "140",
          align: "center"
        },
        {
          title: "星期",
          width: 100,
          key: "week",
          align: "center"
        },
        {
          title: "前区",
          width: 380,
          align: "center",
          render(h, params) {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    width: "2em",
                    height: "2em",
                    lineHeight: "2em",
                    background: "#ccc",
                    borderRadius: "50%",
                    color: "#fff",
                    display: "inline-block",
                    margin: "6px",
                    fontSize: "16px"
                  }
                },
                params.row.val[0]
              ),
              h(
                "span",
                {
                  style: {
                    width: "2em",
                    height: "2em",
                    lineHeight: "2em",
                    background: "#ccc",
                    borderRadius: "50%",
                    color: "#fff",
                    display: "inline-block",
                    margin: "6px",
                    fontSize: "16px"
                  }
                },
                params.row.val[1]
              ),
              h(
                "span",
                {
                  style: {
                    width: "2em",
                    height: "2em",
                    lineHeight: "2em",
                    background: "#ccc",
                    borderRadius: "50%",
                    color: "#fff",
                    display: "inline-block",
                    margin: "6px",
                    fontSize: "16px"
                  }
                },
                params.row.val[2]
              ),
              h(
                "span",
                {
                  style: {
                    width: "2em",
                    height: "2em",
                    lineHeight: "2em",
                    background: "#ccc",
                    borderRadius: "50%",
                    color: "#fff",
                    display: "inline-block",
                    margin: "6px",
                    fontSize: "16px"
                  }
                },
                params.row.val[3]
              ),
              h(
                "span",
                {
                  style: {
                    width: "2em",
                    height: "2em",
                    lineHeight: "2em",
                    background: "#ccc",
                    borderRadius: "50%",
                    color: "#fff",
                    display: "inline-block",
                    margin: "6px",
                    fontSize: "16px"
                  }
                },
                params.row.val[4]
              ),
              h(
                "span",
                {
                  style: {
                    width: "2em",
                    height: "2em",
                    lineHeight: "2em",
                    background: "#ccc",
                    borderRadius: "50%",
                    color: "#fff",
                    display: "inline-block",
                    margin: "6px",
                    fontSize: "16px"
                  }
                },
                params.row.val[5]
              )
            ]);
          }
        },
        {
          title: "后区", // ! 继续出的概率很低（可排除）
          width: 100,
          align: "center",
          render(h, params) {
            return h(
              "div",
              {
                style: {
                  width: "2em",
                  height: "2em",
                  lineHeight: "2em",
                  background: "#ccc",
                  borderRadius: "50%",
                  color: "#fff",
                  display: "inline-block",
                  margin: "6px",
                  fontSize: "16px"
                }
              },
              params.row.end
            );
          }
        },
        {
          title: "和值",
          width: 100,
          align: "center",
          render(h, params) {
            return h(
              "div",
              (() => {
                return eval(params.row.val.join("+"));
              })()
            );
          }
        },
        {
          title: "商/6",
          width: 100,
          align: "center",
          render(h, params) {
            return h(
              "div",
              {
                style: {
                  width: "2em",
                  height: "2em",
                  lineHeight: "2em",
                  borderRadius: "50%",
                  margin: "0 auto",
                  background: (() => {
                    let v = parseInt(eval(params.row.val.join("+")) / 6);
                    let sub_val = s.datas[parseInt(params.index + 1)];
                    if (sub_val) {
                      const has = sub_val.val.some(ele => {
                        return ele == v;
                      });
                      if (has) return "#ddd";
                      else return " transparent";
                    }
                  })()
                },
                on: {
                  click: () => {
                    console.log(params);
                  }
                }
              },
              (() => {
                if (params.row.val) {
                  return parseInt(eval(params.row.val.join("+")) / 6);
                } else {
                  return 0;
                }
              })()
            );
          }
        },
        {
          title: "余数值/6",
          width: 100,
          align: "center",
          render(h, params) {
            return h(
              "div",
              (() => {
                return eval(params.row.val.join("+")) % 6;
              })()
            );
          }
        },
        {
          title: "跨度", // ! 下期不出这个数
          width: 100,
          align: "center",
          render(h, params) {
            return h(
              "div",
              {
                style: {
                  background: (() => {
                    let i = parseInt(params.index);
                    if (s.datas[i + 1]) {
                      let sub_val = s.datas[i + 1].val,
                        has = sub_val.some(ele => {
                          return params.row.val[5] - params.row.val[0] == ele;
                        });
                      if (has) return "#ccc";
                    }
                  })()
                }
              },
              (() => {
                return params.row.val[5] - params.row.val[0];
              })()
            );
          }
        },
        {
          title: " "
        }
      ],

      span: 0
    };
  },
  mounted() {
    this.spanPercent();
  },
  methods: {
    spanPercent() {
      let s = this,
        len = this.datas.length,
        count = 0;
      s.datas.forEach((val, i) => {
        if (s.datas[i + 1]) {
          let sub_val = s.datas[i + 1].val,
            has = sub_val.some(ele => {
              return val.end == ele;
            });
          if (has) count++;
        }
      });
      s.span = (count / len).toFixed(3);
    }
  }
};
</script>

<style lang="less">
</style>