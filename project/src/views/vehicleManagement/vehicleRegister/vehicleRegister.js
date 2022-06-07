import {mixin} from '../../../utils/mixin'
export default {
    mixins:[mixin],
    data() {
        return{
            arr:'',
            arr1:'',
            pageSize:10,
            page:1,
            visitorType:0,
            showTitle:'',
            carInfo:'',
            userMsg:'',
            total:0,
            vehicleDialogVisible:false,
            carMsg:{
                page:1,
				pageSize:10,
				personCarType:'',  //车主信息
				queryContent:'', //查询条件
            },
            addCarVo:{
                carModelInfoId:'',
                carTypeInfoId:'',
                id:'',
                personCarType:'',
                personId:'',
                personName:'',
                phone:'',
                plateNo:'',
                vehicleColor:'',
                permissionGroupId:''
            },
            tableData: [], //车辆列表
            userNameList:[]

        }
    },

    created() {
        this.getVehicleList();
    },
    methods: {
        // 添加车主信息弹窗
        openVehicleDialog() {
            this.showTitle = '车辆登记'
            this.vehicleDialogVisible = true
        },
        userCarType(e) {
            if(e == 2) {
                this.visitorType = 2
                this.addCarVo.personName = ''
                
            }else {
                this.visitorType = 0
                this.addCarVo.personName = ''
            }
            console.log(e,'33333')
        },
        // 分页操作
        handleSizeChange(val) {
            console.log(val,'size')
        },
        handleCurrentChange(val) {
            console.log(val,'page')
        },
        
        
        // 获取车辆列表
        getVehicleList() {
			let carMsg = {
                    appId:window.localStorage.getItem('appid'),
                    page:this.page,
                    pageSize:this.pageSize,
                    personCarType:this.userMsg,
                    queryContent:this.carInfo
				}
				this.utils.http({
					url:'/parking/plateNum/page',
					method:'POST',
					data:{...carMsg}
					},
                    res => {
                        if(res.code == 200) {
                            this.tableData = res.data.records
                            this.total = res.data.total
                        }
                        console.log(res,'获取车辆列表')
                    } 
                    )
				},
            // 获取车主姓名
        getUserName() {
            this.utils.http({
                url:'/person/getPersons',
                method:'GET',
                params:{
                    appId:window.localStorage.getItem('appid'),
                    type:1
                }

            },
                res => {
                    if(res.code == 200) {
                        this.userNameList = res.data
                    }
                    console.log(res,'indaa')
                }
            
            )
        },

        // 获取车类
        getVehicleType() {
            this.utils.http({
                url:'/parking/plateNum/getCarType',
                method:'GET',
                params:{
                    appId:window.localStorage.getItem('appid')
                }
            },
                res => {
                    if(res.code == 200) {
                        this.vehicleModel = res.data
                    }
                    console.log(res,'获取车型')
                }
            )
        },
        // 添加车辆
        addVehicleMsg() {
            let msg = {
                appId: window.localStorage.getItem('appid'),
                carModelInfoId: this.addCarVo.carModelInfoId,
                carTypeInfoId: this.addCarVo.carTypeInfoId,
                id: this.addCarVo.id,
                personCarType: this.addCarVo.personCarType,
                personId: this.addCarVo.personId,
                personName: this.addCarVo.personName,
                phone: this.addCarVo.phone,
                plateNo: this.addCarVo.plateNo,
                vehicleColor: this.addCarVo.vehicleColor,
                permissionGroupId:this.addCarVo.permissionGroupId
            }
            this.utils.http({
                url:'/parking/plateNum/carPlateNum',
                method:'POST',
                data:{...msg}
            },
                res => {
                    if(res.code == 200) {
                        this.$message.success('添加成功')
                        this.vehicleDialogVisible = false
                        this.getVehicleList();
                        this.countermand();
                    }
                    console.log(res,'添加车辆')
                }
            )
        },
        // 编辑车辆信息
        redactDlog(row) {
            console.log(row)
            this.showTitle = '车辆编辑'
            this.vehicleDialogVisible = true
            this.addCarVo.carModelInfoId = row.carModelInfoId.toString()
            this.addCarVo.carTypeInfoId = row.carTypeInfoId.toString()
            this.addCarVo.id = row.id;
            this.addCarVo.personCarType = row.personCarType.toString()
            this.addCarVo.personId = row.personId.toString();
            this.addCarVo.personName = row.personName;
            this.addCarVo.phone = row.phone;
            this.addCarVo.plateNo = row.plateNo;
            this.addCarVo.vehicleColor = row.vehicleColor;
            this.addCarVo.permissionGroupId = row.permissionGroupId.toString()
            },
        //编辑车辆保存
        redactVehicleMsg() {
            let carMsgAyy = {
                appId: window.localStorage.getItem('appid'),
                carModelInfoId: this.addCarVo.carModelInfoId,
                carTypeInfoId: this.addCarVo.carTypeInfoId,
                id: this.addCarVo.id,
                personCarType: this.addCarVo.personCarType,
                personId: this.addCarVo.personId,
                personName: this.addCarVo.personName,
                phone: this.addCarVo.phone,
                plateNo: this.addCarVo.plateNo,
                vehicleColor: this.addCarVo.vehicleColor
            }
            this.utils.http({
                url:'/parking/plateNum/carPlateNum',
                method:'POST',
                data:{...carMsgAyy}
            },
                res => {
                    if(res.code == 200) {
                        this.$message.success('编辑车辆信息成功')
                        this.vehicleDialogVisible = false
                        this.getVehicleList();
                        
                    }else {
                        this.$message.success('编辑车辆信息成功')
                    }
                    console.log(res,'编辑车辆')
                }
            
            )
        },
        // 导出车牌
        parameterCarNb() {
            let carNumber = {
                appId:window.localStorage.getItem('appid'),
                personCarType:this.userMsg,
                queryContent:this.carInfo

            }
            this.utils.http({
                url:'/parking/plateNum/export',
                method:'POST',
                data:{...carNumber}
            },
                res => {
                    if(res.code == 200) {
                        this.$message.success('导出车票成功')
                        this.resetSearch();
                    }
                    console.log(res,'导出')
                }
            )
        },
            // 删除车辆信息
        deleteCarMsg(row) {
            console.log(row,'天梭清洁球')
            this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.utils.http({
                        url:'/parking/plateNum/deleteCarPlateNum',
                        method:'GET',
                        params:{
                            id:row.id
                        }
                    },
                        res => {
                            if(res.code == 200) {
                                this.$message.success('删除成功 ')
                                this.getVehicleList();
                            }else {
                                this.$message.error('删除失败')
                            }
                        }
            )
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
        
        },
        // 处理tab数据
        formatterMsg(row, column, cellValue, index) {
            switch(row && row.personCarType) {
                case 0: row = '住户'
                    return row;
                case 1: row = '物业'
                    return row;
                case 2: row = '访客'
                    return row;
            }    
        },
        
        countermand() {
            this.vehicleDialogVisible = false
            this.addCarVo.carModelInfoId = ''
            this.addCarVo.carTypeInfoId = ''
            this.addCarVo.id  = ''
            this.addCarVo.personCarType  = ''
            this.addCarVo.personId  = ''
            this.addCarVo.personName  = ''
            this.addCarVo.phone  = ''
            this.addCarVo.plateNo  = ''
            this.addCarVo.vehicleColor  = ''
            this.addCarVo.permissionGroupId = ''
        },
        // 搜索查询
        searchConsult() {
            this.getVehicleList();
        },
        // 重置搜索条件
        resetSearch() {
            this.carInfo = '';
            this.userMsg = '';
            this.getVehicleList();

        },
        // 分页查询
        handleSizeChange(val) {
            this.pageSize = val;
            this.getVehicleList();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getVehicleList();
        },
        },
        

    }
