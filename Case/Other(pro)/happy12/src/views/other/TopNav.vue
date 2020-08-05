<template>
  <div id="nav">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <MenuItem name="1">
        <Icon type="ios-paper" @click.native="$router.push('/double')" />Double
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people" />测试模块
      </MenuItem>
      <MenuItem name="3" @click.native="$router.push('/rules')">
        <Icon type="md-document" />基本规则
      </MenuItem>
      <MenuItem name="4" @click.native="graph">
        <Icon type="md-trending-up" />分析图表
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  data() {
    return {};
  },
  methods: {
    graph() {
      this.EH.$emit("openTool", true);
    }
  }
};
</script>

<style lang="less" scoped >
@import url("../../less.style/theme.less");

#nav {
  width: 100%;
  height: auto;
  background: #50596d;
  position: relative;
  left: 0;
  top: 0;
  z-index: 1000;

  > ul {
    display: flex;
    align-items: center;
    justify-content: center;

    > li {
      color: @mainColor;

      &::after {
        content: "";
        height: 0;
        line-height: 0;
        display: block;
        visibility: hidden;
        clear: both;
      }
    }
  }
}
.ivu-menu-submenu-title {
  height: 60px;
}

.ivu-drawer-header {
  height: 60px;
  color: #fff;
  background: #50596d;
}

.ivu-drawer {
  top: 60px;
}

.ivu-badge-status-dot {
  width: 18px;
  height: 18px;

  &:hover {
    cursor: pointer;
  }
}

.ivu-badge-count {
  background: aquamarine;
  color: #50596d;
}

.ivu-badge-status-default {
  background: #c7edcc;
}

.ivu-badge-status-success {
  background: rgb(255, 245, 234);
}

.ivu-badge-status-error {
  background: #eee;
}

.ivu-badge-status-warning {
  background: #ddd;
}
</style>