import MsgBox from '../../../components/dialog.vue'
import TableCmp from '../../../components/table.vue'
import E from 'wangeditor'
// import '../../../utils/custom-menu.js';
export default {
  name: 'home',
  data() {
    return {
      noticeContent: '',
      editor: null,
      imgurl: '',
      addForm: {
        appId: '',
        noticeContent: '',
        noticeTitle: '',
        noticeStatus: 1,//0草稿   1发布
        noticeImage: '',//第一张图片
      },
      rules: {
        noticeTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
      },
      noticeTip: false,//内容为空时的提示信息
      isRequst: false,
      isRequst1: false
    }
  },
  computed: {
    appId: {
      get() {
        return this.$store.state.project.projectId
      },
      set(v) {
        this.$store.commit('changeProjectId', v)
      }
    }
  },
  watch: {
    appId(newFlag, oldFlag) {
      this.appId = newFlag;
      this.addForm.appId = newFlag;
    }
  },
  filters: {

  },
  created() {
    this.imgurl = this.tools.global.API_URL;
  },
  components: {
    MsgBox,
    TableCmp
  },
  mounted() {
    this.seteditor();
    this.addForm.appId = this.appId;
    if (this.$route.query.type == 2) {//编辑
      this.addForm = JSON.parse(this.utils.getStore('noticeMsg'));
      this.editor.txt.html(this.addForm.noticeContent);
    }
  },
  methods: {
    consoleSelect() {
      console.log(this.$refs.tableChild.selectData)
    },
    gotoEdit(name) {
      alert(name)
    },
    //保存
    addNotice(fromMsg, status) {
      let url;
      if (this.$route.query.type == 1) {
        url = '/property/notice/insert'
      } else if (this.$route.query.type == 2) {
        url = '/property/notice/update'
      }
      this.addForm.noticeStatus = status;
      this.noticeTip = false;
      this.$refs[fromMsg].validate((valid) => {
        if (valid && this.addForm.noticeContent) {
          //截取第一张图
          var imgReg = /<img.*?(?:>|\/>)/gi;
          var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          var arr = this.addForm.noticeContent.match(imgReg);  // arr 为包含所有img标签的数组
          if (arr) {
            this.addForm.noticeImage = arr[0].match(srcReg)[1];
          }
          if (status == 1) {
            this.isRequst = true;
          } else {
            this.isRequst1 = true;
          }

          this.utils.http({
            url: url,
            method: "POST",
            data: this.addForm
          }, res => {
            if (status == 1) {
              this.isRequst = false;
            } else {
              this.isRequst1 = false;
            }
            if (res.code == 200) {
              this.$router.push({
                path: '/notice'
              })
            }

          })
        } else if (!this.addForm.noticeContent) {
          this.noticeTip = true;
        }
      })
    },
    //取消
    cancel() {
      this.$router.push({
        path: '/notice'
      })
    },


    //初始化富文本框
    seteditor() {
      // http://192.168.2.125:8080/admin/storage/create
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      this.editor.customConfig.uploadImgServer = this.imgurl + '/file/upload'// 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {}// 自定义 header
      this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
      this.editor.customConfig.uploadImgParams = {
        appId: this.appId
      }

      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        // 'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
        'fullscreen' // 全屏
      ]

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
          // alert(0)
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
          // alert(1)
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
          // alert(2)
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
          // alert(3)
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          //insertImg()为插入图片的函数
          //循环插入图片
          // for (let i = 0; i < 1; i++) {
          // console.log(result)
          console.log(result.data)
          result.data.forEach((item, index) => {
            let url = this.imgurl + '/file/download?path=' + item
            insertImg(url)
          })

          // }
        }
      }
      this.editor.customConfig.onchange = html => {
        this.addForm.noticeContent = html;
        console.log(html)
        // this.catchData(this.address.synopsis); // 把这个html通过catchData的方法传入父组件
      };
      // 创建富文本编辑器
      this.editor.create()
    }
  },
}