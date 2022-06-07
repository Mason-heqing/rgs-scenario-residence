<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        人员管理 - 访客管理
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-user"></i> 人员管理
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 访客管理
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body" v-loading="loading">
                <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                  <el-tab-pane label="用户管理" name="first"> -->
                    <div class="form-horizontal">
                      <div class="col-lg-2 pl-0">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-input clearable style="width:100%" placeholder="搜索姓名" v-model="dataForm.personName"></el-input>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-date-picker style="width:100%" 
                              clearable
                              v-model="dataForm.time" 
                              type="date"
                              placeholder="访问日期"
                              @change="changeTime"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd hh:mm:ss">
                            </el-date-picker>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable="" v-model="dataForm.visitorPassble" placeholder="状态">
                              <el-option
                                v-for="item in visitorPassble"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-lg-4  pr-0">
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
                        <button id="btn_add" type="button" class="btn btn-default" @click="batchDelete">
                          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量取消
                        </button>
                      </div>
                    
                    </div>

                    <el-table
                      class="mt-10"
                      :data="tableData"
                      style="width: 100%"
                      :border="true"
                      :cell-style="{background:'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0'}"
                      :stripe="true"
                      :default-sort="{prop: 'date', order: 'descending'}"
                      ref="multipleTable"
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column type="selection" width="40"></el-table-column>
                      <el-table-column prop="visitTime" label="访问时间" align="center" min-width="120" sortable>
                        <template slot-scope="scope">
                         <span v-if="scope.row.visitTime">{{scope.row.visitTime | clTime}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="visitorPersonName" label="姓名" align="center" min-width="120px" sortable></el-table-column>
                      <el-table-column prop="faceImageUrl" label="人脸" min-width="120" align="center" sortable>
                        <template slot-scope="scope">
                         <img style="width:80px;height:80px" :src="imgurl+'/file/download?path='+scope.row.faceImageUrl" alt />
                        </template>
                      </el-table-column>
                      
                      <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center"

                        sortable
                        min-width="120"
                      ></el-table-column>
                      <el-table-column
                        prop="houseAddress"
                        label="访问位置"
                        min-width="120"
                        align="center"                        
                        width="auto"
                        sortable
                      ></el-table-column>
                      <el-table-column prop="visitPerson" align="center" label="被访人" min-width="120px" sortable></el-table-column>
                      <el-table-column label="授权状态" align="center" width="120" sortable>
                         <template slot-scope="scope">
                          <div class="grant-box" @click="goView(scope.row.personId,scope.row.visitorPersonName)" v-if="scope.row.grantTotalNum!=0&&scope.row.grantSuccessNum>=scope.row.grantTotalNum">
                            <div class="grant-color-s"></div>
                            <span class="grant-num-s">{{scope.row.grantSuccessNum}}/{{scope.row.grantTotalNum}}</span>
                          </div>
                          <div class="grant-box" @click="goView(scope.row.personId,scope.row.visitorPersonName)" v-if="scope.row.grantTotalNum!=0&&scope.row.grantSuccessNum==0">
                            <div class="grant-color-f"></div>
                            <span class="grant-num-f">{{scope.row.grantSuccessNum}}/{{scope.row.grantTotalNum}}</span>
                          </div>
                          <div class="grant-box" @click="goView(scope.row.personId,scope.row.visitorPersonName)" v-if="scope.row.grantTotalNum!=0&&scope.row.grantSuccessNum<scope.row.grantTotalNum&&scope.row.grantSuccessNum!=0">
                            <div class="grant-color-half"></div>
                            <span class="grant-num-half">{{scope.row.grantSuccessNum}}/{{scope.row.grantTotalNum}}</span>
                          </div>
                        </template>
                     </el-table-column>
                      <el-table-column prop="visitorPassble" align="center" label="状态" width="auto" sortable>
                        <template slot-scope="scope">
                          <span v-if="scope.row.visitorPassble==1">有效</span>
                          <span v-if="scope.row.visitorPassble==2">无效</span>
                          <span v-if="scope.row.visitorPassble==3">过期</span>
                          <span v-if="scope.row.visitorPassble==4">取消</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="name" label="操作" width="100" align="center">
                        <template slot-scope="scope">
                          <el-row>
                            <!-- <el-button title="编辑" type="primary" icon="el-icon-edit" round @click="gotoEdit(scope.row.id)" size="mini"></el-button>
                            <el-button title="加入黑名单" type="primary" icon="el-icon-warning-outline" round @click="clickEdit(scope.row.id)" size="mini"></el-button> -->
                            <el-button v-if="scope.row.visitorPassble==1" title="取消" type="danger" icon="el-icon-delete"  @click="clickDel(scope.row.id)" size="mini"></el-button>
                          </el-row>
                        </template>
                      </el-table-column>
                    </el-table>
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
<script src="./visitorManage.js"></script>
<style scoped lang="scss">
@import "./visitorManage.scss";
</style>
