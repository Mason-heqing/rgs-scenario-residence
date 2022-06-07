import MsgBox from '../../../components/dialog.vue'
import ExportBox from '../../../components/exportDialog.vue'
import AuthBox from '../../../components/authDialog.vue'
import TableCmp from '../../../components/table.vue'
export default {
    name: 'home',
    data() {
        return {
            msg: '通道规则',
            currentPage: 1,
            popVisible: false,//是否显示信息弹框
            popTitle: '这个是标题',
            popContent: '这个是内容',
            total: 0,
            tableData: [],
            multipleSelection: [],//表格选中
            timers:[],
            value: '',
            value1: '',
            payType: [
                {
                    label: '支付宝',
                    value: 'ALIPAY'
                },
                {
                    label: '微信',
                    value: 'WECHAT'
                },
                {
                    label: '其他',
                    value: 'OTHER'
                },
            ],
            currentFrequency:'',
            dataForm: {
                order:'desc',  //排序： asc--从大到小   desc---从小到大
                orderField:'', //排序字段：total_accout ---金额   avg_trade_num---笔数
                currentPage: 1,
                pageSize: 10,
                organizationId: '',//子渠道
                parkType: '',//车场业态
                statDateStart: '',//开始时间
                statDateEnd: '',//结束时间
                avgCountMin:null,//日均笔数最小值
                avgCountMax:null,//日均笔数最大值
            },
            channel: [],
            parkType: [
                {
                    value: 1,
                    label: '全部'
                },
                {
                    value: 2,
                    label: '住宅'
                },
                {
                    value: 3,
                    label: '办公'
                },
                {
                    value: 4,
                    label: '商业'
                }
            ],
            frequency: [{
                value: 1,
                label: '0~40'
            }, {
                value: 2,
                label: '41~80'
            }, {
                value: 3,
                label: '81~100'
            }, {
                value: 4,
                label: '100以上'
            }],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            defaultSoltSelect: "primary",
            paySoltSelect: "default",
            frequencySoltSelect: "default",
            tableLabel: [
                { label: '停车场', param: 'parkName', align: 'center', sortable: true, isshow: true},
                { label: '地区', param: 'address', align: 'center', sortable: true, isshow: true},
                { label: '车场业态', param: 'parkType', align: 'center', sortable: true, isshow: true,render(row) {
                    if ( 0 === row.parkType ) {
                        return  '住宅' 
                     } else if (1 === row.parkType) {
                       return '办公'
                     } else if (2 === row.parkType) {
                       return '商业'
                     } else if (3 === row.parkType){
                       return '商住'
                     }else if(5 === row.parkType){
                       return '文体 '
                     }else if(6 === row.parkType){
                       return '专用'
                     }else if(7 === row.parkType){
                       return '货运 '
                     }else if(8 === row.parkType){
                       return '交通枢纽'
                     }else if(9 === row.parkType){
                       return '其它'
                     }
                },},
                { label: '支付总金额（元）', param: 'totalAccout', align: 'center', sortable: true, isshow: true,render(h) {
                    return h.totalAccout/100
                },},
                { label: '支付总笔数', param: 'totalAmount', align: 'center', isshow: false, sortable: true},
                { label: '日均笔数', param: 'tradeNum', align: 'center', sortable: true, isshow: true },
                // { slot: 'operate', isshow: true }, // 操作列
            ],
            listData: [],//表格数据
            tableOption: [],
            tableSelect: [],
            isShowSelect: true,
            loading: false,
            imgurl: '',
            outChecked: false,
            timer: null
        }
    },
    filters: {

    },
    created() {
        for (let i = 0; i < this.tableLabel.length; i++) {
            if (this.tableLabel[i].label) {
                this.tableOption.push(this.tableLabel[i].label)
            }
            if (this.tableLabel[i].isshow) {
                this.tableSelect.push(this.tableLabel[i].label)
            }

        }
        this.imgurl = this.tools.global.API_URL;
        this.getTimeFn();
    },
    computed: {
    },
    watch: {
    },
    components: {
        MsgBox,
        ExportBox,
        AuthBox,
        TableCmp
    },
    filters: {
        clTime: function (time) {
            return time.split(" ")[0];
        }
    },
    mounted() {
        this.getpayChannelListData();
        this.getTableData();
    },
    methods: {

        // 设置默认时间
        getTimeFn() {
            const that = this;
            let end = new Date();
            let start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            that.timers[0] = this.formatDate(start);
            that.timers[1] = this.formatDate(end);
            console.log(that.timers);
            that.dataForm.statDateStart = this.formatDate(start).replace(/-/g,"");
            that.dataForm.statDateEnd = this.formatDate(end).replace(/-/g,"");
        },

        /**
         * 格式化时间
        */
        formatDate(date) {
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();

            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            return myyear + "-" + mymonth + "-" + myweekday;
        },

        //更改时间
        changeTime(e){
            console.log(e);
            if (this.timers !== null && this.timers.length > 0) {
                this.dataForm.statDateStart = this.timers[0].replace(/-/g,"");
                this.dataForm.statDateEnd = this.timers[1].replace(/-/g,"");
              } else {
                this.dataForm.statDateStart  = "";
                this.dataForm.statDateEnd  = "";
                this.timers = [];
              }
        },

        //获取表格数据
        getTableData() {
            if(0 == this.timers.length){
                this.$message.error('开始时间与结束时间不能为空！');
            }else{
                this.loading = true;
                this.utils.http({
                    url: "/park/order/statPage",
                    method: "GET",
                    params: this.dataForm
                },
                    res => {
                        if (res.code == 200) {
                            this.total = res.data.total
                            this.listData = res.data.records;
                            this.currentPage = res.data.current;
                        }
                        this.loading = false;
                    });
            }
        },
        //默认排序
        defaultSolt() {
            this.defaultSoltSelect = "primary";
            this.paySoltSelect = "default";
            this.frequencySoltSelect = "default";
            this.dataForm.orderField = '';
            this.getTableData();
        },
        //支付金额排序
        paySolt() {
            this.defaultSoltSelect = "default";
            this.paySoltSelect = "primary";
            this.frequencySoltSelect = "default";
            this.dataForm.orderField = 'total_accout';
            this.getTableData();
        },
        //日均笔数排序
        frequencySolt() {
            this.defaultSoltSelect = "default";
            this.paySoltSelect = "default";
            this.frequencySoltSelect = "primary";
            this.dataForm.orderField = 'avg_trade_num';
            this.getTableData();
        },
        //重置
        resetBtn() {
            this.timers = [];
            this.dataForm = {
                order:false,
                orderField:false,
                currentPage: 1,
                pageSize: 10,
                organizationId: '',//子渠道
                parkType: '',//车场业态
                statDateStart: '',//开始时间
                statDateEnd: '',//结束时间
                avgCountMin:null,//日均笔数最小值
                avgCountMax:null,//日均笔数最大值
            },
            this.currentFrequency = '';
            this.getTimeFn();
            this.getTableData();
        },

        //自定义表头
        checkboxChange(e) {
            console.log(this.tableSelect)
            for (let j = 0; j < this.tableLabel.length; j++) {
                if (this.tableSelect.indexOf(this.tableLabel[j].label) > -1) {
                    this.tableLabel[j].isshow = true;
                } else {
                    this.tableLabel[j].isshow = false;
                }

            }
            console.log(this.tableLabel)
        },
        open() {
            this.timer = setTimeout(() => {
                this.popVisible = false;
                clearTimeout(this.timer)
            }, 3000)
        },
        clearSetTimeOut() {
            clearTimeout(this.timer)
        },


        handleNodeClick(data) {
            console.log(data);
        },
        //表格的选择改变
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //分页
        handleSizeChange(val) {
            this.dataForm.pageSize = val;
            this.getTableData();
        },
        handleCurrentChange(val) {
            this.dataForm.currentPage = val;
            this.getTableData();
        },
        //删除
        clickDel(id) {
            this.$confirm("您确信取消当前记录?", "确认", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.deleteRequest(id)
                })
                .catch(() => {

                });
        },
        deleteRequest(id) {
            this.utils.http({
                url: "/person/visitor/record/cancelVisitorAuth",
                method: "GET",
                params: { visitorId: id }
            },
                res => {
                    if (res.code == 200) {
                        this.utils.tip('success', '取消成功');
                        this.getTableData();
                    }
                });

        },
        //查看授权状态
        goView(id, name) {
            this.authPopVisible = true;
            this.authId = id;
            this.authPopTitle = name;
        },

        //获取支付渠道
        getpayChannelListData() {
            this.utils.http({
                url: "/park/organizationList",
                method: "GET",
                // params: {appId:this.appId}
                // params: {appId:nice}
            },
                res => {
                    if (res.code == 200) {
                        if (0 < res.data.length) {
                            this.channel = res.data
                        }
                    }

                });
        },

        //更改日均笔数范围
        frequencyChange(e){
          console.log(e);
          if(e.indexOf('~') != -1 ){
            this.dataForm.avgCountMin = e.split('~')[0];
            this.dataForm.avgCountMax = e.split('~')[1];
          }else{
             this.dataForm.avgCountMin = 100;
             this.dataForm.avgCountMax = null;
          }
        },
    },
}