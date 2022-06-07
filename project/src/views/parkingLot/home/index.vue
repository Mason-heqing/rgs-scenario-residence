<template>
  <div class="content-wrapper home">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1 class="nice">仪表板</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="fa fa-home"></i> 首页 </a>
        </li>
        <li><i class="glyphicon glyphicon-dashboard"></i> 仪表板</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="row">
        <div class="col-sm-9">
          <div class="box">
            <div class="box-header with-border" style="height: 42px">
              <h3 class="box-title select-date">
                <span>车场分布</span>
              </h3>
            </div>
            <div class="box-body">
            <div class="row">
              <div class="col-sm-12">
                <div
                  class="chart"
                  ref="map"
                  id="parkDistribution"
                  style="height:727px; padding-right: 10px"
                ></div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="box">
            <div class="box-header with-border" style="height: 42px">
              <h3 class="box-title select-date">
                <span>返佣总览</span>
              </h3>
              <span id="person_title_text"></span>
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="car-icon mb-20">
                    <img src="../../assets/img/car_icon.png" alt="汽车图标" />
                  </div>
                  <div class="park-total text-center">
                    <p class="total-title m-0">车场总数</p>
                    <p class="total-num">{{parkAcount}}</p>
                  </div>
                  <div class="summary-info">
                    <div class="summary-item">
                      <div class="red-spot"></div>
                      <span>累计上线交易{{lineTotalAmount}}元</span>
                    </div>
                    <div class="summary-item">
                      <div class="green-spot"></div>
                      <span>累计总收入{{lineTotalIncome}}元</span>
                    </div>
                    <div class="summary-item">
                      <div class="orange-spot"></div>
                      <span>累计总支出{{lineTotalOutcome}}元</span>
                    </div>
                  </div>
                  <!-- <div
                    class="chart"
                    id="chartTodayRecogHour"
                    style="height: 300px; padding-right: 10px"
                  ></div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="box-header with-border" style="height: 42px">
              <h3 class="box-title select-date">
                <span>车场统计</span>
              </h3>
              <span id="person_title_text"></span>
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-sm-12">
                  <div
                    class="chart"
                    id="parkStatistics"
                    style="height: 380px; padding-right: 10px"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="box">
            <div class="box-body">
              <div class="row mt-20 mb-50">
                <div class="col-sm-12 text-center">
                  <div class="col-sm-4 col-sm-offset-4">
                    <label for="name" class="control-label text-right">
                      统计时间
                    </label>
                    <el-date-picker
                      v-model="countTime"
                      value-format="yyyy-MM"
                      type="month"
                      placeholder="选择月"
                      @change="changeTime"
                    >
                    </el-date-picker>
                    <el-button type="danger" size="small" @click="tradeStatis">查询</el-button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 pay-mode">
                  <div class="col-sm-3">
                    <div class="col-sm-4 text-right">
                      <img
                        src="../../assets/img/count_icon_1.png"
                        width="56"
                        height="58"
                        alt="支付宝支付笔数"
                      />
                    </div>
                    <div class="col-sm-8 pl-0">
                      <p class="pay-count-item">支付宝支付笔数</p>
                      <p class="pay-money">{{alipayNums}}</p>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="col-sm-4 text-right">
                      <img
                        src="../../assets/img/count_icon_2.png"
                        width="56"
                        height="58"
                        alt="支付宝支付金额"
                      />
                    </div>
                    <div class="col-sm-8 pl-0">
                      <p class="pay-count-item">支付宝支付金额</p>
                      <p class="pay-money">{{alipayAmount}}</p>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="col-sm-4 text-right">
                      <img
                        src="../../assets/img/count_icon_3.png"
                        width="56"
                        height="58"
                        alt="支付宝支付金额"
                      />
                    </div>
                    <div class="col-sm-8 pl-0">
                      <p class="pay-count-item">微信支付笔数</p>
                      <p class="pay-money">{{wechatNums}}</p>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="col-sm-4 text-right">
                      <img
                        src="../../assets/img/count_icon_4.png"
                        width="56"
                        height="58"
                        alt="微信支付金额"
                      />
                    </div>
                    <div class="col-sm-8 pl-0">
                      <p class="pay-count-item">微信支付金额</p>
                      <p class="pay-money">{{wechatAmount}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-50 amount-distribution">
                <div class="col-sm-12">
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane name="first">
                      <span slot="label">
                        <p style="font-size: 14px; color: #666">收入金额</p>
                        <p style="font-size: 26px">￥{{inAmount}}</p>
                      </span>
                      <div class="col-sm-12">
                        <div
                          class="chart mb-50"
                          id="incomeAmount"
                          style="height: 300px; padding-right: 10px"
                        ></div>
                      </div>
                      <div class="col-sm-4">
                        <h4>收入类型</h4>
                        <div
                          class="chart"
                          id="incomeType"
                          style="height: 450px; padding-right: 10px"
                        ></div>
                      </div>
                      <div class="col-sm-4">
                        <h4>收入来源</h4>
                        <div
                          class="chart"
                          id="incomeSource"
                          style="height: 450px; padding-right: 10px"
                        ></div>
                      </div>
                      <div class="col-sm-4">
                        <h4>收入分布</h4>
                        <div
                          class="chart"
                          id="incomeDistribution"
                          style="height: 450px; padding-right: 10px"
                        ></div>
                      </div>
                      <div class="col-sm-12 text-right">
                        <el-button type="primary" @click="seeAllInfo('1')"
                          >查看全部</el-button
                        >
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="支出金额" name="second"
                      ><span slot="label">
                        <p style="font-size: 14px; color: #666">支出金额</p>
                        <p style="font-size: 26px">￥{{outAmount}}</p>
                      </span>
                      <div class="col-sm-12">
                        <div
                          class="chart mb-50"
                          id="expenditureAmount"
                          style="height: 300px; padding-right: 10px"
                        ></div>
                      </div>
                      <div class="col-sm-6">
                        <h4>支出类型</h4>
                        <div
                          class="chart"
                          id="expenditureType"
                          style="height: 300px; padding-right: 10px"
                        ></div>
                      </div>
                      <div class="col-sm-6">
                        <h4>支出分布</h4>
                        <div
                          class="chart"
                          id="expenditureSource"
                          style="height: 300px; padding-right: 10px"
                        ></div>
                      </div>
                      <div class="col-sm-12 text-right">
                        <el-button @click="seeAllInfo('2')" type="primary"
                          >查看全部</el-button
                        >
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <el-dialog
      title="记录详情"
      :visible.sync="recordContentPop"
      width="900px"
      class="el-dialog-reset"
    >
      <div style="padding: 0px" class="record-pop">
        <div class="record-pop-left">
          <p><span>姓名：</span>{{ contentMsg.personName }}</p>
          <p><span>证件号：</span>{{ contentMsg.personIdNum }}</p>
          <p><span>核验时间：</span>{{ contentMsg.snapTime }}</p>
        </div>
        <div class="record-pop-right">
          <p>
            <span>性别：</span>
            <label v-if="contentMsg.personGender == 0"></label>
            <label v-if="contentMsg.personGender == 1">男</label>
            <label v-else-if="contentMsg.personGender == 2">女</label>
            <label v-else-if="contentMsg.personGender == 3">未知</label>
          </p>
          <p><span>民族：</span>{{ contentMsg.personEthnic }}</p>
          <p><span>设备名称：</span>{{ contentMsg.deviceName }}</p>
        </div>
        <div class="record-pop-left">
          <el-image
            v-if="contentMsg.comparePic"
            style="width: 100px"
            :src="imgurl + '/file/download?path=' + contentMsg.comparePic"
            :preview-src-list="[
              imgurl + '/file/download?path=' + contentMsg.comparePic,
            ]"
          >
          </el-image>
          <el-image
            v-else-if="contentMsg.snapPic"
            style="width: 100px"
            :src="imgurl + '/file/download?path=' + contentMsg.snapPic"
            :preview-src-list="[
              imgurl + '/file/download?path=' + contentMsg.snapPic,
            ]"
          >
          </el-image>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recordContentPop = false">取 消</el-button>
      </span>
    </el-dialog> -->
    <el-dialog title="收入分布" :visible.sync="dialogSeeAllVisible" width="50%">
      <div class="row">
        <div class="col-sm-12">
          <span class="pr-10" style="color: #666">收入总金额</span
          ><span>{{inComeTotalAmount}}</span>
          <table-cmp
            :table-data="tableData"
            :table-label="tableLabel"
            ref="tableChild"
            :is-show-select="isShowSelect"
          >
          </table-cmp>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="全部支出来源" :visible.sync="dialogSeeAllSourceVisible" width="50%">
      <div class="row">
        <div class="col-sm-12">
          <span class="pr-10" style="color: #666">收入总金额</span
          ><span>{{inComeTotalAmount}}</span>
          <table-cmp
            :table-data="tableData1"
            :table-label="tableLabel1"
            ref="tableChild"
            :is-show-select="isShowSelect"
          >
          </table-cmp>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./home.js"></script>
<style lang="scss" scoped>
@import "./home.scss";
// #appSelect{
//   display: none;
// }
.titleName {
  color: rgba(0, 0, 0, 0.42745);
}
.totalAmount {
  font-size: 36px;
}
.el-tabs__nav-wrap{
    margin: auto;
    width: 37%;
}
.el-tabs__nav{
    text-align: center;
    // width: 100% !important;
}
.el-tabs__nav-wrap::after{
    background-color: transparent;
}
.el-tabs__item.is-active{
    color: #333;
    // background-color: #3c8dbc;
    // border-bottom: 2px solid #3c8dbc;
}
.el-tabs__item:hover{
    color:#333;
}
.el-tabs__item{
    height: 76px;
    font-size: 20px;
    width: 100%;
    line-height: normal;
}
.amount-distribution /deep/ .el-tabs__header{
  display: flex;
  justify-content: center;
}
.amount-distribution /deep/ .el-tabs__nav-wrap{
    width: 50%;
}
.amount-distribution /deep/  .el-tabs__item{
  width: 300px;
  height: 96px;
  text-align: center;
  padding: 0;
  // margin: 0 30px;
}
.amount-distribution /deep/ .el-tabs__nav-wrap::after{
   background: transparent;
}
.amount-distribution /deep/ .el-tabs__active-bar{
  background: red;
  width:200px !important;
  left: 53px;
  // margin: 0 30px;
}
</style>
