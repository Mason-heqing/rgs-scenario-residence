<template>
  <div class="content-wrapper">
    <section class="content-header">
       <h1 class="nice">
        我的项目 - 项目管理
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="glyphicon glyphicon-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-folder-open"></i>  我的项目
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 项目管理
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid tree-color">
      <div class="panel-body" style="padding: 0px;" v-loading='loading'>
        <div class="row">
          <div class="col-lg-3 model-one">
            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title" style="font-weight: bold;">子用户</h3>
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-lg-12">
                    <div style="width: 100%;overflow-x: auto;overflow-y: auto;max-height:668px">
                      <el-tree
                        :data="leftData"
                        :props="defaultProps"
                        :default-expand-all="true"
                        @node-click="handleNodeClick"
                        :highlight-current="true"
                        :expand-on-click-node="false"
                      ></el-tree>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9 model-two">
            <div class="box box-primary">
              <div class="box-body">
                <div id="toolbar" class="btn-group btn-group-box" style="width:100%">
                  <div class="btn-group col-lg-5 pl-0" >
                    <button id="btn_add" type="button" class="btn btn-default" @click="goAdd">
                      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                    </button>
                    <button id="btn_delete" type="button" class="btn btn-default" @click="allDeleteData">
                      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
                    </button>
                    <!-- <a @click="downErcode"> -->
                    <a :href="imgurl+'/app/user/qrCodeImgUrl'">  
                    <!-- <a :href="imgurl+'/image/xqgj.jpg'" download> -->
                      <button id="btn_delete" type="button" class="btn btn-default">
                        <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>下载二维码
                      </button>
                    </a>
                  </div>
                  <div class="col-lg-7 pr-0 text-right">
                    <el-input style="width:200px" placeholder="输入名称查询" v-model="listDataForm.name" clearable size="small"></el-input>
                    <el-button class="mr-10" type="primary" size="small" @click="getListData">搜索</el-button>
                    <!-- <el-button type="primary" size="small" >新增订单</el-button> -->
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
                      :table-data="listData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShowSelect"
                    >
                    <el-table-column slot="operate" label="操作" align="center" width="150">
                        <template slot-scope="scope">
                           <el-row>
                              <el-button title="编辑" type="primary"  编辑   size="mini" @click="goEdit(scope.row)"></el-button>
                              <el-button title="删除" type="danger" 删除  size="mini" @click="deleteData(scope.row.id)"></el-button>
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
          </div>
        </div>
      </div>
    </section>
    <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
  </div>
</template>
<script src="./projectManage.js"></script>
<style scoped lang="scss">
@import "./projectManage.scss";
</style>
