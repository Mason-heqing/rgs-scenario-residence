<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        订单列表
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/parkManager">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-user"></i> 订单列表
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body">
                    <div class="form-horizontal">
                      <div class="col-lg-2 pl-0">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-input clearable style="width:100%" placeholder="搜索订单号" v-model="dataForm.orderId"></el-input>
                          </div>
                        </div>
                      </div>
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
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable="" v-model="dataForm.payType" placeholder="选择支付方式">
                              <el-option
                                v-for="item in payType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-date-picker style="width:100%" 
                             v-model="timeArr" 
                              small="small"
                              align="right"
                              type="datetimerange"
                              unlink-panels
                              value-format="yyyy-MM-dd HH:mm:ss"
                              range-separator="-"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['00:00:00','23:59:59']"
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
                    <table-cmp
                      :table-data="listData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShowSelect"
                    >
                    <el-table-column slot="operate" label="下载二维码" align="center" width="150">
                        <template slot-scope="scope">
                           <el-row>
                             <a :href="isdevelopment + scope.row.id + isName + scope.row.name">
                               <el-button title="下载" type="info" icon="el-icon-download" round  size="mini"></el-button>
                             </a>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column slot="operate" label="操作" align="center" width="150">
                        <template slot-scope="scope">
                           <el-row>
                              <el-button title="编辑" type="primary" icon="el-icon-edit" round  size="mini" @click="goEdit(scope.row)"></el-button>
                              <el-button title="删除" type="danger" icon="el-icon-delete" round size="mini" @click="deleteData(scope.row.id)"></el-button>
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
       <!-- 授权状态 -->
      <auth-box :authPopVisible.sync="authPopVisible" :authPopTitle="authPopTitle" ref="authData"></auth-box>
      <export-box :exportPopVisible.sync="outPop" :isExport.sync="isExport" ref="exportData"></export-box>
      <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
  </div>
</template>
<script src="./orderInquiry.js"></script>
<style scoped lang="scss">
@import "./orderInquiry.scss";
.form-group /deep/ .el-date-editor .el-range-input{
  width: 44%;
}
</style>
