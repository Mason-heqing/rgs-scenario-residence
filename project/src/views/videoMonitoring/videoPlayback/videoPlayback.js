import {mixin} from '../../../utils/mixin'
import LivePlayer from '@liveqing/liveplayer'
export default {
    mixins:[mixin],
    components:{
        LivePlayer
    },
    data() {
        return {
            tableData:[],
            dialogVideoReplay:false,
            page:1,
            pageSize:5,
            videoUrl:'',
            vcrTiemS:'',
            vcrTiemE:'',
            searchKey:'',
            Srow:{},
            total:0,
            id:'',
            deviceOnline:'',
            Serial:'',      //设备通道码
            Streamid:''       //流ID
        }
    },
    created() {
        // this.id = this.$route.query.row.id
        // this.getVideoReplayList(this.id)
    },
    methods: {
        // 查看录像回放
        submitVcrTime() {
            let row = this.Srow
            // this.utils.http({
            //     url:'/monitor/monitor/channel/playback/start/video',
            //     method:'GET',
            //     params:{
            //         channelCode:row.iD,
            //         serial:row.deviceID ,
            //         startTime:this.vcrTiemS,
            //         endTime:this.vcrTiemE
            //     }
            // },
            //     res => {

            //     }
            // )
            this.$axios.get(this.webUrl + `monitor/monitor/channel/playback/start/video`,{
                params:{
                    channelCode:row.iD,
                    serial:row.deviceID ,
                    startTime:this.vcrTiemS,
                    endTime:this.vcrTiemE
                }
            }).then(res => {
                console.log(res,'*****')
                if(res.data.code ==200) {
                    this.videoUrl = res.data.data.fLV
                    this.Serial = res.data.data.deviceID
                    this.Streamid = res.data.data.streamID
                }else if (res.data.code <= 500) {
                    this.$message.error(res.data.msg)
                }
                console.log(res,'录像')
            })
            
        },
        openVideoReplay(row){
            this.getTime();
            this.Srow = row,
            this.dialogVideoReplay = true
        },
        // 查询通道
        inquire() {
            this.getVideoReplayList(this.id);
        },
        // 重置
        empty() {
            this.searchKey = '';
            this.deviceOnline = '';
            this.getVideoReplayList(this.id);
        },
        // 分页
        handleSizeChange(val) {
            this.pageSize = val
            this.getVideoReplayList(this.id);
        },
        handleCurrentChange(val) {
            this.page = val
            this.getVideoReplayList(this.id);
        },
        // 获取录像资源
        getVideoReplayList(Id) {
            // this.utils.http({
            //     url:`/monitor/monitor/device/channel/page`,
            //     method:'POST',
            //     data:{
            //         id:Id,
            //         page:this.page,
            //         pageSize:this.pageSize,
            //         searchKey:this.searchKey,
            //         deviceOnline:this.deviceOnline
            //     }
            // },
            //     res => {

            //     }
            // )
            this.$axios.post(this.webUrl + `monitor/monitor/device/channel/page`,{
                id:Id,
                page:this.page,
                pageSize:this.pageSize,
                searchKey:this.searchKey,
                deviceOnline:this.deviceOnline
            }).then(res => {
                this.tableData = res.data.data.channelList
                this.total =res.data.data.channelCount

            })
        },
        snapOutside: function (snapData) {
            alert(snapData)
        },
        // 关闭录像链接
        closeVcrLink() {
            // this.utils.http({
            //     url:'/monitor/monitor/channel/playback/stop/video',
            //     method:'GET',
            //     params :{
            //         serial:this.Serial,
            //         streamid:this.Streamid 
            //     }
            // },
            //     res => {

            //     }
            
            // )
            this.$axios.get(this.webUrl + `monitor/monitor/channel/playback/stop/video`,{
                params :{
                    serial:this.Serial,
                    streamid:this.Streamid 
                }
            }).then(res => {
                if(res.data.code == 200) {
                    this.$message.success('录像已关闭')
                    this.videoUrl = ''
                }
            })
        },
        // 取消弹窗
        callOff() {
            this.dialogVideoReplay = false
            this.vcrTiemS = ''
            this.videoUrl = ''
        },
    
        // 跳转录像列表页
        toVcrPage() {
            let rowMsg = this.Srow
            this.$router.push({path:'/vcrList', query:{rowMsg}})
        }
    },
}