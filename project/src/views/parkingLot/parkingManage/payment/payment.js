import echarts from 'echarts'
import position from '../../../../utils/position.js';
import ligature from '../../../../utils/ligature.js';
export default {
  name: 'home',
  data() {
    const validateAcquaintance = (rule, value, callback) => {
      if (value < 0.3 || value > 0.8) {
        callback(new Error('费率设置范围：0.3%～0.8%'))
      } else {
        callback()
      }
    }
    let validatePhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!value) {
        return callback(new Error('请填写手机号码！'))
      } else if (!reg.test(value)) {
        return callback(new Error('请填写正确的手机号码！'))
      } else {
        callback()
      }
    };
    let validateIdNo = (rule, value, callback) => {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!value) {
        return callback(new Error('证件号码不能为空'))
      } else if (!reg.test(value)) {
        return callback(new Error('证件号码不正确'))
      } else {
        callback()
      }
    }
    return {
      msg: '商户管理',
      isAudit: false,//是否展示审核信息
      dialogPassExamine: false,//是否弹出审核提交按钮
      dialogRefuse: false,//是否弹出拒绝审核提交按钮
      isShowExample: false,//是否展示身份证上传示例
      isShowExampleLicense: false,//是否展示营业执照上传示例
      isShowExampleAccount: false,//是否展示开户许可证上传示例
      isShowExampleBank: false,//是否展示银行卡上传示例
      isReject:false,//是否展示拒绝理由
      rejectContent:'',//拒绝内容
      applyNum: '',//申请编号
      parkingLot: '',//停车场名称
      images1: [],//法人正面照片
      images2: [],//法人反面照片
      images3: [],//营业执照照片
      images4: [],//组织机构代码证
      images5: [],//开户许可证照片
      images6: [],//车场入口照
      // images7:[],//车场入口照
      images8: [],//岗亭照片
      images9: [],//车场场内照片
      // images10:[],//税务登记证照片
      images11: [],//税务登记证照片
      images12: [],//非法人证明照
      images13: [],//本人手持身份证照片
      images14: [],//非法人身份证照片 正面
      images15: [],//非法人身份证照片 反面
      images16: [],//银行卡正面照 对私
      imgurl: '',
      uploadData: [
        {
          flagName: "createMch01" //法人正面照片
        },
        {
          flagName: "createMch02" //法人反面照片
        },
        {
          flagName: "createMch03" //营业执照照片
        },
        {
          flagName: "createMch04" //组织机构代码证
        },
        {
          flagName: "createMch05" //开户许可证照片
        },
        {
          flagName: "createMch06" //车场入口照
        },
        {
          flagName: "createMch08" //岗亭照片
        },
        {
          flagName: "createMch09" //车场场内照片
        },
        {
          flagName: "createMch11" //税务登记证照片
        },
        {
          flagName: "createMch12" //非法人证明照
        },
        {
          flagName: "createMch13" //本人手持身份证照片
        },
        {
          flagName: "createMch14" //非法人身份证照片 正面
        },
        {
          flagName: "createMch15" //非法人身份证照片 反面
        },
        {
          flagName: "createMch16" //银行卡正面照 对私
        }
      ],
      rules: {
        mchName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' },
          { max: 48, message: '商户名称长度不能超过48个字符', trigger: 'blur' }
        ],
        mchAbbreviation: [
          { required: true, message: '请输入商户简称', trigger: 'blur' },
          { max: 48, message: '商户简称长度不能超过48个字符', trigger: 'blur' }
        ],
        mchType: [
          { required: true, message: '请选择商户类型', trigger: 'change' },
        ],
        createMchThreeFlag: [
          { required: true, message: '请选择是否三证合一', trigger: 'change' },
        ],
        createMchLegalIdNum: [
          { validator: validateIdNo, trigger: 'blur' },
          { required: true, message: '请输入法人身份证号', trigger: 'blur' },
          { max: 18, message: '身份证件长度不能超过18个字符', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入公司全称', trigger: 'blur' },
          { max: 48, message: '公司全称长度不能超过48个字符', trigger: 'blur' }
        ],
        createMchLegalPerson: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' },
          { max: 48, message: '法人姓名长度不能超过48个字符', trigger: 'blur' }
        ],
        createMchBussAuthNum: [
          { required: true, message: '请输入营业执照工商注册号', trigger: 'blur' },
          { max: 48, message: '营业执照工商注册号长度不能超过48个字符', trigger: 'blur' }
        ],
        createMchLegalIdNumExpire: [
          { required: true, message: '请选择有效期开始日期', trigger: 'change' },
        ],
        createMchLegalIdNumTerm: [
          { required: true, message: '请选择有效期', trigger: 'change' },
        ],
        // naturalPersonIdcard:[
        //   { required: true, message: '请输入身份证号', trigger: 'blur' },
        // ],
        // naturalPersonName:[
        //   { required: true, message: '请输入姓名', trigger: 'blur' },
        // ],
        // naturalPersonPhone:[
        //   { required: true, message: '请输入手机号', trigger: 'blur' },
        //   { type: 'number', message: '请输入正确的手机号'}
        // ],
        createMchLicenseExpireStart: [
          { required: true, message: '请选择有效开始时间', trigger: 'change' },
        ],
        createMchMerchantIdExpire: [
          { required: true, message: '请选择有效期', trigger: 'change' },
        ],
        createMchLegalIdMobile: [
          { validator: validatePhone, trigger: 'blur' },
          { required: true, message: '请输入法人手机号', trigger: 'blur' },
          { max: 11, message: '手机号长度不能超过48个字符', trigger: 'blur' }
          // { type: 'number', message: '请输入正确的法人手机号'}
        ],
        createMchLicenseAddress: [
          { required: true, message: '请输入营业执照注册地址', trigger: 'blur' },
        ],
        accountType: [
          { required: true, message: '请选择账户类型', trigger: 'change' },
        ],
        createMchSettlementType: [
          { required: true, message: '请选择结算类型', trigger: 'change' },
        ],
        createMchBankCardNo: [
          { required: true, message: '请输入银行账号', trigger: 'blur' },

        ],
        createMchCompanyName: [
          { required: true, message: '请输入对公开户名', trigger: 'blur' },
          { max: 48, message: '对公开户名长度不能超过48个字符', trigger: 'blur' }
        ],
        createMchBankCertName: [
          { required: true, message: '请输入开户名', trigger: 'blur' },
          { max: 48, message: '开户名长度不能超过48个字符', trigger: 'blur' }
        ],
        createMchBranchAddress: [
          { required: true, message: '请选择开户行所在地区', trigger: 'change' },
        ],
        createMchBankName: [
          { required: true, message: '请输入开户银行', trigger: 'blur' },
        ],
        createMchBranchName: [
          { required: true, message: '请选择支行名称', trigger: 'change' },
        ],
        createMchContactLine: [
          { required: true, message: '请输入联行号', trigger: 'blur' },
        ],
        createMchAccountPhone: [
          { validator: validatePhone, trigger: 'blur' },
          { required: true, message: '请输入银行预留手机号', trigger: 'blur' },
          { max: 11, message: '手机号长度不能超过48个字符', trigger: 'blur' }
        ],
        createMchCertNo: [
          { validator: validateIdNo, trigger: 'blur' },
          { required: true, message: '请输入非法人身份证号', trigger: 'blur' },
          { max: 18, message: '身份证号长度不能超过48个字符', trigger: 'blur' }
        ],
        createMchlegalIdNumExpireStart: [
          { required: true, message: '请选择日期', trigger: 'change' },
        ],
        createMchlegalIdNumExpireExpire: [
          { required: true, message: '请选择有效期', trigger: 'change' },
        ],
        createMchFee: [
          { required: true, message: '请输入费率', trigger: 'blur' },
          { validator: validateAcquaintance, trigger: 'blur' }
        ],
        createMch01: [
          { required: true, message: '请上传正面照片', trigger: 'change' },
        ],
        createMch02: [
          { required: true, message: '请上传反面照片', trigger: 'change' },
        ],
        createMch03: [
          { required: true, message: '请上传营业执照照片', trigger: 'change' },
        ],
        createMch04: [
          { required: true, message: '请上传组织机构代码证', trigger: 'change' },
        ],
        createMch05: [
          { required: true, message: '请上传开户许可证照片', trigger: 'change' },
        ],
        createMch06: [
          { required: true, message: '请上传车场入口照片', trigger: 'change' },
        ],
        createMch08: [
          { required: true, message: '请上传岗亭照片', trigger: 'change' },
        ],
        createMch09: [
          { required: true, message: '请上传车场场内照片', trigger: 'change' },
        ],
        createMch11: [
          { required: true, message: '请上传税务登记证照片', trigger: 'change' },
        ],
        createMch12: [
          { required: true, message: '请上传非法人证明照', trigger: 'change' },
        ],
        createMch13: [
          { required: true, message: '请上传本人手持身份证照片', trigger: 'change' },
        ],
        createMch14: [
          { required: true, message: '请上传非法人身份证正面照片', trigger: 'change' },
        ],
        createMch15: [
          { required: true, message: '请上传非法人身份证反面照片', trigger: 'change' },
        ],
        createMch16: [
          { required: true, message: '请上传银行卡正面照片', trigger: 'change' },
        ],
        // provId: [
        //   { required: true, message: '请选择省份', trigger: 'change' },
        // ],
        // cityId: [
        //   { required: true, message: '请选择城市', trigger: 'change' },
        // ],
        // areaId: [
        //   { required: true, message: '请选择区', trigger: 'change' },
        // ],
      },
      rulesFormExamine: {//审核表单校验
        name: [
          { required: true, message: '请输入支付渠道名称', trigger: 'blur' },
          { max: 48, message: '支付渠道名称长度不能超过48个字符', trigger: 'blur' }
        ],
        mchId: [
          { required: true, message: '请输入商户id', trigger: 'blur' },
        ],
        payChannelParkId: [
          { required: true, message: '请输入支付渠道车场Id', trigger: 'blur' },
        ],
      },
      rulesFormRefuse: {
        refuseCause: [
          { required: true, message: '请填写拒绝原因', trigger: 'blur' },
        ]
      },
      formExamine: { //通过审核提交信息
        mchId: '',//商户Id
        name: '',//支付渠道名称
        payChannelId: '',//当前支付渠道Id
        payChannelParkId: '',//
        payStatus: '',//支付渠道车场Id,第三方支付生成
        payStatus: '',//0、待开通 1：待审核，2：审核通过， 3、拒绝审核 4、禁用
      },
      formRefuse: {//拒绝审核提交信息
        payChannelId: '',//支渠道Id
        payStatus: '',//0、待开通 1：待审核，2：审核通过， 3、拒绝审核 4、禁用
        refuseCause: '',//拒绝原因
      },
      dialogImageUrl: '',//身份证照片
      dialogVisible: false,
      disabled: false,
      imageUrl: '',
      addPop: true,
      groupName: '',//添加设备分组
      startTime: null,

      addForm: {
        parkId: '',
        currPayChannelId: '',//当前车场Id
        mchName: '',//商户名称
        mchAbbreviation: '',//商户简称
        mchType: '',//商户类型
        createMchThreeFlag: '',//是否三证合一
        createMchLegalIdNum: '',//法人身份证号
        companyName: '',//公司全称
        createMchLegalPerson: '',//法人姓名
        createMchBussAuthNum: '',//营业执照工商注册号
        createMchLegalIdNumExpire: '',//身份证开始时间
        createMchLegalIdNumTerm: '',//身份证有效期
        // naturalPersonIdcard:'',//身份证号
        // naturalPersonName:'',//姓名
        // naturalPersonPhone:'',//手机号
        createMchLicenseExpireStart: '',//营业执照开始时间
        createMchMerchantIdExpire: '',//营业执照有效期限
        createMchLegalIdMobile: '',//法人手机号
        createMchLicenseAddress: '',//营业执照注册地址
        createMchAccountType: '',//账户类型
        createMchSettlementType: '',//结算类型
        createMchBankCardNo: '',//银行账号
        createMchCompanyName: '',//对公开户名
        createMchBankCertName: '',//开户名
        createMchBranchAddress: '',//开户行所在地区
        createMchBankName: '',//开户银行
        createMchBranchName: '',//支行名称
        createMchContactLine: '',//联行号
        createMchAccountPhone: '',//预留手机号
        createMchCertNo: '',//非法人身份证号
        createMchlegalIdNumExpireStart: '',//非法人身份证有效期
        createMchlegalIdNumExpireExpire: '',//非法人身份证有效年限
        createMchFee: 0.6,//费率
        createMch01: '',//法人身份证正面照
        createMch02: '',//法人身份证反面照
        createMch03: '',//营业执照照片
        createMch04: '',//组织机构代码证
        createMch05: '',//开户许可证照片
        createMch06: '',//车场入口照
        createMch08: '',//岗亭照片
        createMch09: '',//车场场内照片
        createMch11: '',//税务登记证照片
        createMch12: '',//非法人证明照
        createMch13: '',//本人手持身份证照片
        createMch14: '',//非法人身份证照片 正面
        createMch15: '',//非法人身份证照片 反面
        createMch16: '',//银行卡正面照 对私
      },
      isNonNaturalPerson: true,//非自然人权限（企业商户，个体工商户）--商户类型
      isNaturalPerson: false,//自然人权限 --商户类型
      isThreeSyndromesInOne: false,//是否三证合一
      isaccountType: false,//账户类型
      isSettlementType: false,//是否展示结算类型
      isBankCard: false,//是否展示银行卡正反面照
      isShowOpenPermitCard: true,//是否展示开户许可证
      isShowopenAccountName: true,//是否展示对公开户名
      isShowAccountName: false,//是否展示开户名
      isUnincorporateType: false,//是否展示非法人类型权限
      isSubmit: true,//是否显示提交按钮
      mchType: [{ name: '企业商户', id: '1' }, { name: '个体工商户', id: '2' }, { name: '自然人', id: '3' }],
      countryOption: [{ name: '中国', id: '中国' }, { name: '海外', id: '海外' }],
      createMchThreeFlag: [{ name: '是', id: '1' }, { name: '否', id: '2' }],
      createMchAccountType: [{ name: '对公', id: '1' }, { name: '对私', id: '2' }],
      createMchSettlementType: [{ name: "法人结算", id: '1' }, { name: '非法人结算', id: '2' }],
      createMchBranchName: [{ name: '企业商户', id: '1' }, { name: '个体工商户', id: '2' }, { name: '自然人', id: '3' }],
      createMchlegalIdNumExpireExpire: [{ name: '五年', id: '1' }, { name: '十年', id: '2' }, { name: '二十年', id: '3' }, { name: '长期', id: '4' }],
      createMchMerchantIdExpire: [
        { name: '1年', id: '1' },
        { name: '2年', id: '2' },
        { name: '3年', id: '3' },
        { name: '4年', id: '4' },
        { name: '5年', id: '5' },
        { name: '6年', id: '6' },
        { name: '7年', id: '7' },
        { name: '8年', id: '8' },
        { name: '9年', id: '9' },
        { name: '10年', id: '10' },
        { name: '20年', id: '11' },
        { name: '30年', id: '12' },
        { name: '40年', id: '13' },
        { name: '50年', id: '14' },
        { name: '60年', id: '15' },
        { name: '70年', id: '16' },
        { name: '长期', id: '17' },
      ],
      createMchLegalIdNumTerm: [
        { name: '5年', id: '1' },
        { name: '10年', id: '2' },
        { name: '20年', id: '3' },
        { name: '长期', id: '4' },

      ],
      payChannelListData: [],
      howText: '',
      isChina: true,
      position: [],
      prov: [],//省市数据
      city: [],//城市
      area: [],//区
      isRequst: false
    }
  },
  watch: {

  },
  filters: {

  },
  created() {
    this.imgurl = this.tools.global.API_URL;
    this.position = position;
    this.getProv();
    // this.getpayChannelListData();
    if (this.$route.query.type == 2) {
      this.isAudit = true;
    } else {
      this.isAudit = false;
    }
  },
  mounted() {
    console.log("获取车场信息-----》", JSON.parse(this.utils.getStore('seeApply')));
    this.addForm.currPayChannelId = JSON.parse(this.utils.getStore('seeApply')).currPayChannelId.toString();
    this.addForm.parkId = JSON.parse(this.utils.getStore('seeApply')).id.toString();
    this.formRefuse.payChannelId = JSON.parse(this.utils.getStore('seeApply')).currPayChannelId.toString();
    this.formRefuse.currPayChannelId = JSON.parse(this.utils.getStore('seeApply')).currPayChannelId.toString();
    if (this.$route.query.type == 2) {//编辑
      if (2 === JSON.parse(this.utils.getStore('seeApply')).payStatus || 3 === JSON.parse(this.utils.getStore('seeApply')).payStatus || 4 === JSON.parse(this.utils.getStore('seeApply')).payStatus) {
        this.isAudit = false;
      }
      if(3 === JSON.parse(this.utils.getStore('seeApply')).payStatus){
          this.isReject = true;
      }
      this.howText = '更新';
      this.isSubmit = false;
      this.seeApplyInfo();
    } else if (this.$route.query.type == 3) {
      if (2 === JSON.parse(this.utils.getStore('seeApply')).payStatus || 3 === JSON.parse(this.utils.getStore('seeApply')).payStatus || 4 === JSON.parse(this.utils.getStore('seeApply')).payStatus) {
        this.isAudit = false;
      }
      this.addForm.currPayChannelId = JSON.parse(this.utils.getStore('seeApply')).currPayChannelId.toString();
      this.howText = '更新';
      this.isSubmit = true;
      this.seeApplyInfo();
    } else {
      this.howText = '添加';
      this.isSubmit = true;
    }
    //省市

  },
  methods: {

    //上传之前
    beforeAvatarUpload(file) {
      let types = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'];
      const isImage = types.includes(file.type);
      const isLtSize = file.size / 1024 / 1024 < 5;
      console.log("图片上传---》", file, file.size)
      if (!isImage) {
        this.$message.error('格式不支持');
        return false
      }
      if (!isLtSize) {
        this.$message.error('上传图片大小不能超过 5MB!');
        return false
      }
    },
    //上传成功
    successCheck(response, file, fileList) {
      console.log(response);
      if (response.code == 200) {
        if (response.data) {
          if (response.data.flagName && 'createMch01' == response.data.flagName) {
            this.images1 = [];
            this.images1.push(response.data)
            this.addForm.createMch01 = response.data.filePath;
          } else if (response.data.flagName && 'createMch02' == response.data.flagName) {
            this.images2 = [];
            this.images2.push(response.data)
            this.addForm.createMch02 = response.data.filePath;
          } else if (response.data.flagName && 'createMch03' == response.data.flagName) {
            this.images3 = [];
            this.images3.push(response.data)
            this.addForm.createMch03 = response.data.filePath;
          } else if (response.data.flagName && 'createMch04' == response.data.flagName) {
            this.images4 = [];
            this.images4.push(response.data)
            this.addForm.createMch04 = response.data.filePath;
          } else if (response.data.flagName && 'createMch05' == response.data.flagName) {
            this.images5 = [];
            this.images5.push(response.data)
            this.addForm.createMch05 = response.data.filePath;
          } else if (response.data.flagName && 'createMch06' == response.data.flagName) {
            this.images6 = [];
            this.images6.push(response.data)
            this.addForm.createMch06 = response.data.filePath;
          } else if (response.data.flagName && 'createMch08' == response.data.flagName) {
            this.images8 = [];
            this.images8.push(response.data)
            this.addForm.createMch08 = response.data.filePath;
          } else if (response.data.flagName && 'createMch09' == response.data.flagName) {
            this.images9 = [];
            this.images9.push(response.data)
            this.addForm.createMch09 = response.data.filePath;
          } else if (response.data.flagName && 'createMch11' == response.data.flagName) {
            this.images11 = [];
            this.images11.push(response.data)
            this.addForm.createMch11 = response.data.filePath;
          } else if (response.data.flagName && 'createMch12' == response.data.flagName) {
            this.images12 = [];
            this.images12.push(response.data)
            this.addForm.createMch12 = response.data.filePath;
          } else if (response.data.flagName && 'createMch13' == response.data.flagName) {
            this.images13 = [];
            this.images13.push(response.data)
            this.addForm.createMch13 = response.data.filePath;
          } else if (response.data.flagName && 'createMch14' == response.data.flagName) {
            this.images14 = [];
            this.images14.push(response.data)
            this.addForm.createMch14 = response.data.filePath;
          } else if (response.data.flagName && 'createMch15' == response.data.flagName) {
            this.images15 = [];
            this.images15.push(response.data)
            this.addForm.createMch15 = response.data.filePath;
          } else if (response.data.flagName && 'createMch16' == response.data.flagName) {
            this.images16 = [];
            this.images16.push(response.data)
            this.addForm.createMch16 = response.data.filePath;
          }
        }
        // this.images = [];
        // if (this.images.length < 1) {
        //     this.images.push(response.data)
        //     // response.data.forEach((item,index)=>{
        //     //   this.images.push(item)
        //     // })
        //     console.log(this.images);
        // } else {
        //     this.utils.tip("warning", '文件个数超出');
        // }
      } else {
        this.utils.tip("warning", response.msg);
      }
    },
    uploadErr(err, file, fileList) {
      this.$message.error('上传失败');
    },
    //删除图片
    remove(e) {
      console.log(e);
      // this.images.splice(index, 1);
      // let arr = new Array(16);
      // let i = parseInt(e.flagName.substring(9));
      // var j = "images" + i;
      // this.j = [];
      if ("createMch01" == e.flagName) {
        this.addForm.createMch01 = '';
        this.images1 = [];
      } else if ("createMch02" == e.flagName) {
        this.addForm.createMch02 = '';
        this.images2 = [];
      } else if ("createMch03" == e.flagName) {
        this.addForm.createMch03 = '';
        this.images3 = [];
      } else if ("createMch04" == e.flagName) {
        this.addForm.createMch04 = '';
        this.images4 = [];
      } else if ("createMch05" == e.flagName) {
        this.addForm.createMch05 = '';
        this.images5 = [];
      } else if ("createMch06" == e.flagName) {
        this.addForm.createMch06 = '';
        this.addForm.createMch06 = '';
        this.images6 = [];
      } else if ("createMch08" == e.flagName) {
        this.addForm.createMch08 = '';
        this.images8 = [];
      } else if ("createMch09" == e.flagName) {
        this.addForm.createMch09 = '';
        this.images9 = [];
      } else if ("createMch11" == e.flagName) {
        this.addForm.createMch11 = '';
        this.images11 = [];
      } else if ("createMch12" == e.flagName) {
        this.addForm.createMch12 = '';
        this.images12 = [];
      } else if ("createMch13" == e.flagName) {
        this.addForm.createMch13 = '';
        this.images13 = [];
      } else if ("createMch14" == e.flagName) {
        this.addForm.createMch14 = '';
        this.images14 = [];
      } else if ("createMch15" == e.flagName) {
        this.addForm.createMch15 = '';
        this.images15 = [];
      } else if ("createMch16" == e.flagName) {
        this.addForm.createMch16 = '';
        this.images16 = [];
      }
    },

    //监听上传图片的变化
    uploadchange(file, fileList) {
      console.log("file---->", file);
      console.log("fileList---->", fileList);
    },


    //添加
    addBtn(fromMsg) {
      if (this.addForm.status) {
        this.addForm.status = '2';
      } else {
        this.addForm.status = '1';
      }
      if (JSON.parse(this.utils.getStore('seeApply')).currPayChannelId.toString() && '' != JSON.parse(this.utils.getStore('seeApply')).currPayChannelId.toString()) {
        this.addForm.currPayChannelId = JSON.parse(this.utils.getStore('seeApply')).currPayChannelId.toString();
      }

      this.$refs[fromMsg].validate((valid) => {
        if (valid) {
          this.isRequst = true;
          this.utils.http({
            url: "/park/openYzPay",
            method: "POST",
            data: this.addForm
          },
            res => {
              this.isRequst = false;
              if (res.code == 200) {
                ligature.$emit("addProject", true);
                this.$router.push({
                  path: '/parkManager'
                })
              };

            });
        }
      })
    },

    //商户类型切换
    merchantTypeChange(e) {
      if ("3" === e) {
        this.isNonNaturalPerson = false;
        this.isNaturalPerson = true;
        this.isShowOpenPermitCard = false;
        this.isBankCard = true;
        this.isShowopenAccountName = false;
        this.isSettlementType = false;
      } else {
        this.isNonNaturalPerson = true;
        this.isNaturalPerson = false;
        this.isShowOpenPermitCard = true;
        this.isBankCard = false;

        if ("2" === e && "2" === this.addForm.createMchAccountType) {
          this.isShowopenAccountName = false;
        } else {
          this.isShowopenAccountName = true;
        }
      }
    },

    //是否三证合一
    isCertificatesChange(e) {
      if ("1" === e) {
        this.isThreeSyndromesInOne = false;
      } else {
        this.isThreeSyndromesInOne = true;
      }
    },

    //账户类型切换
    accountTypeChange(e) {
      console.log(this.addForm.merchantType)
      if ("1" === e) {
        this.isShowOpenPermitCard = true;
        this.isSettlementType = false;
        this.isBankCard = false;
        this.isShowopenAccountName = true;
      } else {
        this.isSettlementType = true;
        this.isBankCard = true;
        if ("2" === this.addForm.merchantType) {
          this.isShowopenAccountName = false;
          this.isShowOpenPermitCard = false;
        } else {
          this.isShowopenAccountName = true;
          this.isShowOpenPermitCard = true;
        }
      }
    },

    //结算类型
    settlementTypeChange(e) {
      if ('2' === e) {
        this.isUnincorporateType = true;
        this.isShowopenAccountName = false
      } else {
        this.isUnincorporateType = false;
        this.isShowopenAccountName = true;
      }
    },



    //获取省份/area/areas
    getProv(id, type) {
      var areaId
      id ? areaId = id : '';
      this.utils.http({
        url: "/area/areas",
        method: "GET",
        params: { id: areaId }
      }, res => {
        if (type == 1) {
          this.city = res.data;
        } else if (type == 2) {
          this.area = res.data;
        } else {
          this.prov = res.data;
        }

      })
    },

    //省份改变
    changeProv(e) {
      let obj = {};
      obj = this.prov.find((item) => {
        return item.id == e;
      });
      this.addForm.province = obj.name;
      this.getProv(e, 1);
      this.addForm.cityId = '';
      this.addForm.areaId = '';
    },
    //城市改变
    changeCity(e) {
      let obj = {};
      obj = this.city.find((item) => {
        return item.id == e;
      });
      this.addForm.city = obj.name;
      this.getProv(e, 2)
      this.addForm.areaId = '';
    },
    //区改变
    changeArea(e) {
      let obj = {};
      obj = this.area.find((item) => {
        return item.id === e;
      });
      this.addForm.area = obj.name;
    },

    //获取支付渠道
    getpayChannelListData() {
      this.utils.http({
        url: "/app/user/payChannelList",
        method: "GET",
        // params: {appId:this.appId}
        // params: {appId:nice}
      },
        res => {
          if (res.code == 200) {
            this.realTimeList = res.data;
            if (0 < res.data.length) {
              this.payChannelListData = res.data
            }
          }

        });
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },


    //查看申请信息
    seeApplyInfo() {
      //  alert(this.addForm.parkId)
      this.utils.http({
        url: "/park/parkCurrPayChannel",
        method: "GET",
        // params: {appId:this.appId}
        params: { currPayChannelId: this.addForm.currPayChannelId }
      },
        res => {
          if (res.code == 200 && res.data) {
            console.log("获取查询数据----》", JSON.parse(res.data.mchData))
            let formInfo = JSON.parse(res.data.mchData)
            let id = res.data.id
            // console.log("返回数据------》",this.imgurl +"/file/download?path="+ formInfo.createMch01)
            if(res.data.refuseCause){
              this.rejectContent = res.data.refuseCause
            }
            if ("" != id) {
              this.formExamine.payChannelId = id;
            }
            // console.log("获取查询数据----》",JSON.parse(res.data.mchData))
            if ("" != formInfo.createMchBranchAddress) {
              formInfo.createMchBranchAddress = JSON.parse(formInfo.createMchBranchAddress);
            }
            if ("" != formInfo.createMch01) {
              let json = {};
              this.images1 = [];
              json.filePath = formInfo.createMch01;
              json.flagName = "createMch01";
              this.images1.push(json)
            }
            if ("" != formInfo.createMch02) {
              let json = {};
              this.images2 = [];
              json.filePath = formInfo.createMch02;
              json.flagName = "createMch02";
              this.images2.push(json)
            }
            if ("" != formInfo.createMch03) {
              let json = {};
              this.images3 = [];
              json.filePath = formInfo.createMch03;
              json.flagName = "createMch03";
              this.images3.push(json)
            }
            if ("" != formInfo.createMch04) {
              let json = {};
              this.images4 = [];
              json.filePath = formInfo.createMch04;
              json.flagName = "createMch04";
              this.images4.push(json)
            }
            if ("" != formInfo.createMch05) {
              let json = {};
              this.images5 = [];
              json.filePath = formInfo.createMch05;
              json.flagName = "createMch05";
              this.images5.push(json)
            }
            if ("" != formInfo.createMch06) {
              let json = {};
              this.images6 = [];
              json.filePath = formInfo.createMch06;
              json.flagName = "createMch04";
              this.images6.push(json)
            }
            if ("" != formInfo.createMch08) {
              let json = {};
              this.images8 = [];
              json.filePath = formInfo.createMch08;
              json.flagName = "createMch08";
              this.images8.push(json)
            }
            if ("" != formInfo.createMch09) {
              let json = {};
              this.images9 = [];
              json.filePath = formInfo.createMch09;
              json.flagName = "createMch09";
              this.images9.push(json)
            }
            if ("" != formInfo.createMch11) {
              let json = {};
              this.images11 = [];
              json.filePath = formInfo.createMch11;
              json.flagName = "createMch11";
              this.images11.push(json)
            }
            if ("" != formInfo.createMch12) {
              let json = {};
              this.images12 = [];
              json.filePath = formInfo.createMch12;
              json.flagName = "createMch12";
              this.images12.push(json)
            }
            if ("" != formInfo.createMch13) {
              let json = {};
              this.images13 = [];
              json.filePath = formInfo.createMch13;
              json.flagName = "createMch13";
              this.images13.push(json)
            }
            if ("" != formInfo.createMch14) {
              let json = {};
              this.images14 = [];
              json.filePath = formInfo.createMch14;
              json.flagName = "createMch14";
              this.images14.push(json)
            }
            if ("" != formInfo.createMch15) {
              let json = {};
              this.images15 = [];
              json.filePath = formInfo.createMch15;
              json.flagName = "createMch15";
              this.images15.push(json)
            }
            if ("" != formInfo.createMch16) {
              let json = {};
              this.image16 = [];
              json.filePath = formInfo.createMch16;
              json.flagName = "createMch16";
              this.images16.push(json)
            }
            if ('3' === formInfo.mchType) {
              this.isNonNaturalPerson = false;
              this.isNaturalPerson = true;
              this.isShowOpenPermitCard = false;
              this.isBankCard = true;
              this.isShowopenAccountName = false;
              this.isSettlementType = false;
            } else {
              this.isNonNaturalPerson = true;
              this.isNaturalPerson = false;
              this.isShowOpenPermitCard = true;
              this.isBankCard = false;
              if ("2" === formInfo.mchType && "2" === formInfo.createMchAccountType) {
                this.isShowopenAccountName = false;
              } else {
                this.isShowopenAccountName = true;
              }
            }
            if ("" != formInfo.createMchThreeFlag) {
              if ("1" === formInfo.createMchThreeFlag) {
                this.isThreeSyndromesInOne = false;
              } else {
                this.isThreeSyndromesInOne = true;
              }
            }
            if ("" != formInfo.createMchAccountType) {
              if("1" === formInfo.createMchAccountType){
                this.isShowOpenPermitCard = true;
                this.isSettlementType = false;
                this.isBankCard = false;
                this.isShowopenAccountName = true;
              }else{
                this.isSettlementType = true;
                this.isBankCard = true;
                if("2" === formInfo.merchantType){
                  this.isShowopenAccountName = false;
                  this.isShowOpenPermitCard = false;
                }else{
                  this.isShowopenAccountName = true;
                  this.isShowOpenPermitCard = true;
                }
              }
            }
            if("" != formInfo.createMchSettlementType){
              if ('2' === formInfo.createMchSettlementType) {
                this.isUnincorporateType = true;
                this.isShowopenAccountName = false
              } else {
                this.isUnincorporateType = false;
                this.isShowopenAccountName = true;
              }
            }
            


            this.addForm = formInfo;
          }

        });
    },

    //通过审核
    passExamine() {
      this.dialogPassExamine = true;
    },

    //拒绝审核
    refuseExamineBtn() {
      this.dialogRefuse = true;
    },

    //发送审核请求
    passCheckPayData(fromMsg) {
      this.formExamine.payStatus = '2';
      this.$refs[fromMsg].validate((valid) => {
        if (valid) {
          this.isRequst = true;
          this.utils.http({
            url: "/park/checkPayData",
            method: "POST",
            data: this.formExamine
          },
            res => {
              this.isRequst = false;
              if (res.code == 200) {
                this.$router.push({
                  path: '/parkManager',
                })
              };

            });
        }
      })
    },

    //发送拒绝请求
    refuseExamine(fromMsg) {
      this.formRefuse.payStatus = '3';
      this.$refs[fromMsg].validate((valid) => {
        if (valid) {
          this.isRequst = true;
          this.utils.http({
            url: "/park/checkPayData",
            method: "POST",
            data: this.formRefuse
          },
            res => {
              this.isRequst = false;
              if (res.code == 200) {
                this.$router.push({
                  path: '/parkManager',
                })
              };

            });
        }
      })
    },

    //鼠标移入事件（法人身份证）
    mouseOver() {
      this.isShowExample = true;
    },

    //鼠标移出事件（法人身份证）
    mouseLeave() {
      this.isShowExample = false;
    },

    //鼠标移入事件（营业执照）
    mouseOverLicense() {
      this.isShowExampleLicense = true;
    },

    //鼠标移出事件（营业执照）
    mouseLeaveLicense() {
      this.isShowExampleLicense = false;
    },

    //鼠标移入事件（开户许可证）
    mouseOverAccount() {
      this.isShowExampleAccount = true;
    },

    //鼠标移出事件（开户许可证）
    mouseLeaveAccount() {
      this.isShowExampleAccount = false;
    },

    //鼠标移入事件（银行卡）
    mouseOverBank() {
      this.isShowExampleBank = true;
    },

    //鼠标移出事件（银行卡）
    mouseLeaveBank() {
      this.isShowExampleBank = false;
    },

    //返回
    goBack() {
      this.$router.push({
        path: '/parkManager',
      })
    },


  },
}