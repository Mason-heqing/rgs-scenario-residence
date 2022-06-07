"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dialog = _interopRequireDefault(require("../../../../components/dialog.vue"));

var _table = _interopRequireDefault(require("../../../../components/table.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  name: 'home',
  data: function data() {
    return {
      value: true,
      textVal: '',
      isEdit: true,
      //编辑状态
      isFocus: false,
      //编辑时聚焦
      formData: {},
      //
      editForm: {
        appId: '',
        modelName: '',
        //repairs、complaints、bill、audit、tips
        remark: '',
        //提示信息
        status: '' //服务是否开启1开启0未开启；物业审核1需要0不需要

      },
      loading: false,
      checkStatusOption: [{
        value: 0,
        label: '不需要物业审核'
      }, {
        value: 1,
        label: '需要物业审核'
      }, {
        value: 2,
        label: '超过5人需要物业审核'
      }, {
        value: 3,
        label: '超过10人需要物业审核'
      }, {
        value: 4,
        label: '超过15人需要物业审核'
      }, {
        value: 5,
        label: '超过20人需要物业审核'
      }],
      checkStatus: 0,
      chenkStatusPop: false,
      nice: 0,
      isRequest: false,
      //是否在提交
      isChangeTiping: false
    };
  },
  filters: {},
  created: function created() {},
  components: {
    MsgBox: _dialog["default"],
    TableCmp: _table["default"]
  },
  computed: {
    appId: {
      get: function get() {
        return this.$store.state.project.projectId;
      },
      set: function set(v) {
        this.$store.commit('changeProjectId', v);
      }
    }
  },
  watch: {
    appId: function appId(newFlag, oldFlag) {
      this.appId = newFlag;
      this.editForm.appId = newFlag;
      this.getService();
    }
  },
  mounted: function mounted() {
    if (this.appId) {
      this.editForm.appId = this.appId;
      this.getService();
    }
  },
  methods: {
    //编辑初始化
    getService: function getService() {
      var _this = this;

      this.loading = true;
      this.utils.http({
        url: "/base/model/setting/find/" + this.appId,
        method: "GET",
        params: {}
      }, function (res) {
        _this.loading = false;

        if (res.code == 200) {
          if (!res.data.tips) {
            res.data.tips = '为保障本小区的住户都能享受高品质的服务，请务必填写正确信息，以便快速审核；物业可自行编辑修改提示内容，最大支持100字';
          }

          _this.formData = res.data;
        }
      });
    },
    //点击提示时的编辑
    edit: function edit() {
      var _this2 = this;

      this.isEdit = false;
      this.$nextTick(function () {
        //聚焦
        _this2.$refs.textData.focus();
      });
    },
    finish: function finish() {
      this.isChangeTiping = true;
      this.editForm.modelName = 'tips';
      this.editForm.status = '';
      this.editForm.remark = this.formData.tips;
      this.editStatus('tips');
    },
    //开关变化
    changeStatus: function changeStatus(e, modelName) {
      e ? this.editForm.status = 1 : this.editForm.status = 0;
      this.editForm.modelName = modelName;
      delete this.editForm.remark;
      this.editStatus();
    },
    //修改状态
    editStatus: function editStatus(type) {
      var _this3 = this;

      this.utils.http({
        url: "/base/model/setting/operation",
        method: "POST",
        data: this.editForm
      }, function (res) {
        _this3.isChangeTiping = false;
        _this3.isRequest = false;

        if (res.code == 200) {
          _this3.getService();

          if (type == 'tips') {
            _this3.isEdit = true;
          }

          ;

          if (type == 'audit') {
            _this3.chenkStatusPop = false;
          }
        }
      });
    },
    editCheckStatus: function editCheckStatus() {
      this.checkStatus = this.formData.audit;
      this.chenkStatusPop = true;
    },
    sendCheckStatus: function sendCheckStatus() {
      this.isRequest = true;
      this.editForm.status = this.checkStatus;
      this.editForm.modelName = 'audit';
      delete this.editForm.remark;
      this.editStatus('audit');
    }
  }
};
exports["default"] = _default;