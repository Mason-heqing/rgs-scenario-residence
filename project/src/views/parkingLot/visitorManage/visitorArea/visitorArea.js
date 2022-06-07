import echarts from 'echarts'
import SearchForm from '../../../../components/form.vue'
let sexs=[{label:'男',value:'M'},{label:'女',value:'F'}]
let sexProps={label:'label',value:'value'}
let intersts=[{label:'羽毛球',value:'badminton'},{label:'篮球',value:'basketball'},{label:'足球',value:'football'},{label:'兵乓球',value:'pong'}]
let interstProps={label:'label',value:'value'}
export default {
  name: 'home',
  data() {
    return {
      medium:111,
        searchData:{
            name:'',
            age:null,
            sex:null,
            date: '',
            interst: []
        },
        searchForm:[
            {type:'Input',label:'姓名：',prop:'name',width:'180px',placeholder:'请输入姓名'},
            {type:'Input',label:'年龄',prop:'age',width:'180px',placeholder:'请输入年龄'},
            {type:'Date',label:'日期',prop:'date',width:'180px',placeholder:'请选择日期'},
            {type:'Select',label:'性别',prop:'sex',width:'120px',options:sexs,props:sexProps,change:row=>'',placeholder:'请选择性别'},
            {type:'Checkbox',label:'爱好',prop:'interst',checkboxs:intersts,props:interstProps}
        ],
        searchHandle:[
            {label:'查询',type:'primary',handle:()=>this.searchHandleForm()},
            {label:'重置',type:'primary',handle:()=>''}
        ],

        // 表单验证
        editRules: {
            name: [{requied: true, message: '请输入姓名', trigger: 'blur'}]
        },
        
    }
},
methods: {
    searchHandleForm() {
        console.log('searchHandle')
    },
},
  watch: {

  },
  filters: {

  },
  created() {

  },
  components:{
    SearchForm
  },
  mounted() {
  },

}