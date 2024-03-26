<template>
  <div class="p-10px">
    <chartpanel title="单位户" class="w-30vw h-40vh pb-10px">
      <v-chart ref="countchart" style="min-height: 19vh" :option="countchartoption"></v-chart>
    </chartpanel>
  </div>
</template>

<script setup>
import { reactive, onMounted, onBeforeUnmount, ref } from 'vue'

import chartutils from '@/utils/chartutils'

let countchart = ref();
let countchartoption = reactive({}) // 自定义配置
let countchartcategory = reactive(['地市营销数据', '行业专卖数据'])
let countchartvalue = reactive([])
onMounted(() => {
  initCharts()
  startRefreshChart()

  //图表尺寸自适应
  window.onresize = () => {
    countchart && countchart.value?.resize();
  }
})

//初始化图标
const initCharts = () => {

  countchartcategory.forEach((item, index) => {
    countchartvalue.push(chartutils.random(100))
  })
  chartutils.initBarChart(countchartoption, countchartcategory, countchartvalue, '#0baefd')
}

onBeforeUnmount(() => {
  timer && clearInterval(timer)
})


let timer = null
const startRefreshChart = () => {
  timer && clearInterval(timer)

  //获取刷新周期，TODO 配置变动时，此处需自动更新
  let refreshtime = 10 * 1000
  timer = setInterval(function () {
    countchartvalue.forEach((item, index) => {
      countchartvalue[index] = chartutils.random(100);
    })
    console.log(121212);
  }, refreshtime)

}
</script>

<style></style>
