<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        人员管理 - 住户管理
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
            <i class="glyphicon glyphicon-adjust"></i> 住户管理
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body" v-loading="loading">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                  <el-tab-pane label="全部住户" name="first">
                    <div class="form-horizontal">
                      <div class="col-lg-2 pl-0">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-input clearable style="width:100%" placeholder="搜索姓名/手机号码" v-model="PersonListForm.personName"></el-input>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-cascader
                                :key="elcascaderkey"
                                ref="elcascader"
                                style="width:100%"
                                clearable
                                placeholder="楼栋/单元/房间"
                                v-model="PersonListForm.groupId"
                                :options="cascaderData"
                                :props="groupProps"
                                 @visible-change="elCascaderOnlick"
                                @expand-change="elCascaderOnlick"
                                @change="cascaderChange"></el-cascader>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable v-model="PersonListForm.subtype" placeholder="住户类型">
                              <el-option
                                v-for="item in personType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4  pr-0">
                        <div class="btn-group">
                          <button id="btn_device_search" type="button" class="btn btn-primary" @click="getPersonList">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                          </button>
                          <button id="btn_device_reset" type="button" class="btn btn-default" @click="resetBtn">
                            <span class="fa fa-reply" aria-hidden="true"></span>重置
                          </button>
                        </div>
                      </div>
                    </div>

                    <div id="toolbar" class=" btn-group-box" style="width:100%">
                      <div class="btn-group" data-toggle="buttons">
                        <button id="btn_add" type="button" class="btn btn-default" @click="goAdd">
                          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                        </button>
                        <button id="btn_add" type="button" class="btn btn-default" @click="batchDelete">
                          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量删除
                        </button>
                        <button id="btn_delete" type="button" class="btn btn-default" @click="exportBtn">
                          <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
                        </button>
                         <button id="btn_delete" type="button" class="btn btn-default" @click="importPop=true">
                          <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>批量导入
                        </button>
                      </div>
                      <div class=" pr-0 text-right">
                       
                        <!-- <el-button type="primary" size="small" >新增订单</el-button> -->
                        <el-dropdown
                          trigger="click"
                          :hide-on-click="false"
                          placement="bottom-start"
                        >
                          <span class="el-dropdown-link">
                            <el-button type="primary" size="small">
                              <i class="el-icon-menu"></i>
                              <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-checkbox-group v-model="tableSelect" @change='checkboxChange'>
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
                     <el-table-column slot="operate1" label="住户类型" align="center" min-width="120" sortable class="nice">
                        <template slot-scope="scope">
                          <div v-for="(item,index) in scope.row.houseNameList" :key="index">
                            <span v-if="item.personSubtype==1">户主</span>
                            <span v-if="item.personSubtype==2">家庭成员</span>
                            <span v-if="item.personSubtype==3">租客</span>
                            <span v-if="item.personSubtype==5">其他</span>
                            <!-- <span v-if="item.personSubtype==4">物业员工</span>
                            <span v-if="item.personSubtype==5">访客</span> -->
                          </div>
                        </template>
                     </el-table-column>
                      <el-table-column slot="operate2" label="住宅信息" align="center" min-width="120" sortable>
                         <template slot-scope="scope">
                          <div v-for="(item,index) in scope.row.houseNameList" :key="index">
                            <span>{{item.houseAddress}}</span>                          
                          </div>
                        </template>
                     </el-table-column>
                      <el-table-column slot="operate3" label="授权状态" align="center" width="120" sortable>
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
                    <el-table-column slot="operate" label="操作" align="center" width="180">
                        <template slot-scope="scope">
                           <el-row>
                             <!-- <i class="el-icon-edit">IC卡</i>
                             <i class="el-icon-delete">删除</i> -->
                               <el-button title="编辑" type="primary" icon="el-icon-edit" round  size="mini" @click="goEdit(scope.row)"></el-button>
                              <el-button title="删除" type="danger" icon="el-icon-delete" round size="mini" @click="deleteOwner(scope.row.id)"></el-button>
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
                  </el-tab-pane>
                  <el-tab-pane label="住户审核" name="second">

                    <div class="form-horizontal">
                      <div class="col-lg-2 pl-0">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-input clearable style="width:100%" placeholder="搜索姓名/手机号码" v-model="PersonListForm1.personName"></el-input>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-date-picker
                            clearable
                            style="width:100%"
                            v-model="PersonListForm1.time"
                            type="date"
                            placeholder="申请日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd hh:mm:ss"
                          ></el-date-picker>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable v-model="PersonListForm1.subtype" placeholder="住户类型">
                              <el-option
                                v-for="item in personType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable v-model="PersonListForm1.bindStatus" placeholder="状态">
                              <el-option
                                v-for="item in bindStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3  pr-0">
                        <div class="btn-group">
                          <button id="btn_device_search" type="button" class="btn btn-primary" @click="getCheckList">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                          </button>
                          <button id="btn_device_reset" type="button" class="btn btn-default" @click="resetBtn1">
                            <span class="fa fa-reply" aria-hidden="true"></span>重置
                          </button>
                        </div>
                      </div>
                    </div>
                     <div id="toolbar" class=" btn-group-box" style="width:100%">
                       <div class="btn-group" data-toggle="buttons">
                        <button id="btn_delete" type="button" class="btn btn-default" @click="exportBtn">
                          <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
                        </button>
                      </div>
                      <div class=" pr-0 text-right">
                       
                        <!-- <el-button type="primary" size="small" >新增订单</el-button> -->
                        <el-dropdown
                          trigger="click"
                          :hide-on-click="false"
                          placement="bottom-start"
                        >
                          <span class="el-dropdown-link">
                            <el-button type="primary" size="small">
                              <i class="el-icon-menu"></i>
                              <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-checkbox-group v-model="tableSelect1" @change='checkboxChange1'>
                              <div v-for="item in tableOption1" :key="item" class="checkbox-div">
                                <el-checkbox :label="item" :key="item"></el-checkbox>
                              </div>
                            </el-checkbox-group>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div>
                    
                    <table-bmp
                      :table-data="tableData1"
                      :table-label="tableLabel1"
                      ref="tableChild1"
                      :is-show-select="isShowSelect"
                    >
                    <el-table-column slot="operate1" label="附件" align="center" width="100">
                        <template slot-scope="scope">
                          <span class="see-files" v-if="scope.row.enclosureUrl" @click="onPreview(scope.row.enclosureUrl)">查看</span>
                           <!-- <div class="demo-image__preview">
                            <el-image 
                              style="width: 100px; height: 100px"
                              :src="url" 
                              :preview-src-list="scope.row.enclosureList">
                            </el-image>
                          </div> -->
                        </template>
                    </el-table-column>
                    <el-table-column slot="operate" label="操作" align="center" width="100">
                        <template slot-scope="scope">
                           <!-- <el-row v-if="scope.row.bindStatus==0||scope.row.bindStatus==1||(scope.row.personSubtype==1&&scope.row.bindStatus==0)"> -->
                            <el-row v-if="scope.row.bindStatus==0||scope.row.bindStatus==1">
                             <i class="el-icon-edit check-btn" @click="goCheck(scope.row)">审核</i>
                            </el-row>
                        </template>
                    </el-table-column>
                    </table-bmp>

                    <div class="block mt-10">
                      <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page="currentPage1"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total1"
                      ></el-pagination>
                    </div>
                  </el-tab-pane>

                </el-tabs> 
              </div>
            </div>

            <!-- 导入 -->
          <el-dialog
            title="批量导入"
            :visible.sync="importPop"
            :close-on-click-modal='false'
            width="50%">
            <div style="padding:0px;">
              <div class="row mb-20" >
                <div class="col-sm-3 text-right">点击下载Excel模板</div>
                <div class="col-sm-9">
                  <a :href="imgurl+'/static/excel/person.xls'">开始下载Excel导入模板.xls</a>
                  <!-- <a href="../../../../static/export/person.xls" download="person.xls">开始下载Excel导入模板.xls</a> -->
                  <span style="color: red;">（Excel导入模板表头红色必填）</span>
                </div>
              </div>
              <div class="row mb-20">
                <div class="col-sm-3 text-right">选择.zip文件</div>
                <div class="col-sm-9 upload-zip">
                  <el-upload        
                    ref="upload"
                    name="file"
                    :limit=1
                    :with-credentials="true"
                    :file-list="fileList"
                    :action="exportUrl+appId"
                    :data="uploadData"
                    :auto-upload="false"
                    :on-exceed="exceed"
                    :on-change='selectChange'
                    :on-error="uploadErr"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successCheck"
                    :on-remove="removeFile">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
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
              <el-button  @click="importPop=false" >关闭</el-button>
            </span>
          </el-dialog>
      </section>

    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="previewImg" />
    <el-dialog
      :title="checkPopTitle"
      :visible.sync="checkPopVisible"
      width="30%"
      @close="closePop"
      class="el-dialog-reset set-pop">
      <div style="padding:0px;">
        <div v-if="popIndex==1">
          <h4><span class="el-icon-warning icon-warning"></span>是否同意申请</h4>
          <p class="pl-30">{{checkMsg}}</p>
        </div>
         <div v-if="popIndex==2">
          <el-input
            v-model="checkForm.bindFailReseaon"
            type="textarea"
            maxlength="100"
            show-word-limit
            rows="5"
            placeholder="请输入拒绝原因"
          ></el-input>
          <span v-if="showCheckTip" class="tip">请输入拒绝原因</span>
        </div>
       
      </div>
       <span slot="footer" class="dialog-footer" v-if="popIndex==1">
        <el-button @click="clickRefuse">拒绝</el-button>
        <el-button type="primary" @click="checkAgree" >同意</el-button>
      </span>
       <span slot="footer" class="dialog-footer" v-if="popIndex==2">
        <el-button @click="cancelRefuse">取消</el-button>
        <el-button type="primary" @click="refuse" >确定</el-button>
      </span>
    </el-dialog>
    <!-- 导出 -->
      <export-box :exportPopVisible.sync="outPop" :isExport.sync="isExport" ref="exportData"></export-box>

      <!-- 授权状态 -->
      <auth-box :authPopVisible.sync="authPopVisible" :authPopTitle="authPopTitle" ref="authData"></auth-box>
    
    <!-- 导入失败数据 -->
    <el-dialog
      title='导入失败数据'
      :visible.sync="exporterrPop"
      width="60%"
      class="el-dialog-reset">
      <div style="padding:0px;">
        <el-table
        :data="exportErrList"  
          max-height="250"
        :border="true"
        :cell-style="{background:'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0'}"
        :stripe="true">
          <el-table-column property="personName" label="姓名" width="100"></el-table-column>
          <!-- <el-table-column property="faceUrl" label="人脸图片" width="120">
             <template  slot-scope="scope">
              <img v-if="scope.row.faceUrl" src="D:/excel/img/pic81197376299.JPG" alt="">
            </template>
          </el-table-column> -->
          <el-table-column property="phone" label="手机号" width="120"></el-table-column>
          <el-table-column property="icNum" label="IC卡" width="120"></el-table-column>
          <el-table-column property="personSubtype" label="住户类型" width="100">
            <template  slot-scope="scope">
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
     <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
  </div>
</template>
<script src="./ownerManage.js"></script>
<style scoped lang="scss">
@import "./ownerManage.scss";
</style>
