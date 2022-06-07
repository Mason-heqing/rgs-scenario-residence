<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        人员管理 - 黑名单
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="fa fa-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-dashboard"></i> 人员管理
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 黑名单
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
                      <div class="col-md-3 pl-0">
                        <div class="form-group">
                          <div class="col-sm-12">
                            <el-input style="width:100%" placeholder="搜索姓名"></el-input>
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
                      </div>
                      <div class="col-lg-2">
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
                      </div>
                      <div class="col-lg-2">
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
                    <div id="toolbar" class="btn-group" style="width:100%">
                      <div class="btn-group col-lg-5 pl-0" data-toggle="buttons">
                        <button id="btn_add" type="button" class="btn btn-default" @click="goAdd">
                          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                        </button>
                        <button id="btn_delete" type="button" class="btn btn-default">
                          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量删除
                        </button>
                      </div>
                      <!-- <div class="col-lg-7 pr-0 text-right">
                        <el-input style="width:200px" placeholder="请输入产品名称" clearable size="small"></el-input>
                        <el-button
                          style="display: inline-block"
                          class="mr-10"
                          type="primary"
                          size="small"
                        >搜索</el-button>
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
                            <el-checkbox-group v-model="colOptions">
                              <div v-for="item in colSelect" :key="item" class="checkbox-div">
                                <el-checkbox :label="item" :key="item"></el-checkbox>
                              </div>
                            </el-checkbox-group>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div> -->
                    </div>
                    <table-cmp
                      :table-data="tableData"
                      :table-label="tableLabel"
                      ref="tableChild"
                    >
                    <el-table-column slot="operate" label="操作" align="center" width="300">
                        <template slot-scope="scope">
                          <el-row>
                            <el-button type="primary" icon="el-icon-edit" round  @click="gotoEdit(scope.row.usr)"  size="mini"></el-button>
                            <el-button type="danger" icon="el-icon-delete" round size="mini"></el-button>
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
<script src="./blackList.js"></script>
<style scoped lang="scss">
@import "./blackList.scss";
</style>
