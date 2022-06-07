<template>
  <div class="dialog-content">
     <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="500px"
      @close="$emit('update:popVisible',false)"
      class="el-dialog-reset">
      <div style="padding:0px;">
        <el-input v-model="inputVal" :maxlength="hasMaxLength"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:popVisible',false)">取 消</el-button>
        <el-button type="primary" @click="sendMsg">确 定</el-button>
      </span>
     </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["popVisible", "popTitle", "popContent","popValue",'hasMaxLength'],
  data() {
    return {
      dialogVisible: false,
      title: "",
      content: "",
      inputVal:"",
    };
  },
  mounted() {
    this.dialogVisible = this.popVisible;
    this.title = this.popTitle;
    this.content = this.popContent;
    this.inputVal=this.popValue
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
    },
    popValue(){
      this.inputVal=this.popValue
    },
  },
  methods: {
      sendMsg(){
          this.$parent.dialogAdd();
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