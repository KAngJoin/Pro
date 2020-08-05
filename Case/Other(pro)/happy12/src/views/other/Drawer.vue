<template>
  <div>
    <Drawer
      title
      placement="left"
      :mask="true"
      :transfer="true"
      :closable="true"
      width="160"
      v-model="drawerValue"
    >
      <Menu theme="dark" active-name="1-1" :open-names="['1']" width="160" accordion>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper" />分析图表
          </template>
          <MenuItem name="1-1" @click.native="handleRoute('/analyze/sum')">
            <Icon type="md-chatbubbles" />和值
          </MenuItem>
          <MenuItem name="1-2" @click.native="handleRoute('/analyze/span')">
            <Icon type="md-heart" />跨度值
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="md-leaf" />分析图表
          </MenuItem>
        </Submenu>
      </Menu>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "Draw",
  data() {
    return {
      drawerValue: false
    };
  },
  mounted() {
    const s = this;
    document.body.addEventListener("keydown", this.showTool, false);
    s.EH.$on("openTool", function(boo) {
      if (boo) s.drawerValue = true;
    });
  },
  destroyed() {
    document.body.removeEventListener("keydown", this.showTool, false);
  },
  methods: {
    // 路由跳转工具
    handleRoute(routers) {
      this.$router.push(routers);
    },
    // 工具栏显示方法
    showTool(e) {
      if (e.keyCode === 84) {
        this.drawerValue = true;
        this.$router.push("/rules");
      }
      if (e.keyCode === 27) this.drawerValue = false;
    }
  }
};
</script>

<style lang="less" >
@import url("../../less.style/theme.less");

.ivu-drawer-body {
  height: calc(100% - 60px) !important;
  padding: 0 !important;
  background: #50596d;

  .ivu-menu-submenu-title {
    line-height: 30px;
    font-size: 20px;
    color: @mainColor !important;

    i.ivu-icon {
      &:first-of-type {
        display: none;
      }
    }
  }

  ul {
    li {
      color: @mainColor !important;
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