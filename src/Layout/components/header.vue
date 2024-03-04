<template>
  <el-radio-group v-model="store.isCollapse">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>
</template>

<script setup>
import { layoutStore } from '@/store/layout';
const store = layoutStore();
</script>

<style></style>
