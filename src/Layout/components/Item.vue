<template>
  <SvgIcon v-if="icon" :icon-class="icon" class="text-16px" />
  <span v-if="title" class="ml-5px">{{ title }}</span>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
  color: currentcolor;
}
</style>
