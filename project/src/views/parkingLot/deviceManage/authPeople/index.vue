<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        设备列表 - 已授权人员
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-hdd"></i> 设备管理
          </li>
          <li class="active">
            <i class="fa fa-key"></i> 授权
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body" v-loading='loading'>
                    <div id="toolbar" class=" btn-group-box" style="width:100%">
                      <div class="col-lg-12 pr-0 text-right">
                        <el-input style="width:200px" placeholder="输入名称或回调地址查询" clearable size="small"></el-input>
                        <el-button class="mr-10" type="primary" size="small">搜索</el-button>
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
     

  </div>
</template>
<script src="./authPeople.js"></script>
<style scoped lang="scss">
@import "./authPeople.scss";
</style>
