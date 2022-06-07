<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        基础设置 - 服务设置
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-cog"></i> 基础设置
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 服务设置
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary" v-loading="loading">
                <div class="service-box">
                  <h4>设置要开启的物业服务</h4>
                  <ul>
                    <li>                 
                      <el-switch
                        v-model="formData.repairs"
                        @change="changeStatus($event,'repairs')"
                        inactive-text="房屋报修">
                      </el-switch>
                    </li>
                    <li>                 
                      <el-switch
                        v-model="formData.complaints"
                        @change="changeStatus($event,'complaints')"
                        inactive-text="举报投诉">
                      </el-switch>
                    </li>
                    <li>                 
                      <el-switch
                        v-model="formData.bill"
                        @change="changeStatus($event,'bill')"
                        inactive-text="物业账单">
                      </el-switch>
                    </li>
                  </ul>             
                </div>
                <!-- <div class="service-box">
                  <h4>住户审核</h4>
                  <ul>
                    <li>                 
                      <el-switch
                        v-model="formData.audit"
                        @change="changeStatus($event,'audit')"
                        inactive-text="是否需要物业审核">
                      </el-switch>
                    </li>
                  </ul>             
                </div> -->
                <div class="service-box">
                  <h4>家属，租客及其他住户审核
                    <span style="color: #3c8dbc;
                cursor: pointer;
                font-size: 14px;
                margin-left: 5px;" @click="editCheckStatus">编辑</span>
                  </h4>
                  <ul>
                    <li>                 
                       <span v-if="formData.audit==0">不需要物业审核</span>
                       <span v-else-if="formData.audit==1">需要物业审核</span>
                       <span v-else-if="formData.audit==2">超过5人需要物业审核</span>
                       <span v-else-if="formData.audit==3">超过10人需要物业审核</span>
                       <span v-else-if="formData.audit==4">超过15人需要物业审核</span>
                       <span v-else-if="formData.audit==5">超过20人需要物业审核</span>
                    </li>
                  </ul>             
                </div>
                <div class="service-box text-box">
                  <h4>住户申请资料提示
                    <span @click="edit" v-if="isEdit">编辑</span>
                    <span @click="finish" v-if="!isEdit&&!isChangeTiping">完成</span>
                     <span v-if="!isEdit&&isChangeTiping">完成</span>
                  </h4>
                  <ul>
                    <li>
                      <div v-if="isEdit" class="finish-box">{{formData.tips}}</div>
                                       
                      <el-input v-if="!isEdit" type="textarea" :disabled="isEdit" ref="textData" v-model="formData.tips"></el-input>
                    </li>
                  </ul>             
                </div>
            </div>
      </section>
      <el-dialog
      title="家属，租客及其他住户审核"
      :visible.sync="chenkStatusPop"
      width="40%"
      class="el-dialog-reset set-pop">
      <div style="padding:0px;">
           <div class="row">
              <label for="name" class="col-sm-4 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                是否需要审核
              </label>
              <div class="col-sm-6">
                  <el-select style="100%" v-model="checkStatus" placeholder="">
                    <el-option
                      v-for="item in checkStatusOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
              </div>
           </div>  
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chenkStatusPop=false">取 消</el-button>
        <el-button type="primary" v-show="!isRequest" @click="sendCheckStatus">确 定</el-button>
        <el-button type="primary" v-show="isRequest">提交中</el-button>
      </span>
     </el-dialog>
    
  </div>
</template>
<script src="./serviceSet.js"></script>
<style scoped lang="scss">
@import "./serviceSet.scss";
</style>
