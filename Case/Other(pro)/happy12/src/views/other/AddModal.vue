<template>
  <div>
    <div class="tool">
      <Button type="primary" @click="add">处理检查</Button>
      <Button type="primary" @click="commit">提交</Button>
      <Input class="year" v-model="year" />
    </div>
    <div class="work-area">
      <div class="inp">
        <Input v-model="value" :autosize="size" type="textarea" :rows="10" placeholder="开奖历史..." />
      </div>
      <Card class="info">
        <ul>
          <li v-for="(item,i) in datas" :key="i">
            <span>{{item.issue}}:&nbsp;</span>
            <span style="color: #f40;" v-for="(val,j) in item.value" :key="j">{{val}}&nbsp;</span>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddModal",
  data() {
    return {
      value: "", //复制的值
      year: "2019", // 年，也是分割的条件
      datas: [], //处理的数据结果
      size: {
        minRows: 1
      }
    };
  },
  methods: {
    add() {
      const s = this;
      if (!s.value) return;
      let val_table = s.value.replace(/\s+/g, "/"); //替换所有的空格
      let arr = val_table.split("2019-");
      let res = [];
      for (let i = 0, len = arr.length; i < len; i++) {
        let ele = arr[i];
        if (!ele) continue;
        let item = ele.split("/");
        res.unshift({
          issue: item[2],
          value: [
            Number(item[3]),
            Number(item[4]),
            Number(item[5]),
            Number(item[6]),
            Number(item[7])
          ]
        });
      }
      let len = res.length;
      for (let i = 0; i < res.length; i++) {
        const val = res[i];
        if (val.issue) {
          if (val.issue.length !== 9 || val.value.length !== 5) {
            // let info = i - 1 ? res[i - 1].issue : val.issue;
            s.$Message.error(`数据错误`);
            s.datas = [];
            break;
          }
        }
      }
      s.datas = res;
    },
    commit() {
      const s = this;
      let obj = {};

      if (s.datas.length) {
        s.datas.forEach(val => {
          obj[val.issue] = val.value;
        });
        s.Ajax.post(`${window.hostDomain}add/index`, obj).then(({ data }) => {
          if (data.code == 0) {
            s.datas = [];
            s.value = "";
            s.$Message.success(data.message);
          } else {
            s.$Message.error(data.message);
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tool {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px 0;
}
.year {
  width: 300px;
}
ul,
li {
  list-style: none;
}
.work-area {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .inp,
  .info {
    width: 48%;
  }
}
</style>