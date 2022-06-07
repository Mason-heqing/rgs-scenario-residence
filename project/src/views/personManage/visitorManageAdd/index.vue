<template>
  <div class="content-wrapper">
    <section class="content-header">
      <label class="nice" style="font-size:18px">添加访客</label>
      <ol class="breadcrumb">
        <li>
          <a href="/">
            <i class="fa fa-home"></i> 首页
          </a>
        </li>
        <li>
          <i class="glyphicon glyphicon-dashboard"></i> 人员管理
        </li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 添加访客
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
                <h3 class="box-title">添加</h3>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <h4 class="add-h4">基础信息</h4>
                  <el-form
                    :model="addPeople"
                    :rules="rules"
                    ref="addgroup"
                    style="padding-bottom:30px"
                  >
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        员工姓名
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="name">
                          <el-input v-model="addPeople.name"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        联系方式
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="phone">
                          <el-input v-model="addPeople.phone"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        身份证号
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="idCard">
                          <el-input v-model="addPeople.idCard"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>

                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        所属部门
                        <span style="color: red;line-height:40px"></span>
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="department">
                          <el-select
                            clearable
                            style="width: 100%;"
                            placeholder="请选择"
                            v-model="addPeople.department"
                            @change="changeType"
                          >
                            <el-option
                              v-for="i in groupType"
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
                        所属岗位
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="post">
                          <el-input v-model="addPeople.post"></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>

                    <!-- <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        开始时间
                        <span style="color: red;line-height:40px"></span>
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="time">
                          <el-date-picker
                            style="width: 100%;"
                            v-model="addPeople.time"
                            clearable
                            small="small"
                            align="right"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期"
                            @change="changeTime"
                          ></el-date-picker>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        开始时间
                        <span style="color: red;line-height:40px"></span>
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="time">
                          <el-date-picker
                            style="width: 100%;"
                            v-model="addPeople.time"
                            clearable
                            small="small"
                            align="right"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="结束时间"
                            @change="changeTime"
                          ></el-date-picker>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        设备选择
                        <span style="color: red;line-height:40px"></span>
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="name">
                          <el-radio v-model="addPeople.radio" label="1">基础配置</el-radio>
                          <el-radio v-model="addPeople.radio" label="2">高级配置</el-radio>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        每日通行时段
                        <span style="color: red;line-height:40px"></span>
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="name">
                          <el-radio v-model="addPeople.radio" label="1">不限时段</el-radio>
                          <el-radio v-model="addPeople.radio" label="2">指定时段</el-radio>
                        </el-form-item>
                      </div>
                    </div>

                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        星期
                        <span style="color: red;line-height:40px"></span>
                      </label>
                      <div class="col-sm-9">
                        <el-form-item prop="name">
                          <el-checkbox-group
                            v-model="addPeople.checkList"
                            @change="handleCheckedCitiesChange"
                          >
                            <el-checkbox label="一"></el-checkbox>
                            <el-checkbox label="二"></el-checkbox>
                            <el-checkbox label="三"></el-checkbox>
                            <el-checkbox label="四"></el-checkbox>
                            <el-checkbox label="五"></el-checkbox>
                            <el-checkbox label="六"></el-checkbox>
                            <el-checkbox label="日"></el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </div>
                    </div>-->
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        通行权限
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="auth">
                          <el-cascader
                            style="width: 100%;"
                            :options="options"
                            v-model="addPeople.auth"
                            clearable
                          ></el-cascader>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form>
                </div>
                <div class="col-lg-6 col-md-12">
                  <h4 class="add-h4">通行凭证</h4>
                  <el-form
                    :model="addPeople"
                    :rules="rules"
                    ref="addgroup"
                    style="padding-bottom:30px"
                  >
                    <div class="row">
                      <label for="name" class="col-sm-12 control-label">
                        <span style="color: red;line-height:40px">*</span>
                        人脸头像
                      </label>
                      <div class="col-sm-12">
                        <el-upload
                        name="file"
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                        >
                          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </div>
                    </div>

                    <div class="row">
                      <label for="name" class="col-sm-12 control-label">
                        <span style="color: red;line-height:40px">*</span>
                        IC卡片
                      </label>
                      <div class="col-sm-12">
                        <el-upload
                        name="file"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove"
                          :on-success="successCheck"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                      </div>
                    </div>
                  </el-form>
                </div>
                <div class="col-lg-12">
                  <div class="form-group text-center">
                      <button type="submit" class="btn btn-primary">保存</button>
                      <!-- <button type="button" id="btn-reset" class="btn btn-default">复位</button> -->
                      <button type="button" id="btn-back" class="btn btn-default">返回</button>
                    </div>
              
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
     </el-dialog> -->
  </div>
</template>
<script src="./visitorManageAdd.js"></script>
<style scoped lang="scss">
@import "./visitorManageAdd.scss";
</style>
