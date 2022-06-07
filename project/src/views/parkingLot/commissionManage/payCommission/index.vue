<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        支付返佣 - 返佣管理
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 支付返佣
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="支付返佣设置" name="first">
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
                      @click="querySearch"
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
              <el-table :data="tableData" style="width: 100%; background: #fff">
                <el-table-column label="" align="center">
                  <el-table-column
                    prop="orgName"
                    label="子渠道名称"
                    align="left"
                  ></el-table-column>
                </el-table-column>
                <el-table-column
                  label="支付宝"
                  align="center"
                  v-if="isAliPayment"
                >
                  <el-table-column
                    prop="aliCalculationMethod"
                    label="奖励标准"
                    width="120"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="aliTempTime"
                    label="有效时间"
                    width="220"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="aliEnabled"
                    label="状态"
                    width="120"
                    align="center"
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="微信"
                  align="center"
                  v-if="isWechatPayment"
                >
                  <el-table-column
                    prop="wechatCalculationMethod"
                    label="奖励标准"
                    width="120"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wechatTempTime"
                    label="有效时间"
                    width="220"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wechatEnabled"
                    label="状态"
                    width="120"
                    align="center"
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column label="" width="150">
                  <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                      <el-row>
                        <el-button
                          title="奖励设置"
                          icon="el-icon-setting"
                          @click="rewardSet(scope.row)"
                          type="primary"
                          round
                          size="small"
                        ></el-button>
                        <el-button
                          title="奖励修改记录"
                          icon="el-icon-document"
                          type="primary"
                          round
                          size="small"
                          @click="reward(scope.row.organizationId)"
                        ></el-button>
                      </el-row>
                    </template>
                  </el-table-column>
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
            <el-tab-pane label="支付返佣对帐" name="second">
              <div class="form-horizontal">
                <!-- <div class="col-lg-2 pl-0">
                  <div class="form-group">
                    <div class="col-md-12">
                      <el-date-picker
                        v-model="PersonListForm1.year"
                        type="year"
                        placeholder="选择年"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                </div> -->
                <div class="col-lg-2">
                  <div class="form-group">
                    <div class="col-md-12 p-0">
                      <el-date-picker
                        v-model="reconciliationTime"
                        value-format="yyyy-MM"
                        type="month"
                        placeholder="选择月"
                        @change="reconciliationChangeTime"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 pr-0">
                  <div class="btn-group">
                    <button
                      id="btn_device_search"
                      type="button"
                      class="btn btn-primary"
                      @click="querySearch1"
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
              <div id="toolbar" class="btn-group-box" style="width: 100%">
                <div class="btn-group" data-toggle="buttons">
                  <button
                    id="btn_delete"
                    type="button"
                    class="btn btn-default"
                    @click="exportBtn"
                  >
                    <span
                      class="glyphicon glyphicon-arrow-down"
                      aria-hidden="true"
                    ></span
                    >导出
                  </button>
                </div>
                <!-- <div class="pr-0 text-right">
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
                        v-model="tableSelect1"
                        @change="checkboxChange1"
                      >
                        <div
                          v-for="item in tableOption1"
                          :key="item"
                          class="checkbox-div"
                        >
                          <el-checkbox :label="item" :key="item"></el-checkbox>
                        </div>
                      </el-checkbox-group>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div> -->
              </div>
              <el-table
                :data="tableData1"
                style="width: 100%; background: #fff; margin-top: 10px"
              >
                <el-table-column label=""
                  ><el-table-column type="selection" width="55">
                  </el-table-column
                ></el-table-column>
                <el-table-column label="" align="center">
                  <el-table-column
                    prop="reconciliationMonth"
                    label="对帐月份"
                    align="center"
                    width="100"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="" align="center">
                  <el-table-column
                    prop="subChannelName"
                    label="子渠道名称"
                    align="center"
                  ></el-table-column>
                </el-table-column>
                <el-table-column
                  label="支付宝"
                  align="center"
                  v-if="isAliPaymentReconciliation"
                >
                  <el-table-column
                    prop="aliAmountNum"
                    label="支付总笔数"
                    width="120"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="aliAmountmoney"
                    label="支付总金额（元）"
                    align="center"
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="aliCommissionAmount"
                    label="返佣总金额（元）"
                    width="150"
                    align="center"
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="微信"
                  align="center"
                  v-if="isWeChatPaymentReconciliation"
                >
                  <el-table-column
                    prop="wechatAmountNum"
                    label="支付总笔数"
                    width="120"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wechatAmountmoney"
                    label="支付总金额（元）"
                    align="center"
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wechatCommissionAmount"
                    label="返佣总金额（元）"
                    width="150"
                    align="center"
                  >
                  </el-table-column>
                </el-table-column>
                <el-table-column label="">
                  <el-table-column
                    prop="status"
                    label="状态"
                    align="center"
                    width="80"
                  ></el-table-column>
                </el-table-column>
                <el-table-column label="">
                  <el-table-column label="操作" align="center" width="120">
                    <template slot-scope="scope">
                      <el-row  v-if="
                        scope.row.settlementStatus === 0
                      ">
                        <el-button
                          title="查看明细"
                          type="primary"
                          icon="el-icon-edit"
                          round
                          size="mini"
                          @click="goCheck(scope.row)"
                        ></el-button>
                        <el-button
                          title="提交结算"
                          type="primary"
                          icon="el-icon-tickets"
                          round
                          size="mini"
                          @click="settlement(scope.row)"
                        ></el-button>
                      </el-row>
                      <el-row  v-else>
                        <el-button
                          title="查看明细"
                          type="primary"
                          icon="el-icon-edit"
                          round
                          size="mini"
                          @click="goCheck(scope.row)"
                        ></el-button>
                        <el-button
                          title=""
                          type=""
                          icon="el-icon-open"
                          round
                          size="mini"
                          style="background:transparent;border:none;cursor:default;"
                        ></el-button>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
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
          </el-tabs>
        </div>
      </div>
      <!-- 奖励设置 -->
      <el-dialog title="支付返佣配置" :visible.sync="popReward" width="52%">
        <div style="padding: 0px">
          <el-tabs v-model="openActiveName" type="card" @tab-click="openHandleClick">
            <el-tab-pane label="支付宝" name="first">
              <el-form
                ref="setRewardForm"
                :model="setRewardForm"
                :rules="setRewardFormRules"
              >
                <div class="pay-type">
                  <div class="row">
                    <label for="name" class="col-sm-2 control-label">
                      <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">
                        支付返佣
                      </h4>
                    </label>
                    <div class="col-sm-9 text-right" v-show="isOpenAli">
                      <el-form-item prop="alipayEnabled">
                        <el-switch
                          v-model="setRewardForm.alipayEnabled"
                        ></el-switch>
                      </el-form-item>
                    </div>
                    <div class="col-sm-9 text-right" v-show="!isOpenAli">
                      <el-form-item prop="wechatEnabled">
                        <el-switch
                          v-model="setRewardForm.wechatEnabled"
                        ></el-switch>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label for="name" class="col-sm-2 control-label text-right">
                      <span style="color: red; line-height: 40px">*</span>
                      有效时间
                    </label>
                    <div class="col-sm-9 pl-9">
                      <el-form-item prop="paydataTime">
                        <el-date-picker
                          v-model="setRewardForm.paydataTime"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          @change="changeTime"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <label
                        for="name"
                        class="col-sm-2 control-label text-right pl-0 pr-25"
                      >
                        <span style="color: red; line-height: 40px">*</span>
                        奖励标准
                      </label>
                      <div class="col-sm-3 p-0 pl-9 w-change-3">
                        <el-form-item prop="calculationMethod">
                          <!-- <el-input v-model="item.monthDayNum"></el-input> -->
                          <el-select
                            clearable=""
                            v-model="setRewardForm.calculationMethod"
                            placeholder="选择奖励标准"
                            @change="selectRewardstandard"
                          >
                            <el-option
                              v-for="item in rewardstandard"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="col-sm-7 w-change-7" v-if="isRewardType">
                        <label
                          for="name"
                          class="col-sm-4 control-label text-right p-0"
                        >
                          <span style="color: red; line-height: 40px">*</span>
                          奖励百分比
                        </label>
                        <div class="col-sm-7">
                          <el-form-item prop="rewardProportion">
                            <el-input
                              v-model.number="setRewardForm.rewardProportion" oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                            ></el-input>
                          </el-form-item>
                          <!-- <span>注：请加上%</span> -->
                        </div>
                      </div>
                      <div class="col-sm-7 w-change-7" v-else>
                        <label
                          for="name"
                          class="col-sm-4 control-label text-right p-0"
                        >
                          <span style="color: red; line-height: 40px">*</span>
                          单笔奖励（元）
                        </label>
                        <div class="col-sm-7">
                          <el-form-item prop="rewardPark">
                            <el-input
                              v-model.number="setRewardForm.rewardPark"
                            ></el-input>
                          </el-form-item>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 mt-20" v-show="isLadder">
                      <div class="col-sm-9 col-sm-offset-1 pl-50">
                        <span
                          >注：在返佣考核有效期内：车场可轮转考核，如若符合更高阶梯，将返阶梯差价</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 pl-0 mt-30">
                      <label
                        for="name"
                        class="col-sm-2 control-label text-right pl-0"
                      >
                        <h4 class="add-h4 font-size-16 font-weight-bold">
                          支付返佣规则
                        </h4>
                      </label>
                      <div class="col-sm-9 text-right">
                        <span class="material-rules " @click="materialRules = true">详细规则说明</span>
                      </div>
                    </div>
                    <div class="col-sm-9 openAccount-rule">
                      <p>
                        1、当月20号前上线，正常考核自然月日均；当月20号后上线，轮转到次月日均考核。
                      </p>
                      <p>2、必须满足物料到场且符合张贴规范</p>
                    </div>
                  </div>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="微信" name="second">
              <el-form
                ref="setRewardForm"
                :model="setRewardForm"
                :rules="setRewardFormRules"
              >
                <div class="pay-type">
                  <div class="row">
                    <label for="name" class="col-sm-2 control-label">
                      <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">
                        支付返佣
                      </h4>
                    </label>
                    <div class="col-sm-9 text-right" v-show="isOpenAli">
                      <el-form-item prop="alipayEnabled">
                        <el-switch
                          v-model="setRewardForm.alipayEnabled"
                        ></el-switch>
                      </el-form-item>
                    </div>
                    <div class="col-sm-9 text-right" v-show="!isOpenAli">
                      <el-form-item prop="wechatEnabled">
                        <el-switch
                          v-model="setRewardForm.wechatEnabled"
                        ></el-switch>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label for="name" class="col-sm-2 control-label text-right">
                      <span style="color: red; line-height: 40px">*</span>
                      有效时间
                    </label>
                    <div class="col-sm-9 pl-9">
                      <el-form-item prop="paydataTime">
                        <el-date-picker
                          v-model="setRewardForm.paydataTime"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          @change="changeTime"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <label
                        for="name"
                        class="col-sm-2 control-label text-right pl-0 pr-25"
                      >
                        <span style="color: red; line-height: 40px">*</span>
                        奖励标准
                      </label>
                      <div class="col-sm-3 p-0 pl-7 w-change-3">
                        <el-form-item prop="calculationMethod">
                          <!-- <el-input v-model="item.monthDayNum"></el-input> -->
                          <el-select
                            clearable=""
                            v-model="setRewardForm.calculationMethod"
                            placeholder="选择奖励标准"
                            @change="selectRewardstandard"
                          >
                            <el-option
                              v-for="item in rewardstandard"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="col-sm-7 w-change-7" v-if="isRewardType">
                        <label
                          for="name"
                          class="col-sm-4 control-label text-right p-0"
                        >
                          <span style="color: red; line-height: 40px">*</span>
                          奖励百分比
                        </label>
                        <div class="col-sm-7">
                          <el-form-item prop="rewardProportion">
                            <el-input
                              v-model.number="setRewardForm.rewardProportion"
                            ></el-input>
                          </el-form-item>
                          <!-- <span>注：请加上%</span> -->
                        </div>
                      </div>
                      <div class="col-sm-7 w-change-7" v-else>
                        <label
                          for="name"
                          class="col-sm-4 control-label text-right p-0"
                        >
                          <span style="color: red; line-height: 40px">*</span>
                          单笔奖励（元）
                        </label>
                        <div class="col-sm-7">
                          <el-form-item prop="rewardPark">
                            <el-input
                              v-model.number="setRewardForm.rewardPark"
                            ></el-input>
                          </el-form-item>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 mt-20" v-show="isLadder">
                      <div class="col-sm-9 col-sm-offset-1 pl-50">
                        <span
                          >注：在返佣考核有效期内：车场可轮转考核，如若符合更高阶梯，将返阶梯差价</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 pl-0 mt-30">
                      <label
                        for="name"
                        class="col-sm-2 control-label text-right pl-0"
                      >
                        <h4 class="add-h4 font-size-16 font-weight-bold">
                          支付返佣规则
                        </h4>
                      </label>
                      <div class="col-sm-9 text-right">
                        <span class="material-rules" @click="materialRules = true"
                          >详细规则说明</span
                        >
                      </div>
                    </div>
                    <div class="col-sm-9 openAccount-rule">
                      <p>
                        1、当月20号前上线，正常考核自然月日均；当月20号后上线，轮转到次月日均考核。
                      </p>
                      <p>2、必须满足物料到场且符合张贴规范</p>
                    </div>
                  </div>
                </div>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <!-- <div class="com-sm-12 payMode">
            <el-button-group>
              <el-button @click="aliPay" :type="aliStyle" v-if="isAliPayment"
                >支付宝</el-button
              >
              <el-button
                @click="wechatPay"
                :type="wechatStyle"
                v-if="isWechatPayment"
                >微信</el-button
              >
            </el-button-group>
          </div> -->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="popReward = false">取 消</el-button>
          <el-button type="primary" @click="paySaveSet('setRewardForm')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!--返佣说明规则--->
      <el-dialog title="返佣规则说明" :visible.sync="materialRules" width="52%">
      <div class="row" style="padding: 0px">
         <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">返佣规则</h4>
         <div class="col-sm-9 openAccount-rule">
           <p>1、仅限支付宝笔数且单笔有效订单在1-500元内</p>
           <p>2、必须满足物料到场且符合张贴规范</p>
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
  </div>
</template>
<script src="./payCommission.js"></script>
<style scoped lang="scss">
@import "./payCommission.scss";
.box-body /deep/ .el-table thead.is-group th {
  background: #fff;
}
.ladder-minus,
.ladder-plus {
  display: inline-block;
  padding: 8px;
  border: 1px solid #40a9ff;
  color: #40a9ff;
  margin: 0 4px;
}
.ladder-minus {
  margin-left: 40px;
}
.openAccount-rule {
  width: 84% !important;
  //  margin-left: 100px;
  background-color: rgba(242, 242, 242, 1);
  padding: 15px;
  margin-left: 5%;
}
.payMode /deep/ .el-button-group {
  width: 90%;
  margin-bottom: 20px;
  margin-left: 3%;
  .el-button {
    width: 50%;
  }
}
.material-rules {
  color: #0099ff;
  cursor: pointer;
}
</style>
