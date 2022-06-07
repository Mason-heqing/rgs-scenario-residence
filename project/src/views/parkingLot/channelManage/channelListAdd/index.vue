<template>
  <div class="content-wrapper">
    <section class="content-header">
       <h1 class="nice">
        支付渠道 - 编辑
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="fa fa-home"></i> 首页
          </a>
        </li>
        <li>
          <router-link to="/channelList">
           <i class="glyphicon glyphicon-adjust"></i> 支付渠道
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
                        渠道名称
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="name">
                          <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-4" style="line-height: 34px;color: red;">（必填）</div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-2 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        内容
                      </label>
                      <div class="col-sm-6">
                        <el-form-item prop="content">
                          <el-input type="textarea" v-model="addForm.content"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-4" style="line-height: 34px;color: red;">（必填）</div>
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
<script src="./channelListAdd.js"></script>
<style scoped lang="scss">
@import "./channelListAdd.scss";
</style>
