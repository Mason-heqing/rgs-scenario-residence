<template>
  <div class="dialog-content">
    <el-dialog :title="title" :visible.sync="dialogVisible" width="20%" @close="clearTime();$emit('update:popVisible',false)">
      <span style="color:#f39c12;font-size:18px;font-weigth:600" class="el-icon-warning-outline"></span>
      <span>{{content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clearTime();$emit('update:popVisible',false)" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["popVisible", "popTitle", "popContent"],
  data() {
    return {
      dialogVisible: false,
      title: "",
      content: ""
    };
  },
  mounted() {
    this.dialogVisible = this.popVisible;
    this.title = this.popTitle;
    this.content = this.popContent;
  },
  watch: {
    popVisible() {
      this.dialogVisible = this.popVisible;
    },
    popTitle() {
      this.title = this.popTitle;
    },
    popContent() {
      this.content = this.popContent;
    }
  },
  methods: {
    //清除父组件的延时器
    clearTime(){
      this.$parent.clearSetTimeOut();
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