<template>
  <div class="content-wrapper">
    <section class="content-header">
       <h1 class="nice">
        我的项目 - 编辑
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="fa fa-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-dashboard"></i> 我的项目
        </li>
        <li>
          <router-link to="/projectmanage">
           <i class="glyphicon glyphicon-adjust"></i> 项目管理
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
                <div class="col-lg-8 col-sm-12">
                  <el-form
                    :model="addForm"
                    :rules="rules"
                    ref="addForm"
                    style="padding-bottom:30px"
                  >
                    <div class="row">
                      <label for="name" class="col-sm-2 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        项目名称
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="name">
                          <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-4" style="line-height: 34px;color: red;">（必填）</div>
                    </div>
                    <!-- <div class="row">
                      <label for="name" class="col-sm-2 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        回调地址
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                          <el-input v-model="addForm.callbackUrl"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-4" style="line-height: 34px;">(开发者使用-API对接)</div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-2 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        属性
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                          <el-input v-model="addForm.properties"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-4" style="line-height: 34px;">(开发者使用-API对接)</div>
                    </div> -->

                    <!-- <div class="row">
                      <label for="name" class="col-sm-2 control-label text-right">
                        所在国家
                        <span style="color: red;line-height:40px"></span>
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                          <el-select
                            
                            style="width: 100%;"
                            placeholder="请选择"
                            v-model="addForm.country"
                            @change="changeCountry"
                          >
                            <el-option
                              v-for="i in countryOption"
                              :key="i.id"
                              :label="i.name"
                              :value="i.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div> -->
                    <div class="row">
                      <label for="name" class="col-sm-2 control-label text-right">
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
                      <label for="name" class="col-sm-2 control-label text-right">
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
                      <label for="name" class="col-sm-2 control-label text-right">
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
                      <label for="name" class="col-sm-2 control-label text-right">
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
                      <label for="name" class="col-sm-2 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        停车场
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                          <!-- <new-page-select :value.sync="copyValue"
                            @selectPageChange="entityPageSearch"
                            :valueKey="'id'"
                            :labelKey="'entityName'"
                            :pageInfo="entityPageInfo"
                            :dataList="entityDataTable">
                          </new-page-select> -->
                        </el-form-item>
                      </div>
                      <div class="col-sm-4" style="line-height: 34px;color: red;"></div>
                    </div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-2 control-label text-right">
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
                      <label for="name" class="col-sm-2 control-label text-right">
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
                      <label for="name" class="col-sm-2 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        启用
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                          <el-checkbox v-model="addForm.status">启用</el-checkbox>
                        </el-form-item>
                      </div>
                      <div class="col-sm-4" style="line-height: 34px;color: red;"></div>
                    </div>

                    
                  </el-form>
                  <div class="row">
                    <span class="col-sm-2"></span>
                    <div class="form-group col-sm-6 pb-40">
                      <button class="btn btn-primary" v-if="!isRequst" @click="addBtn('addForm')">保存</button>
                      <button class="btn btn-primary" v-if="isRequst">保存中</button>
                      <!-- <button type="button" id="btn-reset" class="btn btn-default">复位</button> -->
                      <button type="button" id="btn-back" class="btn btn-default" @click="goBack">返回</button>
                  </div>
                  </div>
                  
                </div>
                
                <!-- <div class="col-lg-12"> -->
                  
                <!-- </div> -->
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

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
</style>
