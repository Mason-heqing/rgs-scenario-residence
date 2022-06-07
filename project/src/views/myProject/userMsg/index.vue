<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        系统管理 - 用户消息
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="fa fa-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-dashboard"></i> 系统管理
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 用户消息
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body" v-loading="loading">
          <div id="toolbar" class="btn-group-box" style="width:100%">
            <div class="btn-group" data-toggle="buttons">
              <button id="btn_add" type="button" class="btn btn-default" @click="allRead">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>全部标记为已读
              </button>
              <button id="btn_delete" type="button" class="btn btn-default" @click="deleteMsg('')">
                <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>批量删除
              </button>
            </div>
            <div class="pr-0 text-right">
              <!-- <el-button type="primary" size="small" >新增订单</el-button> -->
              <el-dropdown trigger="click" :hide-on-click="false" placement="bottom-start">
                <span class="el-dropdown-link">
                  <el-button type="primary" size="small">
                    <i class="el-icon-menu"></i>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-checkbox-group v-model="tableSelect" @change="checkboxChange">
                    <div v-for="item in tableOption" :key="item" class="checkbox-div">
                      <el-checkbox :label="item" :key="item"></el-checkbox>
                    </div>
                  </el-checkbox-group>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <table-cmp
            :table-data="tableData"
            :table-label="tableLabel"
            ref="tableChild"
            :is-show-select="isShwoSelect"
          >
             <el-table-column slot="operate2" label="图标" align="center" min-width="60">
              <template slot-scope="scope">
                <span :class="scope.row.iconStyle"></span>            
              </template>
            </el-table-column>
            <el-table-column slot="operate1" label="标题" align="center" min-width="250">
              <template slot-scope="scope">
                <a style="color:#007aff" :href="scope.row.url" v-if="scope.row.url">{{scope.row.title}}</a>             
                <a v-else style="color:rgb(18, 17, 29);">{{scope.row.title}}</a>      
              </template>
            </el-table-column>
            <el-table-column slot="operate" label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-row>
                  <el-button title="日志" type="primary" icon="el-icon-tickets" round  size="mini" @click="getMagData(scope.row.id)"></el-button>
                  <el-button
                    title="删除"
                    type="danger"
                    icon="el-icon-delete"
                    round
                    size="mini"
                    @click="deleteMsg(scope.row.id)"
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
          <!-- </el-tab-pane>
                  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                  <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                  <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>-->
        </div>
      </div>
    </section>

    <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>


    <el-dialog
      title="消息详情"
      :visible.sync="msgPopVisible"
      width="60%"
      class="el-dialog-reset set-pop msg-content">
      <!-- <span slot="title" class="dialog-footer">
        <span v-if="">这是标题</span>
        <span>这是一段信息</span>
      </span> -->

      <div style="padding:0 10px;">
        <el-table
        class="mt-10"
        :data="msgDataList"
        style="width: 100%"
        :border="true"
        :cell-style="{background:'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0'}"
        :stripe="true"
        max-height="400"
      >
          <el-table-column prop="level" label="级别" width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.level=='E'" style="color:red">{{scope.row.level}}</span>
              <span v-else>{{scope.row.level}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="timestamp" label="时间" width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.level=='E'" style="color:red">{{scope.row.timestamp | formatTime}}</span>
              <span v-else>{{scope.row.timestamp | formatTime}}</span>
            </template>
          </el-table-column> 
          <el-table-column
            prop="content"
            label="内容"
            width="auto"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.level=='E'" style="color:red">{{scope.row.content}}</span>
              <span v-else>{{scope.row.content}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="msgPopVisible=false">关闭</el-button>   
      </span>
     </el-dialog>
  </div>
</template>
<script src="./userMsg.js"></script>
<style scoped lang="scss">
@import "./userMsg.scss";
</style>
