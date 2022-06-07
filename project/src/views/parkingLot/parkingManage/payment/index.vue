<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        车场管理 - 在线支付开通申请
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
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 在线支付申请申请
        </li>
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
              <div class="row mt-20">
                <div class="col-sm-12">
                  <div class="row" v-if="isAudit">
                    <div class="col-sm-12">
                      <div class="col-sm-6">
                        <label for="" class="font-size-18">申请编号:</label
                        ><span>{{ applyNum }}</span>
                      </div>
                      <div class="col-sm-6 text-right">
                        <span class="pr-10">状态</span
                        ><el-button type="danger" @click="refuseExamineBtn">拒绝审核</el-button>
                      </div>
                    </div>
                    <div class="col-sm-12 mt-15">
                      <div class="col-sm-6">
                        <span>{{ parkingLot }}</span>
                      </div>
                      <div class="col-sm-6 text-right">
                        <span class="dot"></span
                        ><label for="" class="font-size-18 pr-10">待审核</label
                        ><el-button type="primary" @click="passExamine">通过审核</el-button>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="isReject">
                    <div class="col-sm-12">
                      <div class="col-sm-6">
                        <label for="" class="font-size-18">申请编号:</label
                        ><span>{{ applyNum }}</span>
                      </div>
                      <div class="col-sm-6 text-right">
                        <span class="pr-10">状态</span
                        ><span>已拒绝</span>
                      </div>
                    </div>
                    <div class="col-sm-12 mt-15">
                      <div class="col-sm-6">
                        <span>{{ parkingLot }}</span>
                      </div>
                      <div class="col-sm-6 text-right">
                        <span class="dot"></span
                        ><label for="" class="font-size-18 pr-10">拒绝理由</label
                        ><label>{{rejectContent}}</label>
                      </div>
                    </div>
                  </div>
                  <el-form
                    :model="addForm"
                    :rules="rules"
                    ref="addForm"
                    style="padding-bottom: 30px"
                  >
                    <div class="row">
                      <h4 class="add-h4">基础信息</h4>
                      <div class="col-sm-6">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            商户名称
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="mchName" class="m-0">
                              <el-input
                                v-model="addForm.mchName"
                              ></el-input><span class="font-size-12">注：商户类型为自然人时，商户名称建议以”商户_法人姓名“的格式填写，以免微信审核失败。</span>  
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            商户简称
                          </label>
                          <div class="col-sm-9">
                            <el-form-item
                              prop="mchAbbreviation"
                              class="m-0"
                            >
                              <el-input
                                v-model="addForm.mchAbbreviation"
                              ></el-input><span class="font-size-12">注：商户简称即在微信/支付宝支付成功页展示的收款单位信息，不可修改，请谨慎填写。多个车场关联同一商户时，商户简称尽量填写公司名称，以免发生误会。</span>
                            </el-form-item>
                          </div>
                        </div>
                        <!-- <div class="col-sm-9 col-sm-offset-3 mt-10">
                          <span class="font-size-12 pl-10"
                            >注：商户简称即在微信/支付宝支付成功页展示的收款单位信息，不可修改，请谨慎填写。多个车场关联同一商户时，商户简称尽量填写公司名称，以免发生误会。</span
                          >
                        </div> -->
                      </div>
                      <!-- <div class="col-sm-4" style="line-height: 34px;color: red;">（必填）</div> -->
                    </div>
                    <div class="row">
                      <h4 class="add-h4">商户资质信息</h4>
                      <div class="row m-0">
                        <div class="col-sm-6">
                          <div class="col-sm-12">
                            <label
                              for="name"
                              class="col-sm-3 control-label text-right"
                            >
                              <span style="color: red; line-height: 40px"
                                >*</span
                              >
                              商户类型
                            </label>
                            <div class="col-sm-9">
                              <el-form-item prop="mchType" class="m-0">
                                <el-select
                                  ref="selectMerchantTypeValue"
                                  filterable
                                  style="width: 100%"
                                  placeholder="请选择"
                                  v-model="addForm.mchType"
                                  @change="merchantTypeChange"
                                >
                                  <el-option
                                    v-for="i in mchType"
                                    :key="i.id"
                                    :label="i.name"
                                    :value="i.id"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6" v-if="isNaturalPerson">
                          <div class="col-sm-12">
                            <label
                              for="name"
                              class="col-sm-3 control-label text-right"
                            >
                              <span style="color: red; line-height: 40px"
                                >*</span
                              >
                              本人手持身份证照片
                            </label>
                            <div class="col-sm-9">
                              <div class="col-sm-12 p-0">
                                <el-form-item prop="createMch13" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch13"/>
                            <el-upload
                              v-if="images13.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[10]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传正面照片</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images13"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-9 col-sm-offset-3 mt-10">
                            <span class="font-size-12 pl-10"
                              >注：仅支持png、jpg、jpeg、bmp格式的图片上传</span
                            >
                          </div>
                        </div>
                        <div class="col-sm-6" v-if="isNonNaturalPerson">
                          <div class="col-sm-12">
                            <label
                              for="name"
                              class="col-sm-3 control-label text-right"
                            >
                              <span style="color: red; line-height: 40px"
                                >*</span
                              >
                              是否三证合一
                            </label>
                            <div class="col-sm-9">
                              <el-form-item prop="createMchThreeFlag" class="m-0">
                                <el-select
                                  filterable
                                  style="width: 100%"
                                  placeholder="请选择"
                                  v-model="addForm.createMchThreeFlag"
                                  @change="isCertificatesChange"
                                >
                                  <el-option
                                    v-for="i in createMchThreeFlag"
                                    :key="i.id"
                                    :label="i.name"
                                    :value="i.id"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            <span class="" v-if="isNonNaturalPerson">法人身份证照片</span>
                            <span class="" v-else>身份证照片</span>
                            
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-12 p-0">
                              <div class="col-sm-3 p-0">
                                <el-form-item prop="createMch01" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch01"/>
                            <el-upload
                              v-if="images1.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[0]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传正面照片</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images1"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                              </div>
                              <div class="col-sm-3 p-0">
                                <el-form-item prop="createMch02" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch02"/>
                            <el-upload
                              v-if="images2.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[1]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传反面照片</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images2"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                              </div>
                              <div class="col-sm-3 p-0">
                                <div class="example" @mouseover="mouseOver" @mouseleave="mouseLeave">
                                  <div class="example-child">
                                     <span class="example-child-txt">示例</span>
                                     <img class="icon-exa" src="../../../../assets/img/add.png" alt="添加">
                                     <div class="image-example image-example-left" v-show="isShowExample">
                                       <h5 class="image-title">法人身份证正反面</h5>
                                       <img src="../../../../assets/img/image-example.png" alt="身份证上传示例" class="image-item">
                                       <div class="image-trips">
                                         <p>1、身份证照片保持在照片中心 </p>
                                         <p>2、信息清晰，避免模糊无法识别 </p>
                                         <p>3、保证证件信息真实有效 </p>
                                       </div>
                                     </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-9 col-sm-offset-3 mt-10">
                          <span class="font-size-12 pl-10"
                            >注：仅支持png、jpg、jpeg、bmp格式的图片上传</span
                          >
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isNonNaturalPerson">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            营业执照照片
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-3 p-0">
                              <el-form-item prop="createMch03" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch03"/>
                            <el-upload
                              v-if="images3.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[2]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传文件</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images3"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                               </el-form-item>
                            </div>
                            <div class="col-sm-3">
                               <div class="example" @mouseover="mouseOverLicense" @mouseleave="mouseLeaveLicense">
                                  <div class="example-child">
                                     <span class="example-child-txt">示例</span>
                                     <img class="icon-exa" src="../../../../assets/img/add.png" alt="添加">
                                     <div class="image-example image-example-right" v-show="isShowExampleLicense">
                                       <h5 class="image-title">营业执照照片</h5>
                                       <img src="../../../../assets/img/image-example-3.png" alt="营业执照上传示例" class="image-item">
                                       <div class="image-trips">
                                         <p>1、营业执照保持在照片中心 </p>
                                         <p>2、信息清晰，避免模糊无法识别 </p>
                                         <p>3、保证证件信息真实有效 </p>
                                       </div>
                                     </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-9 col-sm-offset-3 mt-10">
                          <span class="font-size-12 pl-10"
                            >注：仅支持png、jpg、jpeg、bmp格式的图片上传</span
                          >
                        </div>
                      </div>
                      <div
                        class="col-sm-6 mt-15"
                        v-if="isThreeSyndromesInOne"
                      >
                        <div class="col-sm-12">
                          <label
                            for=""
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            税务登记证照片
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-12 p-0">
                              <el-form-item prop="createMch11" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch11"/>
                            <el-upload
                              v-if="images11.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[8]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传文件</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images11"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-6 mt-15"
                        v-if="isThreeSyndromesInOne"
                      >
                        <div class="col-sm-12">
                          <label
                            for=""
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            组织机构代码证
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-12 p-0">
                              <el-form-item prop="createMch04" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch04"/>
                            <el-upload
                              v-if="images4.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[3]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传文件</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images4"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            <span v-if="isNonNaturalPerson">法人身份证号</span>
                            <span v-else>身份证号</span>
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchLegalIdNum" class="m-0">
                              <el-input v-model="addForm.createMchLegalIdNum" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isNonNaturalPerson">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            公司全称
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="companyName" class="m-0">
                              <el-input
                                v-model="addForm.companyName"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            <span v-if="isNonNaturalPerson">法人姓名</span>
                            <span v-else>姓名</span>
                            
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchLegalPerson" class="m-0">
                              <el-input
                                v-model="addForm.createMchLegalPerson"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isNonNaturalPerson">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            营业执照工商注册号
                          </label>
                          <div class="col-sm-9">
                            <el-form-item
                              prop="createMchBussAuthNum"
                              class="m-0"
                            >
                              <el-input
                                v-model="addForm.createMchBussAuthNum"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            身份证有效期限
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-6 p-0">
                              <el-form-item prop="createMchLegalIdNumExpire" class="m-0">
                              <el-date-picker
                                v-model="addForm.createMchLegalIdNumExpire"
                                type="date"
                                placeholder="请选择日期"
                              >
                              </el-date-picker>
                            </el-form-item>
                            </div>
                            <div class="col-sm-6 p-0">
                              <el-select
                                filterable
                                style="width: 100%"
                                placeholder="请选择"
                                v-model="addForm.createMchLegalIdNumTerm"
                              >
                                <el-option
                                  v-for="i in createMchLegalIdNumTerm"
                                  :key="i.id"
                                  :label="i.name"
                                  :value="i.id"
                                ></el-option>
                              </el-select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="col-sm-6 mt-15" v-if="isNaturalPerson">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            身份证号
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchLegalIdNum" class="m-0">
                              <el-input
                                v-model="addForm.createMchLegalIdNum"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div> -->
                      <!-- <div class="col-sm-6 mt-15" v-if="isNaturalPerson">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            姓名
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="naturalPersonName" class="m-0">
                              <el-input
                                v-model="addForm.naturalPersonName"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div> -->
                      <!-- <div class="col-sm-6 mt-15" v-if="isNaturalPerson">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            手机号
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="naturalPersonPhone" class="m-0">
                              <el-input
                                v-model="addForm.naturalPersonPhone"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div> -->
                      <div class="col-sm-6 mt-15" v-if="isNonNaturalPerson">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            营业执照有效期限
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-6 p-0">
                              <el-form-item
                              prop="createMchLicenseExpireStart"
                              class="m-0"
                            >
                              <el-date-picker
                                v-model="addForm.createMchLicenseExpireStart"
                               type="date"
                               placeholder="请选择日期">
                              >
                              </el-date-picker>
                            </el-form-item>
                            </div>
                            <div class="col-sm-6 p-0">
                              <el-form-item prop="createMchMerchantIdExpire" class="m-0">
                              <el-select
                                filterable
                                style="width: 100%"
                                placeholder="请选择"
                                v-model="addForm.createMchMerchantIdExpire"
                              >
                                <el-option
                                  v-for="i in createMchMerchantIdExpire"
                                  :key="i.id"
                                  :label="i.name"
                                  :value="i.id"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isNonNaturalPerson">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            <span v-if="isNonNaturalPerson">法人手机号</span>
                            <span v-else>手机号</span>
                            
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchLegalIdMobile" class="m-0">
                              <el-input
                                v-model="addForm.createMchLegalIdMobile" oninput="value=value.replace(/[^\d]/g,'')"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isNonNaturalPerson">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            营业执照注册地址
                          </label>
                          <div class="col-sm-9">
                            <el-form-item
                              prop="createMchLicenseAddress"
                              class="m-0"
                            >
                              <el-input
                                v-model="addForm.createMchLicenseAddress"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-20">
                      <h4 class="add-h4">收款账户信息</h4>
                      <div class="col-sm-6 mt-15" v-if="isNonNaturalPerson">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            账户类型
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchAccountType" class="m-0">
                              <el-select
                                filterable
                                style="width: 100%"
                                placeholder="请选择"
                                v-model="addForm.createMchAccountType"
                                @change="accountTypeChange"
                              >
                                <el-option
                                  v-for="i in createMchAccountType"
                                  :key="i.id"
                                  :label="i.name"
                                  :value="i.id"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isSettlementType">
                        <div class="col-sm-12">
                          <label
                            for=""
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            结算类型
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchSettlementType" class="m-0">
                              <el-select
                                filterable
                                style="width: 100%"
                                placeholder="请选择"
                                v-model="addForm.createMchSettlementType"
                                @change="settlementTypeChange"
                              >
                                <el-option
                                  v-for="i in createMchSettlementType"
                                  :key="i.id"
                                  :label="i.name"
                                  :value="i.id"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isBankCard">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            银行卡正面照片
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-3 p-0">
                              <el-form-item prop="createMch16" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch16"/>
                            <el-upload
                              v-if="images16.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[13]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传文件</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images16"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                            </div>
                            <div class="col-sm-3">
                               <div class="example" @mouseover="mouseOverBank" @mouseleave="mouseLeaveBank">
                                  <div class="example-child">
                                     <span class="example-child-txt">示例</span>
                                     <img class="icon-exa" src="../../../../assets/img/add.png" alt="添加">
                                     <div class="image-example image-example-left" v-show="isShowExampleBank">
                                       <h5 class="image-title">银行卡正面照片</h5>
                                       <img src="../../../../assets/img/image-example-7.png" alt="银行卡正面照片上传示例" class="image-item">
                                       <div class="image-trips">
                                         <p>1、银行卡保持在照片中心 </p>
                                         <p>2、信息清晰，避免模糊无法识别 </p>
                                         <p>3、保证证件信息真实有效 </p>
                                       </div>
                                     </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-9 col-sm-offset-3 mt-10">
                          <span class="font-size-12 pl-10"
                            >注：仅支持png、jpg、jpeg、bmp格式的图片上传</span
                          >
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isShowOpenPermitCard">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            开户许可证照片
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-3 p-0">
                              <el-form-item prop="createMch05" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch05"/>
                            <el-upload
                              v-if="images5.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[4]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传文件</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images5"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                            </div>
                            <div class="col-sm-3">
                               <div class="example" @mouseover="mouseOverAccount" @mouseleave="mouseLeaveAccount">
                                  <div class="example-child">
                                     <span class="example-child-txt">示例</span>
                                     <img class="icon-exa" src="../../../../assets/img/add.png" alt="添加">
                                     <div class="image-example image-example-right" v-show="isShowExampleAccount">
                                       <h5 class="image-title">开户许可证</h5>
                                       <img src="../../../../assets/img/image-example-5.png" alt="开户许可证上传示例" class="image-item">
                                       <div class="image-trips">
                                         <p>1、开户许可证保持在照片中心 </p>
                                         <p>2、信息清晰，避免模糊无法识别 </p>
                                         <p>3、保证证件信息真实有效 </p>
                                       </div>
                                     </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-9 col-sm-offset-3 mt-10">
                          <span class="font-size-12 pl-10"
                            >注：仅支持png、jpg、jpeg、bmp格式的图片上传</span
                          >
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            银行账号
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchBankCardNo" class="m-0">
                              <el-input
                                v-model="addForm.createMchBankCardNo"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-6 mt-15"
                        v-if="isShowopenAccountName"
                      >
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            对公开户名
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchCompanyName" class="m-0">
                              <el-input
                                v-model="addForm.createMchCompanyName"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isShowAccountName">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            开户名
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchBankCertName" class="m-0">
                              <el-input
                                v-model="addForm.createMchBankCertName"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            开户行所在地区
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchBranchAddress" class="m-0">
                              <el-cascader
                                style="width: 100%"
                                :options="position"
                                v-model="addForm.createMchBranchAddress"
                                clearable
                              ></el-cascader>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            开户银行
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchBankName" class="m-0">
                              <el-input
                                v-model="addForm.createMchBankName"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            支行名称
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchBranchName" class="m-0">
                              <el-select
                                filterable
                                style="width: 100%"
                                placeholder="请选择"
                                v-model="addForm.createMchBranchName"
                              >
                                <el-option
                                  v-for="i in createMchBranchName"
                                  :key="i.id"
                                  :label="i.name"
                                  :value="i.id"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            联行号
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchContactLine" class="m-0">
                              <el-input
                                v-model="addForm.createMchContactLine"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            银行预留手机号
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchAccountPhone" class="m-0">
                              <el-input
                                v-model="addForm.createMchAccountPhone" oninput="value=value.replace(/[^\d]/g,'')"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isUnincorporateType">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px"></span>
                            非法人身份证照片
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-12 p-0">
                               <div class="col-sm-6 p-0">
<el-form-item prop="createMch14" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch14"/>
                            <el-upload
                              v-if="images14.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[11]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传正面照</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images14"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                               </div>
                               <div class="col-sm-6 p-0">
<el-form-item prop="createMch15" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch15"/>
                            <el-upload
                              v-if="images15.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[12]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传反面照</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images15"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isUnincorporateType">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px"></span>
                            非法人证明照
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-12 p-0">
                              <el-form-item prop="BusinessLlicense" class="m-0">
                                <div class="upload_box">
                                  <el-upload
                                    action="#"
                                    list-type="picture-card"
                                    :auto-upload="false"
                                  >
                                    <i slot="default" class="el-icon-plus"></i>
                                    <div slot="file" slot-scope="{ file }">
                                      <img
                                        class="el-upload-list__item-thumbnail"
                                        :src="file.url"
                                        alt=""
                                      />
                                      <span
                                        class="el-upload-list__item-actions"
                                      >
                                        <span
                                          class="el-upload-list__item-preview"
                                          @click="
                                            handlePictureCardPreview(file)
                                          "
                                        >
                                          <i class="el-icon-zoom-in"></i>
                                        </span>

                                        <span
                                          v-if="!disabled"
                                          class="el-upload-list__item-delete"
                                          @click="handleRemove(file)"
                                        >
                                          <i class="el-icon-delete"></i>
                                        </span>
                                      </span>
                                    </div>
                                  </el-upload>
                                  <el-dialog :visible.sync="dialogVisible">
                                    <img
                                      width="100%"
                                      :src="dialogImageUrl"
                                      alt=""
                                    />
                                  </el-dialog>
                                </div>
                              </el-form-item>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isUnincorporateType">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            非法人身份证号
                          </label>
                          <div class="col-sm-9">
                            <el-form-item prop="createMchCertNo" class="m-0">
                              <el-input
                                v-model="addForm.createMchCertNo" oninput="value=value.replace(/[^\d]/g,'')"
                              ></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15" v-if="isUnincorporateType">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            身份证号有效期
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-6 p-0">
                              <el-form-item prop="createMchlegalIdNumExpireStart" class="m-0">
                              <el-date-picker
                                v-model="addForm.createMchlegalIdNumExpireStart"
                                type="date"
                                placeholder="请选择日期"
                              >
                              </el-date-picker>
                            </el-form-item>
                            </div>
                            <div class="col-sm-6 p-0">
                              <el-form-item prop="createMchlegalIdNumExpireExpire" class="m-0">
                              <el-select
                                filterable
                                style="width: 100%"
                                placeholder="请选择有效期"
                                v-model="addForm.createMchlegalIdNumExpireExpire"
                              >
                                <el-option
                                  v-for="i in createMchlegalIdNumExpireExpire"
                                  :key="i.id"
                                  :label="i.name"
                                  :value="i.id"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-20">
                      <h4 class="add-h4">场景证明照</h4>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            车场入口照片
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-12 p-0">
                              <el-form-item prop="createMch06" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch06"/>
                            <el-upload
                              v-if="images6.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[5]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传文件</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images6"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-9 col-sm-offset-3 mt-10">
                          <span class="font-size-12 pl-10"
                            >注：仅支持png、jpg、jpeg、bmp格式的图片上传</span
                          >
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            岗亭照片
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-12 p-0">
                              <el-form-item prop="createMch08" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch08"/>
                            <el-upload
                              v-if="images8.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[6]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传文件</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images8"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-9 col-sm-offset-3 mt-10">
                          <span class="font-size-12 pl-10"
                            >注：仅支持png、jpg、jpeg、bmp格式的图片上传</span
                          >
                        </div>
                      </div>
                      <div class="col-sm-6 mt-15">
                        <div class="col-sm-12">
                          <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            车场场内照片
                          </label>
                          <div class="col-sm-9">
                            <div class="col-sm-12 p-0">
                              <el-form-item prop="createMch09" class="m-0">
                                  <div class="upload_box" id="upload_box">
                                    <el-input :hidden="true" v-model="addForm.createMch09"/>
                            <el-upload
                              v-if="images9.length==0"
                              class
                              drag
                              name="file"
                              :with-credentials="true"
                              :show-file-list="false"
                              :action="imgurl+'/file/upload2'"
                              list-type="picture-card"
                              :data="uploadData[7]"
                              :on-success="successCheck"
                              :before-upload="beforeAvatarUpload"
                              :on-error="uploadErr"
                              :on-change="uploadchange"
                            >
                              <span style="color:#9E9DA2;font-size:12px;">上传文件</span>
                            </el-upload>
                            <ul class="el-upload-list el-upload-list--picture-card" v-else>
                              <li
                        
                                :tabindex="index"
                                class="el-upload-list__item is-success animated"
                                v-for="(element, index) in images9"
                                :key="index"
                              >
                                <img
                                  :src="imgurl+'/file/download?path='+element.filePath"
                                  alt
                                  class="el-upload-list__item-thumbnail"
                                />
                                <a class="el-upload-list__item-name">
                                  <i class="el-icon-document"></i>
                                  {{element.flagName}}
                                </a>
                                <label class="el-upload-list__item-status-label">
                                  <i class="el-icon-upload-success el-icon-check"></i>
                                </label>
                                <!-- <i class="el-icon-close" @click="remove(index)"></i> -->
                                <span class="el-upload-list__item-actions">
                                  <span class="el-upload-list__item-delete">
                                    <i class="el-icon-delete" @click="remove(element)"></i>
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                                </el-form-item>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-9 col-sm-offset-3 mt-10">
                          <span class="font-size-12 pl-10"
                            >注：仅支持png、jpg、jpeg、bmp格式的图片上传</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="row mt-20">
                      <h4 class="add-h4">商户费率信息</h4>
                      <div class="col-sm-6">
                         <div class="col-sm-12">
                           <label
                            for="name"
                            class="col-sm-3 control-label text-right"
                          >
                            <span style="color: red; line-height: 40px">*</span>
                            费率:
                          </label>
                           <div class="col-sm-9 rate-info">
                             <el-form-item prop="createMchFee" class="m-0">
                              <el-input v-model="addForm.createMchFee"></el-input>% 目前支持的费率设置范围为0.3%～0.8%
                            </el-form-item>
                           </div>
                         </div>
                      </div>
                    </div>
                  </el-form>
                  <div class="row m-0 mt-20" v-if="isSubmit">
                    <div class="col-sm-6">
                      <div class="col-sm-12">
                        <span class="col-sm-3"></span>
                        <div class="form-group col-sm-6 p-0">
                          <button
                            class="btn btn-primary"
                            v-if="!isRequst"
                            @click="addBtn('addForm')"
                          >
                            提交申请
                          </button>
                          <button class="btn btn-primary" v-if="isRequst">
                            提交申请中
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
                  </div>
                  <div class="row m-0" v-else>
                     <div class="col-sm-6">
                      <div class="col-sm-12">
                        <span class="col-sm-3"></span>
                        <div class="form-group col-sm-6 p-0">
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
      title="通过审核"
      :visible.sync="dialogPassExamine"
      width="580px"
      class="el-dialog-reset">

      <div style="padding:0px;">
        <!-- <label for="mchId">商户id</label>        
        <el-input id="mchId" v-model="formExamine.mchId"></el-input> -->
        <el-form ref="formExamine" :rules="rulesFormExamine" :model="formExamine">
          <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                支付渠道名称
              </label>
              <div class="col-sm-9">
                <el-form-item prop="name">
                  <el-input v-model="formExamine.name"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                商户id
              </label>
              <div class="col-sm-9">
                <el-form-item prop="mchId">
                  <el-input v-model="formExamine.mchId"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red; line-height: 40px">*</span>
                支付渠道车场Id
              </label>
              <div class="col-sm-9">
                <el-form-item prop="payChannelParkId">
                  <el-input v-model="formExamine.payChannelParkId"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPassExamine = false">取 消</el-button>
        <el-button type="primary" @click="passCheckPayData('formExamine')">确 定</el-button>
      </span>
     </el-dialog>
     <el-dialog
      title="拒绝审核"
      :visible.sync="dialogRefuse"
      width="580px"
      class="el-dialog-reset">

      <div style="padding:0px;">
        <!-- <label for="mchId">商户id</label>        
        <el-input id="mchId" v-model="formExamine.mchId"></el-input> -->
        <el-form ref="formRefuse" :rules="rulesFormRefuse" :model="formRefuse">
          <div class="row">
              <label for="name" class="col-sm-12 control-label">
                <span class="el-icon-warning" style="color:#E6A23C;"></span>
                处理说明
              </label>
              <div class="col-sm-12">
                <span>管理人员对此在线支付开通申请进行拒绝处理，必需填写拒绝原因。</span>
              </div>
            </div>
            <div class="row mt-20">
              <div class="col-sm-12">
                <el-form-item prop="refuseCause">
                  <el-input type="textarea" v-model="formRefuse.refuseCause"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRefuse = false">取 消</el-button>
        <el-button type="primary" @click="refuseExamine('formRefuse')">确 定</el-button>
      </span>
     </el-dialog>
  </div>
</template>
<script src="./payment.js"></script>
<style scoped lang="scss">
@import "./payment.scss";
.dot {
  width: 6px;
  height: 6px;
  background-color: #0099ff;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
.rate-info /deep/ .el-input{
  width: 60px;
  margin-right: 6px;
}
/deep/ .el-form-item__content{
  line-height: 20px;
}
.upload_box{
  height: 120px;
  overflow: hidden;
}
.upload_box .el-upload-list--picture-card .el-upload-list__item{
   width: 100px;
    height: 100px;
}
.example{
  margin-top: 20px;
  width: 98px;
  height: 98px;
  border: 1px dashed #d9d9d9;
  .example-child{
    position: relative;
    width: 100%;
    padding-top: 20px;
    .example-child-txt{
      display: block;
      width: 100%;
      line-height: 24px;
      padding-bottom: 16px;
      text-align: center;
    }
    .icon-exa{
      display: block;
      width: 24px;
      height: 24px;
      margin: 0 auto;
    }
    .image-example{
      // display: none;
      position: absolute;
      top: 52px;
      z-index: 9999;
      width: 324px;
      padding: 12px;
      background: #fff;
      border-radius: 4px;
      -webkit-box-shadow: 0 0 5px 0 rgba(0,0,0,.4);
      box-shadow: 0 0 5px 0 rgba(0,0,0,.4);
      text-align: left;
    }
    .image-example-left{
      left: 100px;
      .image-title{
       font-weight: 600;
       font-size: 14px;
       padding-bottom: 12px;
      }
      .image-item{
        display: block;
        max-width: 250px;
        margin: 0 auto;
      }
      .image-trips{
        font-size: 14px;
        padding-top: 6px;
      }
    }
    .image-example-right{
       right: 100px;
      .image-title{
       font-weight: 600;
       font-size: 14px;
       padding-bottom: 12px;
      }
      .image-item{
        display: block;
        max-width: 250px;
        margin: 0 auto;
      }
      .image-trips{
        font-size: 14px;
        padding-top: 6px;
      }
    }
  }
}
</style>
