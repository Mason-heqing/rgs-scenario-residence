<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        车辆管理
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <!-- <li>
          <a href="/parkManager"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li> -->
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 车辆管理
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
                        placeholder="姓名/电话"
                        v-model="dataForm.name"
                      ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
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
                  <div class="col-lg-3">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-input
                        clearable
                        style="width: 100%"
                        placeholder="请输入车位组名称"
                        v-model="dataForm.carPlaceName"
                      ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-select
                          clearable=""
                          v-model="dataForm.carTypeInfoId"
                          placeholder="车类"
                        >
                          <el-option
                            v-for="item in carTypeList"
                            :key="item.vgsId"
                            :label="item.name"
                            :value="item.vgsId"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 pl-0">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-select
                          clearable=""
                          v-model="dataForm.carModelInfoId"
                          placeholder="车型"
                        >
                          <el-option
                            v-for="item in carModel"
                            :key="item.vgsId"
                            :label="item.name"
                            :value="item.vgsId"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-select
                          clearable=""
                          v-model="dataForm.carStatus"
                          placeholder="状态"
                        >
                          <el-option
                            v-for="item in carStatusList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
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
                  <div class="btn-group col-lg-5 pl-0" v-if="isScene">
                    <button
                      id="btn_add"
                      type="button"
                      class="btn btn-default"
                      @click="addCarM"
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
                      @click="exportCar"
                    >
                      导出
                    </button>
                    <button
                      id="btn_add"
                      type="button"
                      class="btn btn-default"
                      @click="importCar"
                    >
                      导入车辆
                    </button>
                    <!-- <button
                      id="btn_add"
                      type="button"
                      class="btn btn-default"
                      @click="goAdd"
                    >
                      <span
                        class="glyphicon glyphicon-plus"
                        aria-hidden="true"
                      ></span
                      >下载导入模板
                    </button> -->
                    <a class="downloadModule" :href="'./static/excel/car_template.xlsx'" download="car_template.xlsx">下载导入模板</a>
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
                 v-if="isScene" >
                    <template slot-scope="scope">
                      <el-row v-if="scope.row.carType == 1">
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
                          title="修改"
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
                        <el-button
                          title="续费"
                          type="primary"
                          icon="el-icon-s-shop"
                          round
                          size="mini"
                          @click="renew(scope.row)"
                        ></el-button>
                        <el-button
                          title="停用"
                          type="info"
                          icon="el-icon-s-opportunity"
                          round
                          size="mini"
                          @click="noEnable(scope.row.id)" 
                          v-if="scope.row.carStatus == 1"
                        ></el-button>
                        <el-button
                          title="启用"
                          type="primary"
                          icon="el-icon-s-opportunity"
                          round
                          size="mini"
                          @click="enable(scope.row.id)" 
                          v-else
                        ></el-button>
                      </el-row>
                      <el-row v-else-if="scope.row.carType == 2"> 
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
                          title="修改"
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
                        <el-button
                          title="充值"
                          type="primary"
                          icon="el-icon-money"
                          round
                          size="mini"
                          @click="recharge(scope.row)"
                        ></el-button>
                        <el-button
                          title="停用"
                          type="info"
                          icon="el-icon-s-opportunity"
                          round
                          size="mini"
                          @click="noEnable(scope.row.id)" 
                          v-if="scope.row.carStatus == 1"
                        ></el-button>
                        <el-button
                          title="启用"
                          type="primary"
                          icon="el-icon-s-opportunity"
                          round
                          size="mini"
                          @click="enable(scope.row.id)" 
                          v-else
                        ></el-button>
                      </el-row>
                      <el-row v-else> 
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
                          title="修改"
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
                        <el-button
                          title="停用"
                          type="info"
                          icon="el-icon-s-opportunity"
                          round
                          size="mini"
                          @click="noEnable(scope.row.id)" 
                          v-if="scope.row.carStatus == 1"
                        ></el-button>
                        <el-button
                          title="启用"
                          type="primary"
                          icon="el-icon-s-opportunity"
                          round
                          size="mini"
                          @click="enable(scope.row.id)" 
                          v-else
                        ></el-button>
                        <el-button
                          title=""
                          type=""
                          icon="el-icon-refresh-left"
                          round
                          size="mini"
                           style="background:transparent;border:none;cursor:default;"
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
      title="新增车辆信息"
      :visible.sync="isAddCarModel"
      @close="closePop"
      width="50%"
    >
      <div style="padding: 0px">
        <el-form ref="setCarModelForm" :rules="rulesSetCarModelForm" :model="setCarModelForm">
          <div class="row">
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              车类
            </label>
             <div class="col-sm-9 visitorVgsId">
                <el-form-item prop="carTypeInfoId">
                  <!-- <el-input v-model="setCarModelForm.carTypeInfoId"></el-input> -->
                  <el-select
                          clearable=""
                          v-model="setCarModelForm.carTypeInfoId"
                          placeholder="请选择车类"
                          v-bind:disabled="isSelectCar"
                        >
                          <el-option
                            v-for="item in addCarTypeList"
                            :key="item.vgsId"
                            :label="item.name"
                            :value="item.vgsId"
                          ></el-option>
                        </el-select>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              车型
            </label>
             <div class="col-sm-9 visitorVgsId">
                <el-form-item prop="carModelInfoId">
                  <!-- <el-input v-model="setCarModelForm.carModelInfoId"></el-input> -->
                  <el-select
                          clearable=""
                          v-model="setCarModelForm.carModelInfoId"
                          placeholder="请选择车型"
                        >
                          <el-option
                            v-for="item in addCarModel"
                            :key="item.vgsId"
                            :label="item.name"
                            :value="item.vgsId"
                          ></el-option>
                        </el-select>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              车牌号码
            </label>
             <div class="col-sm-9">
                <el-form-item prop="plateNo">
                  <el-input v-model="setCarModelForm.plateNo" v-bind:disabled="isSelectCar"></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
              车辆颜色
            </label>
             <div class="col-sm-9">
                <el-form-item>
                  <el-input v-model="setCarModelForm.vehicleColor"></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span> 
              车主姓名
            </label>
             <div class="col-sm-9">
                <el-form-item>
                  <el-input v-model="setCarModelForm.staffName"></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>  
              手机号码
            </label>
             <div class="col-sm-9">
                <el-form-item prop="phone">
                  <el-input v-model="setCarModelForm.phone" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span>  
              证件号码
            </label>
             <div class="col-sm-9">
                <el-form-item>
                  <el-input v-model.number="setCarModelForm.idNum" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span>  
              地址
            </label>
             <div class="col-sm-9">
                <el-form-item>
                  <el-input v-model="setCarModelForm.address"></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
              通道权限
            </label>
            <div class="col-sm-9 visitorVgsId" >
              <el-form-item>
                <el-select
                          clearable=""
                          v-model="setCarModelForm.permissionGroupId"
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
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px"></span>  
              备注
            </label>
             <div class="col-sm-9">
                <el-form-item prop="paydataTime">
                  <el-input v-model="setCarModelForm.remark"></el-input>
                </el-form-item>
             </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddCarModel = false">取 消</el-button>
        <el-button type="primary" @click="setCarModel('setCarModelForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="储值车充值"
      :visible.sync="rechargePopVisible"
      width="26%"
      @close="closePopRecharge"
    >
      <div style="padding: 0px">
        <el-form ref="setRechargeForm" :rules="rulesSetRechargeForm" :model="setRechargeForm">
           <div class="row">
             <div class="col-sm-12 text-center p-30">
               <span class="plate-no">{{setRechargeForm.rechargePlateNo}}</span>
               <span>{{setRechargeForm.rechargeName}}</span>
             </div>
           </div>
          <div class="row">
            <div class="col-sm-12">
              <label for="name" class="col-sm-4 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              充值前余额
            </label>
             <div class="col-sm-7">
                <el-form-item>
                  <el-input v-model="setRechargeForm.rechargeBefore" readonly></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-12">
              <label for="name" class="col-sm-4 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              充值金额
            </label>
             <div class="col-sm-7">
                <el-form-item prop="rechargeMoney">
                  <el-input v-model.number="setRechargeForm.rechargeMoney" oninput="value=value.replace(/[^\d]/g,'')"
 @keyup.native="rechargeKeyup()"></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-12">
              <label for="name" class="col-sm-4 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              充值后余额
            </label>
             <div class="col-sm-7">
                <el-form-item>
                  <el-input v-model="setRechargeForm.rechargeAfter" readonly></el-input>
                </el-form-item>
             </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargePopVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRecharge('setRechargeForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="导入车辆"
      :visible.sync="importCarPopVisible"
      width="50%"
      @close="closePopImport"
    >
      <div style="padding: 0px">
        <el-form ref="setImportCarForm" :rules="rulesSetImportCarForm" :model="setImportCarForm">
          <div class="row">
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              车类
            </label>
             <div class="col-sm-9">
                <el-form-item prop="carTypeInfoId">
                  <!-- <el-input v-model="setRechargeForm.carTypeInfoId"></el-input> -->
                  <el-select
                          clearable=""
                          v-model="setImportCarForm.carTypeInfoId"
                          placeholder="请选择车类"
                        >
                          <el-option
                            v-for="item in importCarTypeList"
                            :key="item.vgsId"
                            :label="item.name"
                            :value="item.vgsId"
                          ></el-option>
                        </el-select>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              车型
            </label>
             <div class="col-sm-9">
                <el-form-item prop="carModelInfoId">
                  <!-- <el-input v-model="setImportCarForm.carModelInfoId"></el-input> -->
                  <el-select
                          clearable=""
                          v-model="setImportCarForm.carModelInfoId"
                          placeholder="请选择车型"
                        >
                          <el-option
                            v-for="item in importCarModel"
                            :key="item.vgsId"
                            :label="item.name"
                            :value="item.vgsId"
                          ></el-option>
                        </el-select>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-12">
              <label for="name" class="col-sm-2 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                Excel文件
              </label>
              <div class="col-sm-9 upload-zip">
                <!-- <input type="file" ref="clearFile" @change="getFile($event)" multiple="multiplt"> -->
                  <el-upload        
                    ref="upload"
                    name="carExcle"
                    :limit=1
                    :with-credentials="true"
                    :file-list="fileList"
                    :action="exportUrl"
                    :data="setImportCarForm"
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
        <el-button @click="importCarPopVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRechargeImport('setImportCarForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="月租车续费"
      :visible.sync="renewPopVisible"
      width="58%"
      @close="closePopRenew"
    >
      <div style="padding: 0px">
        <el-form ref="setRenewForm" :rules="rulesSetsetRenewFormForm" :model="setRenewForm">
          <div class="row">
            <div class="col-sm-6">
              <label for="name" class="col-sm-4 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
              车位组
            </label>
             <div class="col-sm-8">
                <el-form-item>
                  <el-input v-model="carPlaceName" readonly=""></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-4 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
              车位数
            </label>
             <div class="col-sm-8">
                <el-form-item>
                  <el-input v-model="carPlaceNum"></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-4 control-label text-right">
              <span style="color: red; line-height: 40px"></span>
              原有效期结束时间
            </label>
             <div class="col-sm-8">
                <el-form-item>
                  <el-input v-model="oldEffectiveTime" readonly=""></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-4 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              续费月份
            </label>
             <div class="col-sm-8 visitorVgsId">
                <el-form-item prop="monthCount">
                  <el-select
                          clearable=""
                          v-model="setRenewForm.monthCount"
                          placeholder="请选择续费月份"
                          @change="RenewalMonthChange"
                        >
                          <el-option
                            v-for="item in RenewalMonthList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-4 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              新有效开始时间
            </label>
             <div class="col-sm-8 visitorVgsId">
                <el-form-item prop="beginDate">

                  <el-date-picker 
                    v-model="setRenewForm.beginDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptionsEnd"
                    @change='beginDateChange'
                    placeholder="选择日期"
                    :readonly="beginDateReadonly"
                    >
                  </el-date-picker>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-4 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              新有效结束时间
            </label>
             <div class="col-sm-8">
                <el-form-item prop="endDate">
                  <el-input v-model="setRenewForm.endDate" readonly></el-input>
                </el-form-item>
             </div>
            </div>
            <div class="col-sm-6">
              <label for="name" class="col-sm-4 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              续费总金额
            </label>
             <div class="col-sm-8">
                <el-form-item prop="fee">
                  <el-input v-model="setRenewForm.fee"></el-input>
                </el-form-item>
             </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renewPopVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRechargeRenewal('setRenewForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./carManager.js"></script>
<style scoped lang="scss">
@import "./carManager.scss";
.plate-no{
  font-size: 30px;
  color: orangered;
  font-weight: bold;
  padding-right: 15px;
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
.visitorVgsId /deep/ .el-select,.visitorVgsId /deep/ .el-date-editor{
  width: 100%;
}
.visitorVgsId /deep/ .el-date-editor .el-icon-circle-close{
  display: none;
}
</style>
