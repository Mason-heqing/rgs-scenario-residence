<template>
  <div class="content-wrapper">
    <section class="content-header">
      <label class="nice" style="font-size:18px">
        通行规则 - 设备规则
      </label>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="fa fa-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-dashboard"></i> 通行规则
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 设备规则
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
                <!-- <h3 class="box-title" style="font-weight: bold;">子用户</h3> -->
                 <el-input placeholder="搜索规则名称"> <el-button slot="append" icon="el-icon-search"></el-button></el-input>
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
             <div class="box-footer">
                <button id="btn_update_classify" type="button" class="btn btn-xs btn-default" @click="editGroup">
                  <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
                <button id="btn_add_classify" type="button" class="btn btn-xs btn-default" @click="addGroup">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
                <button id="btn_delete_classify" type="button" class="btn btn-xs btn-default" @click="deleteGroup">
                  <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-9 model-two">
            <div class="box box-primary">
              <div class="box-body">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                  <el-tab-pane label="周通行规则" name="first">
                  
                    <div id="toolbar" class="btn-group" style="width:100%">
                      <div class="btn-group col-lg-5 pl-0" data-toggle="buttons">
                        <button id="btn_add" type="button" class="btn btn-default">
                          <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>批量设置
                        </button>
                        <button id="btn_delete" type="button" class="btn btn-default">
                          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>清空
                        </button>
                      </div>
                      
                    </div>
                    <el-table
                      class="mt-10"
                      :data="tableData"
                      style="width: 100%"
                      :border="true"
                      :cell-style="{background:'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0',textAlign: 'center',}"
                      :header-row-style="{'text-align': 'center',}"
                      :stripe="true"
                      :default-sort="{prop: 'date', order: 'descending'}"
                      ref="multipleTable"
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column type="selection" align="center" width="45"></el-table-column>
                      <el-table-column prop="date" align="center" label="星期" width="100"></el-table-column>
                      <el-table-column prop="age" align="center" label="通行时段" width="auto"></el-table-column>
                      <el-table-column prop="name" align="center" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-row>
                            <!-- <el-button type="primary" icon="el-icon-view" round @click="gotoEdit(scope.row.id)" size="mini"></el-button> -->
                            <el-button type="primary" icon="el-icon-edit" round @click="clickSet(scope.row.id)" size="mini">设置</el-button>
                            <!-- <el-button type="danger" icon="el-icon-delete" round @click="clickDel(scope.row.id)" size="mini"></el-button> -->
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
                  </el-tab-pane>
                  <el-tab-pane label="假日通行规则" name="second">
                    <div id="toolbar" class="btn-group" style="width:100%">
                      <div class="btn-group col-lg-5 pl-0" data-toggle="buttons">
                        <button id="btn_add" type="button" class="btn btn-default">
                          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>添加
                        </button>
                        <button id="btn_delete" type="button" class="btn btn-default">
                          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量删除
                        </button>
                      </div>
                      
                    </div>
                    <el-table
                      class="mt-10"
                      :data="tableData"
                      style="width: 100%"
                      :border="true"
                      :cell-style="{background:'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0',textAlign: 'center',}"
                      :header-row-style="{'text-align': 'center',}"
                      :stripe="true"
                      :default-sort="{prop: 'date', order: 'descending'}"
                      ref="multipleTable"
                      @selection-change="handleSelectionChange"
                    >
                      <el-table-column type="selection" align="center" width="45"></el-table-column>
                      <el-table-column prop="date" align="center" label="假日名称" width="100"></el-table-column>
                      <el-table-column prop="date" align="center" label="开始日期" width="100"></el-table-column>
                      <el-table-column prop="date" align="center" label="结束日期" width="100"></el-table-column>
                      <el-table-column prop="age" align="center" label="通行时段" width="auto"></el-table-column>
                      <el-table-column prop="name" align="center" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-row>
                            <!-- <el-button type="primary" icon="el-icon-view" round @click="gotoEdit(scope.row.id)" size="mini"></el-button> -->
                            <el-button type="primary" icon="el-icon-edit" round @click="clickSet(scope.row.id)" size="mini">设置</el-button>
                            <!-- <el-button type="danger" icon="el-icon-delete" round @click="clickDel(scope.row.id)" size="mini"></el-button> -->
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
                  </el-tab-pane>
                  <el-tab-pane label="下发设备" name="third">下发设备</el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
    <from-dialog :popVisible.sync="fromPopVisible" :popTitle="fromPopTitle" :popContent="fromPopContent"></from-dialog>
    <el-dialog
      title="设置通行时段"
      :visible.sync="setPopVisible"
      width="450px"
      class="el-dialog-reset set-pop">
      <div style="padding:0px;">

        <el-form ref="form">
          <el-form-item>
             <label for=""> 通行方式：</label>
             <el-select v-model="value" placeholder="" @change="trafficKind">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item>
             <label for="">　　时段1：</label>
             <el-time-picker
                is-range
                v-model="timeArr"
                format="HH:mm"
                value-format="HH:mm"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                @change="changeTime">
              </el-time-picker>
          </el-form-item> -->
           
           <el-form-item v-if="value==3" v-for="(item,index) in stepArr" :key="index">
             <label for="">　　{{item.name}}：</label>
             <el-time-picker
                is-range
                v-model="item.timeArr"
                format="HH:mm"
                value-format="HH:mm"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                @change="changeTime($event,index)">
              </el-time-picker>
              <i class="el-icon-delete" @click="deleteTime"></i>
          </el-form-item>
          <el-form-item  v-if="value==3">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addTime">增加时间段</el-button>
          </el-form-item>
        </el-form>
        
       
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setPopVisible=false">取 消</el-button>
        <el-button type="primary" @click="setTimer">确 定</el-button>
      </span>
     </el-dialog>
  </div>
</template>
<script src="./deviceRules.js"></script>
<style scoped lang="scss">
@import "./deviceRules.scss";
$myColor: #ddd;
</style>
