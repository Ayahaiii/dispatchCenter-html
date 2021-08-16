<template>
  <el-container class="container-index">
    <el-aside class="side-menu">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">调度中心</span>
          </template>
          <el-menu-item-group>
            <router-link to="/index/nodeManage">
              <el-menu-item index="1-1">节点管理</el-menu-item>
            </router-link>
            <router-link to="/index/taskManage">
              <el-menu-item index="1-2">任务管理</el-menu-item>
            </router-link>
            <router-link to="/index/projectManage">
              <el-menu-item index="1-3">项目接口管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="home" @click="toggleMenu" :label="bool">
          <icon name="bars" class="bars"></icon>
          <span>首页</span>
        </div>
        <el-dropdown>
          <i class="el-icon-setting">
            &nbsp;&nbsp;
            <span>王小虎</span>
          </i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="signOut()">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      bool: false,
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },

    // 侧面菜单收起
    toggleMenu() {
      if (this.isCollapse == false) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
    // 退出
    signOut() {
      // this.httpPost("/login/v1/userLoginOut").then((res) => {
      //   localStorage.removeItem("token");
      //   this.$router.push("/");
      // });
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style>
.el-form-item__label {
  font-size: 15px;
  font-weight: 600;
  color: #666;
}

a {
  text-decoration: none;
}

.container-index {
  position: absolute;
  width: 100%;
  height: 100%;
}

.side-menu {
  width: auto !important;
  background: #393d49;
}

.side-menu .el-menu {
  background: #393d49;
  border: 0px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.side-menu .el-submenu__title {
  background: #393d49;
}

.side-menu .el-submenu__title:hover {
  background: #001528;
}

.side-menu .el-menu div,
.side-menu .el-menu .el-menu-item {
  color: #bfcbd9;
}

.side-menu .el-menu .el-menu-item:focus {
  background: #393d49;
}

.side-menu .el-menu .el-menu-item:hover {
  background: #001528;
}

.side-menu .el-menu .el-menu-item.is-active {
  color: #009688;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: right;
  font-size: 12px;
}

.el-header .home {
  float: left;
  font-size: 14px;
  cursor: pointer;
}

.el-header .home .bars {
  display: inline-block;
  vertical-align: middle;
  color: #606266;
  position: relative;
  top: -1px;
}

.el-header .home span {
  display: inline-block;
  vertical-align: middle;
  color: #606266;
  margin-left: 5px;
}

.open {
  width: 300px !important;
  transition: width 1s;
  transform-origin: left;
}

.close {
  width: 0px !important;
  transition: width 1s;
  transform-origin: right;
}

body .el-table th.gutter {
  display: table-cell !important;
}

body .el-table colgroup.gutter {
  display: table-cell !important;
}
</style>