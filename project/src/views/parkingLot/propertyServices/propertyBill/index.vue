<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        物业服务 - 物业账单
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
            <i class="glyphicon glyphicon-adjust"></i> 物业账单
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body" v-loading="loading">
                <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                  <el-tab-pane label="用户管理" name="first"> -->
                    <div class="form-horizontal">
                      <div class="col-lg-2 pl-0">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-input clearable style="width:100%" placeholder="搜索账单名称" v-model="dataForm.billName"></el-input>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
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
                          </div>
                        </div>
                      </div>
                     
                      <div class="col-lg-4 pr-0">
                        <div class="btn-group">
                          <button id="btn_device_search" type="button" class="btn btn-primary" @click="getTableData">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                          </button>
                          <button id="btn_device_reset" type="button" class="btn btn-default" @click="resetBtn">
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
                        <button id="btn_delete" type="button" class="btn btn-default" @click="deleteBill('')">
                          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量删除
                        </button>
                      </div>
                      
                    </div>
                    <table-cmp
                      :table-data="tableData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShwoSelect"
                    >
                    <el-table-column slot="operate1" label="附件" align="center" width="100">
                        <template slot-scope="scope">
                          <span class="see-files" @click="onPreview(scope.row.billImage)">查看</span>
                           <!-- <div class="demo-image__preview">
                            <el-image 
                              style="width: 100px; height: 100px"
                              :src="url" 
                              :preview-src-list="scope.row.enclosureList">
                            </el-image>
                          </div> -->
                        </template>
                    </el-table-column>
                    <el-table-column slot="operate" label="操作" align="center" width="150">
                        <template slot-scope="scope">
                           <el-row>
                              <!-- <el-button title="编辑" type="primary" icon="el-icon-edit" round  size="mini"></el-button> -->
                              <el-button title="删除" type="danger" icon="el-icon-delete" round size="mini" @click="deleteBill(scope.row.id)"></el-button>
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
                  <!-- </el-tab-pane>
                  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                  <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                  <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                </el-tabs> -->
              </div>
            </div>
      </section>
      <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="previewImg" />
       
       
      
      <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
    
  </div>
</template>
<script src="./propertyBill.js"></script>
<style scoped lang="scss">
@import "./propertyBill.scss";
</style>
