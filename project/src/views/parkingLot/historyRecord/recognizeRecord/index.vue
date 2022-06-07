<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        历史记录 - 识别记录
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-time"></i> 历史记录
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 识别记录
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body" v-loading="loading">
                    <el-row :gutter="10" style="display: block;">
                      <el-col :lg="3" :xl="3" class="mb-15"><el-input clearable style="width:100%" placeholder="搜索姓名" v-model="dataForm.name"></el-input></el-col>
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
                              @change="changeTime">
                          </el-date-picker>
                      </el-col>
                      <el-col :lg="4" :xl="4" class="mb-15">
                         <el-select clearable v-model="dataForm.identificationWay" placeholder="识别方式">
                              <el-option
                                v-for="item in recognizeWay"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                      </el-col>
                      <el-col :lg="3" :xl="3" class="mb-15">
                        <el-select clearable v-model="dataForm.whetherToOpenTheDoor" placeholder="是否开门">
                              <el-option
                                v-for="item in isOpenDoor"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                      </el-col>
                      <el-col :lg="4" :xl="4" class="mb-15">
                        <el-select clearable v-model="dataForm.deviceId" placeholder="识别设备">
                              <el-option
                                v-for="item in deviceGroup"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                              ></el-option>
                            </el-select>
                      </el-col>
                      <el-col :lg="4" :xl="4">
                        <div class=" btn-group pl-0">
                          <button id="btn_device_search" type="button" class="btn btn-primary pl-8 pr-8" @click="getTableData">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                          </button>
                          <button id="btn_device_reset" type="button" class="btn btn-default pl-8 pr-8" @click="resetBtn">
                            <span class="fa fa-reply" aria-hidden="true"></span>重置
                          </button>
                        </div>
                      </el-col>
                    </el-row>

                    <div id="toolbar" class=" btn-group-box" style="width:100%">
                       <div class="btn-group" data-toggle="buttons">
                        <button id="btn_delete" type="button" class="btn btn-default" @click="exportBtn">
                          <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
                        </button>
                      </div>
                    </div>
                
                    <table-cmp
                      :table-data="tableData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShowSelect"
                    >
                    <el-table-column slot="operate1" label="抓拍照片" align="center" width="120">
                        <template slot-scope="scope">
                          <img @click="seeContent(scope.row)" style="cursor: pointer;width:80px;height:80px;display: inline-block;" :src="imgurl+'/file/download?path='+scope.row.snapPic" alt />
                        </template>
                    </el-table-column>
                    <el-table-column slot="operate1" label="对比照片" align="center" width="120">
                        <template slot-scope="scope">
                          <img @click="seeContent(scope.row)" style="cursor: pointer;width:80px;height:80px;display: inline-block;" :src="imgurl+'/file/download?path='+scope.row.comparePic" alt />
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
      <!-- 导出 -->
      <export-box :exportPopVisible.sync="outPop" :isExport.sync="isExport" ref="exportData"></export-box>
      <!-- //记录详情 -->
      <el-dialog
      title='用户详情'
      :visible.sync="recordContentPop"
      width="50%"
      class="el-dialog-reset">
      <div style="padding:0px;" class="record-pop">
        <div class="record-pop-left">
          <p><span>姓名：</span>{{contentMsg.personName}}</p>
          <p><span>性别：</span>
             <label v-if="contentMsg.gender==1">男</label>
            <label v-else-if="contentMsg.gender==2">女</label>
            <label v-else-if="contentMsg.gender==3">未知</label>
          </p>
          <p><span>生日：</span>{{contentMsg.birthday}}</p>
          <p><span>住址：</span>{{contentMsg.address}}</p>
          <p><span>人员类型：</span>
            <label v-if="contentMsg.personName==1">白名单</label>
            <label v-else-if="contentMsg.personName==2">黑名单</label>
            <label v-else-if="contentMsg.personName==3">访客</label>
            <label v-else-if="contentMsg.personName==4">陌生人</label>
          </p>


          <p><span>人员编号：</span>{{contentMsg.code}}</p>
          <p><span>证件号：</span>{{contentMsg.idNum}}</p>
          <p><span>IC卡号：</span>{{contentMsg.icNum}}</p>
          <p><span>民族：</span>{{contentMsg.ethnic}}</p>
          <p><span>签发机关：</span>{{contentMsg.idIssuingOrgan}}</p>
          <p><span>设备类型：</span>
            <label v-if="contentMsg.personName==1">未知</label>
            <label v-else-if="contentMsg.personName==2">人脸识别</label>
            <label v-else-if="contentMsg.personName==3">认证对比</label>
          </p>
          <p><span>抓拍设备：</span>{{contentMsg.deviceName}}</p>
          <p><span>抓拍时间：</span>{{contentMsg.snapTime}}</p>
          <p><span>对比结果：</span>
            <label v-if="contentMsg.matched" style="color:#00a65a">匹配成功</label>
            <label v-else style="color:#dd4b39">未匹配</label>
          </p>
          <p><span>相似度：</span>{{contentMsg.score}}</p>
        </div>
        <div class="record-pop-right">
          <p><span>对比图片：</span>
            <!-- <img style="width:80px;height:80px;display: inline-block;" :src="imgurl+'/file/download?path='+contentMsg.snapPic" alt=""> -->
            <el-image style="width: 120px;" :src="imgurl+'/file/download?path='+contentMsg.comparePic"  :preview-src-list="[imgurl+'/file/download?path='+contentMsg.comparePic]"></el-image>
          </p>
          <p><span>抓拍图片：</span>
            <!-- <img style="width:80px;height:80px;display: inline-block;" :src="imgurl+'/file/download?path='+contentMsg.snapPic" alt=""> -->
            <el-image style="width: 120px;" :src="imgurl+'/file/download?path='+contentMsg.snapPic"  :preview-src-list="[imgurl+'/file/download?path='+contentMsg.snapPic]"></el-image>
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recordContentPop=false">取 消</el-button>
      </span>
     </el-dialog>
  </div>
</template>
<script src="./recognizeRecord.js"></script>
<style scoped lang="scss">
@import "./recognizeRecord.scss";
</style>
