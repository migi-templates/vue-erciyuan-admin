<template>
  <div class="p-10px">
    <div class="font-600 text-20px mb-20px">动态表格拖拽排序</div>
    <el-table :data="tableData" style="width: 100%" row-key="id" ref="table" id="capture">
      <el-table-column v-bind="{ ...item }" v-for="item in columns" :key="item.prop">
        <!-- 自定义内容 -->
        <template #default="{ row }">
          <span v-if="item.prop === 'date'">日期 {{ row.date }} </span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="mt-20px">
      <el-button @click="captureScreen('download')">下载table图</el-button>
      <el-button @click="captureScreen('copy')">复制table图</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
// 拖拽排序
import Sortable from 'sortablejs'
import html2canvas from 'html2canvas'

// 动态table
const columns = [
  {
    prop: 'date',
    label: '日期',
    width: 200,
    align: 'center',
  },
  {
    prop: 'name',
    label: '名称',
    width: 100,
    align: 'center',
  },
  {
    prop: 'address',
    label: '地址',
    align: 'center',
  },
]

// table数据
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    id: 1,
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    id: 2,
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    id: 3,
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    id: 4,
  },
]

onMounted(() => {
  rowDrop()
})

const table = ref(null)
const rowDrop = () => {
  let tbody = table.value.$el.querySelector('.el-table__body-wrapper tbody')

  Sortable.create(tbody, {
    animation: 200,
    onEnd: ({ newIndex, oldIndex }) => {
      const currRow = tableData.splice(oldIndex, 1)[0]
      tableData.splice(newIndex, 0, currRow)
    },
  })
}

const captureScreen = (type) => {
  const element = table.value.$el

  const fn = {
    copy: () => {
      // 获取需要截图的元素
      html2canvas(element).then((canvas) => {
        canvas.toBlob((blob) => {
          // 复制到剪贴板
          navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        })
      })
    },
    download: () => {
      // 获取需要截图的元素
      html2canvas(element).then((canvas) => {
        // 将canvas转换为Blob对象
        canvas.toBlob((blob) => {
          // 创建一个a标签
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)

          // 设置下载属性，并指定文件名
          link.download = 'screenshot.png'

          // 添加到页面并模拟点击下载
          document.body.appendChild(link)
          link.click()

          // 清理对象URL以释放内存
          URL.revokeObjectURL(link.href)
        })
      })
    },
  }
  nextTick(() => {
    fn[type]()
  })
}
</script>

<style></style>
