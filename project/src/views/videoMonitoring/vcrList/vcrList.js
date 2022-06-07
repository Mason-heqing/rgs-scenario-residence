import {mixin} from '../../../utils/mixin'
import LivePlayer from '@liveqing/liveplayer'
export default {
    mixins:[mixin],
    components: {
        LivePlayer
    },
    data() {
        return{
            row:'',
            vcrTiemS:'',
            vcrTiemE:'',
            getDady:'',
            tableData:[],
            dialogVrcReplay:false,
            vrcTitle:'',
            serial:'',
            videoUrl:'',  //通道编码
            streamID:'',  //流ID
            btnBox:[
                {name:'X4',eventNum:'multiplier4'},
                {name:'X2',eventNum:'multiplier2'},
                {name:'X1',eventNum:'multiplier1'}
                ],
        }
    },
    created() {
        this.row = this.$route.query.rowMsg;
        this.getTime();
        this.getVcrList(this.row);
        console.log(this.vcrTiemS,'@@@')
        
    },
    methods: {
        // 获取录像列表
        getVcrList(row) {
            this.serial = row.deviceID
            // this.utils.http({
            //     url:'/monitor/monitor/channel/playback/record/list',
            //     method:'GET',
            //     params:{
            //         channelCode:row.iD,
            //         serial:row.deviceID ,
            //         startTime:'2021-04-22T00:00:00',
            //         endTime:this.vcrTiemS,
            //     }
            // },
            //     res => {

            //     }
            // )
            this.$axios.get(this.webUrl + 'monitor/monitor/channel/playback/record/list',{
                params:{
                    channelCode:row.iD,
                    serial:row.deviceID ,
                    startTime:'2021-04-22T00:00:00',
                    endTime:this.vcrTiemS,
                }
            }).then(res => {
                if(res.data.code == 200) {
                    this.tableData = res.data.data.recordList
                }
                console.log(res,'9999')
            })
        },
        // 播放录像
        openVrc(row) {
            this.dialogVrcReplay = true
            this.vrcTitle = row.name
            // this.utils.http({
            //     url:'/monitor/monitor/channel/playback/start/video',
            //     method:'GET',
            //     params:{
            //         channelCode:row.deviceID,
            //         serial:this.serial,
            //         startTime:row.startTime,
            //         endTime:row.endTime
            //     }
            // },
            //     res => {

            //     }
            // )
            this.$axios.get(this.webUrl + 'monitor/monitor/channel/playback/start/video',{
                params:{
                    channelCode:row.deviceID,
                    serial:this.serial,
                    startTime:row.startTime,
                    endTime:row.endTime
                }
            }).then(res => {
                if(res.data.code == 200) {
                    this.videoUrl = res.data.data.fLV
                    this.streamid = res.data.data.streamID
                }else if(res.data.code == 500) {
                    this.$message.error(res.data.msg)
                }
                console.log(res,'%%%%')
                
            })
        },
        snapOutside: function (snapData) {
            alert(snapData)
        },
        // 录像倍速播放
        multiplier(number) {
            var A;
            switch(number) {
                case 'multiplier1': A = 1;
                break;
                case 'multiplier2': A = 2;
                break;
                case 'multiplier4' : A = 4;
                break;
            }
            // this.utils.http({
            //     url:'/monitor/monitor/channel/playback/control',
            //     method:'GET',
            //     params:{
            //         command:'scale',
            //         scale:A,
            //         serial:this.serial,
            //         streamid:this.streamid
            //     }
            // },
            //     res => {

            //     }
            // )
            this.$axios.get(this.webUrl + `monitor/monitor/channel/playback/control`,{
                params:{
                    command:'scale',
                    scale:A,
                    serial:this.serial,
                    streamid:this.streamid
                }
            }).then(res => {
                console.log(res,'~~~~~')
            })
        },
        // 关闭录像
        closeVrcMsg() {
            // this.utils.http({
            //     url:'/monitor/monitor/channel/playback/stop/video',
            //     method:'GET',
            //     params:{
            //         serial:this.serial,
            //         streamid:this.streamid
            //     }
            // },
            //     res => {

            //     }
            // )
            this.$axios.get(this.webUrl + `monitor/monitor/channel/playback/stop/video`,{
                params:{
                    serial:this.serial,
                    streamid:this.streamid
                }
            }).then(res => {
                if(res.data.code == 200) {
                    this.videoUrl = ''
                    this.$message.success('录像已关闭')

                }else {
                    this.$message.error(res.data.msg)
                }
                console.log(res,'!!!!')
            })
        },
        // 关闭录像播放器弹窗
        callOff() {
            this.dialogVrcReplay = false
            this.videoUrl = ''
        }

    },
}