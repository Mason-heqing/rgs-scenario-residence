<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        人员管理 - 添加员工
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
          <i class="glyphicon glyphicon-adjust"></i> 添加员工
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
                <h3 class="box-title">{{editOrAdd}}</h3>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <h4 class="add-h4">基础信息</h4>
                  <el-form
                    :model="addPeople"
                    :rules="rules"
                    ref="addPeople"
                    style="padding-bottom:30px"
                  >
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        员工姓名
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="personName">
                          <el-input
                            v-model="addPeople.personName"
                            placeholder="输入员工姓名最大支持20字"
                            :maxlength="20"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        所属部门
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="groupId">
                          <!-- <el-select
                            clearable
                            style="width: 100%;"
                            placeholder="选择部门"
                            v-model="addPeople.department"
                            @change="changeType"
                          >
                            <el-option
                              v-for="i in groupType"
                              :key="i.id"
                              :label="i.name"
                              :value="i.id"
                            ></el-option>
                          </el-select>-->
                          <el-cascader
                            ref="elcascader"
                            v-model="addPeople.groupId"
                            :props="groupProps"
                          
                            :options="groupData"
                            @change="handleChange"
                            @visible-change="elCascaderOnlick"
                            @expand-change="elCascaderOnlick"
                          ></el-cascader>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        身份证号
                      </label>
                      <div class="col-sm-7">
                        <el-form-item>
                          <el-input v-model="addPeople.idNum" placeholder="输入员工身份证号" maxlength="18"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        联系方式
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="phone">
                          <el-input
                            v-model="addPeople.phone"
                            placeholder="输入员工手机号码最大支持11字"
                            :maxlength="11"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>

                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        所属岗位
                      </label>
                      <div class="col-sm-7">
                        <el-form-item>
                          <el-input
                            v-model="addPeople.job"
                            placeholder="输入员工岗位最大支持20字"
                            :maxlength="20"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>

                    <h4 class="add-h4">通行凭证</h4>
                   <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        人脸头像
                      </label>
                      <div class="col-sm-7">
                        <div class="upload_box">
                          <el-upload
                            v-if="images.length==0"
                            class
                            drag
                            name="file"
                            :with-credentials="true"
                            :show-file-list="false"
                            :action="imgurl+'/file/person/upload'"
                            list-type="picture-card"
                            :data="uploadData"
                            :on-success="successCheck"
                            :before-upload="beforeAvatarUpload"
                             :on-error="uploadErr"
                          >
                            <span style="color:#9E9DA2;font-size:12px;">+添加图片</span>
                          </el-upload>
                          <ul class="el-upload-list el-upload-list--picture-card" v-else>
                            <li
                       
                              :tabindex="index"
                              class="el-upload-list__item is-success animated"
                              v-for="(element, index) in images"
                              :key="index"
                            >
                              <img
                                :src="imgurl+'/file/download?path='+element"
                                alt
                                class="el-upload-list__item-thumbnail"
                              />
                              <a class="el-upload-list__item-name">
                                <i class="el-icon-document"></i>
                                {{element.name}}
                              </a>
                              <label class="el-upload-list__item-status-label">
                                <i class="el-icon-upload-success el-icon-check"></i>
                              </label>
                              <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                              <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-delete">
                                  <i class="el-icon-delete" @click="remove(index)"></i>
                                </span>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-20">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        IC卡片
                      </label>
                      <div class="col-sm-7">
                        <el-form-item>
                          <el-input v-model="addPeople.icNum" placeholder="输入IC卡号">
                            <!-- <el-button slot="append">读取</el-button> -->
                          </el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        启用状态
                      </label>
                      <div class="col-sm-7">
                        <el-form-item>
                          <el-switch v-model="addPeople.effectiveStatus" active-color="#13ce66"></el-switch>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>
                  </el-form>
                </div>
                <div class="col-lg-6 col-md-12">
                  <h4 class="add-h4">通行权限</h4>
                  <div class="row">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-8" style="overflow-x: hidden;overflow-y: auto;max-height:600px">
                      <el-tree
                        ref="tree"
                        :data="data"
                        show-checkbox
                        node-key="id"
                        default-expand-all
                        :props="defaultProps"
                        @node-click="handleNodeClick"
                        :highlight-current="true"
                        :expand-on-click-node="false"
                        :default-checked-keys="addPeople.deviceGroupList"
                        @check-change="checkChange"
                      ></el-tree>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group text-center pb-40">
                  <button v-if="!isRequst" type="submit" class="btn btn-primary" @click="addBtn('addPeople')">保存</button>
                  <button v-else type="submit" class="btn btn-primary">保存中</button>
                  <!-- <button type="button" id="btn-reset" class="btn btn-default">复位</button> -->
                  <button type="button" id="btn-back" class="btn btn-default" @click="goBack">返回</button>
                </div>
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
    </el-dialog>-->
  </div>
</template>
<script src="./staffManageAdd.js"></script>
<style scoped lang="scss">
@import "./staffManageAdd.scss";
</style>
