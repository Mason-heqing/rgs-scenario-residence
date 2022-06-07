<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        设备管理 - 对讲门禁
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="fa fa-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-dashboard"></i> 设备管理
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 对讲门禁
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
                      <div class="col-lg-2 pl-0">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-input style="width:100%" placeholder="搜索设备名称"></el-input>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select v-model="value" placeholder="类型">
                              <el-option
                                v-for="item in options"
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
                            <el-select v-model="value" placeholder="网络状态">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select v-model="value" placeholder="请选择">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div> -->
                      <div class="col-lg-4  pr-0">
                        <div class="btn-group">
                          <button id="btn_device_search" type="button" class="btn btn-primary">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                          </button>
                          <button id="btn_device_reset" type="button" class="btn btn-default">
                            <span class="fa fa-reply" aria-hidden="true"></span>重置
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id="toolbar" class="btn-group" style="width:100%">
                      <div class="btn-group col-lg-5 pl-0" data-toggle="buttons">
                        <button id="btn_add" type="button" class="btn btn-default" @click="addPopVisible=true">
                          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                        </button>
                        <!-- <button id="btn_delete" type="button" class="btn btn-default">
                          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
                        </button> -->
                      </div>
                      <div class="col-lg-7 pr-0 text-right">
                        <!-- <el-input style="width:200px" placeholder="请输入产品名称" clearable size="small"></el-input>
                        <el-button
                          style="display: inline-block"
                          class="mr-10"
                          type="primary"
                          size="small"
                        >搜索</el-button> -->
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
      <!-- //添加设备弹框 -->
      <el-dialog
      title="添加设备"
      :visible.sync="addPopVisible"
      width="40%"
      class="el-dialog-reset set-pop">
      <div style="padding:0px;">

        <el-form ref="form">
          <!-- <el-form-item>
             <label for="name" class="text-right">
              <span style="color: red;line-height:40px">*</span>
              设备类型　
            </label>
              <el-radio-group v-model="radio">
                <el-radio label="1">单元机</el-radio>
                <el-radio label="2">围墙机</el-radio>
              </el-radio-group>
          </el-form-item> -->
          <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                设备类型
              </label>
              <div class="col-sm-6">
                <el-form-item>
                   <el-radio-group v-model="radio">
                    <el-radio label="1">单元机</el-radio>
                    <el-radio label="2">围墙机</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
           </div>
         <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                设备名称
              </label>
              <div class="col-sm-6">
                <el-form-item prop="name">
                  <el-input style="width:100%"></el-input>
                </el-form-item>
              </div>
           </div>
           <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                设备SN号
              </label>
              <div class="col-sm-6">
                <el-form-item prop="name">
                  <el-input style="width:100%"></el-input>
                </el-form-item>
              </div>
           </div>
           <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                所在位置
              </label>
              <div class="col-sm-6">
                <el-form-item prop="name">
                  <el-select style="100%" v-model="value" placeholder="">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
           </div>
           <!-- <el-form-item>
             <label for="name" class="text-right">
              <span style="color: red;line-height:40px">*</span>
              进出标识　
            </label>
             <el-select v-model="value" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        
       
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPopVisible=false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
     </el-dialog>
    
  </div>
</template>
<script src="./talkAccess.js"></script>
<style scoped lang="scss">
@import "./talkAccess.scss";
</style>
