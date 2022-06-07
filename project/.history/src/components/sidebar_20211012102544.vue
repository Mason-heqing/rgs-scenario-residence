<template>
  <aside class="main-sidebar">
    
    <section class="sidebar">
      
      <div class="user-panel" style="height:65px">
        <div class="pull-left image">
          <img :src="userImg" class="img-circle" alt="User Image" />
        </div>
        <div class="pull-left info">
          <p
            style="width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
          >{{userName}}</p>
          <a @click="loginOut" style="cursor: pointer">
            <i class="fa fa-circle text-success"></i> 退出
          </a>
        </div>
      </div>

      <ul class="sidebar-menu" data-widget="tree">
        <li
          v-for="(item,index) in menusList"
          :key="index"
          :class="[{'treeview':item.subs,'active':item.selected,'menu-open':item.selected}]"
          @click="changeSelectColor(index)"
          style="cursor: pointer;"
        >
          <router-link :to="item.linkUrl" v-if="!item.subs">
            <i :class="item.iconCls"></i>
            <span>{{item.name}}</span>
            <span class="pull-right-container" v-if="item.subs">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </router-link>
          <a :to="item.linkUrl" v-else>
            <i :class="item.iconCls"></i>
            <span>{{item.name}}</span>
            <span class="pull-right-container" v-if="item.subs">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul :class="['treeview-menu']" v-if="item.subs">
              <li
                v-for="(item1,index1) in item.subs"
                :key="index1"
                style="margin-left: 8px;"
                :class="[{'treeview':item.subs,'active':item.selected,'menu-open':item.selected}]"
              >
                <router-link :to="item1.linkUrl" v-if="0 == item1.subs.length">
                  <i :class="item1.iconCls"></i>
                  <span>{{item1.name}}</span>
                </router-link>
                <a :to="item1.linkUrl" v-else>
                  <i :class="item1.iconCls"></i>
                  <span>{{item1.name}}</span>
                  <span class="pull-right-container" v-if="item1.subs">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
            <ul :class="['treeview-menu']"  v-if="0 < item1.subs.length">
              <li
                v-for="(item2,index2) in item1.subs"
                :key="index2"
                style="margin-left:8px;"
                :class="[{'treeview':item1.subs,'active':item1.selected,'menu-open':item1.selected}]"
              >
                <router-link :to="item2.linkUrl" v-if="item1.subs">
                  <i :class="item2.iconCls"></i>
                  <span>{{item2.name}}</span>
                </router-link>
              </li>
            </ul>
                <!-- 停车场 -->
            
              </li>
          </ul>
        </li>
      </ul>
    </section>
  </aside>
</template>
<script>
import Cookies from 'js-cookie';
import ligature from '../utils/ligature.js';
export default {
  name: "HelloWorld",
  data() {
    return {
      menusList: [], //左边菜单
      current: "/",
      userImg:'',//头像
    };
  },
  created() {
    this.selectMenu();
       //监听头像
    ligature.$on('headImg',()=>{
      this.getHeadImg();
    });
  },
  mounted() {
    this.getLeftMenu();
    this.userImg = this.tools.global.API_URL + '/user/photo'
  },
  computed: {
    userName() {
      return this.$store.state.userInfo.userName;
    },
    createTime() {
      return this.$store.state.userInfo.createTime;
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to)
      this.selectMenu(to, from);
    }
  },
  methods: {
    //修改头像之后更新头像
    getHeadImg() {
        var num = Math.ceil(Math.random() * 10);//生成一个随机数（防止缓存）
        this.userImg = this.userImg + '?' + num
      },
    //退出
    loginOut() {
      this.$confirm("您确信退出?", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.doLoginOut();
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消退出"
          // });
        });
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    //获取左边菜单
    getLeftMenu() {
      let scenario = this.getQueryString("scenario");
      // alert(scenario);
      // let scenario = "8767b3dd499645cfb52bb7772084cf44";
      this.utils.http(
        {
          url: "/home/menus?scenario=" + scenario,
          method: "GET",
          // login:true,
          params: {}
        },
        res => {
          console.log(res,'9999');
          this.menusList = res.data;
          this.howSelect();
        }
      );
    },
    howSelect() {
      // console.log(this.current);
      this.menusList.forEach((item, index) => {
        if (item.subs) {
          item.subs.forEach((item1, index1) => {
            if (this.current == item1.linkUrl) {
              item.selected = true;
            
            }
            if(item1.subs) {
              item1.subs.forEach((item2,index2) => {
                if (this.current == item2.linkUrl) {
                  item1.selected = true
            }
          })
            }
          });
        }
      });
      // console.log(this.menusList);
    },
    changeSelectColor(index) {
      console.log(window.localStorage.getItem('appid'),'!!!!')
      if(index == 10) {
        this.utils.http({
          url: "/park/isApp",
          method: "GET",
          params: {
            appId:window.localStorage.getItem('appid')
          }
        },
        res => {
          console.log(res,'@@@@')
        }
      );
        console.log(index,'###')
      }else {
        $(".treeview>a").css("color", "#b8c7ce");
      }
    
      
    },

    //点击首页
    clickHome() {
      $(".treeview").removeClass("menu-open active");
      $(".treeview-menu").slideUp();
    },

    selectMenu() {
      let path = this.$route.path;
      if(path=='/'){
        this.clickHome();
      }
      // alert(this.$route.name)
      this.current=path;
      switch (path) {
        case "/staffmanageadd": //首页
          this.current = "/staffmanage";
          break;
        case "/projectmanageadd":
          this.current = "/projectmanage";
          break;
        case "/visitrecord":
          this.current = "/visitrecord";
          break;
        case "/ownermanageadd":
         this.current = "/ownermanage";
          break;
        case "/noticeadd":
         this.current = "/notice";
          break;
        case "/addbill":
         this.current = "/propertybill";
          break;
        case "/repairs":
         this.current = "/housingrepair";
          break;repairs
        case "/complaintdeal":
         this.current = "/complaint";
          break;repairs

      }
    },
    doLoginOut() {
      // this.clearAllCookie();
      this.utils.http(
        {
          url: "/logout",
          method: "GET",
          params: {}
        },
        res => {

        }
      );
    },
    clearAllCookie() {
     var keys = document.cookie.match(/[^ =;]+(?==)/g);
     console.log(keys)
      if (keys) {
        for (var i = keys.length; i--;) {
          document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.ratingdog.cn
          document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
          document.cookie = keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
        }
      }
     }
    
  }
};
</script>
<style lang="scss" scoped>
.active {
  color: #fff !important;
}
.menu-open > a {
  color: #fff !important;
}
</style>