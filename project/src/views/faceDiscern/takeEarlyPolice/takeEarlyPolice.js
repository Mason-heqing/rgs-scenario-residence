import {mixin} from '../../../utils/mixin.js'
export default {
	mixins:[mixin],
	data() {
		return {
			tableData: [],
			policeUserList:{     //报警人员列表
				appId:window.localStorage.getItem('appid'),
				page:1,
				pageSize:10,
				age:'',
				beard:'',
				startSnapTime:'',
				endSnapTime:'',
				glasses:'',
				mask:'',
				sex:'',
				skin:'',
				withPic:''
			},
			userInfoList:false
		};
	},
	created() {
		this.getCallPoliceList();
	},
	methods: {
		addList() {
			this.userInfoList = true
		},
		// 抓拍报警列表
		getCallPoliceList() {
			this.utils.http({
				url:'/capture/face/capture/alarm/page',
				method:'POST',
				data:this.policeUserList
			},
			res => {
				console.log(res,'列表页')
			}
			
			)
		},
	},
};