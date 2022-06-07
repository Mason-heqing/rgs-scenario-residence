<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        设备管理 - 软件管理
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-hdd"></i> 设备管理
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-registration-mark"></i> 软件管理
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body" v-loading='loading'>
                    <div id="toolbar" class=" btn-group-box" style="width:100%">
                      <div class="btn-group col-lg-5 pl-0" >
                      <button id="btn_add" type="button" class="btn btn-default" @click="uploadSoftPop=true">
                        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                      </button>                     
                    </div>
                      <div class="col-lg-7 pr-0 text-right">
                        <el-input style="width:200px" placeholder="输入名称或版本号查询" v-model="softForm.search" clearable size="small"></el-input>
                        <el-button class="mr-10" type="primary" size="small" @click="getDataTable">搜索</el-button>
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
                      </div>
                    </div>
                    
                    <table-cmp
                      :table-data="tableData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShowSelect"
                    >   
                    <el-table-column slot="operate" label="操作" align="center" width="100">
                        <template slot-scope="scope">
                          <el-row>
                              <!-- <el-button title="编辑" type="primary" icon="el-icon-edit" round  size="mini"></el-button> -->
                              <el-button title="删除" type="danger" icon="el-icon-delete"  size="mini" @click="deleteSoft(scope.row.id)"></el-button>
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
        title="上传软件"
        :visible.sync="uploadSoftPop"
        :close-on-click-modal='false'
        width="500px"
        class="el-dialog-reset auth-pop">
        <div style="padding:0px;">
          <div class="row mb-20">
            <div class="col-sm-4 text-right">请选择待上传的软件</div>
            <div class="col-sm-8 upload-zip">
              <el-upload        
                ref="upload"
                name="file"
                :limit=1
                :with-credentials="true"
                :file-list="fileList"
                :action="exportUrl+'?appId='+appId"
                :auto-upload="false"
                :on-exceed="exceed"
                :on-change='selectChange'
                :on-error="uploadErr"
                :before-upload="beforeAvatarUpload"
                :on-success="successCheck"
                :on-remove="removeFile">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-if="!isUpload">上传</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" v-if="isUpload" @click="abortUpLoad">取消</el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="uploadSoftPop = false">关闭</el-button>
        </span>
      </el-dialog>
    <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
  </div>
</template>
<script src="./softManage.js"></script>
<style scoped lang="scss">
@import "./softManage.scss";
</style>
