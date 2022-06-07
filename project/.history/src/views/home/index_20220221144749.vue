  <template>
    <div class="content-wrapper home">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1 class="nice">
          仪表板
        </h1>
        <ol class="breadcrumb">
          <li>
              <a href="/">
                <i class="fa fa-home"></i> 首页
              </a>
            </li>
            <li>
              <i class="glyphicon glyphicon-dashboard"></i> 仪表板
            </li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content container-fluid">
        <div class="row wrapper-boox" >
          <div class="col-lg-3 col-xs-6 wrapper_top" style="padding-right:0px;">
            <!-- small box -->
            <div class="small-box bg-aqua" style="background: #4994E8 !important" >
              <div class="inner" >
                <div>
                  <h3>
                    <span id="companyTotal">{{houseNum}}</span>
                  </h3>
                  <p>房屋数</p>
                </div>
              </div>
              <div class="icon">
                <span class="glyphicon glyphicon-home"></span>
              </div>
              <div class="small-box-footer" @click="$router.push('/cellset')">
                <span id="companyInMothTotal">栋：{{buildingNumA}}</span>
                <span id="companyOutMothTotal" style="margin-left:5px !important;">室：{{houseNumA}}</span>
              </div>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-xs-6 wrapper_top" style="padding-right:0px;padding-left: 15px !important">
            <!-- small box -->
            <div class="small-box bg-yellow" style="background: #58C7CF !important ;">
              <div class="inner">
                <div>
                  <h3>
                    <span id="personTotal">{{residentNumA + propertyNumA}}</span>
                  </h3>
                  <p>人员数</p>
                </div>
              </div>

              <div class="icon">
                <span class="glyphicon glyphicon-user"></span>
              </div>
              <div class="small-box-footer" @click="$router.push('/ownermanage')">
                <span id="companyInMothTotal">住户数：{{residentNumA}}</span>
                <span id="companyOutMothTotal" style="margin-left:5px !important;">员工数：{{propertyNumA}}</span>
              </div>
            </div>
          </div>
        
          <!-- ./col -->
          <div class="col-lg-3 col-xs-6  wrapper_top" style="">
            <!-- small box -->
            <div class="small-box bg-green" style="background:#5FBB5F !important;">
              <div class="inner">
                <div>
                  <h3>
                    <span id="totalDeviceTotalSpan">{{onLineNumA + notLineNumA}}</span>
                  </h3>
                  <p>设备数</p>
                </div>
              </div>
              <div class="icon">
                <span class="glyphicon glyphicon-blackboard"></span>
              </div>
                <div class="small-box-footer" @click="$router.push('/aisleaccess')">
                <span id="companyInMothTotal">在线数：{{onLineNumA}}</span>
                <span id="companyOutMothTotal" style="margin-left:5px !important;">离线数：{{notLineNumA}}</span>
              </div>
            </div>
          </div>
        
          <div class="col-lg-3 col-xs-6  wrapper_top" style="">
            <!-- small box -->
            <div class="small-box bg-green" style="background: #EF985A !important;">
              <div class="inner" >
                <div>
                  <h3>
                    <span id="totalDeviceTotalSpan">{{auditCount}}</span>
                  </h3>
                  <p>待办事项</p>
                </div>
              </div>
              <div class="icon">
                <span class="glyphicon glyphicon-blackboard"></span>
              </div>
                <div class="small-box-footer" @click="$router.push('/ownermanage')">
                <span id="companyInMothTotal">维修数：{{repairNumA}}</span>
                <span id="companyOutMothTotal" style="margin-left:5px !important;">审核数：{{auditNumA}}</span>
                <span id="companyOutMothTotal" style="margin-left:5px !important;">投诉数：{{complainNumA}}</span>
              </div>
            </div>
          </div>
          
        </div>
        <div class="row">
          <div class="col-lg-9 col-xs-9">
            <div class="row">
              <div class="col-lg-4 col-md-12" style="padding-right:0px">
                <div class="box">
                  <div class="box-header with-border" style="height:42px">
                    <h3 class="box-title select-date">
                      <span>住户构成</span>
                    </h3>
                    <span id="person_title_text"></span>
                  </div>
                  <div class="box-body">
                    <div class="row">
                      <div class="col-md-12">
                        <div
                          class="chart"
                          id="chartTodayRecogHour"
                          style="height: 300px;padding-right: 10px"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-12" style="padding-right:0px">
                <div class="box">
                  <div class="box-header with-border" style="height:42px">
                    <h3 class="box-title select-date">
                      <span>今日统计</span>
                    </h3>
                    <span id="person_title_text"></span>
                  </div>
                  <div class="box-body">
                    <div class="row">
                      <div class="col-md-12">
                        <div
                          class="chart"
                          id="todayData"
                          style="height: 300px;padding-right: 10px"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12" style="padding-right:0px">
                <div class="box">
                  <!-- /.box-header -->
                  <div class="box-header with-border" style="height:42px">
                    <h3 class="box-title select-date">
                      <span>识别次数统计</span>
                          <el-date-picker
                              v-model="openDoorForm.startTime"  
                              :clearable='false'
                              small="small"
                              align="right"
                              type="date"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd"
                              @change="changeTime">
                            </el-date-picker>
                            <!-- <el-time-picker
                              v-model="timeArr" 
                              is-range 
                              :clearable='false'
                              small="small"
                              align="right"
                              format="HH:mm:ss"
                              value-format="HH:mm:ss"
                              type="datetimerange"
                              range-separator="-"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围"
                              @change="changeTime">
                            </el-time-picker> -->
                    </h3>
                    <span id="person_title_text"></span>
                  </div>
                  <div class="box-body">
                    <div class="row">
                      <div class="col-md-12">
                        <div
                          class="chart"
                          id="openDoorChart"
                          style="height: 300px;padding-right: 10px"
                        ></div>
                      </div>
                    </div>
                    <!-- /.row -->
                  </div>
                  <!-- ./box-body -->

                  <!-- /.box-footer -->
                </div>
                <!-- /.box -->
              </div>

              
            </div>
          </div>
          <div class="col-lg-3 col-xs-3">
            <div class="box" style="height:750px">
              <!-- /.box-header -->
              <div class="box-header with-border" style="height:42px">
                <h3 class="box-title">实时记录</h3>
              </div>
              <!-- <div class="box-body"> -->
                <ul class="person-list">
                  <li v-for="(item,index) in realTimeList" :key="index" v-if="index<8">
                    <div class="list-left" @click="seeContent(item)" style="cursor: pointer;">
                      <el-image 
                        v-if="item.comparePic"
                        style="width: 60px; height: 60px"
                        :src="imgurl+'/file/download?path='+item.comparePic"
                        fit="cover">
                      </el-image>
                      <el-image
                        v-else
                        style="width: 60px; height: 60px"
                        :src="imgurl+'/file/download?path='+item.snapPic"
                        fit="cover">
                      </el-image>
                      
                      <!-- <el-image
                        style="width: 60px; height: 60px"
                        src="http://127.0.0.1:4020/user/photo"
                        fit="cover">
                      </el-image> -->
                    </div>
                    <div class="list-right">
                      <p :title="item.snapTime">时间：{{item.snapTime}}</p>
                      <p>
                        <span v-if="item.personType==1">白名单 </span>
                        <span v-else-if="item.personType==2">黑名单 </span>
                        <span v-else-if="item.personType==3">访客 </span>
                        <span v-else-if="item.personType==4">陌生人 </span>
                        <span>{{item.personName}}</span>
                      </p>
                      <p>{{item.deviceName}}</p>
                    </div>
                  </li>
                </ul>
              <!-- </div> -->
              <!-- /.box-footer -->
            </div>
          </div>
        </div>

      
        <!-- <select
          id="appSelect"
          class="select2-single form-control"
          v-model="deviceTypeAdd"
          style="width:300px;direction: rtl;background-color: transparent;border:none;color: white"
        ></select>-->
      </section>
      <!-- /.content -->
     <el-dialog
        title='记录详情'
        :visible.sync="recordContentPop"
        width="900px"
        class="el-dialog-reset">
        <div style="padding:0px;" class="record-pop">
          <div class="record-pop-left">
            <p><span>姓名：</span>{{contentMsg.personName}}</p>
            <p><span>证件号：</span>{{contentMsg.personIdNum}}</p>
            <p><span>核验时间：</span>{{contentMsg.snapTime}}</p>
          </div>
          <div class="record-pop-right">
            <p><span>性别：</span>
              <label v-if="contentMsg.personGender==0"></label>
              <label v-if="contentMsg.personGender==1">男</label>
              <label v-else-if="contentMsg.personGender==2">女</label>
              <label v-else-if="contentMsg.personGender==3">未知</label>
            </p>
            <p><span>民族：</span>{{contentMsg.personEthnic}}</p>
            <p><span>设备名称：</span>{{contentMsg.deviceName}}</p>
          </div>
          <div class="record-pop-left">
            <el-image 
              v-if="contentMsg.comparePic"
              style="width: 100px;"
              :src="imgurl+'/file/download?path='+contentMsg.comparePic"
              :preview-src-list="[imgurl+'/file/download?path='+contentMsg.comparePic]">
            </el-image>
            <el-image
              v-else-if="contentMsg.snapPic"
              style="width: 100px;"
              :src="imgurl+'/file/download?path='+contentMsg.snapPic"
              :preview-src-list="[imgurl+'/file/download?path='+contentMsg.snapPic]">
            </el-image>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="recordContentPop=false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  <script src="./home.js"></script>
  <style lang="scss">
    .small-box-footer {
      cursor: pointer;
    }

    .el-image-viewer__mask {
      opacity: 0.8
    }
  @import "./home.scss";
  // #appSelect{
  //   display: none;
  // }
  </style>
