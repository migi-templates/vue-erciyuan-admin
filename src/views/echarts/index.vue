<template>
  <div class="p-10px">
    <chartpanel title="单位户" class="w-30vw h-30vh">

      <v-chart ref="countchart" style="min-height: 19vh" :option="countchartoption"></v-chart>
    </chartpanel>
  </div>
</template>

<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'

import chartutils from '@/utils/chartutils'
let countchartoption = reactive({})
let countchartcategory = reactive(['物管平台数据', '指挥调度中心', '经营决策系统数据', '物流综合管控平台数据', '其他业务数据', '省营销数据', '地市营销数据', '行业专卖数据'])
let countchartvalue = reactive([])
onMounted(() => {
  initCharts()
  // startRefreshChart()
})

//初始化图标
const initCharts = () => {

  countchartcategory.forEach((item, index) => {
    countchartvalue.push(chartutils.random(100))
  })
  chartutils.initBarChart(countchartoption, countchartcategory, countchartvalue, '#0baefd')
}

// onBeforeUnmount(() => {
//   timer && clearInterval(timer)
// })
// let timer = null
// const startRefreshChart = () => {
//   timer && clearInterval(timer)

//   //获取刷新周期，TODO 配置变动时，此处需自动更新
//   let refreshtime = 60 * 1000
//   timer = setInterval(function () {

//   }, refreshtime)
// }
</script>

<style></style>
