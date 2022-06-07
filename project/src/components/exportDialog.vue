<template>
  <div class="dialog-content">
     <el-dialog
      title='导出'
      :visible.sync="dialogVisible"
      width="400px"
      @close="$emit('update:exportPopVisible',false)"
      class="el-dialog-reset">
      <div style="padding:0px;">
        <el-checkbox v-model="outChecked">导出图片</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:exportPopVisible',false)">取 消</el-button>
        <el-button type="primary" v-if="!isRequest" @click="sendMsg">确 定</el-button>
        <el-button type="primary" v-if="isRequest">导出中</el-button>
      </span>
     </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["exportPopVisible","isExport"],
  data() {
    return {
      dialogVisible: false,
      outChecked:false,
      isRequest:false,
    };
  },
  mounted() {
    this.dialogVisible = this.exportPopVisible;
    this.isRequest=this.isExport;

  },
  watch: {
    exportPopVisible() {
      this.dialogVisible = this.exportPopVisible;
    },
    isExport(){
       this.isRequest=this.isExport;
    },
  },
  methods: {
      sendMsg(){
          this.$parent.outBtn();
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
}
</style>