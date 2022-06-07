<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        黑名单管理
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <!-- <li>
          <a href="/parkManager"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li> -->
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 黑名单管理
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
                  <div class="col-lg-3 pl-0">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-input
                        clearable
                        style="width: 100%"
                        placeholder="请输入车牌号码"
                        v-model="dataForm.plateNo"
                      ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 pr-0">
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
                  <div class="col-lg-7 pr-0 text-right">
                      <button
                      id="btn_add"
                      type="button"
                      class="btn btn-default"
                      @click="exportBlack"
                    >
                      导出
                    </button>
                    <button
                      id="btn_add"
                      type="button"
                      class="btn btn-default"
                      @click="importBlack"
                    >
                     导入黑名单
                    </button>
                   <a class="downloadModule" :href="'/static/excel/black_template.xlsx'" download="black_template.xlsx">下载导入模板</a>
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
                    width="300"
                  >
                    <template slot-scope="scope">
                      <el-row>
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
                          title="删除"
                          type="danger"
                          icon="el-icon-delete"
                          round
                          size="mini"
                          @click="deleteData(scope.row.id)"
                        ></el-button>
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
      title="新增黑名单"
      :visible.sync="isAddBlackModel"
      @close="closePop"
      width="50%"
    >
      <div style="padding: 0px">
        <el-form ref="setBlackModelForm" :rules="rulesSetBlackModelForm" :model="setBlackModelForm">
          <div class="row">
            <div class="col-sm-12">
              <label for="name" class="col-sm-2 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              车牌号码
            </label>
             <div class="col-sm-4">
                <el-form-item prop="plateNo">
                  <!-- <el-input v-model="setCarModelForm.carTypeInfoId"></el-input> -->
                 <el-input
                        clearable
                        style="width: 100%"
                        placeholder="请输入车牌号码"
                        v-model="setBlackModelForm.plateNo"
                      ></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-12">
              <label for="name" class="col-sm-2 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              限制方式
            </label>
             <div class="col-sm-4">
                <el-form-item prop="astrictMode">
                  <!-- <el-input v-model="setCarModelForm.carModelInfoId"></el-input> -->
                  <el-select
                          clearable=""
                          v-model="setBlackModelForm.astrictMode"
                          placeholder="请选择限制方式"
                        >
                          <el-option
                            v-for="item in astrictModeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-12">
              <label for="name" class="col-sm-2 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              有效日期
            </label>
             <div class="col-sm-4">
                <el-form-item prop="validityMode">
                  <!-- <el-input v-model="setBlackModelForm.validityMode"></el-input> -->
                <el-select
                          clearable=""
                          v-model="setBlackModelForm.validityMode"
                          placeholder="请选择有效日期"
                        >
                          <el-option
                            v-for="item in validityModeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                </el-form-item>
             </div>
             <div class="col-sm-6" v-if="setBlackModelForm.validityMode==1">
                <el-form-item prop="timers">
                  <el-date-picker
                          style="width: 100%"
                          v-model="timers"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                          @change="changeTime"
                        >
                        </el-date-picker>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-12">
              <label for="name" class="col-sm-2 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
              限制原因
            </label>
             <div class="col-sm-4">
                <el-form-item>
                  <el-input v-model="setBlackModelForm.remark"></el-input>
                </el-form-item>
             </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddBlackModel = false">取 消</el-button>
        <el-button type="primary" @click="setBlackModel('setBlackModelForm')">确 定</el-button>
      </span>
    </el-dialog>
        <el-dialog
      title="导入车辆"
      :visible.sync="importBlackPopVisible"
      width="50%"
    >
      <div style="padding: 0px">
        <el-form ref="setImportCarForm">
          <div class="row">
            <div class="col-sm-12">
              <label for="name" class="col-sm-2 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                Excel文件
              </label>
              <div class="col-sm-9 upload-zip">
                <!-- <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt"> -->
                  <el-upload        
                    ref="upload"
                    name="blacklistExcle"
                    :limit=1
                    :with-credentials="true"
                    :file-list="fileList"
                    :action="exportUrl"
                    :data="setImportBlackForm"
                    :auto-upload="false"
                    :on-exceed="exceed"
                    :on-change='selectChange'
                    :on-error="uploadErr"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successCheck"
                    :on-remove="removeFile">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                  <p class="tips">注：当系统已经存在表格中的车牌时，将以表格种的车牌为准。</p>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importBlackPopVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRecharge">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./blackManger.js"></script>
<style scoped lang="scss">
@import "./blackManger.scss";
.el-select{
  width: 100%;
}
.downloadModule{
  margin-left: -1px;
  background-color: #f4f4f4;
  color: #444;
  border:1px solid #ddd;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
}
.downloadModule:hover{
  background: #e7e7e7;
  border:1px solid #adadad;
}
</style>
