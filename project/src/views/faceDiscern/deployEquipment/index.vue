<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        人脸布控 - 布控设备
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li>
        <li><i class="glyphicon glyphicon-cog"></i> 人脸布控</li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 布控设备
        </li>
      </ol>
    </section>
    <!-- 顶部搜索区 -->
    
    <el-card>
      <div class="my_card">
        <el-row :gutter="20">
          <el-col :span="14">
            <div class="my_card-box">
              <el-input
                placeholder="搜索设备名称/SN号"
                v-model="conditionList.name"
              ></el-input>
              <!-- <el-select  placeholder="方向" style="margin-left:10px">
								<el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
							</el-select> -->
              <el-select
                placeholder="网络状态"
                style="margin-left: 10px"
                v-model="conditionList.online"
              >
                <el-option
                  v-for="(item, index) in options8"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="btn-group">
              <button id="btn_device_search" type="button" class="btn btn-primary" @click="searchFacilityMsg">
                  <span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
                </button> 
                <button id="btn_device_reset" type="button" class="btn btn-default" @click="replacement">
                  <span class="fa fa-reply" aria-hidden="true"></span>重置
                </button>
            </div>
              
          </el-col>
        </el-row>
      
      </div>

      <!-- BTN操作区域 -->
      <div class="btn_box">
        <button id="btn_add" type="button" class="btn btn-default" @click="addList">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>添加设备
      </button> 
      </div>
      
      <!-- <div class="btn_box">
        
        <el-button icon="el-icon-plus" @click="addList" size="medium"
          >添加设备</el-button
        >
      </div> -->

      <!-- table表格区域 -->
      <div class="box-table">
        <el-table
          :data="tableData"
          stripe
          border
          tooltip-effect="dark"
          sortable
          style="width: 100%"
          :header-cell-style="{ backg : '#FAF9F8' }"
          ref="multipleTable"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="serial" label="S/N"> </el-table-column>
          <el-table-column
            prop="latitude"
            label="坐标"
            show-overflow-tooltip
            :formatter="formatterArr"
          >
          </el-table-column>
          <el-table-column prop="model" label="型号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="online"
            label="状态"
            show-overflow-tooltip
            width="100"
          >
            <template slot-scope="scope">
              <img src="../../../assets/img/online.png" title="设备在线" v-if="scope.row.online == 1" alt="">
              <img title="设备离线" v-else src="../../../assets/img/offline.png" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="beard" label="编辑" fixed="right" width="300">
            <template slot-scope="scope">
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  @click="redactFacility(scope.row)"
                  >编辑</el-button
                >
                <el-button type="success" size="mini" disabled>监控</el-button>
                <el-button type="info" size="mini" disabled>配置</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteFacility(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部分页区域 -->

        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="total"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 20, 25]"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
        <!-- 添加布控设备弹出框 -->
        <el-dialog
          :title="equipmentParameterTitle"
          :visible.sync="userInfoList"
          width="35%"
          
        >
          <div class="dlog_box">
            <div class="dialog_box " >
              <span class="_siyou">设备名称：</span>
              <el-input
                placeholder="请输入设备名称"
                v-model="equipmentParameter.name"
              ></el-input>
            </div>
            <div class="dialog_box _top">
              <span class="_siyou">设备S N：</span>
              <el-input
                placeholder="请输入设备SN"
                style="margin-left: 5px"
                v-model="equipmentParameter.serial"
              ></el-input>
            </div>
            <div class="dialog_box _top" style="margin-bottom: 20px">
            <span class="_siyou">设备坐标：</span>
            <el-input
              placeholder="点击拾取坐标"
              style="width: 30%"
              v-model="equipmentParameter.lt"
            ></el-input>
            <el-input
              placeholder="点击拾取坐标"
              style="width: 30%; margin-left: 5px"
              v-model="equipmentParameter.lg"
            ></el-input>
            <el-button
              type="primary"
              size="medium"
              style="transform: translateX(5px)"
              @click="openBaiduMap"
              >拾取坐标</el-button
            >
          </div>
          </div>
        
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeUserInfoList">取 消</el-button>
            <el-button type="primary" @click="submitDialogMsg" v-if="tag != 1"
              >确 定</el-button
            >
            <el-button
              v-if="tag == 1"
              type="primary"
              @click="amendSubmitDialogMsg"
              >确 定</el-button
            >
          </span>
        </el-dialog>

        <!-- 百度地图弹窗 -->
        <el-dialog
          title="拾取坐标点"
          :visible.sync="openBaiduMapDlog"
          width="50%"
          center
        >
          <div >
            <baidu-map
              class="bm-view"
              @ready="map_handler"
              @click="locationMsg"
              :center="center"
              :zoom="zoom"
              :scroll-wheel-zoom="true"
              :map-click="true"
            >
              <bm-marker
                v-for="(item, index) in positionList"
                :key="index"
                class="bm_marker"
                :position="item"
                :dragging="true"
                @click="infoWindowOpen"
                :icon="icon"
              >
              </bm-marker>
            </baidu-map>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeopenBaiduMapDlog1">取 消</el-button>
            <el-button type="primary" @click="closeopenBaiduMapDlog"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
	<script src='./deployEquipment.js'>

</script>
<style scoped>
  @import './deployEquipment.css';
</style>