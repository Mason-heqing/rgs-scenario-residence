<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        基础设置 - 呼叫编码
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="glyphicon glyphicon-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-cog"></i> 基础设置
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 呼叫编码
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body" v-loading="loading">
          <div class="form-horizontal">
            <div class="col-md-3">
              <div class="form-group">
                <div class>
                  <el-cascader
                    :key="cascaderKey"
                    style="width:100%"
                    placeholder="楼栋/单元/房间"
                    clearable
                    ref="elcascader"
                    v-model="dataForm.search"
                    :options="cascaderData"
                    :props="groupProps"
                    @visible-change="elCascaderOnlick"
                    @expand-change="elCascaderOnlick"
                    @change="cascaderChange"
                  ></el-cascader>
                </div>
              </div>
              <!-- <div class="form-group">
                          <div class="">
                             <el-cascader
                             style="width:100%"
                             v-model="dataForm.search"
                              placeholder="楼栋/单元/房间"
                              clearable
                              :props="prop"
                              
                              @visible-change="elCascaderOnlick"
                                @expand-change="elCascaderOnlick"
                                @change="cascaderChange"></el-cascader>
                          </div>
              </div>-->
            </div>

            <div class="col-md-4 pr-0">
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

          <table-cmp
            :table-data="tableData"
            :table-label="tableLabel"
            :is-show-select="isShowSelect"
            ref="tableChild"
          >
            <!-- <el-table-column slot="operate" label="操作" align="center" width="200">
                        <template slot-scope="scope">
                           <el-row>
                              <el-button title="编辑" type="primary" icon="el-icon-edit" round  size="mini"></el-button>
                              <el-button title="删除" type="danger" icon="el-icon-delete" round size="mini"></el-button>
                            </el-row>
                        </template>
            </el-table-column>-->
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
  </div>
</template>
<script src="./callNum.js"></script>
<style scoped lang="scss">
@import "./callNum.scss";
</style>
