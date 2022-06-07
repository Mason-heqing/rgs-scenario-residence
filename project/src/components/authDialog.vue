<template>
  <div class="dialog-content">
    <el-dialog
      :title='dialogTitle'
      :visible.sync="dialogVisible"
      width="60%"
      @close="$emit('update:authPopVisible',false)"
      class="el-dialog-reset">
      <el-button class="yipi_st" size="small " @click="setStUinfo" type='primary'>批量授权</el-button>
      <div style="padding:0px;">
        <el-table
        ref="defaultTableChild"
        @selection-change="handleSelectionChange"
        :data="tableData"  
        :border="true"
        :cell-style="{background:'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0'}"
        :stripe="true">
        <el-table-column type="selection">

        </el-table-column>
          <el-table-column property="deviceName" label="授权" min-width="50">
            <template slot-scope="scope">
              <span :class="{'auth-status-s':scope.row.status==2,'auth-status-f':scope.row.status==3,'auth-status-c':scope.row.status==1,}"></span>
            </template>
          </el-table-column>
          <el-table-column property="deviceName" label="设备名称" min-width="100"></el-table-column>
          <el-table-column property="startTime" label="授权开始" min-width="120"></el-table-column>
          <el-table-column property="expireTime" label="授权结束" min-width="120"></el-table-column>
          <el-table-column property="updateTime" label="更新时间" min-width="120"></el-table-column>
          <el-table-column property="name" label="日志" width="50">
            <template slot-scope="scope">
              <span style="color:#3c8dbc;cursor: pointer;" class="fa fa-book" @click="innerVisible=true,getPersonAuth(scope.row.id)"></span>
            </template>
          </el-table-column>
          <el-table-column property="name" label="操作" width="50">
            <template slot-scope="scope">
              <span @click="jurisdictionP(scope.row)" style="color:#037840; cursor: pointer;">授权</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:authPopVisible',false)">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title='授权日志'
      :visible.sync="innerVisible"
      width="60%"
      class="el-dialog-reset">
      <div style="padding:0px;">
        <el-table
        :data="authContent"  
          max-height="250"
        :border="true"
        :cell-style="{background:'#fff',fontSize:'14px',color:'#12111D',padding:'6px 0'}"
        :stripe="true">
          <el-table-column property="createTime" label="时间" width="160"></el-table-column>
          <el-table-column property="startTime" label="类型" width="60">
            <template  slot-scope="scope">
              <span v-if="scope.row.optType=='C'">新增</span>
              <span v-if="scope.row.optType=='U'">更新</span>
              <span v-if="scope.row.optType=='D'">删除</span>
            </template>
          </el-table-column>
          <el-table-column property="expireTime" label="目标" width="150">
            <template  slot-scope="scope">
              <span v-if="scope.row.type==1">人员</span>
              <span v-if="scope.row.type==2">人脸</span>
              <span v-if="scope.row.type==3">人员+人脸</span>
            </template>
          </el-table-column>
          <el-table-column property="msg" label="日志" min-width=""></el-table-column>

        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:authPopVisible',true),innerVisible=false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["authPopVisible","authPopTitle"],
  data() {
    return {
      dialogVisible: false,
      dialogTitle:'人员授权',
      tableData: [],
        formData:{
          appId:'',
          pageNum:1,
          pageSize:10,
          personId:'',
        },
        currentPage:1,
        total:0,
        innerVisible:false,
        authContent:[],
        arr:null,
        obj:[],
        obj2:[],
        obj3:[]
    };
  },
  mounted() {
  },
  watch: {
    authPopVisible() {
      this.dialogVisible = this.authPopVisible;
      if(this.authPopVisible){
        this.formData.appId=this.$parent.appId;
        this.formData.personId=this.$parent.authId;
        this.dialogTitle='人员授权 ('+this.authPopTitle+')';
        this.getAuthList();
      }
    },
    authPopTitle(){
      this.dialogTitle='人员授权 ('+this.authPopTitle+')';
    },
  },
  methods: {
    // 批量授权
    handleSelectionChange(val) {
      this.arr = val
      // console.log("val:",val);
      this.obj = this.arr.map(v => {
        return v.deviceId
      })
      this.obj2 = this.arr.map(v => {
        return v.personId
      })
      this.obj3 = [...new Set(this.obj2)]
    },
    setStUinfo() {
      console.log("arr:",this.arr);
      if(this.arr && this.arr.length > 0){
        this.utils.http({
            url:'/device/deviceAuth',
            method:'POST',
            data:{
              appId:this.arr[0].appId,
              deviceIds:this.obj,
              personIds:this.obj3
            }
          },
            res => {
              if(res.code == 200) {
                this.$message.success('授权成功')
                // this.authPopVisible = false
                this.getAuthList();
              }else {
                this.$message.error('授权失败请重试')
              }
            }
          )
       
      }else{
           this.$message.error('请先勾选需要的授权人员')
      }
      
    },
     // 人员授权操作
    jurisdictionP(row) {
      let obj = row
      console.log(obj,'****')
      this.utils.http({
        url:'/device/deviceAuth',
        method:'POST',
        data:{
          appId:obj.appId,
          deviceIds:obj.deviceId,
          personIds:obj.personId
        }
      },
        res => {
          console.log(res,'设备授权')
          if(res.code == 200) {
            this.$message.success('授权成功')
            this.getAuthList();
          }
        }
      )
    },
      getAuthList(){
        console.log("this.formData",this.formData);
        this.utils.http({
            url: "/person/deviceGrantSearch",
            method: "POST",
            data: this.formData
          },res => {
            console.log(res,'------')
            if(res.code==200){
              this.total=res.data.total;
              this.tableData=res.data.records;
            }
            
          })         
      },
      getPersonAuth(id){
        console.log(id)
        this.utils.http({
            url: "/person/queryLogByGrantId",
            method: "GET",
            params: {grantId:id}
          },res => {
            if(res.code==200){
              this.authContent=res.data;
            }
            
          })         
      },
      
       //分页
    handleSizeChange(val) {
      this.formData.pageSize=val;
      this.getAuthList();
    },
    handleCurrentChange(val) {
      this.formData.pageNum=val;
      this.getAuthList();
    },
  }
};
</script>

<style scoped lang="scss">
.dialog-content /deep/{
    .el-dialog__header {
        padding: 15px 15px 10px;
        
    }
    .el-dialog__title{
        font-size: 14px;
    }
    .el-dialog__body {
    padding: 15px 20px;
    }
    .el-dialog__footer {
    padding: 10px 20px 15px;
    }
    .el-dialog{
        margin-top:25vh ;
    }
    .auth-status-s{
      width: 3px;
      display: inline-block;
      height: 30px;
      background: #00a65a;
    }
    .auth-status-f{
      width: 3px;
      display: inline-block;
      height: 30px;
      background: #dd4b39;
    }
    .auth-status-c{
      width: 3px;
      display: inline-block;
      height: 30px;
      background: #666;
    }
    .yipi_st {
      margin-bottom: 10px;
    }
}
</style>