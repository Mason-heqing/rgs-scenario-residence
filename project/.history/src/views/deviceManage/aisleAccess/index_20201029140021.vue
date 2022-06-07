<template>
  <div class="content-wrapper">
     <section class="content-header">
        <h1 class="nice">
        设备管理 - 通道门禁
          <!-- <small>Optional description</small> -->
        </h1>
        <ol class="breadcrumb">
          <li>
            <a href="/">
              <i class="glyphicon glyphicon-home"></i> 首页
            </a>
          </li>
          <li>
            <i class="glyphicon glyphicon-hdd"></i> 设备管理
          </li>
          <li class="active">
            <i class="glyphicon glyphicon-adjust"></i> 通道门禁
          </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
         <div class="box box-primary">
              <div class="box-body" v-loading='loading'>
                    <div class="form-horizontal">
                      <div class="col-lg-2 pl-0">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-input clearable style="width:100%" placeholder="搜索设备名称" v-model="dataForm.name"></el-input>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select placeholder="类型" clearable v-model="dataForm.inoutFlag">
                              <el-option
                                v-for="item in inoutFlagOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <div class="col-md-12">
                            <el-select clearable v-model="dataForm.online" placeholder="网络状态">
                              <el-option
                                v-for="item in networkStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 pr-0">
                        <div class="btn-group">
                          <button id="btn_device_search" type="button" class="btn btn-primary" @click="getDataTable">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>查询
                          </button>
                          <button id="btn_device_reset" type="button" class="btn btn-default" @click="resetBtn">
                            <span class="fa fa-reply" aria-hidden="true"></span>重置
                          </button>
                        </div>
                      </div>
                    </div>

                    <div id="toolbar" class=" btn-group-box" style="width:100%">
                      <div class="btn-group" data-toggle="buttons">
                        <button id="btn_add" type="button" class="btn btn-default" @click="clickAdd">
                          <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
                        </button>
                        <button id="btn_add" type="button" class="btn btn-default" @click="updateVer">
                          <span class="glyphicon glyphicon-open" aria-hidden="true"></span>设备升级
                        </button>
                      </div>
                      <div class=" pr-0 text-right">
                        <el-dropdown
                          trigger="click"
                          :hide-on-click="false"
                          placement="bottom-start"
                        >
                          <span class="el-dropdown-link">
                            <el-button type="primary" size="small">
                              <i class="el-icon-menu"></i>
                              <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-checkbox-group v-model="tableSelect" @change='checkboxChange'>
                              <div v-for="item in tableOption" :key="item" class="checkbox-div">
                                <el-checkbox :label="item" :key="item"></el-checkbox>
                              </div>
                            </el-checkbox-group>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </div>
                    
                    <table-cmp
                      :table-data="tableData"
                      :table-label="tableLabel"
                      ref="tableChild"
                      :is-show-select="isShowSelect"
                    >
                    <el-table-column slot="operate1" label="状态" align="center" min-width="80px" sortable>
                        <template slot-scope="scope">
                          <img v-if="scope.row.online==0" alt="离线" class="image" title="设备离线" width="24" height="24" src="../../../assets/img/offline.png">
                          <img v-if="scope.row.online==1" alt="在线" class="image" title="设备在线" width="24" height="24" src="../../../assets/img/online.png">
                        </template>
                    </el-table-column>
                     <el-table-column slot="operate2" label="授权人员" align="center" min-width="120px" sortable>
                        <template slot-scope="scope">
                          <i class="fa fa-key" style="cursor: pointer;" @click="seeAuthPeople(scope.row.id)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column slot="operate3" label="设备参数" align="center" min-width="120px" sortable>
                        <template slot-scope="scope">
                          <i class="fa fa-cogs" style="cursor: pointer;" @click="getDeviceData(scope.row.id)"></i>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column slot="operate4" label="控制" align="center" min-width="150px" sortable>
                        <template slot-scope="scope">
                          <i title="重启" class="fa fa-power-off" style="cursor: pointer;" @click="restartDevice(cope.row.id,scope.row.online)"></i>
                          <i title="重新授权" class="glyphicon glyphicon-refresh ml-10" style="cursor: pointer;" @click="reAuth(scope.row.id,scope.row.online)"></i>
                          <i title="开门" class="el-icon-key ml-10" style="cursor: pointer;color:#000;font-size:16px" @click="openDoorRequst(scope.row.id,scope.row.online)"></i>
                          <i title="监控" class="el-icon-view ml-10" style="cursor: pointer;color:#000;font-size:16px" @click="getVideoWebsocket(scope.row.id,scope.row.online)"></i>
                          
                          
                        </template>
                    </el-table-column> -->
                    <el-table-column slot="operate" label="操作" align="center" width="360">
                        <template slot-scope="scope">
                          <el-row>
                              <el-button title="编辑" type="primary" icon="el-icon-edit"   size="mini" @click="editDevice(scope.row.id,scope.row.online)"></el-button>
                              <el-button title="监控" type="primary" icon="el-icon-view"   size="mini" @click="getVideoWebsocket(scope.row.id,scope.row.online)"></el-button>
                              <el-button title="重启" type="primary" icon="el-icon-switch-button"   size="mini" @click="restartDevice(scope.row.id,scope.row.online)"></el-button>
                              <el-button title="重新授权" type="primary" icon="el-icon-refresh"   size="mini" @click="reAuth(scope.row.id,scope.row.online)"></el-button>
                              <el-button title="开门" type="primary" icon="el-icon-key"    size="mini" @click="openDoorRequst(scope.row.id,scope.row.online)"></el-button>
                              <el-button title="删除" type="danger" icon="el-icon-delete"   size="mini" @click="deleteDevice(scope.row.id)"></el-button>
                            </el-row>
                        </template>
                    </el-table-column>
                    </table-cmp>

                    <div class="block mt-10">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20, 25]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                      ></el-pagination>
                    </div>
              </div>
            </div>
      </section>
      <!-- //添加设备弹框 -->
      <el-dialog
      :title="dialogTitleName"
      :visible.sync="addPopVisible"
      width="40%"
      @close="closePop"
      class="el-dialog-reset set-pop">
      <div style="padding:0px;">

        <el-form ref="addForm" :model="addForm" :rules="rules" class="demo-ruleForm">
           <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                设备名称
              </label>
              <div class="col-sm-6">
                <el-form-item prop="name">
                  <el-input style="width:100%" v-model="addForm.name"></el-input>
                </el-form-item>
              </div>
           </div>
           <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                设备SN号
              </label>
              <div class="col-sm-6">
                <el-form-item prop="serial">
                  <el-input style="width:100%" v-model="addForm.serial"></el-input>
                </el-form-item>
              </div>
           </div>
           <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                所在位置
              </label>
              <div class="col-sm-6">
                <el-form-item prop="groupId">
                  <el-cascader
                      :key="cascaderKey"
                      style="width:100%"
                      placeholder="楼栋/单元/房间"
                      ref="elcascader"
                      v-model="addForm.groupId"
                      :options="cascaderData"
                      :props="groupProps"
                       @visible-change="elCascaderOnlick"
                      @expand-change="elCascaderOnlick"
                      @change="cascaderChange"
                      ></el-cascader>
                </el-form-item>
              </div>
           </div>
           <div class="row">
              <label for="name" class="col-sm-3 control-label text-right">
                <span style="color: red;line-height:40px">*</span>
                进出标识
              </label>
              <div class="col-sm-6">
                <el-form-item prop="inoutFlag">
                  <el-select style="100%" v-model="addForm.inoutFlag" placeholder="">
                    <el-option
                      v-for="item in inoutFlagOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
           </div>  
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPopVisible=false">取 消</el-button>
        <el-button type="primary" v-if="!isRequst" @click="addDevice('addForm')">确 定</el-button>
        <el-button type="primary" v-if="isRequst">提交中</el-button>
      </span>
     </el-dialog>

      <!-- //参数设置 -->
      <el-dialog
      title="参数设置"
      :visible.sync="paramsSetVisible"
      width="800px"
      class="el-dialog-reset data-set-pop">
      <div style="padding:0px;">
         <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(item,index) in paramsSet" :key="index" :label="item.groupName" :name="item.groupKey"></el-tab-pane>
        </el-tabs> -->
        <ul class="set-list">
          <li v-for="(item,index) in paramsSet" :key="index" :class="{'active':setIndex==index}" @click="tabClick(index,item)">{{item.groupName}}</li>
        </ul>
        <!-- 内容 -->        
          <el-form :model="currentTab" ref="currentTab" label-width="150px" class="demo-dynamic" style="min-height: 300px;max-height:470px;overflow-y:auto">
            <el-form-item
              v-for="(i,index) in currentTab.item"
              :key="index"             
              :label="i.name"
              v-if="currentTab.groupKey!='OpenDoorModeSet'"
            >
            <!-- 日期选择 -->
            <el-date-picker
                v-if="i.type=='string'&&i.key=='currenttime'"
                v-model="i.value"  
                :clearable='false'
                :disabled="i.readonly==1"
                small="small"
                align="right"
                type="date"
                format="yyyy-MM-dd hh:mm:ss"
                value-format="yyyy-MM-dd hh:mm:ss">
              </el-date-picker>
              <!-- 时间选择 -->
              <el-time-picker
                v-else-if="i.type=='string'&&i.key=='time'"
                v-model="i.value"
                :disabled="i.readonly==1"
                :clearable='false'
                format="hh:mm:ss"
                value-format="hh:mm:ss">
              </el-time-picker>

               <!-- <el-select v-else-if="i.type=='enum'&&i.key=='OpenDoor'" v-model="i.value" placeholder="请选择" :disabled="i.readonly==1" @change="openDoorChange">
                <el-option
                  v-for="(j,index1) in i.optionName"
                  :key="j"
                  :label="j"
                  :value="i.optionValue[index1]">
                </el-option>
              </el-select>
              <el-select v-else-if="i.type=='enum'&&(i.key=='CardVerify'||i.key=='IdCardVerify')&&i.ishow" v-model="i.value" placeholder="请选择" :disabled="i.readonly==1">
                <el-option
                  v-for="(j,index1) in i.optionName"
                  :key="j"
                  :label="j"
                  :value="i.optionValue[index1]">
                </el-option>
              </el-select>
              <el-checkbox v-else-if="i.type=='boolean'&&(i.key=='SwipeCardTip'||i.key=='SwipeIdCardTip'||i.key=='SwipeFaceTip')&&i.ishow" :disabled="i.readonly==1||i.readonly==true" v-model="i.value" :checked="i.value==1"></el-checkbox> -->
             
              <!-- 声音设置 -->
              <el-slider style="width:400px" :disabled="i.readonly==1" v-else-if="i.key=='level'" v-model="i.value" :max="i.maxValue"></el-slider>
              <!-- 最大值最小值 -->
              <el-input v-else-if="i.maxValue|| i.minValue" v-model.number="i.value" :disabled="i.readonly==1" :maxlength="i.maxLength" :max="i.maxValue" :min="i.minValue" @input="if(i.value>i.maxValue) i.value=i.maxValue;if(i.value<i.minValue) i.value=i.minValue"></el-input>
              <!-- 输入框 -->
              <el-input v-else-if="i.type=='string'|| i.type=='integer'" v-model="i.value" :disabled="i.readonly==1" :maxlength="i.maxLength"></el-input>
              
              <!-- 勾选框 -->
              <el-checkbox v-else-if="i.type=='boolean'" :disabled="i.readonly==1||i.readonly==true" v-model="i.value" :checked="i.value==1"></el-checkbox>
              <!-- 选中框 -->
              <el-select v-else-if="i.type='enum'" v-model="i.value" placeholder="请选择" :disabled="i.readonly==1">
                <el-option
                  v-for="(j,index1) in i.optionName"
                  :key="j"
                  :label="j"
                  :value="i.optionValue[index1]">
                </el-option>
              </el-select>

              <span v-if="(i.maxValue|| i.minValue) &&(!i.value&&i.value!=0)" class="tip" style="color:red">内容不能为空</span>
              
            </el-form-item>
            <!-- 通行方式控制显示隐藏 -->
            <el-form-item
              v-for="(i,index) in currentTab.item"
              :key="index"             
              :label="i.name"
              v-if="currentTab.groupKey=='OpenDoorModeSet'&&i.ishow"
            >
             <el-select v-if="i.type=='enum'&&i.key=='OpenDoor'" v-model="i.value" placeholder="请选择" :disabled="i.readonly==1" @change="openDoorChange">
                <el-option
                  v-for="(j,index1) in i.optionName"
                  :key="j"
                  :label="j"
                  :value="i.optionValue[index1]">
                </el-option>
              </el-select>
               <el-select v-else-if="i.type=='enum'&&i.ishow" v-model="i.value" placeholder="请选择" :disabled="i.readonly==1">
                <el-option
                  v-for="(j,index1) in i.optionName"
                  :key="j"
                  :label="j"
                  :value="i.optionValue[index1]">
                </el-option>
              </el-select>
               <el-checkbox v-else-if="i.type=='boolean'&&i.ishow" :disabled="i.readonly==1||i.readonly==true" v-model="i.value" :checked="i.value==1"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="resetData" v-if="isShowResetBtn">恢复默认值</el-button>
               <el-button type="primary" @click="editDeviceData" v-if="isShowSaveBtn">保存</el-button>
            </el-form-item>
          </el-form>
          
        <!-- </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="paramsSetVisible=false">取消</el-button>
        <!-- <el-button type="primary" v-if="!isRequst" @click="addDevice('addForm')">确 定</el-button> -->
        <el-button type="primary" @click="updataDeviceData">刷新</el-button>
      </span>
     </el-dialog>


     <!-- 查看授权人员弹框 -->
      <el-dialog
      title='授权人员'
      :visible.sync="dialogVisible"
      width="60%"
      class="el-dialog-reset auth-pop">
      <div style="padding:0px;">
        <div class="text-right mb-20">
          <el-input style="width:200px" placeholder="输入名称" v-model="authForm.name" clearable size="small"></el-input>
          <el-button class="mr-10" type="primary" size="small" @click="seeAuthPeople('')">搜索</el-button>
        </div>
        <el-table
        :data="authData"  
        :border="true"
        max-height="250"
        :cell-style="{backg :'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0'}"
        :stripe="true">
          <el-table-column property="url" label="人脸" min-width="100">
            <template slot-scope="scope">
              <img v-if="scope.row.url" style="width:80px;height:80px" :src="imgurl+'/file/download?path='+scope.row.url" alt />
            </template>
          </el-table-column>
          <el-table-column property="personName" label="名称" min-width="120"></el-table-column>
          <!-- <el-table-column property="address" label="地址" min-width="120"></el-table-column> -->
          <el-table-column property="phone" label="联系方式" min-width="120"></el-table-column>
          <el-table-column property="personSubtype" label="类型" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.personSubtype==1">住户</span>
              <span v-else-if="scope.row.personSubtype==2">住户</span>
              <span v-else-if="scope.row.personSubtype==3">住户</span>
              <span v-else-if="scope.row.personSubtype==4">物业员工</span>
              <span v-else-if="scope.row.personSubtype==5">其他</span>
              <span v-else-if="scope.row.personSubtype==6">访客</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block mt-10">
        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="currentPage1"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="authTotal"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
      </span>
     </el-dialog>

     <!-- 设备升级弹框 -->
      <el-dialog
      title='选择升级版本'
      :visible.sync="updateVersionPop"
      width="1160px"
      class="el-dialog-reset auth-pop">
      <div style="padding:0px;">
        <div class="text-right mb-20">
          <el-input style="width:200px" placeholder="输入名称或版本号查询" v-model="softForm.search" clearable size="small"></el-input>
          <el-button class="mr-10" type="primary" size="small" @click="getSoftData()">搜索</el-button>
        </div>
        <el-table
        :data="softData"  
        :border="true"
        max-height="250"
        :cell-style="{backg :'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0'}"
        :stripe="true">
      <el-table-column label="" width="50" center>
　　　　　　<template slot-scope="scope">
　　　　　　　　<el-radio
　　　　　　　　　　class="radio"
　　　　　　　　　　v-model="softRadio"
　　　　　　　　　　:label="scope.$index"
　　　　　　　　　　@change.native="getCurrentRow(scope.$index,scope.row.id)"
　　　　　　　　　　>&nbsp;
　　　　　　　　</el-radio>
　　　　　　</template>
　　　　</el-table-column>
          <el-table-column property="name" label="软件名称" min-width="180"></el-table-column>  
          <el-table-column property="type" label="软件类型" width="120">
             <template slot-scope="scope">
              <span v-if="scope.row.type==1">未知</span>
              <span v-else-if="scope.row.type==2">人脸门禁终端</span>
              <span v-else-if="scope.row.type==3">人证核验终端</span>
              <span v-else-if="scope.row.type==5">安卓</span>
            </template>
          </el-table-column>
          <el-table-column property="version" label="软件版本" width="100"></el-table-column>
          <el-table-column property="remark" label="备注信息" min-width="300">
           
          </el-table-column>
          <el-table-column property="createTime" label="发布时间" width="160"></el-table-column>
          <el-table-column property="updateTime" label="上传时间" width="160"></el-table-column>
        </el-table>
      </div>
      <div class="block mt-10">
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="deviceTotal"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateVersionPop=false">取 消</el-button>
        <el-button type="primary" @click="saveVerson" v-show="!isUping">确 定</el-button>
        <el-button type="primary" v-show="isUping">升级中</el-button>
      </span>
     </el-dialog>
     <!-- 升级不成功弹框 -->
     <el-dialog
      title="提示"
      :visible.sync="upFailedPop"
      width="550px"
      class="el-dialog-reset auth-pop">
      <ul style="max-height:150px">
        <li style="margin-bottom:6px" v-for="(item,index) in FailedList" :key="index">设备：{{item.deviceName}}，升级指令下发失败！ 原因：{{item.reMess}}</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="upFailedPop = false,updateVersionPop=false">确 定</el-button>
      </span>
    </el-dialog>



     <!-- 监控弹框 -->
     <!-- //添加设备弹框 -->
      <el-dialog
      title="门前监视"
      :visible.sync="monitorPopVisible"
      width="500px"
      @close="monitorClose"
      class="el-dialog-reset set-pop video-pop">
      <div style="padding:0px;vertical-align:middle;text-align:center;">
        <img style="height:500px;width:auto;" :src="url" alt="">
        <!-- <el-image
      style="height:250px;"
      :src="url"
      fit="scale-down"></el-image> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="playStreamOpen">开门</el-button>
        <el-button @click="CatchPictures">拍照</el-button> 
      </span>
     </el-dialog>

      <msg-box :popVisible.sync="popVisible" :popTitle="popTitle" :popContent="popContent"></msg-box>
  </div>
</template>
<script src="./aisleAccess.js"></script>
<style scoped lang="scss">
@import "./aisleAccess.scss";
</style>
