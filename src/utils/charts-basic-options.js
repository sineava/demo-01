// 饼图option
class Pie {
  constructor(arr = []) {
    this.option = arr.length ? {
      tooltip: {
        trigger: 'item',
        confine: true,
        axisPointer: {
          type: 'shadow'
        },
        formatter: '{b}<br />{d}%'
      },
      legend: {
        type: 'scroll',
        left: 'center',
      },
      series: [
        {
          data: arr,
          type: 'pie',
          center: ['50%', '50%'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label:{
            normal:{
              show: true,
              position: 'inner',
              textStyle : {
                fontWeight : 500,
                fontSize : 14,
                color: '#fff'
              },
              formatter:'{d}%'
            }
          }
        }
      ]
    } : {}
  }
}

// 圆角环形图option
class Ring {
  constructor(arr = [],title='') {
    this.option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        type: 'scroll',
        left: 'center',
      },
      series: [
        {
          name: title,
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: arr
        }
      ]
    }
  }
}

// 柱状图option
class Bar {
  constructor(xArr = [], seriesArr = [],grid='',rotate=0,Yname='',Xname='',) {
    grid = grid || {
      top: '10',
      left: '4%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
    let dataZoom = []
    if (xArr.length>25){
      dataZoom = [{
        type:'slider',
        show:true,
        height:'5',
        bottom:'15px',
        borderColor: 'transparent',
        backgroundColor: '#e2e2e2',
        // 拖拽手柄样式 svg 路径
        handleIcon: 'M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z',
        handleColor: '#aab6c6',
        handleSize: 20,
        handleStyle: {
          borderColor: '#aab6c6',
          shadowBlur: 4,
          shadowOffsetX: 1,
          shadowOffsetY: 1,
          shadowColor: '#e5e5e5'
        },
        start: 0,
        end: (25 / xArr.length) * 100
      }]
    }
    this.option = {
      tooltip: {
        axis: 'item'
      },
      grid: grid,
      dataZoom,
      xAxis: {
        name: Xname,
        type: 'category',
        nameTextStyle: {
          color: "#aaa",
          nameLocation: "start",
        },
        data: xArr,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
          rotate: rotate,
          formatter: function (value) {
            if (value.length > 5) {
              return `${value.slice(0, 6)}..`
            }
            return value
          }
        }
      },
      yAxis: {
        name: Yname,
        type: 'value',
        nameTextStyle: {
          color: "#aaa",
          nameLocation: "start",
        },
        axisLine:{
          show:true
        },
      },
      series: [{
        data: seriesArr,
        type: 'bar',
        barMaxWidth: 30
      }]
    }
  }
}

// 柱状图option-横向
class HorBar {
  constructor(yArr = [], seriesArr = [],grid={
    top: '10',
    left: '4%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },rotate=0,Yname='',Xname='',) {
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: grid,
      xAxis: {
        name: Xname,
        type: 'value',
        boundaryGap: [0, 0.01],
        nameTextStyle: {
          color: "#aaa",
          nameLocation: "start",
        },
        axisLine:{
          show:true
        },
      },
      yAxis: {
        name: Yname,
        type: 'category',
        data: yArr,
        nameTextStyle: {
          color: "#aaa",
          nameLocation: "start",
        },
        axisLine:{
          show:true
        },
        axisLabel: {
          interval: 0,
          rotate: rotate,
          formatter: function (value) {
            if (value.length > 5) {
              return `${value.slice(0, 6)}...`
            }
            return value
          }
        }
      },
      series: [
        {
          type: 'bar',
          data: seriesArr,
          barMaxWidth: 40
        }
      ]
    }
  }
}

// 折线图
class Line {
  constructor(lengendArr = [], xArr = [], seriesArr = []) {
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        type: 'scroll',
        data: lengendArr
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xArr
      },
      yAxis: {
        type: 'value'
      },
      series: seriesArr.map(x => ({ ...x, type: 'line', barMaxWidth: 30 }))
    } 
  }
}

// 平滑折线图
class SmoothLine {
  constructor(xArr = [], seriesArr = []) {
    console.log(xArr)
    this.option = (xArr.length || seriesArr.length) ? {
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: xArr
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: seriesArr,
        type: 'line',
        smooth: true
      }]
    }: {}
  }
}

// 多数据柱状图
class MultiBar {
  constructor(lengendArr = [], xArr = [], seriesArr = []) {
    this.option = (lengendArr.length || xArr.length || seriesArr.length) ? {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: lengendArr
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      xAxis: {
        type: 'category',
        data: xArr
      },
      series: seriesArr.map(x => ({ ...x, type: 'bar', barMaxWidth: 30 }))
    } : {}
  }
}

// 地图
class MapChart {
  constructor(arr = []) {
    this.option = arr.length ? {
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        min: 1,
        max: 5,
        text: ['High', 'Low'],
        realtime: false,
        show:false,
        calculable: true,
        inRange: {
          color: ['#FF0000', '#60aef2', '#f27900', '#60aef2', '#0e6f5d']
        }
      },
      series: [
        {
          name: '重庆市风险形势',
          type: 'map',
          mapType: 'Chongqing', // 自定义扩展图表类型
          roam: true,
          zoom: 1.3,
          label: {
            show: true,
            fontSize: 8
          },
          data: arr
        }
      ]
    } : {}
  }
}

export {
  Pie,
  Ring,
  Bar,
  HorBar,
  Line,
  SmoothLine,
  MultiBar,
  MapChart
}
