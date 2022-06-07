export default {
  data() {
    return {
      show: false,
      show1: false,
      drawer: false,
      center: { lng: 113.944198, lat: 22.528774 },
      zoom: 18,
      positionList2:[
        {
          alarm: 0,
          id: "1169039923904138aee19f8290fe6db1",
          latitude: 22.5283609,
          longitude: 113.9459138
      },
      {
          alarm: 1,
          id: "4b452c9377ad4a5a8f1c19c0921b8e30",
          latitude: 22.5306539,
          longitude: 113.9446348
      }
      ],
      icon: {
        url: require("../../../assets/jiankongshexiangtou.png"),
        size: { width: 30, height: 33 },
      },
      icon2: {
        url: require("../../../assets/jiankongchakanshenqing.png"),
        size: { width: 30, height: 33 },
      },
      isMsg: true,
      positionList:[],
      userInfo:[
        {imgUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F140703%2F330746-140F301555752.jpg&refer=http%3A%2F%2Fimg.juimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620461504&t=3193fe774223ed748ea5e3f49e446e88',name:'小美',content:'太美，太勾人',rank:'一级', camera:'太空一号',time:'2035.12.35 20:00',similarity:'90',id:1},
        {imgUrl:'http://tiebapic.baidu.com/forum/w%3D580%3B/sign=aee701316ff0f736d8fe4c093a6eb219/e824b899a9014c086b851feb1d7b02087af4f4c5.jpg',name:'小美2',content:'很美，太好看',camera:'太空二号',rank:'一级' ,time:'2035.12.35 21:00',similarity:'90' ,id:2}
        ],
    };
  },
  created() {
    this.getEquipmentList();
  },
  methods: {
    map_handler({ BMap, map }) {
      map.setMapStyleV2({
        styleId: "2d51c6da078eb301aabb3bf0df9ce1bb",
      });
      console.log(BMap, Map);
    },
    infoWindowClose() {
      this.show = false;
    },
    // 获取报警信息
    infoWindowOpen(alarm,id) {
      if(alarm == 1) {
        this.drawer = true
        this.show = true;
      this.$axios.get(this.webUrl + `capture/face/capture/alarm/list/${id}`).then(res => {
      console.log(res,'报警信息')
    })
        // this.utils.http({
        //   url:`capture/face/capture/alarm/list/${id}`,
        //   method:'GET'
        // },
        // res => {
        //   console.log(res,'222222')
        // }
        // )
      }
    
    
    },
  
  // 获取布控设备列表
  getEquipmentList() {
    let ip = window.localStorage.getItem('appid')
    // let ip = '0219c7722bb64f0f8daa64c11c1e9f56'
    this.utils.http({
      url:`capture/face/capture/real/time/device/list/${ip}`,
      method:'GET',
    },
      res => {
        if(res.code == 200) {
          this.positionList = res.data

        }
        
      }
    )
    // this.$axios.get(this.webUrl + `capture/monitor/real/time/device/list/${ip}`).then(res => {
    //   console.log(res,'设备列表')
    // })

  },
    infoWindowClose1() {
      this.show1 = false;
    },
  },
};