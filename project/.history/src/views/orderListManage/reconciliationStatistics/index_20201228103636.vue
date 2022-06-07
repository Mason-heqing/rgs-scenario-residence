<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        订单统计
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li>
        <li><i class="glyphicon glyphicon-user"></i> 订单统计</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body">
          <div class="form-horizontal">
            <div class="col-sm-2 p-0">
              <div class="form-group">
                <div class="col-sm-12">
                  <el-select
                    clearable=""
                    v-model="dataForm.organizationId"
                    placeholder="选择子渠道"
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
            <div class="col-sm-2 item-show pr-0">
              <div class="form-group">
                <div class="col-sm-12">
                  <el-select
                    clearable=""
                    v-model="dataForm.parkType"
                    placeholder="选择车场业态"
                  >
                    <el-option
                      v-for="item in parkType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="col-sm-2 item-show pr-0">
              <div class="form-group">
                <div class="col-sm-12">
                  <el-select
                    clearable=""
                    v-model="dataForm.payType"
                    placeholder="选择支付方式"
                  >
                    <el-option
                      v-for="item in payType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="col-sm-2 item-show pr-0">
              <div class="form-group">
                <div class="col-sm-12">
                  <el-select
                    clearable=""
                    v-model="currentFrequency"
                    placeholder="选择日均笔数"
                    @change="frequencyChange"
                  >
                    <el-option
                      v-for="item in frequency"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="col-sm-3 pr-0">
              <div class="form-group">
                <div class="col-sm-12">
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
                </div>
              </div>
            </div>
            <div class="col-sm-1 item-query pr-0">
              <div class="btn-group">
                <button
                  id="btn_device_search"
                  type="button"
                  class="btn btn-primary"
                  @click="getTableData"
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
          <div id="toolbar" class="btn-group-box" style="width: 100%">
            <div class="btn-group col-lg-5 pl-0" data-toggle="buttons">
              <el-button-group>
                <el-button :type="defaultSoltSelect" @click="defaultSolt">默认排序</el-button>
                <el-button :type="paySoltSelect" @click="paySolt">支付金额排序</el-button>
                <el-button :type="frequencySoltSelect" @click="frequencySolt">日均笔数排序</el-button>
              </el-button-group>
            </div>
            <div class="col-lg-7 pr-0 text-right">
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
            >
              <template slot-scope="scope">
                <el-row>
                  <a
                    :href="
                      isdevelopment + scope.row.id + isName + scope.row.name
                    "
                  >
                    <el-button
                      title="下载"
                      type="info"
                      icon="el-icon-download"
                       
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
              width="150"
            >
              <template slot-scope="scope">
                <el-row>
                  <el-button
                    title="编辑"
                    type="primary"
                    icon="el-icon-edit"
                     
                    size="mini"
                    @click="goEdit(scope.row)"
                  ></el-button>
                  <el-button
                    title="删除"
                    type="danger"
                    icon="el-icon-delete"
                     
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
    </section>
    <!-- 授权状态 -->
    <auth-box
      :authPopVisible.sync="authPopVisible"
      :authPopTitle="authPopTitle"
      ref="authData"
    ></auth-box>
    <!-- <el-dialog
      title="导出"
      :visible.sync="outPop"
      width="400px">
      <div style="padding:0px;">
        <el-checkbox v-model="outChecked">导出图片</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="outBtn">导出</el-button>
        <el-button  @click="outPop=false" >关闭</el-button>
      </span>
    </el-dialog> -->
    <!-- 导出 -->
    <export-box
      :exportPopVisible.sync="outPop"
      :isExport.sync="isExport"
      ref="exportData"
    ></export-box>

    <msg-box
      :popVisible.sync="popVisible"
      :popTitle="popTitle"
      :popContent="popContent"
    ></msg-box>
  </div>
</template>
<script src="./reconciliationStatistics.js"></script>
<style scoped lang="scss">
@import "./reconciliationStatistics.scss";
.col-lg-2 {
  width: 16%;
}
.col-lg-1 {
  width: 9.3%;
}
</style>
