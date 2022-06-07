<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        对账查询
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/parkManager">
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
                    <div class="form-horizontal">
                      <!-- <div class="col-lg-2">
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
                      </div> -->
                      <div class="col-lg-3 pl-0">
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
                          <button id="btn_device_search" type="button" class="btn btn-primary" @click="querySearch">
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
                      </div>
                      <div class="col-sm-7 pr-0 text-right">
                        <span>交易总额：{{totalTransactions}} || 手续费总额：{{totalHandlingCharge}} || 划账总额：{{totaltransferAmount}}</span>
                      </div>
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
                              <el-button title="查看明细" type="primary" icon="el-icon-info" round  size="mini" @click="goEdit(scope.row)"></el-button>
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
              </div>
            </div>
      </section>
      <el-dialog
        title="查看明细"
        :visible.sync="dialogVisible"
        width="80%">
        <div class="row">
           <div id="toolbar" class=" btn-group-box" style="width:100%">
                      <div class="btn-group col-lg-5 pl-0" data-toggle="buttons">
                         <button id="btn_delete" type="button" class="btn btn-default" @click="exportBtnminxi">
                          <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
                        </button>
                      </div>
                    </div>
                    <table-cmp
                      :table-data="listData1"
                      :table-label="tableLabel1"
                      ref="tableChild"
                      :is-show-select="isShowSelect1"
                      show-summary
                    >
                    </table-cmp>
                    <div class="block mt-10">
                      <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page="currentPage1"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total1"
                      ></el-pagination>
                    </div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span> -->
      </el-dialog>
       <!-- 授权状态 -->
      <!-- <auth-box :authPopVisible.sync="authPopVisible" :authPopTitle="authPopTitle" ref="authData"></auth-box> -->
      <!-- <export-box :exportPopVisible.sync="outPop" :isExport.sync="isExport" ref="exportData"></export-box> -->

      <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
  </div>
</template>
<script src="./veriftyList.js"></script>
<style scoped lang="scss">
 @import "./veriftyList.scss";
</style>
