<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        人脸布控 - 布控名单
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="glyphicon glyphicon-home"></i> 首页 </a>
        </li>
        <li><i class="glyphicon glyphicon-cog"></i> 人脸布控</li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 布控名单
        </li>
      </ol>
    </section>
	<div class=""></div>
    <!-- 顶部搜索区 -->
    <el-card >
      <div class="my_card">
        <el-row :gutter="30">
          <el-col :span="18">
            <div class="my_card-box">
              <el-input
                placeholder="搜索姓名"
                v-model="seekCondition.name"
              ></el-input>
              <el-date-picker
                type="datetime"
                placeholder="开始时间"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                v-model="seekCondition.startTime"
                style="margin-left: 10px"
              >
              </el-date-picker>
              <el-date-picker
                type="datetime"
                placeholder="结束时间"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                v-model="seekCondition.expireTime"
                style="margin-left: 10px"
              >
              </el-date-picker>
              <el-select
                placeholder="报警级别"
                style="margin-left: 10px"
                v-model="seekCondition.warnLevel"
              >
                <el-option
                  v-for="item in options6"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
              <el-select
                placeholder="状态"
                style="margin-left: 10px"
                v-model="seekCondition.status"
              >
                <el-option
                  v-for="item in options7"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="btn-group">
              <button id="btn_device_reset" type="button" class="btn btn-primary"  @click="searchControlMsg">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
              </button> 
              <button id="btn_device_reset" type="button" class="btn btn-default pl-8 pr-8"  @click="resetInputVlue">
                <span class="fa fa-reply" aria-hidden="true"></span>重置
              </button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- BTN操作区域 -->
      
        <div class="btn-group" style="margin-top:20px">
            <button id="btn_add" type="button" class="btn btn-default" @click="addList">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>添加
            </button> 
            <button id="btn_add" type="button" class="btn btn-default" @click="deriveExcer">
              <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
            </button> 
        </div>
      
      

      <!-- table表格区域 -->
      <div class="box-table">
        <el-table
          :data="tableData"
          stripe
          border
          tooltip-effect="dark"
          sortable
          style="width: 100%"
          :header-cell-style="{ backg : '#FAF9F8' }"
        >
          <el-table-column prop="faceUrl" label="照片">
            <template slot-scope="scope">
              <el-image
                style="width: 70px; height: 70px"
                :src="scope.row.faceUrl"
                :preview-src-list="[scope.row.faceUrl]"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="warnLevel" label="报警级别">
            <template slot-scope="scope">
              <span>{{
                scope.row.warnLevel == 0
                  ? "无"
                  : scope.row.warnLevel == 1
                  ? "一级"
                  : scope.row.warnLevel == 2
                  ? "二级"
                  : "三级"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="blacklistType" label="布控原因">
            <template slot-scope="scope">
              <span>{{
                scope.row.blacklistType == 0
                  ? "其他"
                  : scope.row.blacklistType == 1
                  ? "广告"
                  : scope.row.blacklistType == 2
                  ? "推销"
                  : "逃犯"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="matchingDegree" label="相似度">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1" style="color: #409eff"
                >有效</span
              >
              <span v-else style="color: #f56c6c">过期</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="有效期"
            show-overflow-tooltip
            :formatter="formatterArr"
          >
          </el-table-column>
          <el-table-column prop="remark" label="备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="beard" label="编辑" fixed="right" width="150">
            <template slot-scope="scope">
              <div>
                <el-button
                  type="primary"
                  @click="compileList(scope.row)"
                  size="mini"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  @click="deleteCompile(scope.row)"
                  size="mini"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部分页区域 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 25]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 添加名单弹出框 -->
        <div>
          <el-dialog
            :title="dialogTitle"
            :visible.sync="userInfoList"
            width="35%"
          
          >
            <div class="dlog_box">
              <div class="observationList" >
                <span class="_siyou"
                  >照 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片：</span
                >
                <el-upload
                  name="file"
                  class="avatar-uploader"
                  :with-credentials="true"
                  :show-file-list="false"
                  :action="'http://pre.qy-rgs.com:9007/file/person/upload'"
                  list-type="picture-card"
                  :data="uploadData"
                  :on-success="successCheck"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="userMsgList.imgurl" :src="userMsgList.imgurl" style="width:95px;height:95px">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="observationList _top" >
                <span class="_siyou"
                  >姓 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span
                >
                <el-input
                  placeholder="请输入姓名"
                  v-model="userMsgList.Oname"
                ></el-input>
              </div>
              <div class="observationList _top">
                <span class="_siyou">报警级别：</span>
                <el-select
                  placeholder="请选择报警级别"
                  v-model="userMsgList.warnLevel"
                >
                  <el-option
                    v-for="item in options6"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  >
                    <span>{{ item.label }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="observationList _top">
                <span class="_siyou">匹配比例：</span>
                <el-input
                  placeholder="匹配比例0~100"
                  v-model="userMsgList.matchingDegree"
                ></el-input>
              </div>
              <div class="observationList _top">
                <span class="_siyou">布控原因：</span>
                <el-select
                  placeholder="请选择布控原因"
                  v-model="userMsgList.blacklistType"
                >
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="observationList _top">
                <span class="_siyou">生效时间：</span>
                <el-date-picker
                  type="datetime"
                  placeholder="开始时间"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  v-model="userMsgList.startTime"
                  style="width: 35%"
                >
                </el-date-picker>
                <el-date-picker
                  type="datetime"
                  placeholder="结束时间"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  v-model="userMsgList.expireTime"
                  style="width: 35%"
                >
                </el-date-picker>
              </div>
              <div class="observationList _top">
                <span class="_siyou"
                  >备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 注：</span
                >
                <el-input
                  placeholder="请输入备注信息"
                  style="width: 70%"
                  v-model="userMsgList.remark"
                  type="textarea"
                  autosize
                ></el-input>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancelSubmit">取 消</el-button>
              <el-button
                type="primary"
                @click="addDeployInfo"
                v-if="tag == true"
                >确 定</el-button
              >
              <el-button v-else type="primary" @click="compilePreserveInfo"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
      </div>
    </el-card>

  </div>
</template>
	<script src="./deployList.js">
</script>
<style scoped>
@import './deployList';
</style>