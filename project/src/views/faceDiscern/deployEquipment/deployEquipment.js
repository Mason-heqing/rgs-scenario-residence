import { mixin } from "../../../utils/mixin.js";
export default {
  mixins: [mixin],
  data() {
    return {
      equipmentParameter: {
        name: "",
        serial: "",
        lg: "",
        lt: "",
        type: "",
      }, //添加设备参数
      conditionList: {}, //搜索条件参数
      equipmentParameterTitle: "",
      total: 0,
      mId: "",
      tag: "",
      redactInfoList: false,
      center: { lng: 113.944198, lat: 22.528774 },
      pointObj: {}, //拾取的坐标点信息
      coordinatePoint: "",
      zoom: 18,
      equipmentName: "", //设备名称
      equipmentSN: "", //设备SN
      coordinatePoint: "", //设备坐标点
      openBaiduMapDlog: false,
      page: 1,
      pageSize: 10,
      userInfoList: false,
      tableData: [], //列表数据
    };
  },
  created() {
    this.getEquipmentList();
  },
  methods: {
    // 百度地图
    map_handler({ BMap, map }) {
      map.setMapStyleV2({
        styleId: "2d51c6da078eb301aabb3bf0df9ce1bb",
      });
      console.log(BMap, Map);
    },
    addList() {
      this.equipmentParameterTitle = "添加布控设备";
      this.userInfoList = true;
    },
    openBaiduMap() {
      this.openBaiduMapDlog = true;
    },
    // 获取地图上的坐标点
    locationMsg(point) {
      this.pointObj = point.point;
      if (this.pointObj != {}) {
        this.$message.success("坐标点获取成功");
      }
      console.log(point.point, "point!!");
    },
    // 填入获取到的坐标点
    closeopenBaiduMapDlog1() {
      this.openBaiduMapDlog = false;
    },
    closeopenBaiduMapDlog() {
      this.equipmentParameter.lg = this.pointObj.lng;
      this.equipmentParameter.lt = this.pointObj.lat;
      this.openBaiduMapDlog = false;
    },

    // 关闭添加设备弹窗
    closeUserInfoList() {
      this.userInfoList = false;
      (this.equipmentParameter = {}), (this.coordinatePoint = "");
    },
    // 添加布控设备信息提交
    submitDialogMsg() {
      this.addEquipmentMsg();
    },
    // 布控设备列表
    getEquipmentList() {
      this.utils.http(
        {
          url: "/capture/face/capture/device/page",
          method: "POST",
          data: {
            appId: window.localStorage.getItem("appid"),
            page: this.page,
            pageSize: this.pageSize,
            name: this.conditionList.name,
            online: this.conditionList.online,
          },
        },
        (res) => {
          console.log(res, "设备列表!!");
          if (res.code == 200) {
            this.tableData = res.data.records;
            this.total = res.data.total;
          }
        }
      );
    },
    // 添加设备信息
    addEquipmentMsg() {
      if (
        this.equipmentParameter.name == "" ||
        this.equipmentParameter.serial == "" ||
        this.equipmentParameter.lt == "" ||
        this.equipmentParameter.lg == ""
      ) {
        return this.$message.error("缺少必填项");
      }
      this.utils.http(
        {
          url: "/capture/face/capture/device/add",
          method: "POST",
          data: {
            appId: window.localStorage.getItem("appid"),
            latitude: this.pointObj.lat,
            longitude: this.pointObj.lng,
            name: this.equipmentParameter.name,
            serial: this.equipmentParameter.serial,
          },
        },
        (res) => {
          if (res.code == 200) {
            this.$message.success("添加设备成功");
            this.userInfoList = false;
            this.getEquipmentList();
            this.equipmentParameter = {};
          }
          console.log(res, "添加设备");
        }
      );
    },
    // 处理table格数据
    formatterArr(row, column, cellValue) {
      if (row.latitude && row.longitude) {
        let newRow = row.latitude + " " + row.longitude;
        return newRow;
      }
      console.log(row, "row");
    },
    // 搜索功能
    searchFacilityMsg() {
      this.getEquipmentList();
    },
    // 重置功能
    replacement() {
      this.conditionList = {};

      this.getEquipmentList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getEquipmentList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getEquipmentList();
    },
    // 编辑设备信息
    redactFacility(row) {
      this.userInfoList = true;
      let _row = row;
      console.log(_row, "row");
      this.tag = 1;
      this.equipmentParameterTitle = "编辑布控设备";
      this.equipmentParameter.serial = _row.serial;
      this.equipmentParameter.name = _row.name;
      this.equipmentParameter.lg = _row.longitude;
      this.equipmentParameter.lt = _row.latitude;
      this.mId = _row.id;
    },
    // 编辑保存
    amendSubmitDialogMsg() {
      this.utils.http(
        {
          url: "/capture/face/capture/device/update",
          method: "POST",
          data: {
            appId: window.localStorage.getItem("appid"),
            latitude: this.equipmentParameter.lt,
            longitude: this.equipmentParameter.lg,
            name: this.equipmentParameter.name,
            serial: this.equipmentParameter.serial,
            id: this.mId,
          },
        },
        (res) => {
          if (res.code == 200) {
            this.$message.success("编辑设备成功");
            this.userInfoList = false;
            this.getEquipmentList();
          }
          console.log(res, "编辑");
        }
      );
    },
    deleteFacility(row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((row) => {
          this.utils.http(
            {
              url: "/capture/face/capture/device/delete",
              method: "POST",
              params: {
                deviceId: id,
              },
            },
            (res) => {
              if (res.code == 200) {
                this.$message.success("删除设备成功");
                this.getEquipmentList();
              } else {
                this.$message.error(res.data.msg);
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