<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        新增车场 - {{howText}}
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="fa fa-home"></i> 首页 </a>
        </li>
        <li>
          <router-link to="/parkManager">
            <i class="glyphicon glyphicon-adjust"></i> 车场管理
          </router-link>
        </li>
        <li class="active"><i class="glyphicon glyphicon-adjust"></i> {{howText}}</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
      <div class="panel-body" style="padding: 0">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-primary">
              <!-- <div class="box-header with-border">
                <h3 class="box-title">{{howText}}</h3>
              </div> -->
              <div class="row">
                <div class="col-sm-12">
                  <el-form
                    :model="addForm"
                    :rules="rules"
                    ref="addForm"
                    style="padding-bottom: 30px"
                  >
                    <div class="row">
                      <h4 class="add-h4">基础信息</h4>
                      <!-- <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          <span style="color: red; line-height: 40px">*</span>
                          所属渠道
                        </label>
                        <div class="col-sm-9">
                          <el-form-item prop="currPayChannelId">
                            <el-select
                              style="width: 100%"
                              placeholder="请选择所属渠道"
                              v-model="addForm.currPayChannelId"
                            >
                              <el-option
                                v-for="i in currPayChannelId"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div> -->
                      <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          <span style="color: red; line-height: 40px">*</span>
                          车场名称
                        </label>
                        <div class="col-sm-9">
                          <el-form-item prop="name">
                            <el-input
                              v-model="addForm.name"
                              placeholder="请输入车场名称"
                            ></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          <span style="color: red; line-height: 40px">*</span>
                          城市
                        </label>
                        <div class="col-sm-9 p-0">
                          <div class="col-sm-6">
                            <el-form-item prop="provId">
                              <el-select
                                filterable
                                style="width: 100%"
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
                          <div class="col-sm-6">
                            <el-form-item prop="cityId">
                              <el-select
                                filterable
                                style="width: 100%"
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
                      </div>
                      <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          <span style="color: red; line-height: 40px">*</span>
                          车场业态
                        </label>
                        <div class="col-sm-9">
                          <el-form-item prop="parkType">
                            <el-select
                              style="width: 100%"
                              placeholder="请选择车场业态"
                              v-model="addForm.parkType"
                            >
                              <el-option
                                v-for="i in parkType"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          <span style="color: red; line-height: 40px"></span>
                          联系人
                        </label>
                        <div class="col-sm-9">
                          <el-form-item>
                            <el-input
                              v-model="addForm.contacts"
                              placeholder="请输入联系人"
                            ></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          联系电话
                          <span style="color: red; line-height: 40px"></span>
                        </label>
                        <div class="col-sm-9">
                          <el-form-item>
                            <el-input
                              v-model="addForm.tel"
                              placeholder="请输入联系电话"
                            ></el-input>
                          </el-form-item>
                        </div>
                      </div>

                      <!-- <div class="col-sm-4" style="line-height: 34px;color: red;">（必填）</div> -->
                    </div>
                    <div class="row">
                      <h4 class="add-h4">位置信息</h4>
                      <!-- <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          <span style="color: red; line-height: 40px">*</span>
                          所在城市
                        </label>
                        <div class="col-sm-9">
                          <el-form-item>
                            <el-select
                              style="width: 100%"
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
                      <div class="col-sm-6">
                        <label for="" class="col-sm-3 control-label text-right">
                          <span style="color: red; line-height: 40px">*</span>
                          详细地址
                        </label>
                        <div class="col-sm-9">
                          <el-form-item prop="address">
                            <el-input
                              v-model="addForm.address"
                              placeholder="请输入详细地址"
                            ></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          <span style="color: red; line-height: 40px">*</span>
                          车场坐标
                        </label>
                        <div class="col-sm-7">
                          <el-form-item prop="grid">
                            <el-input v-model="addForm.grid" placeholder="请添加坐标"></el-input>
                          </el-form-item>
                        </div>
                        <div class="col-sm-2">
                          <el-button
                            type="primary"
                            size="small"
                            icon="el-icon-plus"
                            @click="addCoordinate"
                            >添加坐标</el-button
                          >
                        </div>
                      </div>
                    </div>
                    <!-- <div class="row">
                      <h4 class="add-h4">配置信息</h4>
                      <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          月卡临近过期提醒时间
                          <span style="color: red; line-height: 40px"></span>
                        </label>
                        <div class="col-sm-9">
                          <el-form-item>
                            <el-input v-model="addForm.callbackUrl"></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          中央缴费后免费出场时间
                          <span style="color: red; line-height: 40px"></span>
                        </label>
                        <div class="col-sm-9">
                          <el-form-item>
                            <el-input v-model="addForm.callbackUrl"></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <label
                          for="name"
                          class="col-sm-3 control-label text-right"
                        >
                          默认车牌前缀
                          <span style="color: red; line-height: 40px"></span>
                        </label>
                        <div class="col-sm-9">
                          <el-form-item>
                            <el-input v-model="addForm.callbackUrl"></el-input>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <label
                          for="name"
                          class="col-sm-1 control-label text-right"
                         style="width:12.5%">
                          <span style="color: red; line-height: 40px"></span>
                        </label>
                        <div class="col-sm-9" style="87.5%;">
                          <el-form-item prop="payStatus">
                            <el-radio-group v-model="addForm.payStatus">
                              <el-radio label="1">军警车免费放行</el-radio>
                              <el-radio label="2">无车牌确认进出场</el-radio>
                              <el-radio label="3">月租车转临停以月卡身份入场</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </div>
                      </div>
                    </div> -->
                  </el-form>
                  <div class="row m-0">
                    <span class="col-sm-2" style="width: 12.5%"></span>
                    <div class="form-group col-sm-6 pb-40" style="width: 87.5%">
                      <button
                        class="btn btn-primary"
                        v-if="!isRequst"
                        @click="addBtn('addForm')"
                      >
                        保存
                      </button>
                      <button class="btn btn-primary" v-if="isRequst">
                        保存中
                      </button>
                      <!-- <button type="button" id="btn-reset" class="btn btn-default">复位</button> -->
                      <button
                        type="button"
                        id="btn-back"
                        class="btn btn-default"
                        @click="goBack"
                      >
                        返回
                      </button>
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

    <el-dialog
      title="添加坐标地址"
      :visible.sync="addPop"
      width="1000px"
      class="el-dialog-reset"
    >
      <div style="padding: 0px">
        <!-- <el-input v-model="groupName"></el-input> -->
        <div class="" style="width: 100%; height: 600px; background: #f0f0f0;">
          <div style="position: absolute;
                top: 120px;
                right: 60px;z-index:99;width:300px;height:100px;padding:15px;background:rgba(255,255,255,0.8);border-radius:4px;">
                <span>输入地址：</span>
              
            <el-autocomplete
              v-model="mapLocation.address"
              :fetch-suggestions="querySearch"
              placeholder="请输入详细地址"
              style="
                margin-top:6px;
                width:100%;
               
              "
              :trigger-on-focus="false"
              @select="handleSelect"
            />
          </div>

          <baidu-map
            id="allmap"
            :center="center"
            :zoom="zoom"
            @ready="handler"
            style="height: 600px"
            @click="getClickInfo"
            :scroll-wheel-zoom="true"
          >
            <bm-view style="width: 100%; height: 600px; flex: 1"></bm-view>
            <bm-local-search
              :keyword="addressKeyword"
              :auto-viewport="true"
            ></bm-local-search>
          </baidu-map>
        </div>
      </div>
      <div slot="footer" class="dialog-footer coordinate">
        <el-row :gutter="20">
          <el-col :span="18">
            <span style="color: red; line-height: 40px">*</span>
            <span class="pr-10">坐标</span>
            <el-input
              v-model="mapX"
              placeholder="请输入内容"
              :disabled="true"
            ></el-input>
            <el-input
              v-model="mapY"
              placeholder="请输入内容"
              :disabled="true"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-button @click="addPop = false">取 消</el-button>
            <el-button type="primary" @click="subCoordinate">确 定</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box> -->
  </div>
</template>
<script src="./parkingManageAdd.js"></script>
<style scoped lang="scss">
@import "./parkingManageAdd.scss";
.coordinate /deep/ .el-col:first-child {
  text-align: initial;
  .el-input {
    width: 200px;
  }
}
#allmap {
  height: 100%;
  width: 100%;
  margin: 0 auto;
}
</style>
