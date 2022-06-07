<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        访客车辆管理
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <!-- <li>
          <a href="/parkManager"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li> -->
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 访客车辆管理
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid tree-color">
      <div class="panel-body" style="padding: 0px" v-loading="loading">
        <div class="row">
          <div class="col-lg-12">
            <div class="box box-primary">
              <div class="box-body">
                <div class="form-horizontal">
                  <div class="col-lg-2 pl-0">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-input v-model="dataForm.name" placeholder="请输入访客姓名"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-input v-model="dataForm.plateNo" placeholder="请输入车牌号码"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-input v-model="dataForm.phone" placeholder="请输入手机号码"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-date-picker
                          style="width: 100%"
                          v-model="timers"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetimerange"
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
                  <div class="col-lg-2">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-select
                          clearable=""
                          v-model="dataForm.visitorStatus"
                          placeholder="请选择状态"
                        >
                          <el-option
                            v-for="item in visitorStatusList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 tool pr-0">
                    <div class="btn-group">
                      <button
                        id="btn_device_search"
                        type="button"
                        class="btn btn-primary"
                        @click="getListData"
                      >
                        <span
                          class="glyphicon glyphicon-search"
                          aria-hidden="true"
                        ></span
                        >查询
                      </button>
                      <button
                        id="btn_device_reset"
                        type="button"
                        class="btn btn-default"
                        @click="resetBtn"
                      >
                        <span class="fa fa-reply" aria-hidden="true"></span>重置
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  id="toolbar"
                  class="btn-group btn-group-box"
                  style="width: 100%"
                >
                  <div class="btn-group col-lg-5 pl-0">
                    <button
                      id="btn_add"
                      type="button"
                      class="btn btn-default"
                      @click="goAdd"
                    >
                      <span
                        class="glyphicon glyphicon-plus"
                        aria-hidden="true"
                      ></span
                      >新增
                    </button>
                    <button
                      id="btn_delete"
                      type="button"
                      class="btn btn-default"
                      @click="allDeleteData"
                    >
                      <span
                        class="glyphicon glyphicon-remove"
                        aria-hidden="true"
                      ></span
                      >删除
                    </button>
                  </div>
                </div>
                <table-cmp
                  :table-data="listData"
                  :table-label="tableLabel"
                  ref="tableChild"
                  :is-show-select="isShowSelect"
                >
                  <el-table-column
                    slot="operate"
                    label="操作"
                    align="center"
                    width="180"
                 v-if="isScene" >
                    <template slot-scope="scope">
                      <el-row v-if="scope.row.visitorStatus === 0"> 
                        <el-button
                          title="同步重试"
                          type="primary"
                          icon="el-icon-refresh-left"
                          round
                          size="mini"
                          @click="goRetry(scope.row.id)"
                          v-if="scope.row.syncStatus == 0"
                        ></el-button>
                        <el-button
                          title=""
                          type=""
                          icon="el-icon-refresh-left"
                          round
                          size="mini"
                          v-else
                           style="background:transparent;border:none;cursor:default;"
                        ></el-button>
                        <el-button
                          title="编辑"
                          type="primary"
                          icon="el-icon-edit"
                          round
                          size="mini"
                          @click="goEdit(scope.row)"
                        ></el-button>
                        <el-button
                          title="取消"
                          type="danger"
                          round
                          size="mini"
                          @click="cancel(scope.row.id)"
                        >
                        <span
                        class="glyphicon glyphicon-share-alt"
                        aria-hidden="true"
                      ></span
                      ></el-button>
                      </el-row>
                      <el-row v-else-if="scope.row.visitorStatus === 2 || scope.row.visitorStatus === 3"> 
                        <el-button
                          title="同步重试"
                          type="primary"
                          icon="el-icon-refresh-left"
                          round
                          size="mini"
                          @click="goRetry(scope.row.id)"
                          v-if="scope.row.syncStatus == 0"
                        ></el-button>
                      </el-row>
                      <el-row v-else class="text-right">
                        <el-button
                          title="同步重试"
                          type="primary"
                          icon="el-icon-refresh-left"
                          round
                          size="mini"
                          @click="goRetry(scope.row.id)"
                          v-if="scope.row.syncStatus == 0"
                        ></el-button>
                        <el-button
                          title=""
                          type=""
                          icon="el-icon-refresh-left"
                          round
                          size="mini"
                          v-else
                           style="background:transparent;border:none;cursor:default;"
                        ></el-button>
                        <el-button
                          title="编辑"
                          type="primary"
                          icon="el-icon-edit"
                          round
                          size="mini"
                          @click="goEdit(scope.row)"
                        ></el-button>
                        <el-button
                          title=""
                          type=""
                          icon="el-icon-edit"
                          round
                          size="mini"
                        style="background:transparent;border:none;cursor:default;"></el-button>
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
    <msg-box
      :popVisible.sync="popVisible"
      :popTitle="popTitle"
      :popContent="popContent"
    ></msg-box>
    <el-dialog
      :title="addTitle"
      :visible.sync="setVisible"
      width="50%"
       @close="closePop"
    >
      <div style="padding: 0px">
        <el-form ref="setVisibleForm" :rules="rulesSetVisibleForm" :model="setVisibleForm">
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              访客姓名
            </label>
            <div class="col-sm-6">
              <el-form-item prop="name">
                 <el-input v-model="setVisibleForm.name"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              车牌号码
            </label>
            <div class="col-sm-6 channel-pay">
              <el-form-item prop="plateNo">
                <el-input v-model="setVisibleForm.plateNo"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right" >
              <span style="color: red; line-height: 40px">*</span>
              可进出次数（0为不限制）
            </label>
            <div class="col-sm-6">
              <el-form-item prop="canTimes">
                <el-input v-model.number="setVisibleForm.canTimes" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              选择时间
            </label>
            <div class="col-sm-6">
              <el-form-item prop="addTimers">
                <el-date-picker
                          style="width: 100%"
                          v-model="setVisibleForm.addTimers"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetimerange"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="addPickerOptions"
                          @change="addChangeTime"
                        >
                        </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
              手机号码
            </label>
            <div class="col-sm-6 channel-pay">
              <el-form-item>
                 <el-input v-model.number="setVisibleForm.phone" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
              证件号码
            </label>
            <div class="col-sm-6">
              <el-form-item prop="id">
                <el-input v-model.number="setVisibleForm.idNum" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
              通道权限
            </label>
            <div class="col-sm-6 visitorVgsId" >
              <el-form-item>
                <el-select
                          clearable=""
                          v-model="setVisibleForm.permissionGroupId"
                          placeholder="请选择通道权限"
                        >
                          <el-option
                            v-for="item in visitorVgsIdList"
                            :key="item.vgsId"
                            :label="item.groupName"
                            :value="item.vgsId"
                          ></el-option>
                        </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
              备注
            </label>
            <div class="col-sm-6">
              <el-form-item prop="id">
                <el-input v-model="setVisibleForm.remarks"></el-input>
              </el-form-item>
            </div>
          </div>
           <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
     
            </label>
            <div class="col-sm-6">
              <el-form-item prop="id">
                <el-checkbox v-model="setVisibleForm.delExpired">过期未到访自动删除</el-checkbox>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setVisible = false">取 消</el-button>
        <el-button type="primary" @click="setVisibleMode('setVisibleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./vistorCarManager.js"></script>
<style scoped lang="scss">
@import "./vistorCarManager.scss";
.col-lg-2 {
    width: 15.666667%;
}
.tool{
  width: 12% !important;
}
.visitorVgsId /deep/ .el-select{
width: 100%;
}
</style>
