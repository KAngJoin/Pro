<style lang="less">
#homePage {
  overflow: hidden;
  padding: 20px;
  .ivu-table {
    font-size: 20px;
    .new-row {
      color: #fff;
      background-color: rgb(109, 109, 109) !important;
      font-size: 22px;
      td {
        background: transparent;
      }
    }
  }
}
.ivu-table-body {
  overflow-x: scroll;
}
</style>
<template>
  <div id="homePage">
    <div>
      <Table
        border
        :row-class-name="rowClassName"
        max-height="800"
        :columns="columns"
        :data="datas"
      ></Table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const s = this;
    return {
      columns: [
        {
          title: "期号",
          key: "issue",
          width: "160px",
          align: "center",
          sortable: true,
          fixed: "left"
        },
        {
          title: "开奖号码",
          key: "all",
          align: "center",
          width: "250px",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    width: "1.5em",
                    height: "1.5em",
                    lineHeight: "1.5em",
                    borderRadius: "50%",
                    margin: "0 4px",
                    display: "inline-block",
                    color: "#fff",
                    background: "red"
                  }
                },
                `${params.row.all[0] || 0}`
              ),
              h(
                "div",
                {
                  style: {
                    width: "1.5em",
                    height: "1.5em",
                    lineHeight: "1.5em",
                    borderRadius: "50%",
                    margin: "0 4px",
                    display: "inline-block",
                    color: "#fff",
                    background: "red"
                  }
                },
                `${params.row.all[1] || 0}`
              ),
              h(
                "div",
                {
                  style: {
                    width: "1.5em",
                    height: "1.5em",
                    lineHeight: "1.5em",
                    borderRadius: "50%",
                    margin: "0 4px",
                    display: "inline-block",
                    color: "#fff",
                    background: "red"
                  }
                },
                `${params.row.all[2] || 0}`
              ),
              h(
                "div",
                {
                  style: {
                    width: "1.5em",
                    height: "1.5em",
                    lineHeight: "1.5em",
                    borderRadius: "50%",
                    margin: "0 4px",
                    display: "inline-block",
                    color: "rgb(66, 66, 66)",
                    background: "#ccc"
                  }
                },
                `${params.row.all[3] || 0}`
              ),
              h(
                "div",
                {
                  style: {
                    width: "1.5em",
                    height: "1.5em",
                    lineHeight: "1.5em",
                    borderRadius: "50%",
                    margin: "0 4px",
                    display: "inline-block",
                    color: "rgb(66, 66, 66)",
                    background: "#ccc"
                  }
                },
                `${params.row.all[4] || 0}`
              )
            ]);
          }
        },
        // {
        // title: "前一.后两位和-12",
        // key: "value_end",
        // width: "200px",
        // align: "center",
        // render: (h, params) => {
        //   if (params.row.value_end.bool_) {
        //     if (params.row.value_end.val == 0) {
        //       // 中
        //       return h(
        //         "div",
        //         {
        //           style: {
        //             color: "#fff",
        //             background: "#f40"
        //           }
        //         },
        //         params.row.value_end.money
        //       );
        //     } else {
        //       return h(
        //         // 落
        //         "div",
        //         {
        //           style: {
        //             color: "#red",
        //             background: "#eee"
        //           }
        //         },
        //         params.row.value_end.val + "--" + params.row.value_end.money
        //       );
        //     }
        //   }
        // }
        // },
        // {
        //   title: "前一未开出",
        //   key: "first_not_open",
        //   align: "center"
        // },
        {
          title: "重号",
          key: "review",
          width: "150px",
          align: "center"
        },
        {
          title: "和值",
          key: "sum",
          width: "100px",
          align: "center"
        },
        {
          title: "和值余数值",
          key: "sum_remainder",
          width: "100px",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  background: params.row.sum_remainder == "0" ? "#f40" : ""
                }
              },
              // params.row.value_end.bool_ ? params.row.sum_remainder : ""
              params.row.sum_remainder
            );
          }
        },
        // {
        //   title: "未开出号码",
        //   key: "not_open",
        //   align: "center"
        // },
        {
          title: "1",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 1) {
                        s.count[0]++;
                      }
                    });
                    let num = s.count[0];
                    s.count[0] = 0;
                    return `1(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 1) {
                      s.count[0]++;
                    }
                    return ele == 1;
                  })
                ? "1"
                : ""
            );
          }
        },
        {
          title: "2",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 2) {
                        s.count[1]++;
                      }
                    });
                    let num = s.count[1];
                    s.count[1] = 0;
                    return `2(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 2) {
                      s.count[1]++;
                    }
                    return ele == 2;
                  })
                ? "2"
                : ""
            );
          }
        },
        {
          title: "3",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 3) {
                        s.count[2]++;
                      }
                    });
                    let num = s.count[2];
                    s.count[2] = 0;
                    return `3(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 3) {
                      s.count[2]++;
                    }
                    return ele == 3;
                  })
                ? "3"
                : ""
            );
          }
        },
        {
          title: "4",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 4) {
                        s.count[3]++;
                      }
                    });
                    let num = s.count[3];
                    s.count[3] = 0;
                    return `4(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 4) {
                      s.count[3]++;
                    }
                    return ele == 4;
                  })
                ? "4"
                : ""
            );
          }
        },
        {
          title: "5",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 5) {
                        s.count[4]++;
                      }
                    });
                    let num = s.count[4];
                    s.count[4] = 0;
                    return `5(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 5) {
                      s.count[4]++;
                    }
                    return ele == 5;
                  })
                ? "5"
                : ""
            );
          }
        },
        {
          title: "6",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 6) {
                        s.count[5]++;
                      }
                    });
                    let num = s.count[5];
                    s.count[5] = 0;
                    return `6(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 6) {
                      s.count[5]++;
                    }
                    return ele == 6;
                  })
                ? "6"
                : ""
            );
          }
        },
        {
          title: "7",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 7) {
                        s.count[6]++;
                      }
                    });
                    let num = s.count[6];
                    s.count[6] = 0;
                    return `7(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 7) {
                      s.count[6]++;
                    }
                    return ele == 7;
                  })
                ? "7"
                : ""
            );
          }
        },
        {
          title: "8",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 8) {
                        s.count[7]++;
                      }
                    });
                    let num = s.count[7];
                    s.count[7] = 0;
                    return `8(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 8) {
                      s.count[7]++;
                    }
                    return ele == 8;
                  })
                ? "8"
                : ""
            );
          }
        },
        {
          title: "9",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 9) {
                        s.count[8]++;
                      }
                    });
                    let num = s.count[8];
                    s.count[8] = 0;
                    return `9(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 9) {
                      s.count[8]++;
                    }
                    return ele == 9;
                  })
                ? "9"
                : ""
            );
          }
        },
        {
          title: "10",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 10) {
                        s.count[9]++;
                      }
                    });
                    let num = s.count[9];
                    s.count[9] = 0;
                    return `10(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 10) {
                      s.count[9]++;
                    }
                    return ele == 10;
                  })
                ? "10"
                : ""
            );
          }
        },
        {
          title: "11",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 11) {
                        s.count[10]++;
                      }
                    });
                    let num = s.count[10];
                    s.count[10] = 0;
                    return `11(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 11) {
                      s.count[10]++;
                    }
                    return ele == 11;
                  })
                ? "11"
                : ""
            );
          }
        },
        {
          title: "12",
          render: (h, params) => {
            return h(
              "div",
              params.row.issue.substring(7) == 39
                ? (function() {
                    params.row.all.some(ele => {
                      if (ele == 12) {
                        s.count[11]++;
                      }
                    });
                    let num = s.count[11];
                    s.count[11] = 0;
                    return `12(${num})`;
                  })()
                : params.row.all.some(ele => {
                    if (ele == 12) {
                      s.count[11]++;
                    }
                    return ele == 12;
                  })
                ? "12"
                : ""
            );
          }
        }
      ],
      datas: [],
      options: "190822", //模糊查询条件

      down: 0,
      money: 5000,
      count: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  },
  created() {
    this.askAll();
  },

  methods: {
    askAll() {
      const s = this;
      if (!s.options) return;
      s.Ajax.post(`${window.hostDomain}ask/all`, {
        options: s.options
      }).then(({ data }) => {
        let arr = [];
        let res = data.data || [];
        res.forEach(val => {
          let sum =
              Number(val.one) +
              Number(val.two) +
              Number(val.three) +
              Number(val.four) +
              Number(val.five),
            sum_remainder = sum % 12;
          arr.push({
            issue: val.issue,
            one: val.one,
            two: val.two,
            three: val.three,
            four: val.four,
            five: val.five,
            all: [val.one, val.two, val.three, val.four, val.five],
            sum: sum,
            sum_remainder: sum_remainder
          });
        });
        // arr = s.handleFirst(arr); // 前一处理
        // arr = s.handleNotOpenFirst(arr); // 前一未开计算
        arr = s.handleRepetition(arr); // 落号计算（连续出现）
        // arr = s.handleNotOpen(arr);
        s.datas = arr;
      });
    },
    handleNotOpen(arr) {
      if (!arr) return arr;
      arr.forEach((val, i) => {
        let num = val.issue.substring(7);
        let nums = "+1++2++3++4++5++6++7++8++9++10++11++12+";
        for (let i = 0; i < val.all.length; i++) {
          const ele = val.all[i];
          if (nums.match(ele)) nums = nums.replace(`+${ele}+`, "");
        }

        val["not_open"] = nums.replace(/\+/g, ".");
      });
      return arr;
    },
    handleNotOpenFirst(arr) {
      if (!arr) return arr;
      let all_num = "-1--2--3--4--5--6--7--8--9--10--11--12-";
      arr.forEach((val, i) => {
        let num = val.issue.substring(7);
        if (num == "01") {
          let temp = all_num.replace(`-${val["one"]}-`, "");
          val["first_not_open"] = temp;
          all_num = temp;
        } else if (num == "39") {
          let temp = all_num.replace(`-${val["one"]}-`, "");
          val["first_not_open"] = temp;
          all_num = "-1--2--3--4--5--6--7--8--9--10--11--12-";
        } else {
          let temp = all_num.replace(`-${val["one"]}-`, "");
          val["first_not_open"] = temp;
          all_num = temp;
        }
      });
      return arr;
      /**
       * ! 累加投注 1 3 5 ...  共39期  从第一期开始也就只能投注倍数79 若不出亏损3200
       */
      // let double = 1,
      //   money = 0,
      //   res = 0;
      // for (let i = 1; i <= 39; ++i) {
      //   if (i == 1) {
      //     double = 1;
      //   } else {
      //     double *= 2;
      //   }
      //   money += 2 * double;
      //   res = double * 14 - money;
      //   console.log(
      //     "i: ",
      //     i,
      //     " == ",
      //     "double: ",
      //     double,
      //     " == ",
      //     "money: ",
      //     money,
      //     " == ",
      //     "res: ",
      //     res
      //   );
      // }
      // console.log(num, money) // 79 3200
      // console.log(Math.pow(2, 6))
    },

    handleRepetition(arr) {
      if (!arr) return arr;
      // let count = 0;
      // 从第二期开始，本期与上期相同的数字
      arr.forEach((val, i) => {
        let num = val.issue.substring(7);
        if (num == "01") {
          val["review"] = "";
        } else {
          let up_val_arr = arr[i - 1].all,
            val_arr = val.all,
            res = "";
          for (let i = 0; i < up_val_arr.length; i++) {
            const val_a = up_val_arr[i];
            for (let j = 0; j < val_arr.length; j++) {
              const val_b = val_arr[j];
              if (val_a === val_b) {
                res += ` ${val_b} `;
                // count++;
                break;
              }
            }
          }
          val["review"] = res;
          // if (num == "39") {
          //   val["review"] += `(${count})`;
          //   count = 0;
          // }
        }
      });
      return arr;
    },
    handleFirst(arr) {
      if (!arr) return arr;
      arr.forEach((val, i) => {
        let sum = Number(val.all[3]) + Number(val.all[4]),
          fir_ = Number(val.all[0]),
          next_ = arr[i + 1];
        if (sum > 12 && sum - fir_ === 12) {
          if (next_ && next_.all[0] == fir_) {
            this.down = 0;
            let m = Number(this.money) + 1200;
            this.money = m;
            val["value_end"] = {
              bool_: true,
              val: 0,
              money: m
            };
          } else {
            this.down = Number(this.down) + 1;
            let m = Number(this.money) - 200;
            this.money = m;
            val["value_end"] = {
              bool_: true,
              val: this.down,
              money: m
            };
          }
        } else {
          val["value_end"] = {
            bool_: false,
            val: 0
          };
        }
      });
      return arr;
    },
    rowClassName(row, index) {
      if (row.issue.substring(6) == "001") return "new-row";
      return "";
    }
  }
};
</script>


