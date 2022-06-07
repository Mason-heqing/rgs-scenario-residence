<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1 class="nice">
        人员管理 - 黑名单
        <!-- <small>Optional description</small> -->
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"> <i class="fa fa-home"></i> 首页 </a>
        </li>
        <li><i class="glyphicon glyphicon-dashboard"></i> 人员管理</li>
        <li class="active">
          <i class="glyphicon glyphicon-adjust"></i> 黑名单
        </li>
      </ol>
    </section>

    <!-- 顶部搜索区域 -->
   
    <div class="box box-primary">
      <div class="box-body">
          <div class="my_card">
        <el-row :gutter="30">
          <el-col :span="18">
            <div class="my_card-box">
              <el-input
                placeholder="搜索姓名/手机号/身份证号"
                v-model="addPersonForm.name"
                style="width: 30%"
              ></el-input>
              <el-select
                placeholder="性别"
                style="margin-left: 10px; width: 20%"
                v-model="addPersonForm.gender"
              >
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
              
              <el-select
                placeholder="黑名单类型"
                style="margin-left: 10px; width: 20%"
                v-model="addPersonForm.blacklistType"
              >
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
              <el-date-picker
                style="margin-left: 10px"
                type="datetime"
                placeholder="开始时间"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                v-model="addPersonForm.createTime"
              >
              </el-date-picker>
              <el-date-picker
                type="datetime"
                placeholder="结束时间"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                v-model="addPersonForm.effectiveTime"
              >
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="btn-group">
              <button id="btn_device_reset" type="button" class="btn btn-primary"  @click="searchControlMsg">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>搜索
              </button> 
              <button id="btn_device_reset" type="button" class="btn btn-default pl-8 pr-8"  @click="resetInputVlue">
                <span class="fa fa-reply" aria-hidden="true"></span>重置
              </button>
            </div>
          </el-col>
    
        </el-row>
      </div>
    
      <div class="btn-group" style="margin-top:20px">
            <button id="btn_add" type="button" class="btn btn-default" @click="addUserMsg">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>添加
            </button> 
            <button id="btn_add" type="button" class="btn btn-default" @click="batchDelete">
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>批量删除
            </button> 
            <button id="btn_delete" type="button" class="btn btn-default" @click="deriveUserMsg">
                <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>导出
            </button>
        </div>
      <div>
        <el-table
          :data="tableDataList"
          @selection-change="handleSelectionChange"
          stripe
          border
          tooltip-effect="dark"
          sortable
          :header-cell-style="{ backg : '#FAF9F8' }"
          ref="multipleTable"
          style="width: 100%; margin-top: 10px"
        >
        <!-- http://scenario.qy-rgs.com:9010/
        http://scenario.qy-rgs.com:9010/person/0e6fb2cc4cc2461b837189936ff2415a/2021/06/11/27f0138f75894541a25de06eb0f47f55.jpg -->
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="faceUrl" label="人脸">
            <template slot-scope="scope">
              <el-image
                style="width: 70px; height: 70px"
                :src="newImg + globalImgPath + scope.row.faceUrl"
                :preview-src-list="[newImg+'/file/download?path=' + scope.row.faceUrl]"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="gender" label="性别">
            <template slot-scope="scope">
              <span>{{
                scope.row.gender == 1
                  ? "男"
                  : scope.row.gender == 2
                  ? "女"
                  : "未知"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机"> </el-table-column>
          <el-table-column prop="idNum" label="身份证号"> </el-table-column>
          <el-table-column prop="blacklistType" label="黑名单原因">
            <template slot-scope="scope">
              <span>{{
                scope.row.blacklistType == 0
                  ? "其他"
                  : scope.row.blacklistType == 1
                  ? "广告"
                  : scope.row.blacklistType == 2
                  ? "推销"
                  : "逃犯"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column
            prop="effectiveTime"
            label="有效时间"
            fixed="right"
            how-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="name" label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="redactBlacklist(scope.row)"
                size="mini"
                >编辑</el-button
              >
              <el-button
                type="danger"
                @click="deleteBlacklistMsg(scope.row)"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 新增名单弹窗 -->
      </div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="blacklistDialogVisible"
        width="35%"
      >
      <div class="dlog_box">
        <div class="box_msg">
          <span :class="[isRealName ? bf_tg : '','_siyou']"
            >照&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片：</span
          >
          <el-upload
            name="file"
            class="avatar-uploader"
            :with-credentials="true"
            :show-file-list="false"
            :action="newImg + '/file/person/upload'"
            list-type="picture-card"
            :data="uploadData"
            :on-success="successCheck"
            :before-upload="beforeAvatarUpload"
          >
          <img v-if="imgUrl" :src=" newImg + globalImgPath + imgUrl" style="width:95px;height:95px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="box_msg" style="margin-top: 25px">
          <span class="bf_tg _siyou"
            >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span
          >
          <el-input
            placeholder="请输入姓名"
            v-model="blacklistMsg.name"
          ></el-input>
          <span class="_siyou" style="margin-left: 5px; color: red"
            >(必填)</span
          >
        </div>
        <div class="box_msg" style="margin-top: 25px">
          <span :class="[isRealName ? bf_tg : '','_siyou']">&nbsp;身份证号：</span>
          <el-input
            placeholder="请输入证件号"
            v-model="blacklistMsg.idNum"
          ></el-input>
           <span v-if="isRealName"  class="_siyou" style="margin-left: 5px; color: red">(必填)</span>
           <span vv-else  class="_siyou" style="margin-left: 5px; color: red"></span>
        </div>
        <div class="box_msg" style="margin-top: 25px">
          <span class="bf_tg _siyou"
            >性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span
          >
          <div>
            <el-radio v-model="blacklistMsg.type" label="1">男</el-radio>
            <el-radio v-model="blacklistMsg.type" label="2">女</el-radio>
          </div>
        </div>
        <div class="box_msg" style="margin-top: 25px">
          <span :class="[isRealName ? bf_tg : '','_siyou']">&nbsp;手机号码：</span>
          <el-input
            placeholder="请输入手机号"
            v-model="blacklistMsg.phone"
          ></el-input>
           <span v-if="isRealName"  class="_siyou" style="margin-left: 5px; color: red">(必填)</span>
           <span vv-else  class="_siyou" style="margin-left: 5px; color: red"></span>
        </div>
        <div class="box_msg" style="margin-top: 25px">
          <span class="bf_tg _siyou"
            >类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span
          >
          <el-select placeholder="请选择" v-model="blacklistMsg.blacklistType">
            <el-option
              v-for="item in options4"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </div>
        <div class="box_msg" style="margin-top: 25px">
          <span class="bf_tg _siyou">&nbsp;有效时间：</span>
          <el-date-picker
            type="datetime"
            placeholder="有效时间"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            v-model="blacklistMsg.effectiveTime"
          >
          </el-date-picker>
        </div>
        <div class="box_msg" style="margin-top: 25px">
          <span class="_siyou" style="margin-left:5px"
            >&nbsp;备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span
          >
          <el-input
            placeholder="备注信息"
            v-model="blacklistMsg.remark"
          ></el-input>
        </div>
      </div>
        

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDiaLog">取 消</el-button>
          <el-button type="primary" @click="submitBlacklist">确 定</el-button>
        </span>
      </el-dialog>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="addPersonForm.pageNum"
          :page-sizes="[5, 10, 25]"
          :page-size="addPersonForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mixin } from "../../../utils/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      isRealName:false,
      blacklistDialogVisible: false,
      bf_tg:'bf_tg',
      _siyou:'_siyou',
      radio: "1",
      vdsList:[],
      tableDataList: [], //表格数据
      blacklistMsg: {
        //添加黑名单信息
        faceUrl: "",
        name: "",
        idNum: "",
        type: "",
        phone: "",
        blacklistType: "",
        effectiveTime: "",
        remark: "",
        personId:''
      },
      uploadData: {
        appId: "",
      },
      dialogTitle: "",
      newImg: "",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      ],
      imgUrl: "",
      imgPath:'',
      total: 0,
      addPersonForm: {
        pageNum: 1,
        pageSize: 10,
        blacklistType: "",
        createTime: "",
        effectiveTime: "",
        gender: "",
        name: "",
        phone: "",
        idNum: "",
        appId: '',
      }, //列表查询参数
    };
  },
  computed: {
    appNum() {
        return this.$store.state.project.projectId
    },
    appName() {
      return this.$store.state.project.projectName
    }

  },
  watch:{
    appNum(newFlag, oldFlag){
      this.addPersonForm.appId = newFlag
      this.getBlacklist()
      console.log(newFlag)
    },
    appName(newName) {
      this.projName = newName
    }
  },
  created() {
    this.uploadData.appId = this.$store.state.project.projectId;
    this.addPersonForm.appId =  this.$store.state.project.projectId
    this.imgPath = this.tools.global.API_URL;
    this.newImg = this.tools.global.API_URL;
    this.getBlacklist();
    this.realNameVerification();
  console.log(this.imgPath)
  },
  methods: {
    // 获取黑名单列表
    getBlacklist() {
      this.utils.http(
        {
          url: "/person/blacklist/page",
          method: "POST",
          data: this.addPersonForm,
        },
        (res) => {
          console.log(res, "****");
          if (res.code == 200) {
            this.tableDataList = res.data.records;
            this.total = res.data.total;
          }
          console.log(this.tableDataList, "黑名单");
        }
      );
    },
    // 搜索查询
    searchControlMsg() {
      this.getBlacklist();
    },

    // 处理table格数据
    formatterArr(row, column, cellValue) {
      if (row.createTime && row.effectiveTime) {
        let newRow = row.createTime + " " + row.effectiveTime;
        return newRow;
      }
      console.log(row, "row");
    },
    //上传之前
    beforeAvatarUpload(file) {
      let types = ["image/jpeg", "image/jpg", "image/png", "image/bmp"];
      const isImage = types.includes(file.type);
      const isLtSize = file.size / 1024 / 1024 < 5;
      console.log(file.size);
      if (!isImage) {
        this.$message.error("格式不支持");
        return false;
      }
      if (!isLtSize) {
        this.$message.error("上传图片大小不能超过 5MB!");
        return false;
      }
    },
    //上传成功
    successCheck(res, file, fileList) {
    
      if (res.code == 200) {
        this.imgUrl =  res.data[0];
      }
      console.log(res,'$$$$')
      console.log(this.newImg + this.globalImgPath + this.imgUrl,'!!!!!')
      console.log(this.imgUrl, "^^^^");
    },

    consoleSelect() {
      console.log(this.$refs.tableChild.selectData);
    },

    // 添加名单
    addUserMsg() {
      this.dialogTitle = "添加黑名单";
      this.blacklistDialogVisible = true;
    },
    // 删除单条信息
    deleteBlacklistMsg(row) {
      let Id = row.personId;
      this.$confirm("此操作将清除改条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.utils.http(
            {
              url: "/person/blacklist/delPerson",
              method: "POST",
              params: {
                personId: Id,
              },
            },
            (res) => {
              if (res.code == 200) {
                this.$message.success("删除信息成功");
                this.getBlacklist();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加保存
    submitBlacklist() {
      // var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
      // if (!format.test(this.blacklistMsg.idNum)) {
      //   return this.$message.error("请正确输入身份证号码");
      // }
      if(this.isRealName){
          if (
        this.imgUrl == "" ||
        this.blacklistMsg.name == "" ||
        this.blacklistMsg.type == "" ||
        this.blacklistMsg.blacklistType == ""
        ||this.blacklistMsg.effectiveTime == ""
        || this.blacklistMsg.idNum == ""
        || this.blacklistMsg.phone == ""
      ) {
        return this.$message.error("缺少必填项");
        }
      }else{
        if(this.blacklistMsg.name == "" ||
        this.blacklistMsg.type == "" ||
        this.blacklistMsg.blacklistType == ""
        ||this.blacklistMsg.effectiveTime == ""
        ){
           return this.$message.error("缺少必填项");
        }
      }
      
      this.utils.http(
        {
          url: "/person/blacklist/addPerson",
          method: "POST",
          data: {
            appId: window.localStorage.getItem("appid"),
            blacklistType: this.blacklistMsg.blacklistType,
            effectiveTime: this.blacklistMsg.effectiveTime,
            faceUrl: this.imgUrl,
            gender: this.blacklistMsg.type,
            idNum: this.blacklistMsg.idNum,
            name: this.blacklistMsg.name,
            phone: this.blacklistMsg.phone,
            remark: this.blacklistMsg.remark,
            personId:this.blacklistMsg.personId
            
          },
        },
        (res) => {
          if (res.code == 200) {
            this.$message.success("添加黑名单成功");
            this.getBlacklist();
            this.blacklistDialogVisible = false;
            this.blacklistMsg.blacklistType = "";
            this.blacklistMsg.effectiveTime = "";
            this.blacklistMsg.type = "";
            this.blacklistMsg.idNum = "";
            this.blacklistMsg.name = "";
            this.blacklistMsg.phone = "";
            this.blacklistMsg.remark = "";
            this.imgUrl = "";
          } else {
            this.$message.error(res.msg);
          }
          console.log(res, "添加名单");
        }
      );
    },
    // 编辑黑名单
    redactBlacklist(row) {
      this.dialogTitle = "编辑黑名单";
      console.log(row, "====");
      let _row = row;
      this.blacklistDialogVisible = true;
      this.blacklistMsg.blacklistType = _row.blacklistType.toString();
      this.blacklistMsg.effectiveTime = _row.effectiveTime;
      this.blacklistMsg.type = _row.gender.toString();
      this.blacklistMsg.idNum = _row.idNum;
      this.blacklistMsg.name = _row.name;
      this.blacklistMsg.phone = _row.phone;
      this.blacklistMsg.remark = _row.remark;
      this.imgUrl =   _row.faceUrl;
      this.blacklistMsg.personId = _row.personId
      console.log(this.newImg + this.imgUrl)
    },
    // 取消添加
    cancelDiaLog() {
      this.blacklistDialogVisible = false;
      this.blacklistMsg.blacklistType = "";
      this.blacklistMsg.effectiveTime = "";
      this.blacklistMsg.type = "";
      this.blacklistMsg.idNum = "";
      this.blacklistMsg.name = "";
      this.blacklistMsg.phone = "";
      this.blacklistMsg.remark = "";
      this.imgUrl = "";
      this.blacklistMsg.personId = ''
    },
    // 重置功能
    resetInputVlue() {
      (this.addPersonForm.name = ""),
        (this.addPersonForm.phone = ""),
        (this.addPersonForm.gender = ""),
        (this.addPersonForm.createTime = ""),
        (this.addPersonForm.effectiveTime = ""),
        (this.addPersonForm.blacklistType = ""),
        this.getBlacklist();
    },
    // 批量删除处理
    handleSelectionChange(val) {
      let vds = val
      let arr = []
      console.log(vds,'w shi vds')
      arr = vds.map(item => {
        return item.personId
      })
      this.vdsList = arr
      // this.vdsList.push(vds.map(item => {
      //   return item.personId
      // }))

      
      console.log(arr,'批量删除')
    },  
  //批量删除确认
    batchDelete() {
      this.utils.http({
        url:'/person/blacklist/delPersons',
        method:'POST',
        data:{
          ids:this.vdsList
        }
        
      },
        res => {
          if(res.code == 200) {
            this.$message.success('删除成功')
            this.getBlacklist();
          }
          console.log(res,'批量删除888')
        }
      )
    },
    // 导出黑名单
    deriveUserMsg() {
      let parameterList = {
              appId:window.localStorage.getItem('appid'),
              blacklistType:this.addPersonForm.blacklistType,
              startTime:this.addPersonForm.startTime,
              endTime:this.addPersonForm.endTime,
              gender:this.addPersonForm.gender,
              name:this.addPersonForm.name
      }
      this.utils.http({
        url:'/person/blacklist/export',
        method:'POST',
        data:{...parameterList}
      },
        res => {
          if(res.code == 200) {
            this.$message.success('导出黑名单成功')
            this.resetInputVlue();
          }
          console.log(res,'导出')
        }
      )
    },

    //分页
    handleSizeChange(val) {
      console.log(val, "size");
      this.addPersonForm.pageSize = val;
      this.getBlacklist();
    },
    handleCurrentChange(val) {
      console.log(val, "num");
      this.addPersonForm.pageNum = val;
      this.getBlacklist();
    },

    //实名制校验
  realNameVerification(){
    this.utils.http({
      url: "/jn/api/status",
      method: "GET",
      params:{appId:window.localStorage.getItem("appid")}
    }, res => {
      console.log("获取实名制校验权限:",res.data)
      if(res.data){
          this.isRealName = true;
      }else{
        this.isRealName = false;
      }
    })
  },

  },
};
</script>
<style scoped >

.block {
  margin-top: 20px;
  float: left;
}
.my_card-box {
  display: flex;
}
.my_card .el-row {
  display: flex;
  align-items: center;
}
.my_card-box .el-input {
  width: 285px;
}
.operation_btn {
  margin-top: 20px;
}
.box_msg {
  display: flex;
  align-items: center;
}

.box_msg >>> .el-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
}
>>> .el-upload__input {
  display: none;
}
.box_msg .el-input,
.el-select {
  width: 70%;
}
.box_msg .bf_tg::before {
  content: "*";
  color: red;
}
.box_msg .bg::before {
  content: none;
}
._siyou {
  color: #696b6f;
  font-weight: 600;
}
>>>.el-icon-plus {

  font-weight: 600;
}
.el-card {
  width: 98.2%;
  margin: 15px auto 0 auto;
	border-top: 3px solid #3c8dbc;
}
.dlog_box {
  margin-left: 10%;
}
</style>
