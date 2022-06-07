<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        物业服务 - 通知公告
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="fa fa-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-dashboard"></i> 物业服务
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 通知公告
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
        <!-- <div class="box box-primary add-notice"> -->
             <el-form class="mt-20 add-notice" :model="addForm" ref="addForm" :rules="rules" @submit.native.prevent>
               <el-form-item prop="noticeTitle" label="标题">
                  <!-- <label for="name">
                    <span style="color: red;line-height:40px">*</span>标题　               
                  </label> -->
                  <el-input style="width:60%" placeholder="请输入广告标题最大支持40字" v-model="addForm.noticeTitle" maxlength=40></el-input>
                </el-form-item>
                <el-form-item style="display: flex;" prop="noticeContent" class="editor-box">
                   <label for="name" style="width: 100px;
                    text-align: right;
                    padding-right: 12px;">
                    <span style="color: red;line-height:40px">*</span>正文  
                               
                  </label>
                  <div ref="editor" class="editor-text"></div> 
                </el-form-item>
                <span v-if="noticeTip" style="color:#F56C6C;margin-left:100px">请输入通知内容</span>
             </el-form>
             <div class="row mt-20">
                <div class="form-group" style="margin-left:112px">
                    <button type="button" id="btn-reset" class="btn btn-primary" v-if="!isRequst" @click="addNotice('addForm',1)">发布</button>
                    <button type="button" id="btn-reset" class="btn btn-primary" v-if="isRequst">发布中</button>
                    <button type="button" id="btn-back" class="btn btn-primary"  v-if="!isRequst1" @click="addNotice('addForm',0)">保存为草稿</button>
                    <button type="button" id="btn-back" class="btn btn-primary"  v-if="isRequst1">保存中</button>
                    <button type="button" class="btn btn-default" @click="cancel">取消</button>
                  </div>
              </div>
        <!-- </div> -->
      </section>
    
  </div>
</template>
<script src="./noticeAdd.js"></script>
<style scoped lang="scss">
@import "./noticeAdd.scss";
</style>
