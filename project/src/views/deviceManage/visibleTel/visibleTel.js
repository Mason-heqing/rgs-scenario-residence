import echarts from 'echarts'
export default {
  name: 'home',
  data() {
    return {
      msg: '设备列表'
    }
  },
  watch: {

  },
  filters: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    drawChart() {
      console.log(122)
      var chartDeviceOnlineRate = echarts.init(document.getElementById('charts'));
      var optionchartDeviceOnlineRate = {
        //color: ['#E16757','#61A5E8','#7ECF51','#EECB5F','#E3935D','#6cacde','rgb(200,200,169)'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data: ['其它', '面试', '商务', '快递', '外卖', '送水', '送货', '装修']
        },
        series: [
          {
            name: '访客构成',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '24',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 23, name: '其它' },
              { value: 44, name: '面试' },
              { value: 55, name: '商务' },
              { value: 66, name: '快递' },
              { value: 77, name: '外卖' },
              { value: 11, name: '送水' },
              { value: 22, name: '送货' },
              { value: 99, name: '装修' }
            ]
          }
        ]
      };
      chartDeviceOnlineRate.setOption(optionchartDeviceOnlineRate);
    },
  },
}