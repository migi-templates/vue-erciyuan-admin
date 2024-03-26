import * as echarts from 'echarts'

const colors = [
  '#9689FF',
  '#FF8A26',
  '#5FB878',
  '#73c0de',
  '#4ED33C',
  '#FF5252',
  '#01AAED',
  '#FF5722',
  '#6648FF',
  '#2A8BFD',
  '#BAFF7F',
  '#00FAC1',
  '#00CAFF',
  '#FDE056',
  '#fac858',
  '#ee6666',
  '#91cc75',
  '#38cafb',
  '#4caff9',
  '#4adeca',
  '#2aa7ee',
  '#0270f2',
  '#488cf7',
  '#2ca1ff',
  '#0adbfa',
  '#febe13',
  '#65e5dd',
  '#7b2cff',
  '#fd5151',
  '#f071ff',
  '#85f67a',
  '#0baefd',
  '#fdcd0b',
  '#0bfdab',
  '#ff5353',
  '#ff72cb',
  '#8488ff',
]

export default {
  /**
   * 创建图表标题
   * @param {Object} title
   */
  createChartTitle: (title) => {
    return {
      show: true,
      text: title,
      textStyle: {
        color: '#ddd',
        fontWeight: 'normal',
      },
      x: 'center',
      y: '5vh',
    }
  },
  /**
   * 创建图表背景
   * @param {Object} title
   */
  createChartGaid: (left, right, top, bottom) => {
    return {
      left: left ? left : '30vh',
      right: right ? right : '10vh',
      top: top ? top : '15vh',
      bottom: bottom ? bottom : '40vh',
    }
  },
  /**
   * 创建图表背景
   * @param {Object} title
   */
  createChartBaseOption: function (title, left, right, top, bottom, categorys) {
    return {
      title: this.createChartTitle(title),
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      grid: this.createChartGaid(left, right, top, bottom),
      xAxis: {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: this.getChartXColor(),
          },
        },
        axisLabel: {
          color: this.getChartXTextColor(),
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: categorys,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: this.getChartYTextColor(),
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: this.getChartXColor(),
          },
        },
        splitLine: {
          lineStyle: {
            color: this.getChartYColor(),
            type: 'dashed',
          },
        },
      },
    }
  },
  /**
   * 获取x轴颜色
   * @param {Object} title
   */
  getChartXColor: () => {
    return '#ffffff88'
  },
  /**
   * 获取x轴文本颜色
   * @param {Object} title
   */
  getChartXTextColor: () => {
    return '#ffffff88'
  },
  /**
   * 获取y轴颜色
   * @param {Object} title
   */
  getChartYColor: () => {
    return '#ffffff88'
  },
  /**
   * 获取y轴文本颜色
   * @param {Object} title
   */
  getChartYTextColor: () => {
    return '#ffffff88'
  },

  initPieChart: function (option, category, values, title) {
    let datas = []
    category.forEach((item, index) => {
      datas.push({
        value: values[index],
        name: item,
      })
    })
    let option_ = {
      color: colors,
      title: title ? this.createChartTitle(title) : null,
      grid: {
        top: title ? '10%' : '0%',
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        show: false,
      },
      legend: {
        right: '0',
        y: 'center',
        data: category,
        orient: 'vertical',
        textStyle: {
          color: '#fff',
        },
        itemGap: 10,
      },
      series: [
        {
          name: '告警级别分布',
          type: 'pie',
          center: ['28%', title ? '55%' : '50%'],
          radius: ['75%', '55%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 15,
            borderColor: 'rgba(200,200,200,0.3)',
            borderWidth: 0,
            shadowColor: 'rgba(200, 200, 200, 0.5)',
            shadowBlur: 5,
          },
          label: {
            show: true,
            color: '#fff',
            position: 'outside',
            fontSize: 14,
            textBorderWidth: 0,
            // textShadowBlur:0
          },
          labelLine: {
            show: true,
            length: 20,
            length2: 25,
            lineStyle: {
              width: 2,
            },
          },
          data: datas,
        },
      ],
    }
    for (let key in option_) {
      option[key] = option_[key]
    }
  },
  initPieFullChart: function (option, category, values, title) {
    let datas = []
    category.forEach((item, index) => {
      datas.push({
        value: values[index],
        name: item,
      })
    })
    let option_ = {
      color: colors,
      title: title ? this.createChartTitle(title) : null,
      grid: {
        top: title ? '10%' : '0%',
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        show: false,
      },
      legend: {
        right: '10',
        y: 'center',
        data: category,
        orient: 'vertical',
        textStyle: {
          color: '#fff',
        },
        itemGap: 10,
      },
      series: [
        {
          name: '告警级别分布',
          type: 'pie',
          center: ['35%', title ? '55%' : '50%'],
          // radius: ['85%', '15%'],
          avoidLabelOverlap: true,
          selectedOffset: 20,
          roseType: 'area',
          itemStyle: {
            borderRadius: 10,
            borderColor: 'rgba(200,200,200,0.3)',
            borderWidth: 0,
            shadowColor: 'rgba(200, 200, 200, 0.5)',
            shadowBlur: 5,
          },
          label: {
            show: true,
            color: '#fff',
            position: 'outside',
            fontSize: '1.4rem',
            textBorderWidth: 0,
            // textShadowBlur:0
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 20,
            lineStyle: {
              width: 1,
            },
          },
          data: datas,
        },
      ],
    }
    for (let key in option_) {
      option[key] = option_[key]
    }
  },

  //
  initBarChart: function (option, category, values, color, bgColor = '#303133', title) {
    let option_ = {
      backgroundColor: bgColor,
      title: title ? this.createChartTitle(title) : null,
      grid: this.createChartGaid('50vh', 0, title ? '35vh' : '20vh', '20vh'),
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: this.getChartXColor(),
          },
        },
        axisLabel: {
          color: this.getChartXTextColor(),
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: category,
        type: 'category',
      },
      yAxis: {
        axisLabel: {
          color: this.getChartYTextColor(),
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: this.getChartXColor(),
          },
        },
        splitLine: {
          lineStyle: {
            color: this.getChartYColor(),
            type: 'dashed',
          },
        },
        name: '',
      },
      series: [
        {
          name: '打分',
          data: values,
          type: 'bar',
          barWidth: '20vh',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: color + 'ff',
              },
              {
                offset: 1,
                color: color + 'bb',
              },
            ]),
            barBorderRadius: 20,
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: '1.2rem',
              color: '#fff',
            },
          },
        },
      ],
    }
    for (let key in option_) {
      option[key] = option_[key]
    }
  },
  initLineChart: function (option, category, values, color, title) {
    let option_ = {
      backgroundColor: '#000616',
      title: title ? this.createChartTitle(title) : null,
      grid: this.createChartGaid('30vw', null, '15vh', '20vh'),
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: this.getChartXColor(),
          },
        },
        axisLabel: {
          color: this.getChartXTextColor(),
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        smooth: true,
        data: category,
        boundaryGap: false,
        type: 'category',
      },
      yAxis: {
        axisLabel: {
          color: this.getChartYTextColor(),
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: this.getChartXColor(),
          },
        },
        splitLine: {
          lineStyle: {
            color: this.getChartYColor(),
            type: 'dashed',
          },
        },
        name: '',
      },
      series: [
        {
          name: '打分',
          data: values,
          type: 'line',
          itemStyle: {
            normal: {
              color: color, //改变折线点的颜色
              lineStyle: {
                width: 1,
                color: color, // 线条颜色
              },
            },
          },
          lineStyle: {
            width: 1,
            color: color,
          },
          areaStyle: {
            //折线图颜色半透明
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: color + 'ff', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: color + '00', // 0% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          label: {
            show: true,
            color: '#ddd',
            position: 'top',
          },
        },
      ],
    }
    for (let key in option_) {
      option[key] = option_[key]
    }
  },
  initRadarChart: function (option, category, values) {
    var indicator = []
    category.forEach((item, index) => {
      indicator.push({
        text: item,
        min: 0,
        max: 1000,
      })
    })
    let option_ = {
      hoverAnimation: true,
      tooltip: {
        trigger: 'item',
      },
      radar: {
        nameGap: 6, // 图中工艺等字距离图的距离
        radius: '80%',
        center: ['50%', '50%'],
        name: {
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        indicator: indicator,
        axisLine: {
          //指向外圈文本的分隔线样式
          lineStyle: {
            color: 'rgba(245, 166, 35, 0.3)',
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(245, 166, 35, 0.3)', // 分隔线颜色
            width: 1, // 分隔线线宽
          },
        },
        splitArea: {
          // 坐标轴在 grid 区域中的分隔区域，默认不显示。
          show: true,
          areaStyle: {
            // 分隔区域的样式设置。
            color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
          },
        },
      },
      series: [
        {
          type: 'radar',
          z: 1,
          data: [
            {
              value: values,
            },
          ],
          name: '告警数量',
          symbol: 'circle',
          symbolSize: 5,
          areaStyle: {
            normal: {
              color: 'rgba(245, 166, 35, 0.2)',
            },
          },
          itemStyle: {
            color: 'rgba(245, 166, 35, 1)',
            borderColor: 'rgba(245, 166, 35, 0.3)',
            borderWidth: 10,
          },
          lineStyle: {
            normal: {
              type: 'dashed',

              color: 'rgba(245, 166, 35, 1)',
              width: 1,
            },
          },
        },
      ],
    }
    for (let key in option_) {
      option[key] = option_[key]
    }
  },
  initPictorialBar: function (option, category, values) {
    let option_ = {
      backgroundColor: '#000616',
      grid: this.createChartGaid('40vh', '10vh', '20vh', '30vh'),
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: this.getChartXColor(),
          },
        },
        axisLabel: {
          color: this.getChartXTextColor(),
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: category,
        type: 'category',
      },
      yAxis: {
        axisLabel: {
          color: this.getChartYTextColor(),
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: this.getChartXColor(),
          },
        },
        splitLine: {
          lineStyle: {
            color: this.getChartYColor(),
            type: 'dashed',
          },
        },
        name: '',
      },
      series: [
        {
          type: 'pictorialBar',
          itemStyle: {
            normal: {
              color: '#FF5252',
            },
          },
          symbolRepeat: 'fixed',
          symbolMargin: 4,
          symbol: 'roundRect',
          symbolClip: true,
          symbolSize: [20, 8],
          symbolPosition: 'start',
          symbolOffset: [0, -1],
          barBorderRadius: 20,
          data: values,
          z: 0,
          zlevel: 8,
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: '1.2rem',
              color: '#fff',
            },
          },
        },
      ],
    }
    for (let key in option_) {
      option[key] = option_[key]
    }
  },

  random: (max) => {
    return (Math.random(max) * max).toFixed(0)
  },
}
