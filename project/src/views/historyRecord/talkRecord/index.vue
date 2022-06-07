<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        历史记录 - 对讲记录
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="fa fa-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-dashboard"></i> 历史记录
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 对讲记录
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body">
          <div class="form-horizontal">
            <el-row :gutter="10" style="display: block;">
              <el-col :lg="4" :xl="4" class="mb-15">
                <el-cascader
                  :key="cascaderKey"
                  style="width:100%"
                  clearable
                  ref="elcascader"
                  placeholder="楼栋/单元/房间"
                  v-model="dataForm.houseId"
                  :options="cascaderData"
                  :props="groupProps"
                  @visible-change="elCascaderOnlick"
                  @expand-change="elCascaderOnlick"
                  @change="cascaderChange"></el-cascader>
              </el-col>
              <el-col :lg="6" :xl="6" class="mb-15">
                <el-date-picker
                  v-model="timeArr"
                  clearable
                  small="small"
                  align="right"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00','23:59:59']"
                  @change="changeTime"
                ></el-date-picker>
              </el-col>
              <el-col :lg="4" :xl="4" class="mb-15">
                <el-select clearable v-model="dataForm.deviceId" placeholder="呼叫设备">
                  <el-option
                    v-for="item in deviceGroup"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :lg="3" :xl="3" class="mb-15">
                <el-select clearable v-model="dataForm.throughStatus" placeholder="接通状态">
                  <el-option
                    v-for="item in throughStatusOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :lg="3" :xl="3" class="mb-15">
                <el-select clearable v-model="dataForm.openStatus" placeholder="是否开门">
                  <el-option
                    v-for="item in openStatusOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :lg="4" :xl="4">
                <div class="btn-group pl-0">
                  <button
                    id="btn_device_search"
                    type="button"
                    class="btn btn-primary pl-8 pr-8"
                    @click="getTableData"
                  >
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                  </button>
                  <button
                    id="btn_device_reset"
                    type="button"
                    class="btn btn-default pl-8 pr-8"
                    @click="resetBtn"
                  >
                    <span class="fa fa-reply" aria-hidden="true"></span>重置
                  </button>
                </div>
              </el-col>
            </el-row>

            <div id="toolbar" class="btn-group-box" style="width:100%">
              <div class="btn-group" data-toggle="buttons">
                <button id="btn_delete" type="button" class="btn btn-default" @click="exportBtn">
                  <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
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
    <!-- 导出 -->
      <export-box :exportPopVisible.sync="outPop" :isExport.sync="isExport" ref="exportData"></export-box>
  </div>
</template>
<script src="./talkRecord.js"></script>
<style scoped lang="scss">
@import "./talkRecord.scss";
</style>
