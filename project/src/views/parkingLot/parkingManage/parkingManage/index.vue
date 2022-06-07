<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        车场管理
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <!-- <li>
          <a href="/parkManager"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li> -->
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 车场管理
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
                  <!-- <div class="col-lg-2 pl-0">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-input
                          clearable
                          style="width: 100%"
                          placeholder="搜索车场名称"
                          v-model="dataForm.name"
                        ></el-input>
                      </div>
                    </div>
                  </div> -->
                  <div class="col-lg-2 pl-0">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-select
                          clearable=""
                          v-model="dataForm.organizationId"
                          placeholder="选择所属渠道"
                        >
                          <el-option
                            v-for="item in channel"
                            :key="item.value"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-select
                          clearable=""
                          v-model="dataForm.payStatus"
                          placeholder="选择支付状态"
                        >
                          <el-option
                            v-for="item in payStatus"
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
                    <!-- <a @click="downErcode">
                    <a :href="imgurl+'/image/xqgj.jpg'" download>
                      <button id="btn_delete" type="button" class="btn btn-default">
                        <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>下载二维码
                      </button>
                    </a> -->
                  </div>
                  <!-- <div class="col-lg-7 pr-0 text-right">
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
                        <el-checkbox-group
                          v-model="tableSelect"
                          @change="checkboxChange"
                        >
                          <div
                            v-for="item in tableOption"
                            :key="item"
                            class="checkbox-div"
                          >
                            <el-checkbox
                              :label="item"
                              :key="item"
                            ></el-checkbox>
                          </div>
                        </el-checkbox-group>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div> -->
                </div>
                <table-cmp
                  :table-data="listData"
                  :table-label="tableLabel"
                  ref="tableChild"
                  :is-show-select="isShowSelect"
                >
                  <el-table-column
                    slot="operate"
                    label="下载二维码"
                    align="center"
                    width="150"
                   v-if="isScene">
                    <template slot-scope="scope">
                      <el-row>
                        <a
                          :href="
                            isdevelopment +
                            scope.row.id +
                            isName +
                            scope.row.name + isChannel + scope.row.currPayChannelId
                          "
                        >
                          <el-button
                            title="下载"
                            type="info"
                            icon="el-icon-download"
                            round
                            size="mini"
                          ></el-button>
                        </a>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column
                    slot="operate"
                    label="操作"
                    align="center"
                    width="300"
                 v-if="isScene" >
                    <template slot-scope="scope">
                      <el-row v-if="scope.row.payStatus === 0"> 
                        <el-button
                          title=""
                          type=""
                          icon="el-icon-open"
                          round
                          size="mini"
                          style="background:transparent;border:none;cursor:default;"
                        ></el-button>
                        <el-button
                          title="开通支付"
                          type="primary"
                          icon="el-icon-open"
                          round
                          size="mini"
                          @click="goOpenPayment(scope.row)"
                        ></el-button>
                        <el-button
                          title="查看"
                          type="primary"
                          icon="el-icon-reading"
                          round
                          size="mini"
                          @click="seeDataWaiting(scope.row)"
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
                      <el-row v-else-if="scope.row.payStatus === 1">
                        <el-button
                          title=""
                          type=""
                          icon="el-icon-open"
                          round
                          size="mini"
                          style="background:transparent;border:none;cursor:default;"
                        ></el-button>
                        <el-button
                          title="查看申请"
                          type="primary"
                          icon="el-icon-s-order"
                          round
                          size="mini"
                          @click="goApply(scope.row)"
                        ></el-button>
                        <el-button
                          title="查看"
                          type="primary"
                          icon="el-icon-reading"
                          round
                          size="mini"
                          @click="seeData(scope.row)"
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
                      <el-row v-else-if="scope.row.payStatus === 3">
                        <el-button
                          title=""
                          type=""
                          icon="el-icon-open"
                          round
                          size="mini"
                          style="background:transparent;border:none;cursor:default;"
                        ></el-button>
                        <el-button
                          title="重新申请"
                          type="primary"
                          icon="el-icon-s-order"
                          round
                          size="mini"
                          @click="goAgainPayment(scope.row)"
                        ></el-button>
                        <el-button
                          title="查看"
                          type="primary"
                          icon="el-icon-reading"
                          round
                          size="mini"
                          @click="seeData(scope.row)"
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
                      <el-row v-else class="text-right">
                        <el-button
                          title="配置支付"
                          type="primary"
                          icon="el-icon-edit"
                          round
                          size="mini"
                          @click="setPayment(scope.row)"
                        ></el-button>
                        <el-button
                          title="修改配置支付"
                          type="primary"
                          icon="el-icon-edit-outline"
                          round
                          size="mini"
                          @click="modifyConfiguration(scope.row)"
                        ></el-button>
                        <el-button
                          title="查看"
                          type="primary"
                          icon="el-icon-reading"
                          round
                          size="mini"
                          @click="seeData(scope.row)"
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
      title="配置支付"
      :visible.sync="setVisible"
      width="30%"
    >
      <div style="padding: 0px">
        <el-form ref="setPaymentForm" :rules="rulesSetPaymentForm" :model="setPaymentForm">
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              线上支付
            </label>
            <div class="col-sm-6">
              <el-form-item prop="payStatus">
                <el-radio-group v-model="setPaymentForm.payStatus">
                  <el-radio label="2">开启</el-radio>
                  <el-radio label="4">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              支付方式
            </label>
            <div class="col-sm-6 channel-pay">
              <el-form-item prop="paymentMode">
                <el-select
                  clearable=""
                  v-model="setPaymentForm.paymentMode"
                  placeholder="请选择支付方式"
                   @change="settlementTypeChange"
                >
                  <el-option
                    v-for="item in paymentMode"
                    :key="item.mchId"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right" >
              <span style="color: red; line-height: 40px">*</span>
              支付开通时间
            </label>
            <div class="col-sm-6">
              <el-form-item prop="paydataTime">
                <el-input v-model="setPaymentForm.paydataTime" disabled></el-input>
              </el-form-item>
            </div>
            <div class="col-sm-3">
              <el-button type="primary" @click="seePlayApply"
                >申请信息</el-button
              >
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              支付渠道
            </label>
            <div class="col-sm-6 channel-pay">
              <el-form-item prop="payChannel">
                 <el-input v-model="setPaymentForm.payChannel" disabled></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              商户ID
            </label>
            <div class="col-sm-6">
              <el-form-item prop="id">
                <el-input v-model="setPaymentForm.mchId" disabled></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setVisible = false">取 消</el-button>
        <el-button type="primary" @click="setPayMode('setPaymentForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!---修改支付配置---->
    <el-dialog
      title="修改支付配置"
      :visible.sync="dialogPassExamine"
      width="580px"
      class="el-dialog-reset">
      <div style="padding:0px;">
        <!-- <label for="mchId">商户id</label>        
        <el-input id="mchId" v-model="formExamine.mchId"></el-input> -->
        <el-form ref="formExamine" :rules="rulesFormExamine" :model="formExamine">
          <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                支付渠道名称
              </label>
              <div class="col-sm-9">
                <el-form-item prop="name">
                  <el-input v-model="formExamine.name"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                商户id
              </label>
              <div class="col-sm-9">
                <el-form-item prop="mchId">
                  <el-input v-model="formExamine.mchId"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                支付渠道车场Id
              </label>
              <div class="col-sm-9">
                <el-form-item prop="payChannelParkId">
                  <el-input v-model="formExamine.payChannelParkId"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPassExamine = false">取 消</el-button>
        <el-button type="primary" @click="passCheckPayData('formExamine')">确 定</el-button>
      </span>
     </el-dialog>
  </div>
</template>
<script src="./parkingManage.js"></script>
<style scoped lang="scss">
@import "./parkingManage.scss";
</style>
