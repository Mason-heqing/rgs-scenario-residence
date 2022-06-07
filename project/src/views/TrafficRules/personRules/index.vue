<template>
  <div class="content-wrapper">
    <section class="content-header">
      <label class="nice" style="font-size:18px">{{msg}}</label>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="fa fa-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-dashboard"></i> 记录管理
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 来访记录
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="panel-body" style="padding: 0px;">
        <div class="row">
          <div class="col-lg-3 model-one">
            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title" style="font-weight: bold;">子用户</h3>
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-lg-12">
                    <div style="width: 100%;overflow-x: hidden;overflow-y: auto">
                      <el-tree
                        :data="data"
                        :props="defaultProps"
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
                <div id="toolbar" class="btn-group" style="width:100%">
                  <div class="btn-group col-lg-5 pl-0" data-toggle="buttons">
                    <button id="btn_add" type="button" class="btn btn-default">
                      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                    </button>
                    <button id="btn_delete" type="button" class="btn btn-default">
                      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
                    </button>
                  </div>
                  <div class="col-lg-7 pr-0 text-right">
                    <el-input style="width:200px" placeholder="请输入产品名称" clearable size="small"></el-input>
                    <el-button class="mr-10" type="primary" size="small">搜索</el-button>
                    <!-- <el-button type="primary" size="small" >新增订单</el-button> -->
                    <el-dropdown trigger="click" :hide-on-click="false" placement="bottom-start">
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
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="date" label="日期" width="auto" v-if="colData[0].istrue"></el-table-column>
                  <el-table-column prop="age" label="年龄" width="auto" v-if="colData[1].istrue"></el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    sortable
                    width="auto"
                    v-if="colData[2].istrue"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    sortable
                    width="auto"
                    v-if="colData[3].istrue"
                  ></el-table-column>

                  <el-table-column prop="name" label="操作" width="auto">
                    <template slot-scope="scope">
                      <el-row>
                        <!-- <el-button type="primary" icon="el-icon-view" round @click="gotoEdit(scope.row.id)" size="mini"></el-button> -->
                        <!-- <el-button type="primary" icon="el-icon-edit" round @click="clickEdit(scope.row.id)" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" round @click="clickDel(scope.row.id)" size="mini"></el-button>-->
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
  </div>
</template>
<script src="./personRules.js"></script>
<style scoped lang="scss">
@import "./personRules.scss";
</style>
