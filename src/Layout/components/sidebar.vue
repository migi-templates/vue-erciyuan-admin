<template>
  <el-menu :default-active="currRoute.path" class="el-menu-vertical-demo" :collapse="store.isCollapse">
    <sidebar-item v-for="route in store.concatRoutes" :key="route.path" :item="route" :base-path="resolvePath(route.path)" />
  </el-menu>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import path from 'path-browserify'
import { layoutStore } from '@/store/layout'
import { isExternal } from '@/utils/index'
import { useRoute } from 'vue-router'
const currRoute = useRoute()
const store = layoutStore()

/**
 * 解析路径
 *
 * @param routePath 路由路径
 */
function resolvePath(routePath) {
  if (isExternal(routePath)) {
    return routePath
  }

  // 完整路径 = 父级路径(/level/level_3) + 路由路径
  const fullPath = path.resolve('/', routePath) // 相对路径 → 绝对路径
  return fullPath
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
