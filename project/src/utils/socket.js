import utils from './tools.js'
import Cookies from 'js-cookie';
var websock = null
var globalCallback = null

 // 初始化weosocket
function initWebSocket () {
  // ws地址 -->这里是你的请求路径
  // var ws='';
  // let hostname = window.location.hostname;
  // if(hostname=='192.168.1.247'){//测试
  //   ws= 'ws://192.168.1.247:6005'
  // }else{
  //   ws= 'wss://qy-vds.com:6004'
  // }
  // var ws='ws://192.168.1.247:6005'
  // console.log("长连接------->",Cookies.get('tcpUrl'))
  var ws  = '';
  if(Cookies.get('tcpUrl') && '' != Cookies.get('tcpUrl')){
    ws=Cookies.get('tcpUrl')
  }else{
    ws=process.env.SOCKET_HOST_HOME
  }
  // alert(ws);
  websock = new WebSocket(ws)
  websock.onmessage = function (e) {
    websocketonmessage(e)
  }
  websock.onclose = function (e) {
    websocketclose(e)
  }
  websock.onopen = function () {
    websocketOpen()
  }

  // 连接发生错误的回调方法
  websock.onerror = function () {
    console.log('WebSocket连接发生错误')
  }
}

// 实际调用的方法
function sendSock (agentData, callback) {
    // console.log(agentData)
  globalCallback = callback
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback)
    }, 1000)
  }
}

// 数据接收
function websocketonmessage (e) {
  globalCallback(JSON.parse(e.data))
}

// 数据发送
function websocketsend (agentData) {
  websock.send(JSON.stringify(agentData))
}

// 关闭
function websocketclose (e) {
    console.log("websocket断开");
    console.log("断开时间:", new Date().toLocaleString("zh"));
    // 重连
    // initWebSocket()
}

// 创建 websocket 连接
function websocketOpen (e) {
    console.log("websocket建立连接");
    console.log("建立时间:", new Date().toLocaleString("zh"));
}
function nice(e){
    console.log(e)
    console.log('注册成功')
}


// initWebSocket()

// 将方法暴露出去
export {
  sendSock,
  websocketclose,
  initWebSocket
}
