export default (radarAry, radarDimension) => ({
  title: {
    text: null
  },
  tooltip: {},
  legend: {
    data: []
  },
  radar: {
    name: {
      textStyle: {
        color: '#7777A4',
        fontSize: 30
      }
    },
    indicator: radarDimension,
    triggerEvent: true
  },
  series: [{
    name: '',
    type: 'radar',
    symbol: 'none', // 去掉图表中各个图区域的边框线拐点
    areaStyle: {
      normal: {
        areaStyle: {
          type: 'default'
        }
      }
    },
    itemStyle: {
      normal: {
        color: 'rgba(0,0,0,0)', // 图表中各个图区域的边框线拐点颜色
        lineStyle: {
          color: '#6681FF' // 图表中各个图区域的边框线颜色
        }
      }
    },
    data: [{
      value: radarAry,
      name: '',
      areaStyle: {
        normal: {
          type: 'default',
          color: '#6681FF',
          opacity: 0.8 // 图表中各个图区域的透明度
        }
      }
    }]
  }]
})
