import { mixin } from "../../../utils/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      dialogTitle: "",
      page: 1,
      pageSize: 10,
      total: 0,
      userInfoList: false,
      mName: "",
      userMsgList: {
        Oname: "", //姓名
        startTime: "", //布控开始时间
        expireTime: "", //布控结束时间
        status: "", //布控状态
        warnLevel: "", //报警等级
        imgurl: "", //人员图片
        remark: "", //备注
        matchingDegree: "", //匹配比例
        blacklistType: "", //布控原因
        _id: "",
      },
      seekCondition: {}, //搜索查询条件
      faceUrl: "",
      tag: true, //标识
      personId: "",
      newImgUrl: "http://pre.qy-rgs.com:9007/file/download?path=",
      uploadData: {
        appId: "",
      }, //项目id
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      ],
      tableData: [],
    };
  },
  created() {
    // this.imgurl = this.tools.global.API_URL;
    this.uploadData.appId = window.localStorage.getItem("appid");
    this.getDcsList();
  },

  methods: {
    // 获取布控列表数据
    getDcsList() {
      this.utils.http(
        {
          url: "/capture/face/capture/person/page",
          method: "POST",
          data: {
            page: this.page,
            pageSize: this.pageSize,
            appId: this.uploadData.appId,
            name: this.seekCondition.name,
            status: this.seekCondition.status,
            warnLevel: this.seekCondition.warnLevel,
            startTime: this.seekCondition.startTime,
            expireTime: this.seekCondition.expireTime,
          },
        },
        (res) => {
          console.log(res, "布控名单");
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      );
    },

    // 搜索查询
    searchControlMsg() {
      this.getDcsList();
    },
    // 重置搜索框
    resetInputVlue() {
      this.seekCondition = {};
      this.getDcsList();
    },
    // 分页切换
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(val, "我是页码");
      this.getDcsList();
    },
    // 处理table格数据
    formatterArr(row, column, cellValue) {
      if (row.startTime && row.expireTime) {
        let newRow = row.startTime + " " + row.expireTime;
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
      console.log(res, "^^^^");
      if (res.code == 200) {
        this.userMsgList.imgurl = this.newImgUrl + res.data[0];
      }
    },
    // 添加布控名单
    addDeployInfo() {
      console.log(this.userMsgList,'$$$$')
      if (
        this.userMsgList.blacklistType == "" ||
        this.userMsgList.startTime == "" ||
        this.userMsgList.expireTime == "" ||
        this.userMsgList.Oname == "" ||
        this.userMsgList.imgurl  == "" ||
        this.userMsgList.remark == "" ||
        this.userMsgList.matchingDegree == "" ||
        this.userMsgList.warnLevel == ""
      ) {
        return this.$message.error("缺少必填项");
      }
      this.utils.http(
        {
          url: "/capture/face/capture/person/add",
          method: "POST",
          data: {
            appId: window.localStorage.getItem("appid"),
            blacklistType: this.userMsgList.blacklistType,
            startTime: this.userMsgList.startTime,
            expireTime: this.userMsgList.expireTime,
            name: this.userMsgList.Oname,
            faceUrl: this.userMsgList.imgurl,
            remark: this.userMsgList.remark,
            matchingDegree: this.userMsgList.matchingDegree,
            warnLevel: this.userMsgList.warnLevel,
          },
        },
        (res) => {
          if (res.code == 200) {
            this.$message.success("添加成功");
            this.userInfoList = false;
            (this.userMsgList = {}), this.getDcsList();
          }
        }
      );
    },
    handleCurrentChange(val) {
      this.page = val;
      console.log(val, "我是当前页");
      this.getDcsList();
    },
    addList() {
      this.dialogTitle = "添加布控名单";
      this.userInfoList = true;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 编辑布控名单
    compileList(row) {
      this.tag = false;
      this.dialogTitle = "编辑布控名单";
      this.userInfoList = true;
      this.userMsgList.Oname = row.name;
      this.userMsgList.startTime = row.startTime;
      this.userMsgList.expireTime = row.expireTime;
      this.userMsgList.warnLevel = row.warnLevel.toString();
      this.userMsgList.matchingDegree = row.matchingDegree;
      this.userMsgList.blacklistType = row.blacklistType.toString();
      this.userMsgList.remark = row.remark;
      this.userMsgList.imgurl = row.faceUrl;
      this.userMsgList._id = row.id;
    },

    // 编辑保存
    compilePreserveInfo() {
      this.utils.http(
        {
          url: "/capture/face/capture/person/update",
          method: "POST",
          data: {
            blacklistType: this.userMsgList.blacklistType,
            startTime: this.userMsgList.startTime,
            expireTime: this.userMsgList.expireTime,
            name: this.userMsgList.Oname,
            faceUrl: this.userMsgList.imgurl,
            remark: this.userMsgList.remark,
            matchingDegree: this.userMsgList.matchingDegree,
            warnLevel: this.userMsgList.warnLevel,
            id: this.userMsgList._id,
            appId: window.localStorage.getItem("appid"),
          },
        },
        (res) => {
          console.log(res, "编辑保存");
          if (res.code == 200) {
            this.$message.success("编辑布控名单成功");
            this.userInfoList = false;
            this.userMsgList.Oname = "";
            (this.userMsgList.startTime = ""),
              (this.userMsgList.expireTime = ""),
              (this.userMsgList.status = ""),
              (this.userMsgList.warnLevel = ""),
              (this.userMsgList.imgurl = ""),
              (this.userMsgList.remark = ""),
              (this.userMsgList.matchingDegree = ""),
              (this.userMsgList.blacklistType = "");
            this.getDcsList();
          }
        }
      );
    },
    cancelSubmit() {
      this.userInfoList = false;
      this.userMsgList.Oname = "";
      (this.userMsgList.startTime = ""),
        (this.userMsgList.expireTime = ""),
        (this.userMsgList.status = ""),
        (this.userMsgList.warnLevel = ""),
        (this.userMsgList.imgurl = ""),
        (this.userMsgList.remark = ""),
        (this.userMsgList.matchingDegree = ""),
        (this.userMsgList.blacklistType = "");
    },
    // 导出表格
    deriveExcer() {
      this.$confirm("是否需要导出数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.utils.http(
            {
              url: "/capture/face/capture/person/export",
              method: "POST",
              data: {
                appId: window.localStorage.getItem("appid"),
                withPic: 1,
                name: this.userMsgList.name,
                status: this.userMsgList.status,
                warnLevel: this.userMsgList.warnLevel,
                startTime: this.userMsgList.startTime,
                expireTime: this.userMsgList.expireTime,
              },
            },
            (res) => {
              if (res.code == 200) {
                this.$message.success("文件导出成功");
              } else {
                this.$message.error(res.msg);
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 删除布控信息
    deleteCompile(row) {
      this.personId = row.id;
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.utils.http(
            {
              url: `/capture/face/capture/person/delete`,
              method: "POST",
              params: {
                personId: this.personId,
              },
            },
            (res) => {
              if (res.code == 200) {
                this.$message.success("删除成功");
                this.getDcsList();
              } else {
                this.$message.error(res.msg);
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
  },
};