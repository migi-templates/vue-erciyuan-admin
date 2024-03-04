<template>
  <div class="p-10px w-full overflow-hidden h-full" :style="{ background: `url(${bgImg}) no-repeat center` }">
    <img :src="url" class="w-150px h-200px object-cover" v-for="url in imgList" :key="url" alt="" />
    <router-link to="/system" class="text-30px">切换</router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getUrl } from '@/api/home.js'

const imgList = ref([])

const bgImg = ref('https://image.qwq.link/images/2024/02/23/twitter_kakusatou_3333_20231107-130401_1721876155857535163_photo.md.jpg')
onMounted(() => {
  getUrl().then((res) => {
    imgList.value = res.data
  })
})
</script>

<style></style>
