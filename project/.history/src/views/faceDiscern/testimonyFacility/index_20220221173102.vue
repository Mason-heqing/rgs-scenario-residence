<template>
  <div class="content-wrapper">
		<section class="content-header">
      <h1 class="nice">
        设备管理 - 人证设备
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
        <a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li>
        <li><i class="glyphicon glyphicon-cog"></i> 设备管理</li>
        <li class="active">
        <i class="glyphicon glyphicon-adjust"></i> 人证设备
        </li>
      </ol>
      </section>
      <!-- 顶部搜索区域 -->
      <section class="content container-fluid">
         <div class="box box-primary">
           <div class="box-body">
                <div class="my_card">
              <el-row :gutter="30">
                <el-col :span="18">
                  <div class="my_card-box">
                    <el-input placeholder="搜索名称/SN号" v-model="facilityList.name"></el-input>
                    <el-select  placeholder="设备状态" style="margin-left:10px" v-model="facilityList.noline">
                      <el-option v-for="item in options8" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                    <!-- <el-select  placeholder="设备类型" style="margin-left:10px" v-model="facilityList.type">
                      <el-option v-for="item in testimonyFacilityType" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select> -->
                  </div>
                </el-col>
                <el-col :span="8" >
                  <div class="btn-group">
                    <button id="btn_device_reset" type="button" class="btn btn-primary"  @click="searchTmsg">
                      <span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
                    </button> 
                    <button id="btn_device_reset" type="button" class="btn btn-default pl-8 pr-8" @click="replacement">
                      <span class="fa fa-reply" aria-hidden="true"></span>重置
                    </button>
                  </div>
          
                </el-col>
            </el-row>
          </div>
          <!-- BTN操作区域 -->
          <div class="btn_box" @click="addList">
            <button id="btn_add" type="button" class="btn btn-default" >
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>添加设备
            </button> 
          </div>

        <!-- 添加设备弹出框 -->
        <el-dialog
          :title="equipmentParameterTitle"
          :visible.sync="userInfoList"
          width="35%"
          
        >
          <div class="dlog_box">
            <div class="dialog_box " >
              <span class="_siyou">项目名称：</span>
              <el-input v-model="projName"></el-input>
            </div>
            <div class="dialog_box " >
              <span class="_siyou">设备名称：</span>
              <el-input
                placeholder="请输入设备名称"
                v-model="name"
              ></el-input>
            </div>
            <div class="dialog_box _top">
              <span class="_siyou">设备S N：</span>
              <el-input
                placeholder="请输入设备SN"
                style="margin-left: 5px"
                v-model="serial"
              ></el-input>
            </div>
          </div>
        
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeUserInfoList">取 消</el-button>
            <el-button type="primary" @click="addFacilityMsg" v-if="tag != 1"
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
            >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="name" label="设备名称"></el-table-column>
            <el-table-column prop="id" label="设备id" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="model" label="设备型号">
            </el-table-column>
            <el-table-column prop="online" label="在线状态">
              <template slot-scope="scope">
                <img src="../../../assets/img/online.png" title="设备在线" v-if="scope.row.online == 1"  alt="">
                <img title="设备离线" v-else src="../../../assets/img/offline.png" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="serial" label="设备SN号">
            </el-table-column>
            <el-table-column  label="操作" fixed="right" width="150">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="redactDlogBx(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteSbMsg(scope.row)">删除</el-button>
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
          </div>
           </div>
         </div>
      </section>
    </div>
</template>
<script src="./testimonyFacility.js">

</script>
<style scoped>
@import './testimonyFacility.css'
</style>