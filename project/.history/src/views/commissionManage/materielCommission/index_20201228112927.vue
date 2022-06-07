<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        物料返佣 - 返佣管理
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 物料返佣
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="物料返佣设置" name="first">
              <div class="form-horizontal">
                <div class="col-lg-2 pl-0">
                  <div class="form-group">
                    <div class="col-md-12">
                      <el-input
                        clearable
                        style="width: 100%"
                        placeholder="搜索子渠道名称"
                        v-model="PersonListForm.childChanName"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 pr-0">
                  <div class="btn-group">
                    <button
                      id="btn_device_search"
                      type="button"
                      class="btn btn-primary"
                      @click="getPersonList"
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
              <table-cmp
                :table-data="tableData"
                :table-label="tableLabel"
                ref="tableChild"
                :is-show-select="isShowSelect"
              >
                <el-table-column slot="operate" label="操作" width="180">
                  <template slot-scope="scope">
                    <el-row>
                      <!-- <i class="el-icon-edit">IC卡</i>
                             <i class="el-icon-delete">删除</i> -->
                      <el-button
                        title="返佣设置"
                        type="primary"
                        icon="el-icon-edit"
                         
                        size="mini"
                        @click="goSet(scope.row)"
                      ></el-button>
                      <el-button
                        title="返佣修改记录"
                        type="primary"
                        icon="el-icon-chat-line-square"
                         
                        size="mini"
                        @click="reviseRrcord(scope.row.id)"
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
            </el-tab-pane>
            <el-tab-pane label="物料返佣申请" name="second">
              <div class="form-horizontal">
                <div class="col-lg-2">
                  <div class="form-group">
                    <div class="col-md-12">
                      <el-select
                        clearable=""
                        v-model="PersonListForm1.organizationId"
                        placeholder="选择所属渠道"
                        @change="channelChange"
                      >
                        <el-option
                          v-for="item in channel"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 pl-0">
                  <div class="form-group">
                    <div class="col-md-12">
                      <el-input
                        clearable
                        style="width: 100%"
                        placeholder="搜索车场名称"
                        v-model="PersonListForm1.parkName"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2">
                  <div class="form-group">
                    <div class="col-md-12">
                      <el-select
                        clearable=""
                        v-model="PersonListForm1.applyStatus"
                        placeholder="选择状态"
                      >
                        <el-option
                          v-for="item in status"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 pr-0">
                  <div class="btn-group">
                    <button
                      id="btn_device_search"
                      type="button"
                      class="btn btn-primary"
                      @click="getCheckList"
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
                      @click="resetBtn1"
                    >
                      <span class="fa fa-reply" aria-hidden="true"></span>重置
                    </button>
                  </div>
                </div>
              </div>
              <table-cmp
                :table-data="tableData1"
                :table-label="tableLabel1"
                ref="tableChild"
                :is-show-select="isShowSelect"
              >
                <el-table-column slot="operate" label="操作" width="180">
                  <template slot-scope="scope">
                    <el-row v-if="scope.row.status === 0">
                      <el-button
                        title="申请"
                        type="primary"
                        icon="el-icon-edit"
                         
                        size="mini"
                        @click="goEdit(scope.row)"
                      ></el-button>
                      <el-button
                          title=""
                          type=""
                          icon="el-icon-open"
                           
                          size="mini"
                          style="backg :transparent;border:none;cursor:default;"
                        ></el-button>
                    </el-row>
                    <el-row
                      v-else-if="
                        scope.row.status === 1
                      "
                    >
                      <el-button
                        title="查看"
                        type="primary"
                        icon="el-icon-document"
                         
                        size="mini"
                        @click="goEdit(scope.row)"
                      ></el-button>
                      <el-button
                          title=""
                          type=""
                          icon="el-icon-open"
                           
                          size="mini"
                          style="backg :transparent;border:none;cursor:default;"
                        ></el-button>
                    </el-row>
                    <el-row v-else-if="scope.row.status === 2">
                      <el-button
                        title="查看"
                        type="primary"
                        icon="el-icon-document-checked"
                         
                        size="mini"
                        @click="goEdit(scope.row)"
                      ></el-button>
                      <el-button
                          title=""
                          type=""
                          icon="el-icon-open"
                           
                          size="mini"
                          style="backg :transparent;border:none;cursor:default;"
                        ></el-button>
                    </el-row>
                    <el-row v-else-if="scope.row.status === 3">
                      <el-button
                        title="查看"
                        type="primary"
                        icon="el-icon-document-delete"
                         
                        size="mini"
                        @click="goEdit(scope.row)"
                      ></el-button>
                      <el-button
                          title=""
                          type=""
                          icon="el-icon-open"
                           
                          size="mini"
                          style="backg :transparent;border:none;cursor:default;"
                        ></el-button>
                    </el-row>
                    <el-row
                      v-else-if="
                        scope.row.status === 4
                      "
                    >
                      <el-button
                        title="查看"
                        type="primary"
                        icon="el-icon-document"
                         
                        size="mini"
                        @click="goEdit(scope.row)"
                      ></el-button>
                      <el-button
                        title="查看"
                        type="primary"
                        icon="el-icon-edit"
                         
                        size="mini"
                        @click="againApply(scope.row)"
                      ></el-button>
                    </el-row>
                  </template>
                </el-table-column>
              </table-cmp>
              <div class="block mt-10">
                <el-pagination
                  @size-change="handleSizeChange1"
                  @current-change="handleCurrentChange1"
                  :current-page="currentPage1"
                  :page-sizes="[10, 15, 20, 25]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total1"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="物料返佣对帐" name="third">
              <div class="form-horizontal">
                <div class="col-lg-2 pl-0">
                  <div class="form-group">
                    <div class="col-md-12">
                      <el-date-picker
                        v-model="month"
                        value-format="yyyy-MM"
                        type="month"
                        placeholder="选择月份"
                        @change="changeTime"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 pr-0">
                  <div class="btn-group">
                    <button
                      id="btn_device_search"
                      type="button"
                      class="btn btn-primary"
                      @click="getLeftData"
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

              <table-cmp
                :table-data="tableData2"
                :table-label="tableLabel2"
                ref="tableChild"
                :is-show-select="isShowSelect"
              >
                <el-table-column
                  slot="operate"
                  label="操作"
                  align="left"
                  width="180"
                >
                  <template slot-scope="scope">
                    <el-row v-if="scope.row.settlementStatus === 0">
                      <el-button
                        title="查看明细"
                        type="primary"
                        icon="el-icon-document"
                         
                        size="mini"
                        @click="rewardSet(scope.row)"
                      ></el-button>
                      <el-button
                        
                        title="提交结算"
                        type="primary"
                        icon="el-icon-postcard"
                         
                        size="mini"
                        @click="submitSettlement(scope.row)"
                      ></el-button>
                    </el-row >
                    <el-row v-else>
                      <el-button
                        title="查看明细"
                        type="primary"
                        icon="el-icon-document"
                         
                        size="mini"
                        @click="rewardSet(scope.row)"
                      ></el-button>
                      <el-button
                          title=""
                          type=""
                          icon="el-icon-open"
                           
                          size="mini"
                          style="backg :transparent;border:none;cursor:default;"
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
                  :total="total2"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <!-- 物料奖励申请 -->
      <el-dialog
        title="物料奖励申请"
        :visible.sync="popRewardApply"
        width="56%"
      >
        <div style="padding: 0px">
          <div class="col-sm-12 mb-20 steps">
            <el-steps :active="active" align-center v-show="materielSteps">
              <el-step title="1.申请物料"></el-step>
              <el-step title="2.审核通过"></el-step>
              <el-step title="3.物料铺设"></el-step>
              <el-step title="4.考核通过"></el-step>
              <el-step title="5.发放奖励"></el-step>
            </el-steps>
          </div>
          <div class="col-sm-12 mb-30" v-show="isExamine">
            <div class="col-sm-6">
              <span class="">申请编号：</span>
              <span>{{ setRewardApplyForm.applyNo }}</span>
            </div>
            <div class="col-sm-6 text-right">
              <span class="pr-10">状态</span>
              <el-button type="danger" @click="rejectAudit">拒绝审核</el-button>
            </div>
            <div class="col-sm-6 mt-20">
              <span>停车场</span> {{ setRewardApplyForm.parkName }}
            </div>
            <div class="col-sm-6 text-right mt-20">
              <span class="dot"></span>
              <span class="pr-10">待审核</span>
              <el-button type="primary" @click="passAudit">通过审核</el-button>
            </div>
          </div>
          <div class="col-sm-12 mb-30" v-show="isAssessment">
            <div class="col-sm-6">
              <span class="">申请编号：</span>
              <span>{{ setRewardApplyForm.applyNo }}</span>
            </div>
            <div class="col-sm-6 text-right">
              <span class="pr-10">状态</span>
              <el-button type="danger" @click="rejectAssessment"
                >拒绝考核</el-button
              >
            </div>
            <div class="col-sm-6 mt-20">
              <span>停车场</span> {{ setRewardApplyForm.parkName }}
            </div>
            <div class="col-sm-6 text-right mt-20">
              <span class="dot"></span>
              <span class="pr-10">待考核</span>
              <el-button type="primary" @click="passAssessment"
                >通过考核</el-button
              >
            </div>
          </div>
          <div class="col-sm-12 mb-30" v-show="isReject">
            <div class="col-sm-6">
              <span class="">申请编号：</span>
              <span></span>
            </div>
            <div class="col-sm-6 text-right">
              <span>状态</span>
            </div>
            <div class="col-sm-6 mt-20">
              <span>停车场</span>
            </div>
            <div class="col-sm-6 text-right mt-20">
              <span class="dot"></span>
              <span>已拒绝</span>
            </div>
          </div>
          <div class="col-sm-12 mb-30" v-show="isPass">
            <div class="col-sm-6">
              <span class="">申请编号：</span>
              <span>{{ setRewardApplyForm.applyNo }}</span>
            </div>
            <div class="col-sm-6 text-right">
              <span>状态</span>
            </div>
            <div class="col-sm-6 mt-20">
              <span>停车场</span> {{ setRewardApplyForm.parkName }}
            </div>
            <div class="col-sm-6 text-right mt-20">
              <span class="dot"></span>
              <span>已通过</span>
            </div>
          </div>
          <div class="col-sm-12">
            <el-form
            ref="setRewardApplyForm"
            :model="setRewardApplyForm"
            :rules="setRewardApplyFormRules"
          >
            <div class="row" v-if="isEditInfo">
              <div class="col-sm-6">
                <label for="name" class="col-sm-3 control-label text-right">
                  <span style="color: red; line-height: 40px">*</span>
                  车场联系人
                </label>
                <div class="col-sm-9">
                  <el-form-item prop="contacts">
                    <el-input v-model="setRewardApplyForm.contacts"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6">
                <label for="name" class="col-sm-3 control-label text-right">
                  <span style="color: red; line-height: 40px">*</span>
                  联系电话
                </label>
                <div class="col-sm-9">
                  <el-form-item prop="tel">
                    <el-input v-model="setRewardApplyForm.tel"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6">
                <label for="name" class="col-sm-3 control-label text-right pr-0">
                  <span style="color: red; line-height: 40px">*</span>
                  物料铺设时间
                </label>
                <div class="col-sm-9">
                  <el-form-item prop="layingStage">
                    <!-- <el-input v-model="setRewardApplyForm.layingStage"></el-input> -->
                    <el-select
                      clearable=""
                      v-model="setRewardApplyForm.layingStage"
                      placeholder="请选择物料铺设时间"
                    >
                      <el-option
                        v-for="item in layingStage"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6">
                <label for="name" class="col-sm-3 control-label text-right">
                  <span style="color: red; line-height: 40px">*</span>
                  详细地址
                </label>
                <div class="col-sm-9">
                  <el-form-item prop="address">
                    <el-input v-model="setRewardApplyForm.address"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="row" v-if="isEditInfoAfter">
              <div class="col-sm-6 pb-10">
                <label for="name" class="col-sm-3 control-label lh-40 mt-20 mb-20">
                  车场联系人
                </label>
                <div class="col-sm-9 apply-content">
                  <el-form-item prop="paydataTime">
                    <span>{{ setRewardApplyForm.contacts }}</span>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6 pb-10">
                <label for="name" class="col-sm-3 control-label lh-40 mt-20 mb-20">
                  联系电话
                </label>
                <div class="col-sm-9 apply-content">
                  <el-form-item prop="paydataTime">
                    <span>{{ setRewardApplyForm.tel }}</span>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6 pb-10">
                <label for="name" class="col-sm-3 control-label pr-0 lh-40 mt-20 mb-20">
                  物料铺设时间
                </label>
                <div class="col-sm-9 apply-content">
                  <el-form-item prop="paydataTime">
                    <span>{{ setRewardApplyForm.layingStage }}</span>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6 pb-10">
                <label for="name" class="col-sm-3 control-label lh-40 mt-20 mb-20">
                  详细地址
                </label>
                <div class="col-sm-9 apply-content">
                  <el-form-item prop="paydataTime">
                    <span>{{ setRewardApplyForm.address }}</span>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6 pb-10">
                <label for="name" class="col-sm-3 control-label lh-40 mt-20 mb-20">
                  申请时间
                </label>
                <div class="col-sm-9 apply-content">
                  <el-form-item prop="paydataTime">
                    <span>{{ setRewardApplyForm.applyTimes }}</span>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6 pb-10" v-show="examineTimes">
                <label for="name" class="col-sm-3 control-label lh-40 mt-20 mb-20">
                  审核时间
                </label>
                <div class="col-sm-9 apply-content">
                  <el-form-item prop="paydataTime">
                    <span>{{ setRewardApplyForm.examineTimes }}</span>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6 pb-10" v-show="examineResult">
                <label for="name" class="col-sm-3 control-label lh-40 mt-20 mb-20">
                  审核结果
                </label>
                <div class="col-sm-9 apply-content">
                  <el-form-item prop="paydataTime">
                    <span>{{ setRewardApplyForm.checkStatus }}</span>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6 pb-10" v-show="assessmentTimes">
                <label for="name" class="col-sm-3 control-label lh-40 mt-20 mb-20">
                  考核时间
                </label>
                <div class="col-sm-9 apply-content">
                  <el-form-item prop="paydataTime">
                    <span>{{ setRewardApplyForm.assessmentTimes }}</span>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-6 pb-10" v-show="assessmentResult">
                <label for="name" class="col-sm-3 control-label lh-40 mt-20 mb-20">
                  考核结果
                </label>
                <div class="col-sm-9 apply-content">
                  <el-form-item prop="paydataTime">
                    <span>{{ setRewardApplyForm.assessmentResult }}</span>
                  </el-form-item>
                </div>
              </div>
              <div class="col-sm-12" v-show="isRejectCause">
                <label for="name" class="col-sm-1 control-label reject-cause">
                  拒绝原因
                </label>
              </div>
              <div class="col-sm-10 reject-content" v-show="isRejectCause">
                <el-form-item prop="paydataTime">
                  <el-input
                    type="textarea"
                    disabled
                    v-model="setRewardApplyForm.rejectCause"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer" v-show="isSumb">
          <el-button @click="popRewardApply = false">取 消</el-button>
          <el-button type="primary" @click="materielApply('setRewardApplyForm')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </section>

    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="previewImg"
    />

    <msg-box
      :popVisible.sync="popVisible"
      :popTitle="popTitle"
      :popContent="popContent"
    ></msg-box>
    <!-- 物料返佣设置 -->
    <el-dialog title="物料返佣配置" :visible.sync="popCommission" width="52%">
      <div style="padding: 0px">
        <el-form ref="setCommission" :rules="rules" :model="setCommission">
          <div class="row">
            <label for="name" class="col-sm-2 control-label">
              <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">
                物料返佣
              </h4>
            </label>
            <div class="col-sm-9 text-right">
              <el-form-item prop="payStatus">
                <el-switch v-model="setCommission.enabled"></el-switch>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-2 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              有效时间
            </label>
            <div class="col-sm-9">
              <el-form-item prop="paydataTime">
                <!-- <el-input v-model="setCommission.paydataTime"></el-input> -->
                <el-date-picker
                  v-model="setCommission.paydataTime"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  @change="paydataTimeChange"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-2 control-label text-right">
              <span style="color: red; line-height: 40px">*</span>
              单个车场返佣(元)
            </label>
            <div class="col-sm-9 channel-pay">
              <el-form-item prop="rewardPark">
                <el-input
                  v-model="setCommission.rewardPark"
                  oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 pl-0 mt-30">
              <label for="name" class="col-sm-2 control-label text-right pl-0">
                <h4 class="add-h4 font-size-16 font-weight-bold">
                  详细规则说明
                </h4>
              </label>
              <div class="col-sm-9 text-right">
                <span class="material-rules" @click="materialRules = true">
                  物料返佣规则</span
                >
              </div>
            </div>
            <div class="col-sm-9 openAccount-rule">
              <p>1、物料活跃定义：单车场物料1天内被扫码次数≥1；</p>
              <p>
                2、在活动有效期内：车场可轮转考核，3个月内如达到标准，均可拿到返佣政策；
              </p>
              <p>
                3、考核当月，车场至少有5次扫码记录，同一用户多车场多次核销仅算一笔；
              </p>
              <p>4、结算月，车场需保持动销；且物料活跃天数大于等于1；</p>
              <p>
                5、服务商需要协调车场协同云纵&支付宝进行物料铺设，以保证物料的活跃率；
              </p>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="popCommission = false">取 消</el-button>
        <el-button type="primary" @click="materielSetSave('setCommission')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="rejectTitle"
      :visible.sync="dialogRejectVisible"
      width="30%"
    >
      <div class="row">
        <el-form
          :model="auditOperation"
          :rules="rejectRules"
          ref="auditOperation"
          style="padding-bottom: 30px"
        >
          <div class="col-sm-12 pl-20 pb-10">
            <span class="el-icon-info"></span><span>处理说明</span>
          </div>
          <div class="col-sm-12 pb-20">
            <span class="pl-20"
              >管理人员对此物料奖励申请进行拒绝考核处理，必需填写拒绝原因。</span
            >
          </div>
          <div class="col-sm-12 p-0">
            <label for="name" class="col-sm-2 control-label text-right p-0">
              <span style="color: red; line-height: 40px">*</span>
              拒绝原因
            </label>
            <div class="col-sm-10">
              <el-form-item prop="refuseReason">
                <el-input
                  type="textarea"
                  v-model="auditOperation.refuseReason"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRejectVisible = false">取 消</el-button>
        <el-button type="primary" @click="rejectCause('auditOperation')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="返佣规则说明" :visible.sync="materialRules" width="52%">
      <div class="row" style="padding: 0px">
         <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">物料返佣规则</h4>
         <div class="col-sm-9 openAccount-rule">
           <p>1、当月20号前上线，正常考核自然月日均；当月20号后上线，轮转到次月日均考核</p>
           <p>2、在返佣考核有效期内：车场可轮转考核，如若符合更高阶梯，将返阶梯差价</p>
           <p>3、仅限支付宝笔数且单笔有效订单在1-500元内</p>
           <p>4、必须满足物料到场且符合张贴规范（规范要求见下文物料张贴规范</p>
         </div>
      </div>
      <div class="row mt-30" style="padding: 0px">
         <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">物料张贴规范</h4>
         <div class="col-sm-9 openAccount-rule">
           <p>1、场地内可以采用支付宝专有物料，也可以采用业主方\合作伙伴的聚合物料。</p>
           <p>2、采用支付宝专有物料的，要求如下：</p>
           <p> （1）所有出口岗亭，各至少有一个物料；</p>
           <p> （2）停车场场内至少有两个物料，所在位置限于电梯厅、出入停车场的人行通道、出入口岗亭；</p>
           <p> （3）物料类型以下任选：海报/展架/地贴/道闸贴/门贴/台卡/立牌/横幅/KT版等；</p>
           <p> （4）物料设计须符合支付宝设计规范；</p>
           <p>3、采用聚合物料的，要求如下：</p>
           <p> （1）场地所有物料均有明显支付宝元素；</p>
           <p> （2）支付宝logo及字样与其他支付渠道的logo及字样，在大小、字体、颜色三方面保持同等地位；</p>
           <p> （3）在排列顺序上，若以并列关系排列，则先后次序可忽略；若其他某支付渠道位置有明显突出的，支付宝明显弱化的，则不可接受。</p>
           <p>4、该停车场标准物料至少持续3个月留存；</p>
         </div>
      </div>
      <div class="row mt-30" style="padding: 0px">
         <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">补充说明</h4>
         <div class="col-sm-9 openAccount-rule">
           <p>1、本协议中所指的有效交易，是指用户使用支付宝停车付费功能，即支付宝当面付、高级手机网站支付、高级手机app支付、授权付款、车主平台多费率签约授权付款等产品（具体产品限定以基础接入协作返佣、基础保障协作返佣中各自约定的为准），交易的订单金额在1元（含）至500元（含）的交易；符合以下任一情形的，均为无效交易：</p>
           <p> （1）全额退款交易，部分退款交易的已退款部分交易；</p>
           <p> （2）风险交易，包括且不限于作弊、刷信、刷单、虚假交易、套现等（支付宝有权单方对风险交易做出判定）；</p>
           <p> （3）支付宝就同一笔交易已经向其他支付宝服务商等合作伙伴支付了业务协作费的，该笔交易不计入有效交易；</p>
           <p> （4）本协议终止或客户与支付宝任意一方终止合作后所产生的交易；</p>
           <p> （5） 交易的订单金额小于1元或大于500元的交易。</p>
           <p>2、结算方式：月结，次月结算上一个月业务协作费。</p>
           <p>3、针对同一个客户所产生的同一笔有效交易，服务商最多只能获得一次业务协作费。</p>
           <p>4、本返佣方案是支付宝停车行业基础返佣方案，若一个场地（parkingid）已经参加支付宝停车行业其他返佣协作方案，且其他返佣协作费方案明确与基础返佣方案互斥的，则该场地不参与本方案的所有返佣。</p>
         </div>
      </div>
      
    </el-dialog>
  </div>
</template>
<script src="./materielCommission.js"></script>
<style scoped lang="scss">
@import "./materielCommission.scss";
.box-body /deep/ .el-table thead.is-group th {
  backg : #fff;
}
.openAccount-rule {
  width: 84% !important;
  //  margin-left: 100px;
  backg -color: rgba(242, 242, 242, 1);
  padding: 15px;
  margin-left: 5%;
}
.steps /deep/ .el-step__title.is-process {
  color: #3a8ee6;
}
.steps /deep/ .el-step__head.is-process {
  color: #3a8ee6;
  border-color: #3a8ee6;
}
.dot {
  width: 6px;
  height: 6px;
  backg -color: #0099ff;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
.reject-cause {
  width: 12.5% !important;
}
.reject-content {
  width: 100% !important;
  // padding-left: 12.5% !important;
}
.material-rules {
  color: #0099ff;
  cursor: pointer;
}
.lh-40{
  line-height: 40px;
}
// .apply-content{
//   backg : #f0f0f0;
// }
.apply-content /deep/ .el-form-item{
  margin: 20px 0;
}
</style>
