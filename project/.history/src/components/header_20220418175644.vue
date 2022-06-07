<template>
  <header class="main-header">
    <!-- Logo -->
    <a class="logo" :href="indexUrl">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini">
        <img
          v-if="logMinUrl"
          :src="logMinUrl"
          alt=""
          width="32"
          height="32"
          style="max-width: 32px; max-height: 32px"
        />
        <!-- <h2 v-else-if="logoName">{{logoName}}</h2> -->
        <img
          v-if="!logMinUrl && !logUrl && !logoName"
          src="../assets/img/logo_mini.png"
          alt=""
          width="32"
          height="32"
        />
      </span>

      <span class="logo-lg">
        <img
          v-if="logUrl"
          width="210"
          height="50"
          :src="logUrl"
          alt=""
          style="
            max-width: 210px;
            max-height: 50px;
            margin-top: 2px;
            margin-left: -9px;
          "
        />
        <h2 v-else-if="logoName" style="line-height: 50px; margin: 0px">
          {{ logoName }}
        </h2>
        <!-- <img v-else src="../assets/img/logo.png" alt="" width="210" height="50" > -->
      </span>
    </a>
    
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <span class="project-title">{{logoName}}</span>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <el-select
              v-model="value"
              placeholder
              filterable
              @change="projectChange"
              @visible-change="
                (v) => visibleChange(v, 'select', selectClick, selectClick1)
              "
              ref="select"
            >
              <el-option
                v-for="item in listData"
                :key="item.appId"
                :label="item.name"
                :value="item.appId"
              ></el-option>
            </el-select>
          </li>

          <!-- Notifications Menu -->
          <li class="dropdown notifications-menu">
            <!-- Menu toggle button -->
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              title="通知消息"
            >
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning" v-if="msgDataList">{{
                msgDataList.length
              }}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header" v-if="msgDataList">
                您有{{ msgDataList.length }}条通知
              </li>
              <li>
                <!-- Inner Menu: contains the notifications -->
                <ul class="menu">
                  <li v-for="(item, index) in msgDataList" :key="index">
                    <a :href="item.url" v-if="item.url">
                      <i :class="item.iconStyle"></i>
                      {{ item.createTime }} {{ item.title }}
                    </a>
                    <a
                      v-else
                      @click="getMsgContent(item.id)"
                      style="cursor: pointer"
                    >
                      <i :class="item.iconStyle"></i>
                      {{ item.createTime }} {{ item.title }}
                    </a>
                  </li>
                  <!-- end notification -->
                </ul>
              </li>
              <li class="footer">
                <router-link to="/usermsg">浏览所有</router-link>
              </li>
            </ul>
          </li>

          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <!-- Menu Toggle Button -->
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              title="用户信息"
            >
              <!-- The user image in the navbar-->
              <!-- <img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image" /> -->
              <!-- hidden-xs hides the username on small devices so only the image appears. -->
              <!-- <span class="hidden-xs">Alexander Pierce</span> -->
              <i class="fa fa-user-o"></i>
              <span class="label label-danger"></span>
            </a>
            <ul class="dropdown-menu">
              <!-- The user image in the menu -->
              <li class="user-header">
                <img :src="userImg" class="img-circle" alt="User Image" />

                <p>
                  {{ userName }}
                  <small>{{ createTime }}</small>
                </p>
              </li>
              <li class="user-footer">
                <div class="pull-left" @click="goEdit">
                  <a class="btn btn-default btn-flat">个人资料</a>
                </div>
                <div class="pull-right" @click="loginOut">
                  <a class="btn btn-default btn-flat">退出</a>
                </div>
              </li>
            </ul>
          </li>

          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar" title="切换场景">
              <i class="fa fa-gears"></i>
            </a>
          </li>

          <!-- 回到首页 -->
          <li>
            <router-link to="/" data-toggle title="回到首页">
              <i class="fa fa-home"></i>
            </router-link>
          </li>

          <!-- 退出 -->
          <li>
            <a
              @click="loginOut"
              data-toggle
              title="退出系统"
              style="cursor: pointer"
            >
              <i class="fa fa-power-off"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <el-dialog
      title="消息详情"
      v-if="msgPopVisible"
      :visible.sync="msgPopVisible"
      :modal-append-to-body="false"
      width="60%"
      class="el-dialog-reset set-pop msg-content"
    >
      <div style="padding: 0 10px">
        <el-table
          class="mt-10"
          :data="msgContent"
          style="width: 100%"
          :border="true"
          :cell-style="{
            background: '#fff',
            fontSize: '14px',
            color: '#12111D',
            padding: '6px 0',
            verticalAlign: 'initial',
          }"
          :stripe="true"
          max-height="400"
        >
          <el-table-column prop="level" label="级别" width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.level == 'E'" style="color: red">{{
                scope.row.level
              }}</span>
              <span v-else>{{ scope.row.level }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="timestamp" label="时间" width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.level == 'E'" style="color: red">{{
                scope.row.timestamp | formatTime
              }}</span>
              <span v-else>{{ scope.row.timestamp | formatTime }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" width="auto">
            <template slot-scope="scope">
              <span v-if="scope.row.level == 'E'" style="color: red">{{
                scope.row.content
              }}</span>
              <span v-else>{{ scope.row.content }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="msgPopVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </header>
</template>
<script>
import utils from "../utils/tools.js";
import ligature from "../utils/ligature.js";
import Cookies from "js-cookie";
export default {
  name: "header",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      deviceTypeAdd: "",
      value: "",
      listData: [],
      userImg: "", //头像
      userName: "", //用户名
      createTime: "", //创建时间
      msgDataList: [], //未读消息列表
      msgPopVisible: false,
      msgContent: [],
      imgurl: "",
      logMinUrl: "",
      logUrl: "",
      logoName: "",
    };
  },
  filters: {
    formatTime: function (time) {
      let date = new Date(time);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      let strDate = Y + M + D + h + m + s;
      return strDate;
    },
  },
  computed: {
    indexUrl() {
      return this.$store.state.indexUrl.indexUrl;
    },
  },
  watch: {
    $route(to, from) {
      if (to.path == "/" || from.path == "/") {
        this.getListData();
      } else {
        if (this.listData.length == 0) {
          this.$router.push({
            path: "/projectmanageadd",
            query: {
              type: "1",
            },
          });
        }
      }
      // alert(to.path+'-----------'+from.path)
    },
  },
  created() {
    // let token = this.getParam("token");
    let token = 'c3b1432a2ead43bbb5f01df5bc2344a9';
    if (token) {
      Cookies.set("TOKEN", token);
      this.$router.push("/");
    }
    this.imgurl = this.tools.global.API_URL;
    // 监听增加项目
    ligature.$on("addProject", (isFrist) => {
      this.getListData(isFrist);
    });
    // 监听消息详情
    ligature.$on("addSocketMsg", () => {
      this.getMsgData();
    });
    //监听导出页  导出失败消息信息详情
    ligature.$on("msgContentPop", (id) => {
      this.getMsgContent(id);
    });
    //监听头像
    ligature.$on("headImg", () => {
      this.getHeadImg();
      this.getuserInfo();
    });
    // 监听未读消息条数
    ligature.$on("noReadMsg", () => {
      this.getMsgData();
    });
  },
  mounted() {
    // this.getListData();
    this.getuserInfo();
    this.getMsgData();
    this.getLogo();
    // this.getuserImg();
    this.userImg = this.tools.global.API_URL + "/user/photo";
  },
  methods: {
    visibleChange(visible, refName, onClick, onClick1) {
      window.localStorage.setItem('appid',this.value)
      console.log(this.value,'visibleChange')
      if (visible) {
        const ref = this.$refs[refName];
        let popper = ref.$refs.popper;
        if (popper.$el) popper = popper.$el;
        if (
          !Array.from(popper.children).some(
            (v) => v.className === "add-btn-you"
          )
        ) {
          const el = document.createElement("el-row");
          el.className = "add-btn-you";
          el.style =
            "height: 36px;width: 50%;display: inline-block;line-height: 36px; border: 1px solid #ddd;text-align: center;cursor: pointer;border-right:0";
          el.innerHTML = `<span class="btn1">创建项目</span>`;
          popper.appendChild(el);
          el.onclick = () => {
            // 底部按钮的点击事件 点击后想触发的逻辑也可以直接写在这
            console.log($(this));
            onClick && onClick();

            // 以下代码实现点击后弹层隐藏 不需要可以删掉
            if (ref.toggleDropDownVisible) {
              ref.toggleDropDownVisible(false);
            } else {
              ref.visible = false;
            }
          };

          const el1 = document.createElement("el-row");
          el1.className = "add-btn-you";
          el1.style =
            "height: 36px;width: 50%;display: inline-block;line-height: 36px; border: 1px solid #ddd;text-align: center;cursor: pointer;";
          el1.innerHTML = `<span class="btn1">管理项目</span>`;
          popper.appendChild(el1);
          el1.onclick = () => {
            // 底部按钮的点击事件 点击后想触发的逻辑也可以直接写在这
            console.log($(this));
            onClick1 && onClick1();

            // 以下代码实现点击后弹层隐藏 不需要可以删掉
            if (ref.toggleDropDownVisible) {
              ref.toggleDropDownVisible(false);
            } else {
              ref.visible = false;
            }
          };
        }
      }
    },
    //管理项目
    selectClick1() {
      this.$router.push("/projectmanage");
    },
    //创建项目
    selectClick() {
      this.$router.push({
        path: "/projectmanageadd",
        query: {
          type: "1",
        },
      });
    },
    //获取url  Token
    getParam(paramName) {
      let paramValue = "";
      let isFound = !1;
      if (
        window.location.search.indexOf("?") == 0 &&
        window.location.search.indexOf("=") > 1
      ) {
        let arrSource = unescape(window.location.search)
            .substring(1, window.location.search.length)
            .split("&"),
          i = 0;
        while (i < arrSource.length && !isFound)
          arrSource[i].indexOf("=") > 0 &&
            arrSource[i].split("=")[0].toLowerCase() ==
              paramName.toLowerCase() &&
            ((paramValue = arrSource[i].split("=")[1]), (isFound = !0)),
            i++;
      }
      return paramValue == "" && (paramValue = null), paramValue;
    },
    //修改头像之后更新头像
    getHeadImg() {
      var num = Math.ceil(Math.random() * 10); //生成一个随机数（防止缓存）
      this.userImg = this.userImg + "?" + num;
    },
    //项目切换
    getListData(isFrist) {
      // console.log(isFrist,'^^^^')
      this.utils.http(
        {
          url: "/app/user/list",
          method: "GET",
          params: this.listDataForm,
        },
        (res) => {
          //选中第一个
          if (res.code == 200) {
            // window.localStorage.setItem('appid',res.data[0].appId)
            if (isFrist && res.data.length == 1) {
              this.$router.push({
                path: "/projectmanage",
              });
            }
            let path = this.$route.path;
            if (!this.$store.state.project.projectId) {
              //没缓存的时候
              if (res.data.length != 0) {
                this.value = res.data[0].appId;
                this.$store.commit("changeProjectId", res.data[0].appId);
                this.$store.commit("changeProjectName", res.data[0].name);
                if (path == "/") {
                  let allAppId = {
                    appId: "",
                    name: "所有项目",
                  };
                  let allAppList = [];
                  res.data.forEach((item, index) => {
                    allAppList.push(item.appId);
                  });
                  allAppId.appId = allAppList.join();
                  res.data.unshift(allAppId);
                }
              } else {
                this.$router.push({
                  path: "/projectmanageadd",
                  query: {
                    type: "1",
                  },
                });
              }
            } else {
              //有缓存

              let proId = this.$store.state.project.projectId;
              if (res.data.length != 0) {
                let allAppIdList = [];
                res.data.forEach((item, index) => {
                  allAppIdList.push(item.appId);
                });
                if (allAppIdList.indexOf(proId) == -1) {
                  //存起来的值在新账号在没找到项目重新选中第一个
                  this.value = res.data[0].appId;
                  this.$store.commit("changeProjectId", res.data[0].appId);
                  this.$store.commit("changeProjectName", res.data[0].name);
                } else {
                  this.value = this.$store.state.project.projectId;
                }

                if (path == "/") {
                  let allAppId = {
                    appId: "",
                    name: "所有项目",
                  };
                  let allAppList = [];
                  res.data.forEach((item, index) => {
                    allAppList.push(item.appId);
                  });
                  allAppId.appId = allAppList.join();
                  res.data.unshift(allAppId);
                } else {
                  if (this.$store.state.project.projectName == "所有项目") {
                    this.value = res.data[0].appId;
                    this.$store.commit("changeProjectId", res.data[0].appId);
                    this.$store.commit("changeProjectName", res.data[0].name);
                  }
                }
              } else {
                //没有项目跳转添加项目页
                this.$store.commit("changeProjectId", "");
                this.$router.push({
                  path: "/projectmanageadd",
                  query: {
                    type: "1",
                  },
                });
              }
            }
          }

          //添加所有项目

          this.listData = res.data;
          console.log(this.listData,'******')
        }
      );
    },
    // 获取logo
    getLogo() {
      this.utils.http(
        {
          url: "/home/organizationInfoInfo",
          method: "GET",
          params: {},
        },
        (res) => {
          if (res.code == 200) {
            if ("" != res.data.logMinUrl) {
              if (-1 == res.data.logMinUrl.indexOf("http")) {
                this.logMinUrl =
                  this.imgurl + "/file/download?path=" + res.data.logMinUrl;
              } else {
                this.logMinUrl = res.data.logMinUrl;
              }
            } else {
              this.logMinUrl = res.data.logMinUrl;
            }
            if ("" != res.data.logUrl) {
              if(-1 == res.data.logUrl.indexOf('http')){
                  this.logUrl = this.imgurl+'/file/download?path='+ res.data.logUrl;
              }else{
                  this.logUrl = res.data.logUrl;
              }
            } else {
              this.logUrl = res.data.logUrl;
            }
            // if(-1 == res.data.logMinUrl.indexOf('http')){
            //     this.logMinUrl = this.imgurl+'/file/download?path='+ res.data.logMinUrl;

            // }else{
            //     this.logMinUrl = res.data.logMinUrl;
            // }
            // if(-1 == res.data.logUrl.indexOf('http')){
            //     alert(1)
            //     this.logUrl = this.imgurl+'/file/download?path='+ res.data.logUrl;
            // }else{
            //   alert(2)
            //     this.logUrl = res.data.logUrl;
            // }
            // this.logMinUrl = res.data.logMinUrl;
            // this.logUrl = res.data.logUrl;
            this.logoName = res.data.logoName;
          }
        }
      );
    },

    //项目改变
    projectChange(e) {
      this.$store.commit("changeProjectId", e);
      let obj = {};
      obj = this.listData.find((item) => {
        return item.appId == e;
      });
      // if(obj.name == '所有项目') {
      //   this.$router.push('/allProjectMsg')
      // }else {
      //   this.$router.push('/')
      // }
      this.$store.commit("changeProjectName", obj.name);
      // }
      // console.log(this.value,'###')
    
    },
    //获取用户信息
    getuserInfo() {
      this.utils.http(
        {
          url: "/user/userInfo",
          method: "GET",
          params: {},
        },
        (res) => {
          if (res.code == 200) {
            this.userName = res.data.userName;
            this.createTime = res.data.createTime;
            this.$store.commit("changeUserInfo", res.data);
          }
        }
      );
    },
    //登出
    loginOut() {
      this.$confirm("您确信退出?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.doLoginOut();
        })
        .catch(() => {});
    },
    doLoginOut() {
      this.utils.http(
        {
          url: "/logout",
          method: "GET",
          params: {},
        },
        (res) => {
          // this.clearAllCookie()
        }
      );
    },
    //修改资料
    goEdit() {
      this.$router.push({
        path: "/edituserinfo",
      });
    },

    //获取未读消息
    getMsgData() {
      this.utils.http(
        {
          url: "/public/msg/getUnReadMsg",
          method: "POST",
          data: this.dataForm,
        },
        (res) => {
          if (res.data) {
            this.msgDataList = res.data;
          }
        }
      );
    },
    getMsgContent(id) {
      this.utils.http(
        {
          url: "/public/msg/read/" + id,
          method: "POST",
          data: {},
        },
        (res) => {
          if (res.code == 200) {
            this.getMsgData();
            if (res.data.message) {
              this.msgContent = JSON.parse(res.data.message);
            }

            this.msgPopVisible = true;
            //更新消息页面列表
            ligature.$emit("msgPageList");
          }
        }
      );
    },
  },
};
</script>
<style scoped lang="scss">
@import "../styles/head.scss";
#appSelect {
  display: none;
}
/deep/.el-select {
  margin-top: 5px;
  .el-input {
    .el-input__inner {
      background: transparent;
      text-align: right;
      border: none;
      color: #fff;
    }
  }
}
.project-title {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  color: #fff;
}
.navbar-nav > .notifications-menu > .dropdown-menu > li .menu > li > a {
  white-space: normal;
}
.set-pop /deep/ {
  .el-dialog {
    z-index: 20010;
  }
  .el-dialog__body {
    padding-top: 10px;
  }
  // .el-table{
  //   border: 1px solid #ddd;
  // }
  // .el-table th{
  //   border-right: 1px solid #ddd;
  //   // border-left: 1px solid #ccc;
  //   border-bottom: 1px solid #ddd;
  // }
  // td{
  //   vertical-align: top;
  //   border-right: 1px solid #ddd;
  //   // border-left: 1px solid #ccc;
  //   border-bottom: 1px solid #ddd;
  // }
}
</style>