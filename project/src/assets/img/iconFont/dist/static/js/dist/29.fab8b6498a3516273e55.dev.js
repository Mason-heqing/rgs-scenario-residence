"use strict";

webpackJsonp([29], {
  "1cm0": function cm0(t, e, a) {
    var i = a("968H");
    "string" == typeof i && (i = [[t.i, i, ""]]), i.locals && (t.exports = i.locals);
    a("rjj0")("6326ead8", i, !0);
  },
  "968H": function H(t, e, a) {
    e = t.exports = a("FZ+f")(!1), e.push([t.i, "\n.select2-container--default .select2-selection--single{backg -color:transparent !important\n}\n.select2-container--default .select2-selection--single .select2-selection__rendered{color:white\n}\n.select2-container--default .select2-selection--single .select2-selection__arrow b{border-color:#fff transparent transparent transparent\n}\n.select2-container--default .select2-selection--single,.select2-selection .select2-selection--single{border:0px !important\n}\n.select2-results__option{width:500px !important\n}\ndropdown-wrapper{display:none\n}\n.red{width:100px\n}\n.wrapper_top{width:35%;padding-right:0\n}\n.wrapper-boox{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.home .lower-h3 h3{font-size:28px\n}\n.home .select-date{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between\n}\n.home .select-date>span{-webkit-box-flex:1;-ms-flex:1;flex:1\n}\n.home .select-date>div{width:20%\n}\n.home .person-list li{display:-webkit-box;display:-ms-flexbox;display:flex;padding:8px 0\n}\n.home .person-list li .list-left{width:26%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.home .person-list li .list-left img{max-width:80px;max-height:80px;border-radius:50%\n}\n.home .person-list li .list-right{width:74%\n}\n.home .person-list li .list-right>p{width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:24px;margin-bottom:0;font-size:14px\n}\n@media (max-width: 1200px){\n.last-device{padding-right:0px;padding-left:15px !important\n}\n}\n.record-pop{overflow:hidden\n}\n.record-pop .record-pop-left,.record-pop .record-pop-right{width:33%;float:left\n}\n.record-pop p span{width:80px;display:inline-block;text-align:right;color:#222;font-weight:600\n}\n", ""]);
  },
  KR8f: function KR8f(t, e, a) {
    "use strict";

    function i(t) {
      a("1cm0");
    }

    Object.defineProperty(e, "__esModule", {
      value: !0
    });

    var s = a("bOdI"),
        o = a.n(s),
        n = a("Cz8s"),
        r = a("mzkE"),
        l = a("CwAS"),
        c = {
      name: "home",
      data: function data() {
        return {
          msg: "首页",
          visible: !1,
          resizeTimer: null,
          chartTodayRecogRate: null,
          chartDeviceOnlineRate: null,
          chartPeopleTrend: null,
          chartTodayVisitorHour: null,
          todayData: null,
          openDoorChart: null,
          value1: "",
          repairCount: "",
          auditCount: "",
          tableData: [{
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          }, {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          }, {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          }, {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }],
          nice: {
            results: [{
              text: "Group 1",
              children: [{
                id: 1,
                text: "Option 1.1"
              }, {
                id: 2,
                text: "Option 1.2"
              }]
            }, {
              text: "Group 2",
              children: [{
                id: 3,
                text: "Option 2.1"
              }, {
                id: 4,
                text: "Option 2.2"
              }]
            }],
            pagination: {
              more: !0
            }
          },
          condition: {},
          $tab_list: null,
          openDoorForm: {
            appId: "",
            startTime: ""
          },
          timeArr: ["07:00:00", "21:00:00"],
          toDayDataList: [],
          openDoorList: [],
          openDoorIndex: [],
          toDayTime: "",
          houseNum: 0,
          householdNum: 0,
          employeeNum: 0,
          deviceNum: 0,
          peopleTrendList: [],
          timeout: 45e3,
          timer: null,
          imgurl: "",
          realTimeList: [],
          currentToken: "",
          recordContentPop: !1,
          contentMsg: {}
        };
      },
      components: {
        Sidebar: l.a,
        HeaderDiv: n.a,
        footerDiv: r.a
      },
      computed: {
        appId: {
          get: function get() {
            return this.$store.state.project.projectId;
          },
          set: function set(t) {
            this.$store.commit("changeProjectId", t);
          }
        }
      },
      watch: {
        appId: function appId(t, e) {
          t && (this.appId = t, this.openDoorForm.appId = t, this.getCountResidenceHomeData(), this.TodayDataRequest(), this.getOpenDoorRequest(), this.timeRecord()), this.socketApi.websocketclose(), clearInterval(this.timer), this.socketApi.initWebSocket(), this.websocketToLogin();
        }
      },
      filters: {},
      created: function created() {
        this.currentToken = this.utils.getUUID(), this.imgurl = this.tools.global.API_URL, this.socketApi.initWebSocket(), this.websocketToLogin();
      },
      mounted: function mounted() {
        var t = this;
        this.openDoorForm.appId = this.appId, this.appId && (this.TodayDataRequest(), this.timeRecord(), this.getCountResidenceHomeData(), this.getOpenDoorRequest());
        var e = new Date(),
            a = e.getFullYear(),
            i = e.getMonth() + 1,
            s = e.getDate();
        i < 10 && (i = "0" + i), s < 10 && (s = "0" + s), this.openDoorForm.startTime = a + "-" + i + "-" + s, window.addEventListener("resize", function () {
          t.chartPeopleTrend && t.chartPeopleTrend.resize(), t.todayData && t.todayData.resize(), t.openDoorChart && t.openDoorChart.resize();
        });
      },
      destroyed: function destroyed() {
        clearInterval(this.timer), this.socketApi.websocketclose();
      },
      methods: {
        heartCheckStart: function heartCheckStart() {
          var t = this;
          this.timer = setInterval(function () {
            var e = new Date(),
                a = {
              type: "WS_HEARTBEAT",
              requestId: t.utils.getUUID(),
              timestamp: t.utils.formatTimestamp(e),
              token: t.currentToken
            };
            t.socketApi.sendSock(a, t.getConfigResult);
          }, this.timeout);
        },
        getConfigResult: function getConfigResult(t) {
          "WS_REGISTER" == t.type ? (this.websocketGetData(), this.heartCheckStart()) : "WS_PUBLISH_FACE" == t.type && (this.realTimeList.unshift(t.body), console.log(this.realTimeList, "00++"));
        },
        websocketToLogin: function websocketToLogin() {
          var t = new Date(),
              e = {
            type: "WS_REGISTER",
            requestId: this.utils.getUUID(),
            timestamp: this.utils.formatTimestamp(t),
            token: this.currentToken
          };
          this.socketApi.sendSock(e, this.getConfigResult);
        },
        websocketGetData: function websocketGetData() {
          var t = this.appId.split(","),
              e = new Date(),
              a = {
            type: "WS_SUBSCRIBE_FACE",
            requestId: this.utils.getUUID(),
            timestamp: this.utils.formatTimestamp(e),
            token: this.currentToken,
            body: {
              applist: t
            }
          };
          this.socketApi.sendSock(a, this.getConfigResult);
        },
        btnDeviceAll: function btnDeviceAll() {
          this.condition.type = null;
          var t = {
            silent: !0,
            query: this.condition
          };
          this.$tab_list.bootstrapTable("refresh", t);
        },
        changeSocket: function changeSocket() {
          this.$store.commit("changeData", "这个是改变之后的信息");
        },
        timeRecord: function timeRecord() {
          var t = this;
          this.utils.http({
            url: "/home/page/realTimeRecord",
            method: "GET",
            params: {
              appId: this.appId
            }
          }, function (e) {
            200 == e.code && (t.realTimeList = e.data);
          });
        },
        getCountResidenceHomeData: function getCountResidenceHomeData() {
          var t = this;
          this.peopleTrendList = [], this.utils.http({
            url: "/home/page/countResidenceHomeData",
            method: "GET",
            params: {
              appId: this.appId
            }
          }, function (e) {
            console.log(e, "!!!!!!@@"), 200 == e.code && e.data && (t.houseNum = e.data.houseNum, t.householdNum = e.data.householdNum, t.employeeNum = e.data.employeeNum, t.deviceNum = e.data.deviceNum, t.repairCount = e.data.repairCount, t.auditCount = e.data.auditCount, e.data.countList && e.data.countList.forEach(function (e, a) {
              t.peopleTrendList.push(e.number);
            }), t.peopleTrend());
          });
        },
        changeTime: function changeTime(t) {
          this.openDoorForm.startTime = t, this.getOpenDoorRequest();
        },
        TodayDataRequest: function TodayDataRequest() {
          var t = this;
          this.utils.http({
            url: "/home/page/toDay",
            method: "POST",
            data: {
              appId: this.appId
            }
          }, function (e) {
            200 == e.code && (t.toDayDataList = e.data, t.getTodayData());
          });
        },
        getOpenDoorRequest: function getOpenDoorRequest() {
          var t = this;
          this.utils.http({
            url: "/home/page/date",
            method: "POST",
            data: this.openDoorForm
          }, function (e) {
            200 == e.code && (t.openDoorList = e.data.counts, t.openDoorIndex = e.data.index, t.getOpenDoor());
          });
        },
        getTodayData: function getTodayData() {
          var t,
              e = [];
          this.toDayDataList.forEach(function (t, a) {
            e.push(t.name);
          }), this.todayData = this.$echarts.init(document.getElementById("todayData"));
          var a = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)",
              color: "#fff",
              textStyle: {
                color: "black"
              }
            },
            grid: {
              top: "10%",
              left: "0%",
              containLabel: !0
            },
            legend: {
              orient: "vertical",
              y: "center",
              right: 50,
              formatter: function formatter(t) {
                for (var e = a.series[0].data, i = 0, s = 0, o = 0, n = e.length; o < n; o++) {
                  i += e[o].value, e[o].name == t && (s = e[o].value);
                }

                if (0 != i) {
                  return t + " " + s + "　　" + (s / i * 100).toFixed(2) + "%";
                }

                return t + " " + s + "　　0%";
              },
              data: e
            },
            series: [(t = {
              name: "访问来源",
              type: "pie",
              center: ["30%", "50%"],
              radius: ["40%", "60%"],
              avoidLabelOverlap: !1,
              color: ["#D1FBEF", "#F9D858", "#4CD0DD", "#DF86F0", "#F5A7C1"]
            }, o()(t, "avoidLabelOverlap", !1), o()(t, "label", {
              normal: {
                show: !1,
                position: "center"
              },
              emphasis: {
                show: !0,
                textStyle: {
                  fontSize: "24",
                  fontWeight: "bold"
                }
              }
            }), o()(t, "labelLine", {
              normal: {
                show: !1
              }
            }), o()(t, "data", this.toDayDataList), t)]
          };
          this.todayData.setOption(a);
        },
        peopleTrend: function peopleTrend() {
          this.chartPeopleTrend = this.$echarts.init(document.getElementById("chartTodayRecogHour")), this.chartPeopleTrend.setOption({
            tooltip: {
              trigger: "axis"
            },
            grid: {
              top: "3%",
              left: "1%",
              right: "1%",
              bottom: "1%",
              containLabel: !0
            },
            calculable: !0,
            xAxis: [{
              type: "category",
              data: ["户主", "家属", "租客", "其他"]
            }],
            yAxis: [{
              type: "value",
              minInterval: 1,
              max: function max(t) {
                return t.max + 1;
              }
            }],
            series: [{
              type: "bar",
              barWidth: 30,
              data: this.peopleTrendList,
              itemStyle: {
                normal: {
                  color: "#3AA0FF"
                }
              }
            }]
          });
        },
        getOpenDoor: function getOpenDoor() {
          this.openDoorChart = this.$echarts.init(document.getElementById("openDoorChart"));
          var t = {
            color: ["#6cacde", "rgb(200,200,169)"],
            tooltip: {
              trigger: "axis",
              formatter: "{b}时<br/>{a} : {c}"
            },
            grid: {
              top: "3%",
              left: "1%",
              right: "1%",
              bottom: "3%",
              containLabel: !0
            },
            toolbox: {},
            xAxis: {
              type: "category",
              boundaryGap: !1,
              data: this.openDoorIndex.length > 0 ? this.openDoorIndex : [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
            },
            yAxis: {
              type: "value",
              minInterval: 1,
              max: function max(t) {
                return t.max + 2;
              }
            },
            series: [{
              name: "次数",
              type: "line",
              data: this.openDoorList
            }]
          };
          this.openDoorChart.setOption(t);
        },
        seeContent: function seeContent(t) {
          this.contentMsg = t, this.recordContentPop = !0;
        }
      }
    },
        d = function d() {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("div", {
        staticClass: "content-wrapper home"
      }, [t._m(0), t._v(" "), a("section", {
        staticClass: "content container-fluid"
      }, [a("div", {
        staticClass: "row wrapper-boox"
      }, [a("div", {
        staticClass: "col-lg-3 col-xs-6 wrapper_top",
        staticStyle: {
          "padding-right": "0px"
        }
      }, [a("div", {
        staticClass: "small-box bg-aqua",
        staticStyle: {
          backg: "linear-gradient(to right, #373b44, #4286f4)"
        }
      }, [a("div", {
        staticClass: "inner",
        staticStyle: {
          backg: "linear-gradient(to right, #373b44, #4286f4)"
        }
      }, [a("div", [a("h3", [a("span", {
        attrs: {
          id: "companyTotal"
        }
      }, [t._v(t._s(t.houseNum))])]), t._v(" "), a("p", [t._v("房屋数")])])]), t._v(" "), t._m(1), t._v(" "), a("a", {
        staticClass: "small-box-footer"
      }), t._v(" "), t._m(2)])]), t._v(" "), a("div", {
        staticClass: "col-lg-3 col-xs-6 wrapper_top",
        staticStyle: {
          "padding-right": "0px",
          "padding-left": "15px !important"
        }
      }, [a("div", {
        staticClass: "small-box bg-yellow",
        staticStyle: {
          backg: "linear-gradient(to right, #373b44, #4286f4)"
        }
      }, [a("div", {
        staticClass: "inner",
        staticStyle: {
          backg: "linear-gradient(to right, #373b44, #4286f4)"
        }
      }, [a("div", [a("h3", [a("span", {
        attrs: {
          id: "personTotal"
        }
      }, [t._v(t._s(t.householdNum))])]), t._v(" "), a("p", [t._v("住户数")])])]), t._v(" "), t._m(3), t._v(" "), a("a", {
        staticClass: "small-box-footer"
      }), t._v(" "), t._m(4)])]), t._v(" "), a("div", {
        staticClass: "col-lg-3 col-xs-6 wrapper_top",
        staticStyle: {
          "padding-right": "0px"
        }
      }, [a("div", {
        staticClass: "small-box bg-red",
        staticStyle: {
          backg: "linear-gradient(to right, #373b44, #4286f4)"
        }
      }, [a("div", {
        staticClass: "inner",
        staticStyle: {
          backg: "linear-gradient(to right, #373b44, #4286f4)"
        }
      }, [a("div", [a("h3", [a("span", {
        attrs: {
          id: "todayVisitor"
        }
      }, [t._v(t._s(t.employeeNum))])]), t._v(" "), a("p", [t._v("员工数")])])]), t._v(" "), t._m(5), t._v(" "), a("a", {
        staticClass: "small-box-footer"
      }), t._v(" "), t._m(6)])]), t._v(" "), a("div", {
        staticClass: "col-lg-3 col-xs-6  wrapper_top"
      }, [a("div", {
        staticClass: "small-box bg-green",
        staticStyle: {
          backg: "linear-gradient(to right, #373b44, #4286f4)"
        }
      }, [a("div", {
        staticClass: "inner",
        staticStyle: {
          backg: "linear-gradient(to right, #373b44, #4286f4)"
        }
      }, [a("div", [a("h3", [a("span", {
        attrs: {
          id: "totalDeviceTotalSpan"
        }
      }, [t._v(t._s(t.deviceNum))])]), t._v(" "), a("p", [t._v("设备数")])])]), t._v(" "), t._m(7), t._v(" "), a("a", {
        staticClass: "small-box-footer"
      }), t._v(" "), t._m(8)])]), t._v(" "), a("div", {
        staticClass: "col-lg-3 col-xs-6  wrapper_top"
      }, [a("div", {
        staticClass: "small-box bg-green",
        staticStyle: {
          backg: "linear-gradient(to right, #373b44, #4286f4)"
        }
      }, [a("div", {
        staticClass: "inner",
        staticStyle: {
          backg: "linear-gradient(to right, #373b44, #4286f4)"
        }
      }, [a("div", [a("h3", [a("span", {
        attrs: {
          id: "totalDeviceTotalSpan"
        }
      }, [t._v(t._s(t.auditCount))])]), t._v(" "), a("p", [t._v("待审核")])])]), t._v(" "), t._m(9), t._v(" "), a("a", {
        staticClass: "small-box-footer"
      }), t._v(" "), t._m(10)])])]), t._v(" "), a("div", {
        staticClass: "row"
      }, [a("div", {
        staticClass: "col-lg-9 col-xs-9"
      }, [t._m(11), t._v(" "), a("div", {
        staticClass: "row"
      }, [a("div", {
        staticClass: "col-lg-12",
        staticStyle: {
          "padding-right": "0px"
        }
      }, [a("div", {
        staticClass: "box"
      }, [a("div", {
        staticClass: "box-header with-border",
        staticStyle: {
          height: "42px"
        }
      }, [a("h3", {
        staticClass: "box-title select-date"
      }, [a("span", [t._v("识别次数统计")]), t._v(" "), a("el-date-picker", {
        attrs: {
          clearable: !1,
          small: "small",
          align: "right",
          type: "date",
          format: "yyyy-MM-dd",
          "value-format": "yyyy-MM-dd"
        },
        on: {
          change: t.changeTime
        },
        model: {
          value: t.openDoorForm.startTime,
          callback: function callback(e) {
            t.$set(t.openDoorForm, "startTime", e);
          },
          expression: "openDoorForm.startTime"
        }
      })], 1), t._v(" "), a("span", {
        attrs: {
          id: "person_title_text"
        }
      })]), t._v(" "), t._m(12)])])])]), t._v(" "), a("div", {
        staticClass: "col-lg-3 col-xs-3"
      }, [a("div", {
        staticClass: "box",
        staticStyle: {
          height: "750px"
        }
      }, [t._m(13), t._v(" "), a("ul", {
        staticClass: "person-list"
      }, t._l(t.realTimeList, function (e, i) {
        return i < 8 ? a("li", {
          key: i
        }, [a("div", {
          staticClass: "list-left",
          staticStyle: {
            cursor: "pointer"
          },
          on: {
            click: function click(a) {
              t.seeContent(e);
            }
          }
        }, [e.comparePic ? a("el-image", {
          staticStyle: {
            width: "60px",
            height: "60px"
          },
          attrs: {
            src: t.imgurl + "/file/download?path=" + e.comparePic,
            fit: "cover"
          }
        }) : a("el-image", {
          staticStyle: {
            width: "60px",
            height: "60px"
          },
          attrs: {
            src: t.imgurl + "/file/download?path=" + e.snapPic,
            fit: "cover"
          }
        })], 1), t._v(" "), a("div", {
          staticClass: "list-right"
        }, [a("p", {
          attrs: {
            title: e.snapTime
          }
        }, [t._v("时间：" + t._s(e.snapTime))]), t._v(" "), a("p", [1 == e.personType ? a("span", [t._v("白名单 ")]) : 2 == e.personType ? a("span", [t._v("黑名单 ")]) : 3 == e.personType ? a("span", [t._v("访客 ")]) : 4 == e.personType ? a("span", [t._v("陌生人 ")]) : t._e(), t._v(" "), a("span", [t._v(t._s(e.personName))])]), t._v(" "), a("p", [t._v(t._s(e.deviceName))])])]) : t._e();
      }))])])])]), t._v(" "), a("el-dialog", {
        staticClass: "el-dialog-reset",
        attrs: {
          title: "记录详情",
          visible: t.recordContentPop,
          width: "900px"
        },
        on: {
          "update:visible": function updateVisible(e) {
            t.recordContentPop = e;
          }
        }
      }, [a("div", {
        staticClass: "record-pop",
        staticStyle: {
          padding: "0px"
        }
      }, [a("div", {
        staticClass: "record-pop-left"
      }, [a("p", [a("span", [t._v("姓名：")]), t._v(t._s(t.contentMsg.personName))]), t._v(" "), a("p", [a("span", [t._v("证件号：")]), t._v(t._s(t.contentMsg.personIdNum))]), t._v(" "), a("p", [a("span", [t._v("核验时间：")]), t._v(t._s(t.contentMsg.snapTime))])]), t._v(" "), a("div", {
        staticClass: "record-pop-right"
      }, [a("p", [a("span", [t._v("性别：")]), t._v(" "), 0 == t.contentMsg.personGender ? a("label") : t._e(), t._v(" "), 1 == t.contentMsg.personGender ? a("label", [t._v("男")]) : 2 == t.contentMsg.personGender ? a("label", [t._v("女")]) : 3 == t.contentMsg.personGender ? a("label", [t._v("未知")]) : t._e()]), t._v(" "), a("p", [a("span", [t._v("民族：")]), t._v(t._s(t.contentMsg.personEthnic))]), t._v(" "), a("p", [a("span", [t._v("设备名称：")]), t._v(t._s(t.contentMsg.deviceName))])]), t._v(" "), a("div", {
        staticClass: "record-pop-left"
      }, [t.contentMsg.comparePic ? a("el-image", {
        staticStyle: {
          width: "100px"
        },
        attrs: {
          src: t.imgurl + "/file/download?path=" + t.contentMsg.comparePic,
          "preview-src-list": [t.imgurl + "/file/download?path=" + t.contentMsg.comparePic]
        }
      }) : t.contentMsg.snapPic ? a("el-image", {
        staticStyle: {
          width: "100px"
        },
        attrs: {
          src: t.imgurl + "/file/download?path=" + t.contentMsg.snapPic,
          "preview-src-list": [t.imgurl + "/file/download?path=" + t.contentMsg.snapPic]
        }
      }) : t._e()], 1)]), t._v(" "), a("span", {
        staticClass: "dialog-footer",
        attrs: {
          slot: "footer"
        },
        slot: "footer"
      }, [a("el-button", {
        on: {
          click: function click(e) {
            t.recordContentPop = !1;
          }
        }
      }, [t._v("取 消")])], 1)])], 1);
    },
        p = [function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("section", {
        staticClass: "content-header"
      }, [a("h1", {
        staticClass: "nice"
      }, [t._v("\n      仪表板\n    ")]), t._v(" "), a("ol", {
        staticClass: "breadcrumb"
      }, [a("li", [a("a", {
        attrs: {
          href: "/"
        }
      }, [a("i", {
        staticClass: "fa fa-home"
      }), t._v(" 首页\n          ")])]), t._v(" "), a("li", [a("i", {
        staticClass: "glyphicon glyphicon-dashboard"
      }), t._v(" 仪表板\n        ")])])]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("div", {
        staticClass: "icon"
      }, [a("span", {
        staticClass: "glyphicon glyphicon-home"
      })]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("a", {
        staticClass: "small-box-footer",
        attrs: {
          href: "#"
        }
      }, [a("i")]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("div", {
        staticClass: "icon"
      }, [a("span", {
        staticClass: "glyphicon glyphicon-user"
      })]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("a", {
        staticClass: "small-box-footer",
        attrs: {
          href: "#"
        }
      }, [a("i")]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("div", {
        staticClass: "icon"
      }, [a("span", {
        staticClass: "glyphicon glyphicon-user"
      })]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("a", {
        staticClass: "small-box-footer",
        attrs: {
          href: "#"
        }
      }, [a("i")]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("div", {
        staticClass: "icon"
      }, [a("span", {
        staticClass: "glyphicon glyphicon-blackboard"
      })]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("a", {
        staticClass: "small-box-footer",
        attrs: {
          href: "#"
        }
      }, [a("i")]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("div", {
        staticClass: "icon"
      }, [a("span", {
        staticClass: "glyphicon glyphicon-blackboard"
      })]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("a", {
        staticClass: "small-box-footer",
        attrs: {
          href: "#"
        }
      }, [a("i")]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("div", {
        staticClass: "row"
      }, [a("div", {
        staticClass: "col-lg-4 col-md-12",
        staticStyle: {
          "padding-right": "0px"
        }
      }, [a("div", {
        staticClass: "box"
      }, [a("div", {
        staticClass: "box-header with-border",
        staticStyle: {
          height: "42px"
        }
      }, [a("h3", {
        staticClass: "box-title select-date"
      }, [a("span", [t._v("住户构成")])]), t._v(" "), a("span", {
        attrs: {
          id: "person_title_text"
        }
      })]), t._v(" "), a("div", {
        staticClass: "box-body"
      }, [a("div", {
        staticClass: "row"
      }, [a("div", {
        staticClass: "col-md-12"
      }, [a("div", {
        staticClass: "chart",
        staticStyle: {
          height: "300px",
          "padding-right": "10px"
        },
        attrs: {
          id: "chartTodayRecogHour"
        }
      })])])])])]), t._v(" "), a("div", {
        staticClass: "col-lg-8 col-md-12",
        staticStyle: {
          "padding-right": "0px"
        }
      }, [a("div", {
        staticClass: "box"
      }, [a("div", {
        staticClass: "box-header with-border",
        staticStyle: {
          height: "42px"
        }
      }, [a("h3", {
        staticClass: "box-title select-date"
      }, [a("span", [t._v("今日统计")])]), t._v(" "), a("span", {
        attrs: {
          id: "person_title_text"
        }
      })]), t._v(" "), a("div", {
        staticClass: "box-body"
      }, [a("div", {
        staticClass: "row"
      }, [a("div", {
        staticClass: "col-md-12"
      }, [a("div", {
        staticClass: "chart",
        staticStyle: {
          height: "300px",
          "padding-right": "10px"
        },
        attrs: {
          id: "todayData"
        }
      })])])])])])]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("div", {
        staticClass: "box-body"
      }, [a("div", {
        staticClass: "row"
      }, [a("div", {
        staticClass: "col-md-12"
      }, [a("div", {
        staticClass: "chart",
        staticStyle: {
          height: "300px",
          "padding-right": "10px"
        },
        attrs: {
          id: "openDoorChart"
        }
      })])])]);
    }, function () {
      var t = this,
          e = t.$createElement,
          a = t._self._c || e;
      return a("div", {
        staticClass: "box-header with-border",
        staticStyle: {
          height: "42px"
        }
      }, [a("h3", {
        staticClass: "box-title"
      }, [t._v("实时记录")])]);
    }],
        h = {
      render: d,
      staticRenderFns: p
    },
        m = h,
        u = a("VU/8"),
        v = i,
        g = u(c, m, !1, v, null, null);

    e["default"] = g.exports;
  }
});