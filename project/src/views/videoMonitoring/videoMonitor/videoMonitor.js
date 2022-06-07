import {mixin} from '../../../utils/mixin'
import LivePlayer from '@liveqing/liveplayer'
export default {
	mixins:[mixin],
	components: {
    LivePlayer
	},
	data() {
		return {
			activeName: 'first',
			defaultProps: {
				children: 'children',
				label: 'name'
				},
			Mindex:'',
			num:'',
			obj:{},
			originLength:[],
			forList:[{url:'',id:'0'}],
			itemLength:1,
			videoArr:[],
			urlMsg:'',
			serial :[],
			MvideoUrl:'',
			filterText: '',
		}
	},
	created() {
		
		this.getEquipmentTree();
	},
	watch: {
		// 过滤
		filterText(val) {
		this.$refs.tree.filter(val);
		}
    },
	methods: {
		// 本地树结构过滤
		filterNode(value, data) {
			if (!value) return true;
				return data.name.indexOf(value) !== -1;
		},
		pause: function () {
            this.$refs.player2.pause();
        },
    
        snap: function () {
            this.$refs.player2.snap();
        },
        snapOutside: function (snapData) {
            alert(snapData)
        },
    
		handleClick(tab, event) {
			console.log(tab, event,'======');
		},
		
		handleChange(e) {
			
		},
		// 获取设备树
		getEquipmentTree() {
			let appId = window.localStorage.getItem("appid");
			// this.utils.http({
			// 	url:`/monitor/monitor/video/device/tree/${appId}`,
			// 	method:'GET',
			// },
			// (res) => {
			// 	console.log(res,'设备哪个树')
			// }
			// )

			this.$axios.get(this.webUrl + `monitor/monitor/video/device/tree/${appId}`)
			.then( res => {
				console.log(res,'设备哪个树')
				if(res.data.code== 200) {
					this.treeList = this.recursionSort(res.data.data)
				}
			})
		},
		// 获取监控视频源
		getVideInformation({code,liveGbsId,serial} = obj) {
			// this.utils.http({
			// 	url:'/monitor/monitor/video/start',
			// 	method:'POST',
			// 	data:{
			// 		channelCode:code,
			// 		liveGbsId:liveGbsId,
			// 		serial:serial,
			// 	}
			// },
			// 	res => {
				
			// 	}
			// )

			this.$axios.post(this.webUrl + `monitor/monitor/video/start`,{
					channelCode:code,
					liveGbsId:liveGbsId,
					serial:serial,
			}).then(res => {
				if(res.data.code == 200) {
					if(this.itemLength == 1) {
						this.urlMsg = res.data.data.fLV
						console.log(this.urlMsg,'this.urlMsg')
					}else if (this.itemLength != 1) {
						this.forList[this.Mindex].url = res.data.data.fLV
					}
					
				}
				console.log(res,'视频信息')
			})
		},
		// 关闭视频通道流
		closeVideo(vid,idx) {
			let {code,liveGbsId,serial} = this.obj
			// this.utils.http({
			// 	url:'/monitor/monitor/video/stop',
			// 	method:'POST',
			// 	data:{
			// 		channelCode:code,
			// 		liveGbsId:liveGbsId,
			// 		serial:serial,
			// 	}
			// },
			// 	res => {

			// 	}
			// )
				this.$axios.post(this.webUrl + `monitor/monitor/video/stop`,{
				channelCode:code,
				liveGbsId:liveGbsId,
				serial:serial,
			}).then(res => {
				if(res.data.code == 200) {
					this.forList[idx].url = ''
				}
			})
			
		
		},	
		// 分屏切换
		showTypeNum(id,index) {
			if(id == this.forList.length) {
				return
			}
			this.forList = []
			this.itemLength = id
			this.num = index
			for(let i = 0; i < this.itemLength; i++) {
				if(this.originLength[i]){
					const {url, id} = this.originLength[i]
					this.forList.push({
					url,
					id
				})
				}else {
					this.forList.push({
						url:'',
						id:''
					})
				}
				
			}
			console.log(this.forList,'this.forList')
		},
		recursionSort(arr) {
		      arr.forEach((ele, index) => { 
		         if (Array.isArray( ele.children) && ele.children.length) {
		           this.recursionSort(ele.children)
		         } else { 
		           // 叶子节点排序 
		           ele.sort = index
		         }
		      })
		      return arr
		    },

		//  获取点击的通道数据
		handleNodeClick(e) {
			console.log(e,'eeee')
			this.Mindex = e.sort
			if(e.children != null) {
				return;
			}else {
				this.obj = e
				this.getVideInformation(this.obj);
			}
		},
	},
}