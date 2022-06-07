<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        月报表 
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <!-- <li>
          <a href="/parkManager"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li> -->
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 月报表 
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
                        placeholder="输入值班人姓名"
                        v-model="dataForm.userName"
                      ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-select
                          clearable=""
                          v-model="dataForm.workstationName"
                          placeholder="岗亭名称"
                        >
                          <el-option
                            v-for="item in workstationList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </div> -->
                  <div class="col-lg-3 pl-0">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-date-picker
                          v-model="timers"
                          type="monthrange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始月份"
                          end-placeholder="结束月份"
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
                      @click="exportBtn"
                    >
                      <span
                        class="glyphicon glyphicon-plus"
                        aria-hidden="true"
                      ></span
                      >导出
                    </button>
                  </div>
                </div>
                <table-cmp
                  :table-data="listData"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script src="./monthReport.js"></script>
<style scoped lang="scss">
@import "./monthReport.scss";
</style>
