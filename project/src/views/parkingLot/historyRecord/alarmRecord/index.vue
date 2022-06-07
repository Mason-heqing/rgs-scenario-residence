<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        报警管理 - 报警记录
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-time"></i> 报警管理
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 报警记录
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body" v-loading="loading">
                    <div class="form-horizontal">
                      <div class="col-lg-4 pl-0">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-date-picker
                              v-model="timeArr"  
                              clearable
                              small="small"
                              align="right"
                              type="datetimerange"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              range-separator="-"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              @change="changeTime">
                          </el-date-picker>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable v-model="dataForm.alarmType" placeholder="选择报警类型">
                              <el-option
                                v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable v-model="dataForm.deviceId" placeholder="选择报警设备">
                              <el-option
                                v-for="item in deviceGroup"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      
                     
                      <div class="col-lg-3  pr-0">
                        <div class="btn-group">
                          <button id="btn_device_search" type="button" class="btn btn-primary" @click="getTableData">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                          </button>
                          <button id="btn_device_reset" type="button" class="btn btn-default" @click="resetBtn">
                            <span class="fa fa-reply" aria-hidden="true"></span>重置
                          </button>
                        </div>
                      </div>
                    </div>

                    <div id="toolbar" class=" btn-group-box" style="width:100%">
                       <div class="btn-group" data-toggle="buttons">
                        <button id="btn_delete" type="button" class="btn btn-default" @click="exportBtn">
                          <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
                        </button>
                      </div>
                    </div>
                
                    <table-cmp
                      :table-data="tableData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShowSelect"
                    >
                    </table-cmp>

                    <div class="block mt-10">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                      ></el-pagination>
                    </div>
              </div>
            </div>
      </section>
      <!-- 导出 -->
      <export-box :exportPopVisible.sync="outPop" :isExport.sync="isExport" ref="exportData"></export-box>
      

  </div>
</template>
<script src="./alarmRecord.js"></script>
<style scoped lang="scss">
@import "./alarmRecord.scss";
</style>
