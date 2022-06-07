<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        对账查询
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-user"></i> 对账查询
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
                      <!-- <div class="col-lg-2 pl-0">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-input clearable style="width:100%" placeholder="搜索订单号" v-model="dataForm.personName"></el-input>
                          </div>
                        </div>
                      </div> -->
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable="" v-model="dataForm.parkId" placeholder="选择停车场">
                              <el-option
                                v-for="item in parkList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-date-picker
                              style="width: 100%"
                              clearable
                              v-model="timers"
                              type="daterange"
                              value-format="yyyy-MM-dd"
                              unlink-panels
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :picker-options="pickerOptions"
                              @change="changeTime"
                            >
                            </el-date-picker>
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
                      <div class="btn-group col-lg-5 pl-0" data-toggle="buttons">
                         <button id="btn_delete" type="button" class="btn btn-default" @click="exportBtn">
                          <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
                        </button>
                        <!-- <button id="btn_add" type="button" class="btn btn-default" @click="batchDelete">
                          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量取消
                        </button> -->
                      </div>
                      <div class="col-sm-7 pr-0 text-right">
                        <span>交易总额：{{totalTransactions}} || 手续费总额：{{totalHandlingCharge}} || 划账总额：{{totaltransferAmount}}</span>
                      </div>
                      <!-- <div class="col-lg-7 pr-0 text-right">
                        <el-dropdown
                          trigger="click"
                          :hide-on-click="false"
                          placement="bottom-start"
                        >
                          <span class="el-dropdown-link">
                            <el-button type="primary" size="small">
                              <i class="el-icon-menu"></i>
                              <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-checkbox-group v-model="tableSelect" @change='checkboxChange'>
                              <div v-for="item in tableOption" :key="item" class="checkbox-div">
                                <el-checkbox :label="item" :key="item"></el-checkbox>
                              </div>
                            </el-checkbox-group>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div> -->
                    </div>
                    <table-cmp
                      :table-data="listData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShowSelect"
                      show-summary
                    >
                    <el-table-column slot="operate" label="操作" align="center" width="150">
                        <template slot-scope="scope">
                           <el-row>
                              <el-button title="查看明细" type="primary" icon="el-icon-info"   size="mini" @click="goEdit(scope.row)"></el-button>
                              <!-- <el-button title="删除" type="danger" 删除  size="mini" @click="deleteData(scope.row.id)"></el-button> -->
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
       <!-- 授权状态 -->
      <auth-box :authPopVisible.sync="authPopVisible" :authPopTitle="authPopTitle" ref="authData"></auth-box>
    <!-- <el-dialog
      title="导出"
      :visible.sync="outPop"
      width="400px">
      <div style="padding:0px;">
        <el-checkbox v-model="outChecked">导出图片</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="outBtn">导出</el-button>
        <el-button  @click="outPop=false" >关闭</el-button>
      </span>
    </el-dialog> -->
    <!-- 导出 -->
      <export-box :exportPopVisible.sync="outPop" :isExport.sync="isExport" ref="exportData"></export-box>

      <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
  </div>
</template>
<script src="./veriftyList.js"></script>
<style scoped lang="scss">
 @import "./veriftyList.scss";
</style>
