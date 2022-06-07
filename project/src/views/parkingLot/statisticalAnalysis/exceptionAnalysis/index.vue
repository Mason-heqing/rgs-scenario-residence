<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        异常分析
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <!-- <li>
          <a href="/parkManager"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li> -->
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 异常分析
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid tree-color">
      <div class="panel-body" style="padding: 0px" v-loading="loading">
        <div class="row">
          <div class="col-lg-12">
            <div class="box box-primary mb-10">
              <div class="box-body">
                  <div class="row">
                     <div class="form-horizontal">
                  <div class="col-lg-3">
                    <div class="form-group">
                      <div class="col-md-12">
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
                  <div class="col-lg-2 pr-0">
                    <div class="btn-group">
                      <button
                        id="btn_device_search"
                        type="button"
                        class="btn btn-primary"
                        @click="allDataQuery"
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
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="box box-default">
              <div class="box-body">
                 <div class="row">
                   <div class="col-sm-12">
                     <h4>异常记录统计</h4>
                   </div>
                  <div class="col-sm-12">
                    <div
                    class="chart"
                    id="parkingRevenue"
                    style="height: 380px; padding-right: 10px"
                  ></div>
                  </div>
                </div>
                <div class="row mt-30 mb-30">
                    <div class="col-sm-12">
                        <div class="col-sm-4" v-if="1 == isManualLiftingRod">
                            <h4>手动抬杆方式分布</h4>
                            <div
                                class="chart"
                                id="manualLiftingRod"
                                style="height:320px; padding-right: 10px"
                            ></div>
                        </div>
                        <div class="col-sm-4" v-if="1 == isAbnormalRelease">
                            <h4>异常放行原因分布</h4>
                            <div
                                class="chart"
                                id="abnormalRelease"
                                style="height:320px; padding-right: 10px"
                            ></div>
                        </div>
                        <div class="col-sm-4" v-if="1 == isFreeRelease">
                            <h4>免费放行原因分布</h4>
                            <div
                                class="chart"
                                id="freeRelease"
                                style="height:320px; padding-right: 10px"
                            ></div>
                        </div>
                    </div>
                </div>
                <table-cmp
                  :table-data="listData"
                  :table-label="tableLabel"
                  ref="tableChild"
                  :is-show-select="isShowSelect"
                >
                </table-cmp>
                <!-- <div class="block mt-10">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 15, 20, 25]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                  ></el-pagination>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script src="./exceptionAnalysis.js"></script>
<style scoped lang="scss">
@import "./exceptionAnalysis.scss";
.Summary{
    display: flex;
    justify-content: center;
    padding: 30px 0;
}
.el-table{
  max-height: 200px;
  overflow-y: scroll;
}
.el-table::before{
  height: 0;
}
// .box{
//   background: transparent;
// }
</style>
