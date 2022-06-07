<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        物业服务 - 处理投诉
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
            <i class="glyphicon glyphicon-adjust"></i> 处理投诉
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="repairs-box">
                <h3>处理投诉</h3>
                <div class="repairs-msg">
                  <p>投诉人：{{dataForm.complainPerson}}</p>
                  <p>手机号码：{{dataForm.complainPhone}}</p>
                  <p>房屋信息：{{dataForm.houseAddress}}</p>
                  <h4 class="mt-30">{{dataForm.complainTitle}}</h4>
                  <div class="mt-20">{{dataForm.complainContent}}</div>
                  <div class="img-box mt-20">
                    <el-image 
                      v-for="(item,index) in dataForm.complainImageUrl" :key="index"
                      style="width: 100px; height: 100px;margin-right:15px;border: 1px solid #ccc;"
                      :src="imgurl+'/file/download?path='+item"
                      :preview-src-list="imgurlList">
                    </el-image>
                    <!-- <img v-for="(item,index) in dataForm.complainImageUrl" :key="index" style="width:80px;height:80px" :src="imgurl+'/file/download?path='+item" alt /> -->
                  </div>
                  <el-form
                    :model="complaintForm"
                    :rules="rules"
                    ref="complaintForm"
                    style="padding-bottom:30px"
                    class="mt-30"
                  >
                  <div class="row">
                      <label for="name" class="col-sm-12 control-label">
                        <span style="color: red;line-height:40px">*</span>
                        处理意见
                      </label>
                      <div class="col-sm-12">
                        <el-form-item prop="dealSuggestion">
                          <el-input maxlength="100" show-word-limit type="textarea" v-model="complaintForm.dealSuggestion"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form>
                    <div class="form-group text-center pb-40">
                        <button class="btn btn-primary mr-20" v-if="!isRequst" @click="addComplaint('complaintForm')">保存</button>
                        <button class="btn btn-primary mr-20" v-if="isRequst">保存中</button>
                        <!-- <button type="button" id="btn-reset" class="btn btn-default">复位</button> -->
                        <button type="button" id="btn-back" class="btn btn-default" @click="cancel">取消</button>
                      </div>
                </div>
              </div>
            </div>
      </section>
    
  </div>
</template>
<script src="./complaintDeal.js"></script>
<style scoped lang="scss">
@import "./complaintDeal.scss";
</style>
