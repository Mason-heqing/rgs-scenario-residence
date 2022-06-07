<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        <!-- 开户返佣明细 -->
        {{commissionTitle}}
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li>
        <li>
          <a :href="superiorUrl">
            <i class="glyphicon glyphicon-list-alt"></i> {{superiorName}}
          </a>
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i>{{myName}}
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body">
          <div id="toolbar" class="btn-group-box" style="width: 100%">
            <div class="btn-group" data-toggle="buttons">
              <button
                id="btn_delete"
                type="button"
                class="btn btn-default"
                @click="commissionExport"
              >
                <span
                  class="glyphicon glyphicon-arrow-down"
                  aria-hidden="true"
                ></span
                >导出
              </button>
            </div>
          </div>
          <div class="col-sm-12 mt-15 mb-15 pl-0">
                <label for="">开户返佣合计金额(元)：{{totalName}}</label>
                <span style="color:#fd7d00;">{{totalAmount}}</span>
            </div>
          <table-cmp
            :table-data="tableData"
            :table-label="tableLabel"
            ref="tableChild"
            :is-show-select="isShowSelect"
          >
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
          <div class="col-sm-12 mt-30 p-0">
             <el-button type="primary" @click="goBack">返回</el-button>
          </div>
        </div>
      </div>
      <el-dialog title="开户返佣配置" :visible.sync="popCommission" width="52%">
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
                  <el-input v-model="setCommission.paydataTime"></el-input>
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
                  <el-input v-model="setCommission.assessmentWeek"></el-input>
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
                  <el-input v-model="setCommission.calculation"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div
                class="col-sm-12"
                v-for="(item, index) in setCommission.calculation_method"
                :key="index"
              >
                <h4
                  class="add-h4 font-size-16 pl-40 font-weight-bold"
                  v-show="isLadder"
                >
                  <span>{{ item.name }}</span>
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
                    <el-input v-model="item.monthDayNum"></el-input>
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
                      <el-input v-model="item.singleRebateAmount"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script src="./seeDetails.js"></script>
<style scoped lang="scss">
@import "./seeDetails.scss";
</style>
