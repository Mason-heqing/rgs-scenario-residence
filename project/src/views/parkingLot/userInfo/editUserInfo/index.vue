<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        用户信息
        <!-- <small>Optional description</small> -->
      </h1>
      <!-- <ol class="breadcrumb">
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
      </ol> -->
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="box box-primary">
        <div class="box-body" v-loading="loading">
          <div class="row">
              <div class="col-lg-4 text-center">
                  <div class="form-group">
                      <div class="col-sm-12 header-upload">
                        <el-upload
                            ref="upload"
                            class="avatar-uploader mt-60 mb-50"
                            action="#"
                            :show-file-list="false"
                            list-type="picture-card"
                            :auto-upload="false"
                            :data="userInfo"
                            :on-change='selectChange'>
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                            <i class="el-icon-close is-delete" @click.stop="deleteImg"></i>
                            <div class="el-upload__tip" slot="tip">点击选择文件，推荐尺寸160px*160px</div>
                        </el-upload>
                      </div>
                  </div>
              </div>
              <div class="col-lg-8">
                  <el-form
                    :model="userInfo"
                    :rules="rules"
                    ref="userInfo"
                    style="padding-bottom:30px"
                  >
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        账号
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="account">
                          <el-input v-model="account" disabled></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-3" style="line-height: 34px;color: red;">（必填）</div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        姓名
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="name">
                          <el-input v-model="userInfo.userName"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-3" style="line-height: 34px;color: red;">（必填）</div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        密码
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="password">
                          <el-input type="password" v-model="userInfo.password" maxlength=128></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-3" style="line-height: 34px;color: red;">（必填）</div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        确认密码
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="checkPass">
                          <el-input type="password" v-model="userInfo.checkPass" maxlength=128></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-3" style="line-height: 34px;color: red;">（必填）</div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        电话
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="mobile">
                          <el-input v-model="userInfo.mobile" maxlength="11"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-3" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        EMAIL
                      </label>
                      <div class="col-sm-6">
                        <el-form-item>
                          <el-input v-model="userInfo.email"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-3" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        
                      </label>
                          <div class="form-group col-sm-6 pb-40">
                            <button class="btn btn-primary mr-20" type="button" @click="editUser('userInfo')">保存</button>
                            <!-- <button class="btn btn-primary mr-20" v-if="isRequst">保存中</button> -->
                            <button type="button" id="btn-back" class="btn btn-default" @click="reset">复位</button>
                        </div>
                      <div class="col-sm-3" style="line-height: 34px;color: red;"></div>
                    </div>
                  </el-form>
              </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box> -->


    
  </div>
</template>
<script src="./editUserInfo.js"></script>
<style scoped lang="scss">
@import "./editUserInfo.scss";
</style>
