<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        物业服务 - 通知公告
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="glyphicon glyphicon-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-list-alt"></i> 物业服务
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 通知公告
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body" v-loading="loading">
          <div class="form-horizontal">
            <div class="col-lg-2 pl-0">
              <div class="form-group">
                <div class="col-md-12">
                  <el-input
                    clearable
                    style="width:100%"
                    placeholder="搜索标题"
                    v-model="dataForm.noticeTitle"
                  ></el-input>
                </div>
              </div>
            </div>
            <!-- <div class="col-md-4">
                        <div class="form-group">
                          <div class="col-sm-12">
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
                              @change="changeTime">
                          </el-date-picker>
                          </div>
                        </div>
            </div>-->
            <div class="col-lg-2">
              <div class="form-group">
                <div class="col-md-12">
                  <el-select v-model="dataForm.noticeStatus" clearable placeholder="状态">
                    <el-option
                      v-for="item in noticeStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <div class="col-lg-4 pr-0">
              <div class="btn-group">
                <button
                  id="btn_device_search"
                  type="button"
                  class="btn btn-primary"
                  @click="getTableData"
                >
                  <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
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
          <div id="toolbar" class="btn-group-box" style="width:100%">
            <div class="btn-group col-lg-5 pl-0" data-toggle="buttons">
              <button id="btn_add" type="button" class="btn btn-default" @click="goAdd">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
              </button>
              <button
                id="btn_delete"
                type="button"
                class="btn btn-default"
                @click="deleteNotice('')"
              >
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量删除
              </button>
            </div>
          </div>
          <table-cmp
            class="notice-table"
            :table-data="tableData"
            :table-label="tableLabel"
            ref="tableChild"
            :is-show-select="isShowSelect"
          >
            <el-table-column slot="operate1" label="标题" align="left" min-width="300">
              <template slot-scope="scope">
                <span class="notice-title" :title="scope.row.noticeTitle">{{scope.row.noticeTitle}}</span>
              </template>
            </el-table-column>
            <el-table-column slot="operate" label="操作" align="center" width="200">
              <template slot-scope="scope">
                <el-row>
                  <el-button
                    v-if="scope.row.noticeStatus==1"
                    title="撤回"
                    type="primary"
                    icon="el-icon-refresh-left"
                    
                    size="mini"
                    @click="draw(scope.row.id)"
                  ></el-button>
                  <el-button
                    v-else
                    title="编辑"
                    type="primary"
                    icon="el-icon-edit"
                    
                    size="mini"
                    @click="editNotice(scope.row)"
                  ></el-button>
                  <el-button
                    title="删除"
                    type="danger"
                    icon="el-icon-delete"
                    
                    size="mini"
                    @click="deleteNotice(scope.row.id)"
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
    <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
  </div>
</template>
<script src="./notice.js"></script>
<style scoped lang="scss">
@import "./notice.scss";
</style>
