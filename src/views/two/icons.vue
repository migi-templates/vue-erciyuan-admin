<template>
  <div class="icons-container px-10px bg-#fff overflow-auto h-full">
    <div class="grid_self">
      <div v-for="item of svg_icons" :key="item" @click="handleClipboard(generateIconCode(item), $event)">
        <el-tooltip effect="dark" :content="generateIconCode(item)" placement="top">
          <div class="icon-item">
            <svg-icon :icon-class="item" :class="{ 'bg-#eee': item == 'buncing-ball' }" />
            <div class="mt-10px text-16px">{{ item }}</div>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
const { copy } = useClipboard()
defineOptions({
  name: 'Icons',
  inheritAttrs: false,
})

const svgList = import.meta.glob('@/assets/icons/**.svg')
const svg_icons = Object.keys(svgList).map((v) => {
  return v.slice(v.lastIndexOf('/') + 1, -4)
})

function generateIconCode(symbol) {
  return `<svg-icon icon-class="${symbol}" />`
}

function handleClipboard(text, event) {
  copy(text)
    .then(() => {
      ElMessage.success('Copy successfully')
    })
    .catch(() => {
      ElMessage.warning('Copy failed')
    })
}
</script>

<style scoped>
.icons-container .grid_self {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}
.icons-container .icon-item {
  float: left;
  width: 100px;
  height: 85px;
  margin: 20px;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
}
</style>
