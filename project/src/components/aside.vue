<template>
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Create the tabs -->
    <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
      <li class="active">
        <a href="#control-sidebar-home-tab" data-toggle="tab">
          <i class="fa fa-home"></i>
        </a>
      </li>
      <!-- <li>
          <a href="#control-sidebar-settings-tab" data-toggle="tab">
            <i class="fa fa-gears"></i>
          </a>
      </li>-->
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
      <!-- Home tab content -->
      <div class="tab-pane active" id="control-sidebar-home-tab">
        <h3 class="control-sidebar-heading mt-0">使用场景</h3>
            <!-- <ul class="control-sidebar-menu">
                <li v-for="(item,index) in dataList" :key="index">
                    <a :href="item.url">
                        <img class="menu-icon" :src="require('../assets/img/'+item.iconUrl)" alt="火种">
                        <div class="menu-info" style="position: relative;top: 3px;">
                            <h4 class="control-sidebar-subheading">{{item.name}}</h4>
                            <p>{{item.remark}}</p>
                        </div>
                    </a>
                </li>
                
            </ul> -->
            <ul class="control-sidebar-menu">
                <li v-for="(item,index) in dataList" :key="index" class="float-left-li">
                  <el-tooltip placement="top" effect="light">
                    <div slot="content" style="width:200px">{{item.remark}}</div>
                    <a :href="item.url">
                        <!-- <img class="menu-icon" :src="require('../assets/img/'+item.iconUrl)" alt="火种" /> -->
                        <img class="menu-icon" :src="item.iconUrl" alt="火种" />
                        <h4>{{item.name}}</h4>
                        <!-- <div class="menu-info" style="position: relative;top: 3px;">
                            <h4 class="control-sidebar-subheading">{{item.name}}</h4>
                            <p>{{item.remark}}</p>
                        </div> -->
                    </a>
                  </el-tooltip>
                </li>
                
            </ul>
        <!-- /.control-sidebar-menu -->

        <!-- <h3 class="control-sidebar-heading">Tasks Progress</h3>
        <ul class="control-sidebar-menu">
          <li>
            <a href="javascript:;">
              <h4 class="control-sidebar-subheading">
                Custom Template Design
                <span class="pull-right-container">
                  <span class="label label-danger pull-right">70%</span>
                </span>
              </h4>

              <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
              </div>
            </a>
          </li>
        </ul> -->
      </div>
      <!-- /.tab-pane -->
      <!-- Stats tab content -->
      <!-- <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div> -->
      <!-- /.tab-pane -->
      <!-- Settings tab content -->
      <!-- <div class="tab-pane" id="control-sidebar-settings-tab">
        <form method="post">
          <h3 class="control-sidebar-heading">General Settings</h3>

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Report panel usage
              <input type="checkbox" class="pull-right" checked />
            </label>

            <p>Some information about this general settings option</p>
          </div>
        </form>
      </div> -->
      <!-- /.tab-pane -->
    </div>
  </aside>
</template>
<script>
// import $ from "../lib/jquery-vender.js";
// import "../lib/skin.js";
import skin from "../utils/skin.js";
import utils from '../utils/tools.js'
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      dataList:[],
      // defaultImg:require('../assets/img/logo_mini.png')
    };
  },
  mounted() {
    this.$nextTick(() => {
      skin.changeSkin();
    });
    this.getData();
  },
  methods:{
    getData(){
       this.utils.http(
        {
          url: "/scenario/list",
          method: "GET",
          params: {}
        },
        res => {
          if(res.code==200){
            this.dataList=res.data.scenarios;
            this.$store.commit("changeIndexUrl", res.data.index);
          }  
        }
      );
    },
    go(id){
       this.utils.http(
        {
          url: "/scenario/redirect?scenario="+id,
          method: "GET",
          params: {}
        },
        res => {
          // console.log(res)
         
        }
      );
    },
  }
};
</script>
<style scoped lang="scss">
.control-sidebar-menu{
  .float-left-li{
    width:33.3%;
    float: left;
    a{
      padding: 5px;
      text-align: center;
      img.menu-icon{
        float: initial;
      }
      h4{
        font-size: 14px;
      }
    }
  }
}
  
</style>