<template>
  <div id="app">
    <div class="wrapper">
      <!-- 头部 -->
      <header-div></header-div>
      <!-- 左侧菜单导航 -->
      <sidebar></sidebar>
      <!-- 内容部分 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- 尾部 -->
      <footer-div></footer-div>
      <!-- Control Sidebar -->
      <aside-div></aside-div>

      <!-- <div class="control-sidebar-bg"></div> -->
    </div>
  </div>
</template>

<script>
import HeaderDiv from "./components/header.vue";
import footerDiv from "./components/footer.vue";
import Sidebar from "./components/sidebar.vue";
import AsideDiv from "./components/aside.vue";

import ligature from './utils/ligature.js';
export default {
  name: "app",
  data() {
    return {
      isShowCommon: true,
      title: "这是个通知",
      message: `<div>这个是通知的内容</div>`,
      notifyArr: [],
      userId: "sewqeddsawerwq",
      timeout: 40000, //心跳检测时间间隔
      timer: null, //心跳定时器
      imgurl:'',
      isReconcat:true,
      instan:null,
    }
      
  },
  components: {
    Sidebar,
    HeaderDiv,
    footerDiv,
    AsideDiv
  },
  created(){
    this.imgurl = this.tools.global.API_URL;
    this.getUserId();
  },
  mounted() {
    
  },
  methods: {
    //获取userId
    getUserId(){
      this.utils.http({
        url: "/home/getBaseInfo",
        method: "POST",
        data: {}
      },
      res => {
        this.utils.setStore('sessionId', res.data.sessionId);
        this.utils.setStore('userId', res.data.userId);
        this.utils.setStore('token', res.data.token);
        this.initWebSocket();
      });  
    },



        // 心跳检测 每隔一段时间主动推送 证明客户端活着
      heartCheckStart() {
        this.timer = setTimeout(() => {
          let date=new Date();
          let HeartBeat={
            type:"WS_HEARTBEAT",
            requestId:date.getTime().toString(),
            timestamp:this.formatTimestamp(date),
            token:"123999999999999999999999"
          }
          var cmd = JSON.stringify(HeartBeat);
          this.ws.send(cmd);
          console.log('心跳发送成功，发送时间：', new Date().toLocaleString('zh'))
        }, this.timeout)
      },
      heartCheckReset() {
        clearTimeout(this.timer)
        this.heartCheckStart();
      },
    // 掉线的重连方法
    reconnect() {
      let lockReconnect = false;
      if (lockReconnect) {
        return;
      }
      lockReconnect = true;

      let tt;
      if (tt) {
        clearTimeout(tt);
      }
      tt = setTimeout(() => {
        this.initWebSocket();
        lockReconnect = false;
      }, 5000);
    },
    // 初始化websoket
    initWebSocket() {
      if (!window.WebSocket) {
          window.WebSocket = window.MozWebSocket;
      }
      this.imgurl=process.env.SOCKET_HOST;

      let userId=this.utils.getStore('userId');
      let sessionId=this.utils.getStore('sessionId');
      if(window.WebSocket){
        // this.ws = new WebSocket(`ws:${this.imgurl}`);
        // var ws = "ws://" + document.location.host + "/websocket/"+userId+"/"+httpSessionId;
        this.ws = new WebSocket(`ws:${this.imgurl}/websocket/${userId}/${sessionId}`);
        // this.ws = new WebSocket(`ws://scenario.qy-rgs.com:9007/websocket/${userId}/${sessionId}`);
        this.ws.onopen = this.sendData;
        this.ws.onmessage = this.webSocketMessage;
        this.ws.onclose = this.websocketClose;
        this.ws.onerror = this.websocketError;
      }else{
        console.log("你的浏览器不支持 WebSocket！");
      }
      
    },
    sendData(data) {
      // console.log("websocket建立连接");
      // console.log("建立时间:", new Date().toLocaleString("zh"));
    },

    webSocketMessage(data) {
      //  this.heartCheckReset();
      console.log("消息接收:",data);
      var data = JSON.parse(data.data);
      console.log(data)
      let hours=new Date(data.createTime).getHours();
      let minutes=new Date(data.createTime).getMinutes();
      ligature.$emit("addSocketMsg");
      if(data.url){
        if(this.instan){
          this.instan.close();
        }
        this.instan = this.$notify({
          title: `[${hours}:${minutes}]新消息`,
          duration: 0,
          dangerouslyUseHTMLString: true,
          message: `<a style="color:#007aff" href="${data.url}">${data.title}</a>`,
          position: "bottom-right",
          // type:data.url? 'success':'warning'
        });
      }else{
        const h=this.$createElement;
        if(this.instan){
          this.instan.close();
        }
          this.instan = this.$notify({
          title: `[${hours}:${minutes}]新消息`,
          duration: 0,
          dangerouslyUseHTMLString: true,
          message: h('a',{
            style:'color:#007aff,cursor: pointer',
            on:{
              click: () => {
                this.seeErrContent(data.id)
              },
            }
          },data.title),
          position: "bottom-right",
          // type:'success'
        });
      }
      

    },
    websocketClose(wasClean) {
      // console.log('断开信息'+wasClean)
      // console.log("导出websocket断开连接");
      // console.log("导出断开时间:", new Date().toLocaleString("zh"));

      // if (wasClean.code!=1006) {
      //   console.log("WebSocket重连");
      //   this.reconnect();
      // }else if(wasClean.code==1001){
      //   this.$message.error('websocket服务器断开');
      // }
      if(this.isReconcat){
        this.reconnect()
      }
    },
    websocketError(err) {
      //  console.log("连接失败");
    
    },
    seeErrContent(id){
      ligature.$emit("msgContentPop",id);
    },
  }
};
</script>
<style>

</style>