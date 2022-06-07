<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        我的社区 - {{title_name}}
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="fa fa-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-dashboard"></i> 我的社区
        </li>
        <li>
          <router-link to="/projectmanage">
            <i class="glyphicon glyphicon-adjust"></i> 社区管理
          </router-link>
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 编辑
        </li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="panel-body" style="padding:0">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-primary">
              <div class="box-header with-border">
                <h3 class="box-title">{{howText}}</h3>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <el-form
                    :model="addForm"
                    :rules="rules"
                    ref="addForm"
                    style="padding-bottom:30px"
                  >
                    <div class="row">
                      <div class="col-sm-7">
                          <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        社区名称
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="name">
                          <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        所在省份
                        
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="provId">
                          <el-select
                            filterable 
                            style="width: 100%;"
                            placeholder="请选择"
                            v-model="addForm.provId"
                            @change="changeProv"
                          >
                            <el-option
                              v-for="i in prov"
                              :key="i.id"
                              :label="i.name"
                              :value="i.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        所在城市
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="cityId">
                          <el-select
                            filterable 
                            style="width: 100%;"
                            placeholder="请选择"
                            v-model="addForm.cityId"
                            @change="changeCity"
                          >
                            <el-option
                              v-for="i in city"
                              :key="i.id"
                              :label="i.name"
                              :value="i.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        所在区域
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="areaId">
                          <el-select
                            filterable 
                            style="width: 100%;"
                            placeholder="请选择"
                            v-model="addForm.areaId"
                            @change="changeArea"
                          >
                            <el-option
                              v-for="i in area"
                              :key="i.id"
                              :label="i.name"
                              :value="i.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        详细地址
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                          <el-input type="textarea" v-model="addForm.address"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-4" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        识别记录保存天数
                        <span style="color: red;line-height:40px"></span>
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                          <el-select
                            clearable
                            style="width: 100%;"
                            placeholder="请选择"
                            v-model="addForm.faceRecogRetainDays"
                          >
                            <el-option
                              v-for="i in faceRecogRetainDaysOption"
                              :key="i.id"
                              :label="i.name"
                              :value="i.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        回调地址
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="name">
                          <el-input v-model="addForm.callbackUrl"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-3" style="line-height: 34px;">(开发者使用-API对接)</div>
                    </div>
                    <div class="row" v-if="isCallbackCode">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        选择回调接口
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                        <el-checkbox-group v-model="addForm.callbackType" @change="handleChecked">
                              <el-checkbox v-for="(item,index) in codeList" :key="item.id"  :label="item.code">{{item.codeName}}</el-checkbox>
                              </el-checkbox-group>
                        </el-form-item>
                      </div>
                      <div class="col-sm-3" style="line-height: 34px;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        备注
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                          <el-input type="textarea" v-model="addForm.remark"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-4" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        启用
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                            <el-checkbox v-model="addForm.status">启用</el-checkbox>
                            <!-- <el-checkbox v-model="statusA" :disabled='tagSta'>启用停车场</el-checkbox> -->
                        </el-form-item>
                      </div>
                    </div>
                    <div class="row" v-show="isShowSpecial">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                         是否启用实名认证
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                            <el-checkbox @change="certificationChange" v-model="certification">启用</el-checkbox>
                            <!-- <el-checkbox v-model="statusA" :disabled='tagSta'>启用停车场</el-checkbox> -->
                        </el-form-item>
                      </div>
                    </div>
                      </div>
                      <div class="col-sm-7" v-show="isShowCertification">
                           <div class="row">
                              <label for="name" class="col-sm-3 control-label text-right">
                                <span style="color:red;line-height:40px">*</span>
                                单位名称
                              </label>
                              <div class="col-sm-6">
                                 <el-form-item prop="dwmc">
                                  <el-input v-model="addForm.dwmc" maxlength="48"></el-input>
                                </el-form-item>
                              </div>
                           </div>
                           <div class="row">
                              <label for="name" class="col-sm-3 control-label text-right">
                                <span style="color:red;line-height:40px">*</span>
                                社会统一信用代码
                              </label>
                              <div class="col-sm-6">
                                 <el-form-item prop="shtyxydm">
                                  <el-input v-model="addForm.shtyxydm" maxlength="48"></el-input>
                                </el-form-item>
                              </div>
                           </div>
                           <div class="row">
                              <label for="name" class="col-sm-3 control-label text-right">
                                <span style="color:red;line-height:40px">*</span>
                                单位联系人
                              </label>
                              <div class="col-sm-6">
                                 <el-form-item prop="dwlxr">
                                  <el-input v-model="addForm.dwlxr" maxlength="48"></el-input>
                                </el-form-item>
                              </div>
                           </div>
                           <div class="row">
                              <label for="name" class="col-sm-3 control-label text-right">
                                <span style="color:red;line-height:40px">*</span>
                                单位电话
                              </label>
                              <div class="col-sm-6">
                                 <el-form-item prop="dwdh">
                                  <el-input v-model="addForm.dwdh" maxlength="48"></el-input>
                                </el-form-item>
                              </div>
                           </div>
                           <div class="row">
                              <label for="name" class="col-sm-3 control-label text-right">
                                <span style="color:red;line-height:40px">*</span>
                                单位类别
                              </label>
                              <div class="col-sm-6">
                                 <el-form-item prop="dwlb">
                                  <!--<el-input v-model="addForm.dwlb"></el-input> -->
                                  <el-select
                                    clearable
                                    style="width: 100%;"
                                    placeholder="请选择"
                                    v-model="addForm.dwlb"
                                  >
                                    <el-option
                                      v-for="i in dwlbList"
                                      :key="i.id"
                                      :label="i.dictName"
                                      :value="i.dictCode"
                                    ></el-option>
                                  </el-select>
                                </el-form-item>
                              </div>
                           </div>
                           <div class="row">
                              <label for="name" class="col-sm-3 control-label text-right">
                                <span style="color:red;line-height:40px">*</span>
                                所属分局编码
                              </label>
                              <div class="col-sm-6">
                                 <el-form-item prop="ssfj">
                                  <el-input v-model="addForm.ssfj" maxlength="48"></el-input>
                                </el-form-item>
                              </div>
                           </div>
                           <div class="row">
                              <label for="name" class="col-sm-3 control-label text-right">
                                <span style="color:red;line-height:40px">*</span>
                                所属警务区编码
                              </label>
                              <div class="col-sm-6">
                                 <el-form-item prop="ssjwq">
                                  <el-input v-model="addForm.ssjwq" maxlength="48"></el-input>
                                </el-form-item>
                              </div>
                           </div>
                           <div class="row">
                              <label for="name" class="col-sm-3 control-label text-right">
                                <span style="color:red;line-height:40px">*</span>
                                所属派出所编码
                              </label>
                              <div class="col-sm-6">
                                 <el-form-item prop="sspcs">
                                  <el-input v-model="addForm.sspcs" maxlength="48"></el-input>
                                </el-form-item>
                              </div>
                           </div>
                           <div class="row">
                              <label for="name" class="col-sm-3 control-label text-right">
                                <span style="color:red;line-height:40px">*</span>
                                地址
                              </label>
                              <div class="col-sm-6">
                                 <el-form-item prop="dwdz">
                                  <el-input v-model="addForm.dwdz"></el-input>
                                </el-form-item>
                              </div>
                           </div>
                      </div>
                    </div>
                  </el-form>
                  <div class="row">
                    <div class="col-sm-7">
                       <div class="row">
                            <span class="col-sm-3"></span>
                    <div class="form-group col-sm-6 pb-40">
                      <button class="btn btn-primary" v-if="!isRequst" @click="addBtn('addForm')">保存</button>
                      <button class="btn btn-primary" v-if="isRequst">保存中</button>
                      <!-- <button type="button" id="btn-reset" class="btn btn-default">复位</button> -->
                      <button type="button" id="btn-back" class="btn btn-default" @click="goBack">返回</button>
                    </div>
                       </div>
                    </div>
                    
                  </div>
                  
                </div>
            
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 百度地图弹窗 -->
        <el-dialog
          title="拾取坐标点"
          :visible.sync="openBaiduMapDlog"
          width="65%"
          center
        >
          <div>
            <baidu-map
              class="bm-view"
              @ready="map_handler"
              @click="getMapInfo"
              :center="center"
              :zoom="zoom"
              :scroll-wheel-zoom="true"
              :map-click="true"
            >
            <bm-marker
                class="bm_marker"
                :position="center"
                :dragging="true"
                icon
              >
              </bm-marker>
            </baidu-map>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelDlog">取 消</el-button>
            <el-button type="primary" @click="closeDlog"
              >确 定</el-button
            >
          </span>
        </el-dialog>
     <!-- <el-dialog
      title="添加设备分组"
      :visible.sync="addPop"
      width="500px"
      class="el-dialog-reset">
      <div style="padding:0px;">
        <el-input v-model="groupName"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPop = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </span>
     </el-dialog> -->
  </div>
</template>
<script src="./projectManageAdd.js"></script>
<style scoped lang="scss">
@import "./projectManageAdd.scss";

.bm-view {
  width: 100%;
  height: 500px;
}
>>>.el-dialog .el-dialog__body {
  padding: 5px 5px;
}
</style>
