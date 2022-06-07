<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        {{titleName}}
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <a :href="superiorUrl">
                <i class="glyphicon glyphicon-list-alt"></i>{{superiorName}} 
            </a>
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 返佣修改记录
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body">
                    <table-cmp
                      :table-data="tableData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShowSelect"
                    >
                    <el-table-column slot="operate" label="操作" align="center" width="120">
                        <template slot-scope="scope">
                            <el-row>
                              <el-button title="查看" type="primary" icon="el-icon-edit" round  size="mini" @click="goRepair(scope.row)"></el-button>
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
                   <div class="mt-15">
                      <el-button type="primary" @click="goBack">返回</el-button>
                   </div>
              </div>
            </div>
            <el-dialog
        title="开户返佣配置"
        :visible.sync="popCommission"
        width="55%"
      >
        <div style="padding: 0px">
          <el-form ref="setCommission" :model="setCommission">
            <div class="row">
              <label for="name" class="col-sm-2 control-label">
                <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">
                  开户返佣
                </h4>
              </label>
              <!-- <div class="col-sm-9 text-right">
                <el-form-item prop="payStatus">
                  <el-switch v-model="setCommission.payStatus"></el-switch>
                </el-form-item>
              </div> -->
            </div>
            <div class="row">
              <label for="name" class="col-sm-2 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                有效时间
              </label>
              <div class="col-sm-9">
                <el-form-item prop="paydataTime">
                  <el-input v-model="setCommission.paydataTime" readonly></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <label for="name" class="col-sm-2 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                考核周期
              </label>
              <div class="col-sm-9 channel-pay">
                <el-form-item>
                    <el-input v-model="setCommission.assessmentWeek" readonly></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <label for="name" class="col-sm-2 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                计算方式
              </label>
              <div class="col-sm-9">
                <el-form-item>
                  <el-input v-model="setCommission.calculation" readonly></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12" v-for="(item,index) in setCommission.calculation_method" :key="index">
                <h4 class="add-h4 font-size-16 pl-40 font-weight-bold" v-show="isLadder">
                  <span>{{item.name}}</span>
                </h4>
                <label
                  for="name"
                  class="col-sm-2 control-label text-right pl-0"
                >
                  <span style="color: red; line-height: 40px">*</span>
                  要求（月日均笔数）
                </label>
                <div class="col-sm-3 p-0 pl-7 w-change-3">
                  <el-form-item>
                    <el-input v-model="item.monthDayNum" readonly></el-input>
                  </el-form-item>
                  <span>注：0代表无要求</span>
                </div>
                <div class="col-sm-7 w-change-7">
                  <label
                    for="name"
                    class="col-sm-4 control-label text-right p-0"
                  >
                    <span style="color: red; line-height: 40px">*</span>
                    单个开户返佣（元）
                  </label>
                  <div class="col-sm-7">
                    <el-form-item>
                      <el-input v-model="item.singleRebateAmount" readonly></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
           </el-dialog>
           <!-- 奖励设置 -->
      <el-dialog title="支付返佣详情" :visible.sync="popReward" width="52%">
        <div style="padding: 0px">
          <div class="com-sm-12 payMode">
            <el-button-group>
              <el-button type="primary">{{payTitle}}</el-button>
              <!-- <el-button @click="wechatPay" :type="wechatStyle" v-if="!isShowAli">微信</el-button> -->
            </el-button-group>
          </div>
          <el-form ref="setRewardForm" :model="setRewardForm">
            <div class="row">
              <label for="name" class="col-sm-2 control-label">
                <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">
                  支付返佣
                </h4>
              </label>
              <div class="col-sm-9 text-right">
                <el-form-item prop="payStatus">
                  <el-switch v-model="setRewardForm.payStatus" disabled></el-switch>
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
                  <el-input v-model="setRewardForm.paydataTime" readonly></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <label
                  for="name"
                  class="col-sm-2 control-label text-right pl-0"
                >
                  <span style="color: red; line-height: 40px">*</span>
                  奖励标准
                </label>
                <div class="col-sm-3 p-0 pl-7 w-change-3">
                  <el-form-item>
                    <el-input v-model="setRewardForm.rewardstandard" readonly></el-input>
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
                    <el-form-item>
                      <el-input v-model="setRewardForm.percentage" readonly></el-input>
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
                    <el-form-item>
                      <el-input v-model="setRewardForm.percentage" readonly></el-input>
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
                  <span class="" style="color: #40a9ff">详细规则说明</span>
                </div>
              </div>
              <div class="col-sm-9 openAccount-rule">
                <p>
                  1、当月20号前上线，正常考核自然月日均；当月20号后上线，轮转到次月日均考核。
                </p>
                <p>2、必须满足物料到场且符合张贴规范</p>
              </div>
            </div>
          </el-form>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="popReward = false">取 消</el-button>
          <el-button type="primary" @click="setVisible = false"
            >确 定</el-button
          >
        </span> -->
      </el-dialog>
      <!-- 物料返佣设置 -->
      <el-dialog
        title="物料返佣配置"
        :visible.sync="popCommissionMateriel"
        width="52%"
      >
        <div style="padding: 0px">
          <el-form ref="setCommissionMateriel" :model="setCommissionMateriel">
            <div class="row">
              <label for="name" class="col-sm-2 control-label">
                <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">
                  物料返佣
                </h4>
              </label>
              <div class="col-sm-9 text-right">
                <el-form-item prop="payStatus">
                  <el-switch v-model="setCommissionMateriel.payStatus" disabled></el-switch>
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
                  <el-input v-model="setCommission.paydataTime" readonly></el-input>
                  <!-- <el-date-picker
                    v-model="setCommissionMateriel.paydataTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                  >
                  </el-date-picker> -->
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <label for="name" class="col-sm-2 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                单个车场返佣(元)
              </label>
              <div class="col-sm-9 channel-pay">
                <el-form-item prop="assessmentWeek">
                  <el-input v-model.number="setCommissionMateriel.rewardPark" readonly></el-input>
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
                   <span class=""> 物料返佣规则</span>
                </div>
              </div>
              <div class="col-sm-9 openAccount-rule">
                 <p>1、物料活跃定义：单车场物料1天内被扫码次数≥1；</p>
                 <p>2、在活动有效期内：车场可轮转考核，3个月内如达到标准，均可拿到返佣政策；</p>
                 <p>3、考核当月，车场至少有5次扫码记录，同一用户多车场多次核销仅算一笔；</p>
                 <p>4、结算月，车场需保持动销；且物料活跃天数大于等于1；</p>
                 <p>5、服务商需要协调车场协同云纵&支付宝进行物料铺设，以保证物料的活跃率；</p>
              </div>
            </div>
          </el-form>
        </div>
      </el-dialog>
      </section>
  </div>
</template>
<script src="./reviseRecord.js"></script>
<style scoped lang="scss">
@import "./reviseRecord.scss";
.payMode /deep/ .el-button-group{
   width: 90%;
   margin-bottom: 20px;
   margin-left:3%;
   .el-button{
      width: 100%;
   }
} 
.openAccount-rule{
  width: 84% !important;
  //  margin-left: 100px;
  background-color: rgba(242, 242, 242, 1);
  padding: 15px;
  margin-left: 5%;
}
</style>
