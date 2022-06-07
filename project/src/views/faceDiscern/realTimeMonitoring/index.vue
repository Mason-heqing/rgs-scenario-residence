<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        人脸布控 - 实时布控
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li>
        <li><i class="glyphicon glyphicon-cog"></i> 人脸布控</li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 实时布控
        </li>
      </ol>
    </section>
    <!-- 地图组件区域 -->
    <el-card >
      <baidu-map
        class="bm-view"
        @ready="map_handler"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
      >
      <div  v-for="item in positionList2" :key="item.id">
        <bm-marker
          class="bm_marker"
          :position="{lng: item.longitude, lat: item.latitude}"
          :dragging="true"
          @click="infoWindowOpen(item.alarm,item.id)"
          :icon=" item.alarm == 0 ? icon :item.alarm == 1 ? icon2 :'' "
        >
        </bm-marker>
      </div>
        
      </baidu-map>
      <!-- 遮罩层 -->
        <div class="">
          <el-drawer
            :visible.sync="drawer"
            :with-header="false">
              <div class="wrapper_msg" v-for="item in userInfo" :key="item.id">
                <div class="msg_box" style="margin-top:5px">
                  <div>
                    <el-image 
                      :src="item.imgUrl" 
                      :preview-src-list="[item.imgUrl]">
                    </el-image>
                    <el-image 
                      :src="item.imgUrl" 
                      :preview-src-list="[item.imgUrl]">
                    </el-image>
                  </div>
                  <span class="msg_box-bg">{{item.similarity}}%</span>
                </div>
                <div class="msg_content" style="margin-top:5px">
                  <div class="title-name">{{item.name}}</div>
                  <div>
                      <span>报警等级：{{item.rank}}</span>
                      <span>布控原因：{{item.content}}</span>
                      <span style="margin-top:22px">抓拍设备：{{item.camera}}</span>
                      <span>{{item.time}}</span>
                    </div>
                </div>
              </div>
          </el-drawer>
        </div>
    </el-card>
  </div>
</template>
<script src="./realTimeMonitoring.js">
</script>
<style scoped>
@import './realTimeMonitoring'
</style>