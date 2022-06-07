<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        开户返佣 - 返佣管理
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 开户返佣
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="开户返佣设置" name="first">
              <div class="form-horizontal">
                <div class="col-lg-2 pl-0">
                  <div class="form-group">
                    <div class="col-md-12">
                      <!-- <el-select
                          clearable=""
                          v-model="PersonListForm.childChanName"
                          placeholder="选择所属渠道"
                        >
                          <el-option
                            v-for="item in channel"
                            :key="item.value"
                            :label="item.name"
                            :value="item.name"
                          ></el-option>
                        </el-select> -->
                      <el-input
                        clearable
                        style="width: 100%"
                        placeholder="输入子渠道名称"
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
                <div class="col-sm-6 pr-0 text-right">
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
                          <el-checkbox :label="item" :key="item"></el-checkbox>
                        </div>
                      </el-checkbox-group>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>

              <!-- <div id="toolbar" class="btn-group-box" style="width: 100%">
                <div class="btn-group" data-toggle="buttons">
                        <button id="btn_add" type="button" class="btn btn-default" @click="goAdd">
                          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                        </button>
                        <button id="btn_add" type="button" class="btn btn-default" @click="batchDelete">
                          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量删除
                        </button>
                        <button id="btn_delete" type="button" class="btn btn-default" @click="exportBtn">
                          <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
                        </button>
                         <button id="btn_delete" type="button" class="btn btn-default" @click="importPop=true">
                          <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>批量导入
                        </button>
                      </div>
                <div class="pr-0 text-right">
                  <el-button type="primary" size="small" >新增订单</el-button>
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
                          <el-checkbox :label="item" :key="item"></el-checkbox>
                        </div>
                      </el-checkbox-group>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div> -->

              <table-cmp
                :table-data="tableData"
                :table-label="tableLabel"
                ref="tableChild"
                :is-show-select="isShowSelect"
              >
                <el-table-column
                  slot="operate"
                  label="操作"
                  align="center"
                  width="180"
                >
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
                        @click="reviseRrcord(scope.row)"
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
            <el-tab-pane label="开户返佣兑帐" name="second">
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
                <div class="col-lg-2 pl-0">
                  <div class="form-group">
                    <div class="col-md-12 select-month">
                      <el-date-picker
                        v-model="month"
                        value-format="yyyy-MM"
                        type="month"
                        placeholder="选择月"
                        @change="changeTime"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                </div>
                <!-- <div class="col-lg-2">
                  <div class="form-group">
                    <div class="col-md-12">
                      <el-select
                        clearable
                        v-model="PersonListForm1.subtype"
                        placeholder="住户类型"
                      >
                        <el-option
                          v-for="item in personType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div> -->
                <!-- <div class="col-lg-2">
                  <div class="form-group">
                    <div class="col-md-12">
                      <el-select
                        clearable
                        v-model="PersonListForm1.bindStatus"
                        placeholder="状态"
                      >
                        <el-option
                          v-for="item in bindStatus"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div> -->
                <div class="col-lg-1 pr-0">
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
                    <!-- <button
                      id="btn_device_reset"
                      type="button"
                      class="btn btn-default"
                      @click="resetBtn1"
                    >
                      <span class="fa fa-reply" aria-hidden="true"></span>重置
                    </button> -->
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
                <div class="pr-0 text-right">
                  <!-- <el-button type="primary" size="small" >新增订单</el-button> -->
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
                </div>
              </div>

              <table-bmp
                :table-data="tableData1"
                :table-label="tableLabel1"
                ref="tableChild1"
                :is-show-select="isShowSelect"
              >
                <el-table-column
                  slot="operate"
                  label="操作"
                  justify="start"
                  width="150"
                >
                  <template slot-scope="scope">
                    <!-- <el-row v-if="scope.row.bindStatus==0||scope.row.bindStatus==1||(scope.row.personSubtype==1&&scope.row.bindStatus==0)"> -->
                    <el-row
                      v-if="
                        scope.row.status == '待结算'
                      "
                    >
                     <el-button
                        title="查看明细"
                        type="primary"
                        icon="el-icon-edit"
                         
                        size="mini"
                        @click="goCheck(scope.row)"
                      ></el-button>
                      <el-button
                        title="提交结算"
                        type="primary"
                        icon="el-icon-postcard"
                         
                        size="mini"
                        @click="submitSettlement(scope.row.id)"
                      ></el-button>
                    </el-row>
                    <el-row v-else>
                      <el-button
                        title="查看明细"
                        type="primary"
                        icon="el-icon-edit"
                         
                        size="mini"
                        @click="goCheck(scope.row)"
                      ></el-button>
                    </el-row>
                  </template>
                </el-table-column>
              </table-bmp>

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

      <el-dialog
        title="开户返佣配置"
        :visible.sync="popCommission"
        width="55%"
      >
        <div style="padding: 0px">
          <el-form ref="setCommission" :rules="rules" :model="setCommission">
            <div class="row">
              <label for="name" class="col-sm-2 control-label">
                <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">
                  开户返佣
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
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    value-format="yyyy-MM-dd"
                    @change="paydataTimeChange"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <label for="name" class="col-sm-2 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                考核周期
              </label>
              <div class="col-sm-9 channel-pay">
                <el-form-item prop="stage">
                  <el-select
                    clearable=""
                    v-model="setCommission.stage"
                    placeholder="选择考核周期"
                  >
                    <el-option
                      v-for="item in stage"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <label for="name" class="col-sm-2 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                计算方式
              </label>
              <div class="col-sm-9">
                <el-form-item prop="calculationMethod">
                  <!-- <el-input v-model="setCommission.id"></el-input> -->
                  <el-select
                    clearable=""
                    v-model="setCommission.calculationMethod"
                    placeholder="选择计算方式"
                    @change="changeCalculation"
                  >
                    <el-option
                      v-for="item in calculation"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12" v-for="(item,index) in setCommission.ladderFormList" :key="index">
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
                  <el-form-item :prop="'ladderFormList.'+ index +'.monthDayNum'" :rules="rules.monthDayNum">
                    <el-input  v-model.number="item.monthDayNum" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
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
                    <el-form-item :prop="'ladderFormList.'+ index +'.singleRebateAmount'" :rules="rules.singleRebateAmount">
                      <el-input v-model.number="item.singleRebateAmount" oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"></el-input>
                      <!-- <el-input v-model="item.singleRebateAmount" @keydown.native="inputLimit"></el-input> -->
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 mt-30" v-show="isLadder">
                <span class="glyphicon glyphicon-minus ladder-minus" @click="ladderMinus"></span
                ><span class="glyphicon glyphicon-plus ladder-plus" @click="ladderPlus"></span>
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
                <label for="name" class="col-sm-2 control-label text-right pl-0">
                   <h4 class="add-h4 font-size-16 font-weight-bold">
                      开户返佣规则
                   </h4>
                </label>
                <div class="col-sm-9 text-right">
                   <span class="material-rules"  @click="materialRules = true">开户返佣规则</span>
                </div>
              </div>
              <div class="col-sm-9 openAccount-rule">
                 <p>1、当月20号前上线，正常考核自然月日均；当月20号后上线，轮转到次月日均考核。</p>
                 <p>1、当月20号前上线，正常考核自然月日均；当月20号后上线，轮转到次月日均考核。</p>
                 <p>3、仅限支付宝笔数且单笔有效订单在1-500元内。</p>
                 <p>4、必须满足物料到场且符合张贴规范。</p>
              </div>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="popCommission = false">取 消</el-button>
          <el-button type="primary" @click="submitSet('setCommission')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="返佣规则说明" :visible.sync="materialRules" width="52%">
      <div class="row" style="padding: 0px">
         <h4 class="add-h4 font-size-16 pl-40 font-weight-bold">开户返佣规则</h4>
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
<script src="./opneAccount.js"></script>
<style scoped lang="scss">
@import "./openAccount.scss";
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
.openAccount-rule{
  width: 84% !important;
  //  margin-left: 100px;
  backg -color: rgba(242, 242, 242, 1);
  padding: 15px;
  margin-left: 5%;
}
.select-month /deep/ .el-input{
  width: 100%;
}
.material-rules {
  color: #0099ff;
  cursor: pointer;
}
</style>
