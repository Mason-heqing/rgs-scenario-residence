<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        物业服务 - 添加账单
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
            <i class="glyphicon glyphicon-adjust"></i> 添加账单
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="repairs-box">
                <h3>添加账单</h3>
                <div class="repairs-msg">
                  
                  <el-form
                    :model="addForm"
                    :rules="rules"
                    ref="addForm"
                    style="padding-bottom:30px"
                    class="mt-30 bill-form"
                  >
                  <div class="row">
                    <label for="name" class="col-sm-2 control-label text-right">
                      <span style="color: red;line-height:40px">*</span>
                      账单名称
                    </label>
                    <div class="col-sm-6">
                      <el-form-item prop="billName">
                        <el-input placeholder="输入账单名称最大支持20字" style="width:100%" v-model="addForm.billName" maxlength=20></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label for="name" class="col-sm-2 control-label text-right">
                      <span style="color: red;line-height:40px">*</span>
                      发送户室
                    </label>
                    <div class="col-sm-6">
                      <el-form-item prop="houseId">
                        <el-cascader
                                style="width:100%"
                                clearable
                                placeholder="楼栋/单元/房间"
                                v-model="addForm.houseId"
                                :options="cascaderData"
                                :props="groupProps"
                                @change="cascaderChange"></el-cascader>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label for="name" class="col-sm-2 control-label text-right">
                      <span style="color: red;line-height:40px">*</span>
                      账单附件
                    </label>
                    <div class="col-sm-10">
                      <el-form-item prop="name">
                       <div class="upload_box">
                          <el-upload                          
                            class
                            drag
                            :limit="5"
                            name="file"                           
                            :show-file-list="true"
                            :file-list="fileList"
                            :action="imgurl+'/file/upload'"
                            list-type="picture-card"
                            :data="uploadData"
                            :on-success="successCheck"
                            :on-remove="handleRemove"
                            :before-upload="beforeAvatarUpload"
                            :on-exceed="exceed"
                          >
                            <span style="color:#9E9DA2;font-size:14px;">+添加图片</span>
                            <div class="el-upload__tip" slot="tip">支持png，jpg，bmp，jpeg格式，大小不超过5M</div>
                            <div class="el-upload__tip" slot="tip" v-if="billTip" style="color:#F56C6C;">请上传附件</div>
                          </el-upload>
                          <!-- <ul class="el-upload-list el-upload-list--picture-card">
                            <li
                              style="width:160px"
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
                              <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-delete">
                                  <i class="el-icon-delete" @click="remove(index)"></i>
                                </span>
                              </span>
                            </li>
                          </ul> -->
                        </div>
                        
                         
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <label class="col-sm-2 control-label text-right">
                    </label>
                    <div class="form-group col-sm-6 pb-40">
                        <button class="btn btn-primary mr-20" type="button" v-if="!isRequst" @click="addBill1('addForm')">保存</button>
                        <button class="btn btn-primary mr-20" type="button"  v-if="isRequst">保存中</button>
                        <!-- <button type="button" id="btn-reset" class="btn btn-default">复位</button> -->
                        <button type="button" id="btn-back" class="btn btn-default" @click="goBack">取消</button>
                      </div>
                  </div>
                     
                    
                  </el-form>
                    
                </div>
              </div>
            </div>
      </section>
    
  </div>
</template>
<script src="./addBill.js"></script>
<style scoped lang="scss">
@import "./addBill.scss";
</style>
