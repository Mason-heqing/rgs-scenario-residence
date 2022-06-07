<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        人员管理 - 添加住户
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
          <i class="glyphicon glyphicon-adjust"></i> 添加住户
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
                    :model="addPersonForm"
                    :rules="rules"
                    ref="addPersonForm"
                    style="padding-bottom:30px"
                  >
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        住户姓名
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="personName">
                          <el-input
                            v-model="addPersonForm.personName"
                            placeholder="输入住户姓名最大支持20字"
                            maxlength="20"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px">*</span>
                        手机号码
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="phone">
                          <el-input
                            v-model="addPersonForm.phone"
                            placeholder="输入住户真实手机号，可登陆app远程开门"
                            maxlength="11"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>
                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        身份证号
                      </label>
                      <div class="col-sm-7">
                        <el-form-item prop="idCard">
                          <el-input
                            v-model="addPersonForm.idNum"
                            placeholder="输入住户身份证号最大支持18字"
                            maxlength="18"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>

                    <div class="row">
                      <label for="name" class="col-sm-3 control-label text-right">
                        <span style="color: red;line-height:40px"></span>
                        备 注
                      </label>
                      <div class="col-sm-7">
                        <el-form-item>
                          <el-input
                            type="textarea"
                            v-model="addPersonForm.remark"
                            maxlength="100"
                            show-word-limit
                            rows="5"
                            placeholder="请输入住户备注信息"
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
                                v-if="element"
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
                        <el-form-item prop="post">
                          <el-input v-model="addPersonForm.icNum" placeholder="输入IC卡号">
                            <!-- <el-button slot="append">读取</el-button> -->
                          </el-input>
                        </el-form-item>
                      </div>
                      <div class="col-sm-2" style="line-height: 34px;color: red;"></div>
                    </div>

                    
                  </el-form>
                </div>
                <div class="col-lg-6 col-md-12">
                  <h4 class="add-h4">
                    房屋信息
                    <span class="el-icon-plus ml-20 add-icon" @click="addBtn"></span>
                  </h4>
                  <div class="row">
                    <div class="col-sm-11" style="overflow-x: hidden;overflow-y: auto">
                      <el-table
                        class="mt-10"
                        :data="addPersonForm.houseList"
                        style="width: 100%"
                        :border="true"
                        :cell-style="{background:'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0'}"
                        :stripe="true"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        ref="multipleTable"
                      >
                        <el-table-column prop="personSubtype" label="类型" sortable width="auto">
                          <template slot-scope="scope">
                            <span v-if="scope.row.personSubtype==1">户主</span>
                            <span v-if="scope.row.personSubtype==2">家庭成员</span>
                            <span v-if="scope.row.personSubtype==3">租客</span>
                            <!-- <span v-if="scope.row.personSubtype==4">物业员工</span> -->
                            <span v-if="scope.row.personSubtype==5">其他</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="houseAddress" label="房屋信息" sortable width="120"></el-table-column>
                        <el-table-column prop="effectiveTimeStr" label="有效期" sortable width="120">
                          <template slot-scope="scope">
                            <span v-if="scope.row.effectiveTimeStr">{{scope.row.effectiveTimeStr | clTime}}</span>
                          </template>
                        </el-table-column>

                        <el-table-column prop="liveStatus" label="状态" sortable width="auto">
                           <template slot-scope="scope">
                            <span v-if="scope.row.liveStatus==1">入住</span>
                            <span v-if="scope.row.liveStatus==0">搬离</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="name" label="操作" width="150">
                          <template slot-scope="scope">
                            <el-row>
                              <el-button
                                title="编辑"
                                type="primary"
                                icon="el-icon-edit"
                                round
                                @click="gotoEdit(scope.$index)"
                                size="mini"
                              ></el-button>
                              <!-- <el-button title="加入黑名单" type="primary" icon="el-icon-warning-outline" round @click="clickEdit(scope.row.id)" size="mini"></el-button> -->
                              <el-button
                                title="取消"
                                type="danger"
                                icon="el-icon-delete"
                                round
                                @click="clickDel(scope.$index,scope.row)"
                                size="mini"
                              ></el-button>
                            </el-row>
                          </template>
                        </el-table-column>
                      </el-table>
                      <!-- <div class="block mt-10">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                      ></el-pagination>
                      </div>-->
                    </div>
                  </div>
                  <div class="row">
                      <div class="form-group col-sm-11 mt-40">
                        <button
                          v-if="!isRequst"
                          type="submit"
                          class="btn btn-primary"
                          @click="addPersonBtn('addPersonForm')"
                        >保存</button>
                        <button
                          v-else
                          type="submit"
                          class="btn btn-primary"
                          
                        >保存中</button>
                        <!-- <button type="button" id="btn-reset" class="btn btn-default">复位</button> -->
                        <button type="button" id="btn-back" class="btn btn-default" @click="goBack">返回</button>
                      </div>
                    </div>

                </div>

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- //房屋信息 -->
    <el-dialog
      title="添加房屋"
      :visible.sync="addPopVisible"
      width="40%"
      class="el-dialog-reset set-pop"
      :close-on-click-modal="false"
      @close="closePop"
    >
      <div style="padding:0px;">
        <el-form ref="addHouseForm" :model="addHouseForm" :rules="popRules">
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red;line-height:40px">*</span>
              房屋信息
            </label>
            <div class="col-sm-6">
              <el-form-item prop="deviceGroupId">
                <el-cascader
                  ref="cascaderAddr"
                  placeholder="楼栋/单元/房间"
                  v-model="addHouseForm.deviceGroupId"
                  :options="cascaderData"
                  :props="groupProps"
                  @change="cascaderChange"
                ></el-cascader>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red;line-height:40px">*</span>
              住户身份
            </label>
            <div class="col-sm-6">
              <el-form-item prop="personSubtype">
                <el-select v-model="addHouseForm.personSubtype" placeholder>
                  <el-option
                    v-for="item in personType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red;line-height:40px">*</span>
              有效日期
            </label>
            <div class="col-sm-6">
              <el-form-item prop="effectiveTimeStr">
                <el-date-picker
                  style="width:100%"
                  v-model="addHouseForm.effectiveTimeStr"
                  type="date"
                  placeholder="有效日期"
                  @change="changeTime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <label for="name" class="col-sm-3 control-label text-right">
              <span style="color: red;line-height:40px">*</span>
              住户状态
            </label>
            <div class="col-sm-6">
              <el-form-item>
                <el-radio-group v-model="addHouseForm.liveStatus">
                  <el-radio :label="1">入住</el-radio>
                  <el-radio :label="0">搬离</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPopVisible=false">取 消</el-button>
        <el-button type="primary" @click="addPopPerson('addHouseForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./ownerManageAdd.js"></script>
<style scoped lang="scss">
@import "./ownerManageAdd.scss";
</style>
