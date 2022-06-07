import {mixin} from '../../../utils/mixin'
export default {
    mixins:[mixin],
    data() {
        return {
            locationMsg:'',
            statusMsg:'',
            videoEquipmentDialog:false,
            videoEquipmentTitle:'',
            equipmentForm:{  //添加设备数据
                type:'',
                name:'',
                SN:''
            },
            SName:'',
            statusMsg:'',
            locationMsg:'',
            pattern:'',
            wayMode:'',
            id:'',
            modeTyep1:true,
            modeTyep:false,
            tableData:[],    //表格数据
            total:0,
            page:1,
            pageSize:10,
            status_m:false
        }
    },
    created() {
        this.getEquipmentList();
    },
    methods: {

        // 获取视频设备列表
        getEquipmentList() {
            // this.utils.http({
            //     url:'/monitor/monitor/device/page',
            //     method:'POST',
            //     data:{
            //         appId:window.localStorage.getItem('appid'),
            //         name:this.SName,
            //         deviceOnline:this.statusMsg,
            //         page:this.page,
            //         pageSize:this.pageSize,
            //     }
            // },
            //     res => {

            //     }
            // )
            this.$axios.post(this.webUrl + 'monitor/monitor/device/page',{
                appId:window.localStorage.getItem('appid'),
                name:this.SName,
                deviceOnline:this.statusMsg,
                page:this.page,
                pageSize:this.pageSize,

            }).then(res => {
                if(res.data.code == 200) {
                    this.tableData =  res.data.data.records
                    this.total = res.data.data.total
                }
                console.log(res,'设备列表页')
            })
        },
        // 搜索查询
        inquireSMsg() {
            this.getEquipmentList()
        },
        // 添加视频监控设备
        openVEDialog() {
            this.videoEquipmentDialog = true
            this.modeTyep = false
            this.modeTyep1 = true
            this.videoEquipmentTitle = '添加视频监控设备'
        },
        // 取消质控input框
        closeEquipmentDlog() {
            this.videoEquipmentDialog = false;
            this.equipmentForm.type = '';
            this.equipmentForm.name = '';
            this.equipmentForm.SN = ''
        },
        // 添加设备提交
        submitEquipmentMsg() {
            // this.utils.http({
            //     url:'/monitor/monitor/device/add',
            //     method:'POST',
            //     data:{
            //         appId:window.localStorage.getItem('appid'),
            //         name:this.equipmentForm.name,
            //         serial:this.equipmentForm.SN,
            //         type:this.equipmentForm.type
            //     }
            // },
            //     res => {

            //     }
            // )
            this.$axios.post(this.webUrl + 'monitor/monitor/device/add',{
                appId:window.localStorage.getItem('appid'),
                name:this.equipmentForm.name,
                serial:this.equipmentForm.SN,
                type:this.equipmentForm.type
            }).then(res => {
                if(res.data.code == 200) {
                    this.$message.success('添加视频设备成功')
                    this.getEquipmentList();
                    this.videoEquipmentDialog = false;
                    this.closeEquipmentDlog();
                }else {
                    this.$message.error(res.data.msg)
                }
                console.log(res,'添加视频设备')
            })
        },
        // 分页搜索
        handleSizeChange(val) {
            this.pageSize = val;
            this.getEquipmentList();
        },
        handleCurrentChange(val) {
            this.page = val
            this.getEquipmentList();
        },
        // 搜索重置功能
        resetInput() {
            this.SName = '',
            this.statusMsg = '',
            this.locationMsg = '',
            this.getEquipmentList();
        },
        // 编辑
        amendTable(row) {
            this.modeTyep = true
            this.modeTyep1 = false
            this.videoEquipmentTitle = '编辑视频监控设备'
            this.videoEquipmentDialog = true
            this.equipmentForm.name = row.name
            this.equipmentForm.type = row.type.toString();
            this.equipmentForm.SN = row.serial
            this.wayMode = row.mediaTransport.toString();
            this.pattern = row.mediaTransportMode.toString();
            this.id = row.id
            console.log(row,'row')
        },
        // 编辑提交
        amendTableSubmit() {
            let _obj = {
                appId:window.localStorage.getItem('appid'),
                id:this.id,
                mediaTransport:this.wayMode,
                mediaTransportMode:this.pattern,
                name:this.equipmentForm.name,
                serial:this.equipmentForm.SN,
                type:this.equipmentForm.type
            }
            // this.utils.http({
            //     url:'/monitor/monitor/device/update',
            //     method:'POST',
            //     data:{
            //         ..._obj
            //     }
            // },
            //     res => {

            //     }
            // )
            this.$axios.post(this.webUrl + 'monitor/monitor/device/update',
                {..._obj}
            ).then(res => {
                if(res.data.code == 200) {
                    this.$message.success('编辑设备成功')
                    this.videoEquipmentDialog = false
                    this.getEquipmentList();
                    this.closeEquipmentDlog();

                }else {
                    this.$message.error(res.data.msg)
                }
                console.log(res,'编辑设备')
            })
        },
        // 删除
        deleteTable(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    // this.utils.http({
                    //     url:`/monitor/monitor/device/delete/${row.id}`,
                    //     method:'DELETE'
                    // },
                    //     res => {

                    //     }
                    // )
                    this.$axios.delete(this.webUrl + `monitor/monitor/device/delete/${row.id}`)
                    .then(res => {
                        if(res.data.code == 200) {
                            this.$message.success('删除设备成功')
                            this.getEquipmentList();
                        }else {
                            this.$message.error(res.data.msg)
                        }
                        console.log(res,'删除设备')
            })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        },
        // 查看通道
        checkAisle(row) {
            this.$router.push({path:'/videoPlayback',query:{row}})
        },
        // 更新通道
        updateAisle(row) {
            this.status_m = true
            // this.utils.http({
            //     url:`/monitor/monitor/device/refresh/channel/${row.id}`,
            //     method:'GET',
            // },
            //     res => {

            //     }
            // )
            this.$axios.get(this.webUrl + `monitor/monitor/device/refresh/channel/${row.id}`)
            .then(res => {
                if(res.data.code == 200) {
                    setTimeout(()=> {
                        this.status_m = false
                        this.$message.success('更新通道成功')
                    },1000)
                }else if(res.data.code == 500){
                    this.status_m = false
                    this.$message.error(res.data.msg)
                }
            })
        }
    },
}