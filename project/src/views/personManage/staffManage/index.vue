<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        人员管理 - 员工管理
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="glyphicon glyphicon-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-user"></i> 人员管理
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 员工管理
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid tree-color">
      <div class="panel-body" style="padding: 0px;">
        <div class="row">
          <div class="col-lg-3 model-one">
            <div class="box box-primary">
              <div class="box-header with-border">
                <!-- <h3 class="box-title" style="font-weight: bold;">子用户</h3> -->
                <div class>
                  <el-input
                    placeholder="搜索分组名称"
                    v-model="groupVal"
                    @keyup.enter.native="getGroupByVal"
                  >
                    <el-button slot="append" @click="getGroupByVal">搜索</el-button>
                  </el-input>
                </div>
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-lg-12">
                    <div
                      style="width: 100%;overflow-x: hidden;overflow-y: auto;max-height:750px"
                      class="tree-box"
                    >
                      <!-- <div class="all-group" @click="clickAllGroup">所有部门</div> -->
                      <el-tree
                        :data="leftData"
                        :props="defaultProps"
                        node-key="id"
                        :default-checked-keys="['']"
                        :default-expand-all="true"
                        @node-click="handleNodeClick"
                        :highlight-current="true"
                        :expand-on-click-node="false"
                      ></el-tree>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box-footer">
                <button
                  id="btn_update_classify"
                  type="button"
                  class="btn btn-xs btn-default"
                  @click="editGroup"
                >
                  <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
                <button
                  id="btn_add_classify"
                  type="button"
                  class="btn btn-xs btn-default"
                  @click="addGroup"
                >
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
                <button
                  id="btn_delete_classify"
                  type="button"
                  class="btn btn-xs btn-default"
                  @click="deleteGroup"
                >
                  <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-9 model-two">
            <div class="box box-primary">
              <div class="box-body" v-loading="loading">
                <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">-->
                <div class="form-horizontal">
                  <div class="col-lg-3 pl-0">
                    <div class="form-group">
                      <div class="col-md-12">
                        <el-input
                          clearable
                          placeholder="搜索姓名/岗位/联系方式"
                          v-model="dataForm.personName"
                        ></el-input>
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
                  <div class="btn-group" data-toggle="buttons">
                    <button id="btn_add" type="button" class="btn btn-default" @click="goAdd">
                      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                    </button>
                    <button id="btn_add" type="button" class="btn btn-default" @click="batchDelete">
                      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量删除
                    </button>
                    <button
                      id="btn_delete"
                      type="button"
                      class="btn btn-default"
                      @click="exportBtn"
                    >
                      <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
                    </button>
                    <button
                      id="btn_delete"
                      type="button"
                      class="btn btn-default"
                      @click="importPop=true"
                    >
                      <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>批量导入
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
                  :is-show-select="isShowSelect"
                >
                  
                  <el-table-column
                    slot="operate1"
                    label="授权状态"
                    align="center"
                    width="120"
                    sortable
                  >
                    <template slot-scope="scope">
                      <!-- <span class="see-files" @click="goView(scope.row.id,scope.row.personName)">查看</span> -->
                      <div class="grant-box" @click="goView(scope.row.id,scope.row.personName)" v-if="scope.row.grantTotalNum!=0&&scope.row.grantSuccessNum>=scope.row.grantTotalNum">
                        <div class="grant-color-s"></div>
                        <span class="grant-num-s">{{scope.row.grantSuccessNum}}/{{scope.row.grantTotalNum}}</span>
                      </div>
                      <div class="grant-box" @click="goView(scope.row.id,scope.row.personName)" v-if="scope.row.grantTotalNum!=0&&scope.row.grantSuccessNum==0">
                        <div class="grant-color-f"></div>
                        <span class="grant-num-f">{{scope.row.grantSuccessNum}}/{{scope.row.grantTotalNum}}</span>
                      </div>
                      <div class="grant-box" @click="goView(scope.row.id,scope.row.personName)" v-if="scope.row.grantTotalNum!=0&&scope.row.grantSuccessNum<scope.row.grantTotalNum&&scope.row.grantSuccessNum!=0">
                        <div class="grant-color-half"></div>
                        <span class="grant-num-half">{{scope.row.grantSuccessNum}}/{{scope.row.grantTotalNum}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column slot="operate2"  label="启用状态" align="center"  min-width="120" sortable>
                    <template slot-scope="scope">
                      <el-switch v-model="scope.row.effectiveStatus" @change="changeStatus($event,scope.row)"></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column slot="operate" label="操作" align="center" width="150">
                    <template slot-scope="scope">
                      <el-row>
                        <el-button
                          title="编辑"
                          type="primary"
                          icon="el-icon-edit"
                        
                          size="mini"
                          @click="editPerson(scope.row)"
                        ></el-button>
                        <el-button
                          title="删除"
                          type="danger"
                          icon="el-icon-delete"
                        
                          size="mini"
                          @click="deleteStaff(scope.row.id)"
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
          </div>
        </div>
      </div>
      <!-- 导入 -->
    <el-dialog title="批量导入" :visible.sync="importPop" width="50%" :close-on-click-modal='false'>
      <div style="padding:0px;">
        <div class="row mb-20">
          <div class="col-sm-3 text-right">点击下载Excel模板</div>
          <div class="col-sm-9">
            <a :href="imgurl+'/static/excel/employee.xls'">开始下载Excel导入模板.xls</a>
            <!-- <a href="../../../../static/export/employee.xls" download="employee.xls">开始下载Excel导入模板.xls</a> -->
            <span style="color: red;">（Excel导入模板表头红色必填）</span>
          </div>
        </div>
        <div class="row mb-20">
          <div class="col-sm-3 text-right">选择.zip文件</div>
          <div class="col-sm-9 upload-zip">
            <el-upload
              ref="upload"
              name="file"
              :limit="1"
              :with-credentials="true"
              :file-list="fileList"
              :action="exportUrl+appId"
              :data="uploadData"
              :auto-upload="false"
              :on-exceed="exceed"
              :on-change="selectChange"
              :on-error="uploadErr"
              :before-upload="beforeAvatarUpload"
              :on-success="successCheck"
              :on-remove="removeFile"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
              >上传</el-button>
            </el-upload>
          </div>
        </div>
        <div class="row mb-20" >
          <div class="col-sm-3 text-right">导入须知</div>
          <div class="col-sm-9">
            1、上传文件大小最大为：<span style="color: red;">128MB</span>；<br/>
            2、excel文件跟人员图片需要放在<span style="color: red;">同一层级目录</span>，如图片放在(批量导入目录)则excel文件也要放在该目录下；<br/>
            3、目前仅支持上传<span style="color: red;">zip格式</span>压缩文件，将文件夹压缩时请选择正确的压缩格式；<span style="color: red;">excel模板请下载上方指定的模板</span>；<br/>
            4、人员与图片的对应方式为根据excel文件人脸图片进行获取，如果当前导入用户 存在人脸图片，请将图片名称填入此列;<br/>
            5、当人脸图片列为空时，会根据人员姓名去进行一次对应的图片获取，如人员姓名为李四，会去获取一次图片名称为李四的文件；<br/>
            6、若无excel文件，仅有图片，则人脸图片名称格式为：<span style="color: red;">姓名_人员编号</span>          
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importPop=false">关闭</el-button>
      </span>
    </el-dialog>
    </section>
    
    <!-- 导入失败数据 -->
    <el-dialog title="导入失败数据" :visible.sync="exporterrPop" width="60%" class="el-dialog-reset">
      <div style="padding:0px;">
        <el-table
          :data="exportErrList"
          max-height="250"
          :border="true"
          :cell-style="{background:'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0'}"
          :stripe="true"
        >
          <el-table-column property="personName" label="姓名" width="100"></el-table-column>
          <!-- <el-table-column property="faceUrl" label="人脸图片" width="120">
             <template  slot-scope="scope">
              <img v-if="scope.row.faceUrl" src="D:/excel/img/pic81197376299.JPG" alt="">
            </template>
          </el-table-column>-->
          <el-table-column property="phone" label="手机号" width="120"></el-table-column>
          <el-table-column property="icNum" label="IC卡" width="120"></el-table-column>
          <el-table-column property="personSubtype" label="住户类型" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.personSubtype=='1'">户主</span>
              <span v-if="scope.row.personSubtype=='2'">家庭成员</span>
              <span v-if="scope.row.personSubtype=='3'">租客</span>
              <span v-if="scope.row.personSubtype=='5'">其他</span>
            </template>
          </el-table-column>
          <el-table-column property="buildName" label="楼栋" width="80"></el-table-column>
          <el-table-column property="unitName" label="单元" width="80"></el-table-column>
          <el-table-column property="houseName" label="房号" width="80"></el-table-column>
          <el-table-column property="errorMsg" label="失败原因" min-width="120"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exporterrPop=false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 导出 -->
    <export-box :exportPopVisible.sync="outPop" :isExport.sync="isExport" ref="exportData"></export-box>
    <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
    <from-dialog
      :popVisible.sync="fromPopVisible"
      :popTitle="fromPopTitle"
      :popContent="fromPopContent"
      :popValue="popValue"
      ref="addGialog"
    ></from-dialog>

    <!-- 授权状态 -->
    <auth-box :authPopVisible.sync="authPopVisible" :authPopTitle="authPopTitle" ref="authData"></auth-box>
  </div>
</template>
<script src="./staffManage.js"></script>
<style scoped lang="scss">
@import "./staffManage.scss";
</style>
