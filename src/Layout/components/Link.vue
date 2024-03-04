<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot></slot>
  </a>
  <template v-else>
    <slot :push="push"></slot>
  </template>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { isExternal } from '@/utils/index'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})

const router = useRouter()
function push() {
  router.push(props.to).catch((err) => {
    console.error(err)
  })
}
</script>
