<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        物业服务 - 联系方式
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-list-alt"></i> 物业服务
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 联系方式
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body" v-loading="loading">
                    <div class="form-horizontal">
                      <div class="col-md-3 pl-0">
                        <div class="form-group">
                          <div class="col-sm-12">
                            <el-input clearable style="width:100%" placeholder="搜索机构名称/联系方式" v-model="tableForm.search"></el-input>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="col-md-4">
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
                      </div> -->
                     
                      <div class="col-md-4  pr-0">
                        <div class="col-sm-12 btn-group mb-10">
                          <button id="btn_device_search" type="button" class="btn btn-primary" @click="getDataList">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                          </button>
                          <button id="btn_device_reset" type="button" class="btn btn-default" @click="resetBtn">
                            <span class="fa fa-reply" aria-hidden="true"></span>重置
                          </button>
                        </div>
                      </div>
                      <div id="toolbar" class="btn-group" style="width:100%">
                      <div class="btn-group col-lg-5 pl-0" data-toggle="buttons">
                        <button id="btn_add" type="button" class="btn btn-default" @click="addPopVisible=true">
                          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                        </button>
                        <button id="btn_delete" type="button" class="btn btn-default" @click="deleteContact('')">
                          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量删除
                        </button>
                      </div>
                      
                    </div>
                    </div>
                
                    <table-cmp
                      :table-data="tableData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShowSelect"
                    >
                    <el-table-column slot="operate" label="操作" align="center" width="200">
                        <template slot-scope="scope">
                           <el-row>
                              <el-button title="编辑" type="primary" icon="el-icon-edit"   size="mini" @click="editContact(scope.row)"></el-button>
                              <el-button title="删除" type="danger" icon="el-icon-delete"  size="mini" @click="deleteContact(scope.row.id)"></el-button>
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
    <!-- //添加联系方式 -->
      <el-dialog
      title="添加联系方式"
      :visible.sync="addPopVisible"
      width="40%"
      @close="closePop"
      class="el-dialog-reset set-pop">
      <div style="padding:0px;">

        <el-form ref="addForm" :model="addForm" :rules="rules" class="demo-ruleForm">
           <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                机构名称
              </label>
              <div class="col-sm-6">
                <el-form-item prop="section">
                  <el-input style="width:100%" v-model="addForm.section" placeholder="请输入机构名称最大支持20字" maxlength="20"></el-input>
                </el-form-item>
              </div>
           </div>
           <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                联系方式
              </label>
              <div class="col-sm-6">
                <el-form-item prop="phone">
                  <el-input style="width:100%" v-model="addForm.phone" placeholder="支持输入手机号或电话号码"></el-input>
                </el-form-item>
              </div>
           </div> 
        </el-form>
        
       
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPopVisible=false">取 消</el-button>
        <el-button type="primary" @click="addContact('addForm')" v-show="!isRequest">确 定</el-button>
        <el-button type="primary" v-show="isRequest">添加中</el-button>
      </span>
     </el-dialog>
     <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
  </div>
</template>
<script src="./contact.js"></script>
<style scoped lang="scss">
@import "./contact.scss";
</style>
