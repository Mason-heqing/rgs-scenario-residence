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
              <i class="fa fa-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-dashboard"></i> 报警管理
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 报警记录
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body">
                <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                  <el-tab-pane label="用户管理" name="first"> -->
                    <div class="form-horizontal">
                      <div class="col-md-2 pl-0">
                        <div class="form-group">
                          <div class="col-sm-12">
                            <el-input style="width:100%" placeholder="搜索姓名"></el-input>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <div class="col-sm-12">
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
                     
                      <div class="col-md-4  pr-0">
                        <div class="col-sm-12 btn-group">
                          <button id="btn_device_search" type="button" class="btn btn-primary">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                          </button>
                          <button id="btn_device_reset" type="button" class="btn btn-default">
                            <span class="fa fa-reply" aria-hidden="true"></span>重置
                          </button>
                        </div>
                      </div>
                    </div>
                
                    <table-cmp
                      :table-data="tableData"
                      :table-label="tableLabel"
                      ref="tableChild"
                    >
                    <el-table-column slot="operate" label="操作" align="center" width="200">
                        <template slot-scope="scope">
                           <el-row>
                              <el-button title="编辑" type="primary" icon="el-icon-edit" round  size="mini"></el-button>
                              <el-button title="删除" type="danger" icon="el-icon-delete" round size="mini"></el-button>
                            </el-row>
                        </template>
                    </el-table-column>
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
                  <!-- </el-tab-pane>
                  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                  <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                  <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                </el-tabs> -->
              </div>
            </div>
      </section>
    
  </div>
</template>
<script src="./alarmRecord.js"></script>
<style scoped lang="scss">
@import "./alarmRecord.scss";
</style>
