import {mixin} from '../../../utils/mixin.js'
export default {
  mixins:[mixin],
  data() {
    return {
      startSnapTime: "",
      endSnapTime: "",
      page: 1,
      pageSize: 10,
      total: 0,
      beard: "",
      glasses: "",
      mask: "",
      skin: "",
      sex: "",
      age: "",
      multipleSelection: [],
      allSelect: false,
      OimgUrl: "http://pre.qy-rgs.com:9007",
      tableData: [],
    };
  },
  created() {
    // 图片路径
    // this.OimgUrl = this.tools.global.API_URL;
    this.faceMsg();
    console.log(this.tools.global.API_URL, "!!!!!");
  },
  methods: {
    searching() {
      this.$router.push("/faceSearching");
    },
    faceMsg() {
      this.utils.http(
        {
          url: "/capture/face/capture/record/page",
          method: "POST",
          data: {
            appId:window.localStorage.getItem('appid'),
            page: this.page,
            pageSize: this.pageSize,
            beard: this.beard,
            startSnapTime: this.startSnapTime,
            endSnapTime: this.endSnapTime,
            glasses: this.glasses,
            mask: this.mask,
            skin: this.skin,
            sex: this.sex,
            age: this.age,
          },
        },
        (res) => {
          if (res.code == 200) {
            (this.tableData = res.data.records), (this.total = res.data.total);
          }
          console.log(res, "wwwww");
        }
      );
    },
    // 分页区域
    handleSizeChange(val) {
      this.pageSize = val;
      this.faceMsg();
      console.log(val, "size");
    },
    handleCurrentChange(val) {
      this.page = val;
      this.faceMsg();
      console.log(val, "page");
    },
    // 搜索查询
    searchMsg() {
      if ((this.age != "") & (this.age > 120)) {
        return this.$message.error("搜索年龄不能超过120！");
      } else {
        if(this.age == 7 || this.sex == 7 || this.glasses == 7 || this.mask == 7 || this.skin == 7) {
          this.age = '';
          this.sex = '';
          this.glasses = '';
          this.mask = '';
          this.skin = '';
          this.faceMsg();
        }else {
          this.faceMsg();
        }
      
      }
    },
    // 重置功能
    resetMsg() {
      (this.beard = ""),
        (this.startSnapTime = ""),
        (this.endSnapTime = ""),
        (this.glasses = ""),
        (this.mask = ""),
        (this.skin = ""),
        (this.page = 1),
        (this.sex = ""),
        (this.age = "");

      this.faceMsg();
    },
    // 全选
    checkAll() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    // 反选
    handleSelectionChange(selection) {
      console.log(selection, "selection");
    },

    toggerCheck(rows) {
      // console.log(111)
    },
    // 格式化数据
    formatterArr(row, column, cellValue) {
      console.log(row, "row");
    },
    getTime() {
      console.log(this.value1, "!!!!");
    },
  },
};