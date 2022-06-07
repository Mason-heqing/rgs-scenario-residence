export default {
	data() {
		return {
		value1: 0,
		uploadSoftPop:false,
		tableData: [
			{
			date: "2016-05-02",
			name: "王小虎",
			address: "上海市普陀区金沙江路 1518 弄",
			Url:'http://n.sinaimg.cn/news/transform/700/w1000h500/20210316/51c0-kmkptxe0299440.jpg'
			},
			{
			date: "2016-05-04",
			name: "王小虎",
			address: "上海市普陀区金沙江路 1517 弄",
			Url:'http://n.sinaimg.cn/photo/transform/700/w1000h500/20201023/a45c-kavypmq5775647.jpg'
			},
			{
			date: "2016-05-01",
			name: "王小虎",
			address: "上海市普陀区金沙江路 1519 弄",
			Url:'http://n.sinaimg.cn/photo/transform/700/w1000h500/20201106/1ad8-kcpxnwv8925892.png'
			},
			{
			date: "2016-05-03",
			name: "王小虎",
			address: "上海市普陀区金沙江路 1516 弄",
			Url:'http://n.sinaimg.cn/photo/transform/700/w1000h500/20201030/6b2b-kcaeqzy3779276.jpg'
			}
		]
		};
	},
	methods: {
			formatTooltip(val) {
				console.log(val);
		},
		uploadImg() {
			this.uploadSoftPop = true
		}
	}
};