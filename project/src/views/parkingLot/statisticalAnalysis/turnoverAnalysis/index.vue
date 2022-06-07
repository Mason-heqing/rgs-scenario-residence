<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        周转率收入分析
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <!-- <li>
          <a href="/parkManager"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li> -->
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 周转率收入分析
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
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="box box-default">
              <div class="box-body">
                 <div class="row mb-30">
                   <div class="col-sm-12">
                     <h4>每日周转率趋势</h4>
                   </div>
                  <div class="col-sm-12">
                    <div
                    class="chart"
                    id="parkingRevenue"
                    style="height: 380px; padding-right: 10px"
                  ></div>
                  </div>
                </div>
                <table-cmp
                  :table-data="listData"
                  :table-label="tableLabel"
                  ref="tableChild"
                  :is-show-select="isShowSelect"
                >
                </table-cmp>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script src="./turnoverAnalysis.js"></script>
<style scoped lang="scss">
@import "./turnoverAnalysis.scss";
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
