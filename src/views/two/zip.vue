<template>
  <div class="p-10px bg-#fff h-full overflow-auto">
    <el-button @click="downloadImg">批量下载图片成zip</el-button>
    <el-button class="ml-25px text-16px">(点击图片下载图片)</el-button>
    <div class="flex gap-10px flex-wrap mb-20px lg:content-w mx-auto">
      <img lazy v-for="url in store.imgList" @click="xia(url.url, url.url)" :key="url.url" :src="url.url" class="img flex-1 h-240px object-cover" alt="" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { generalStore } from '@/store/general.js'
import JSZip from 'jszip'
// import { saveAs } from 'file-saver'
import gsap from 'gsap'

const store = generalStore()

// 批量下载图
const downloadImg = () => {
  let zip = new JSZip()

  let promises = []

  // 下载图片并添加到JSZip实例中
  store.imgList.forEach((url, index) => {
    promises.push(
      fetch(url.url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.blob()
        })
        .then((blob) => {
          // 添加图片到JSZip实例中
          zip.file('image' + (index + 1) + '.jpg', blob)
        })
        .catch((error) => console.error('Error downloading image:', error))
    )
  })

  // 当所有图片都下载完成后，生成zip文件并提供下载链接
  Promise.all(promises).then(function () {
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // 创建下载链接
      var link = document.createElement('a')
      link.href = URL.createObjectURL(content)
      link.download = 'images.zip'
      link.click()
    })
  })
}
// 单量下载
const xia = (imgsrc, fileName) => {
  fetch(imgsrc)
    .then((response) => response.blob())
    .then((blob) => {
      const imgUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = imgUrl
      a.download = fileName.slice(-10)
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(imgUrl)
    })
}

onMounted(() => {
  const lazyImages = document.querySelectorAll('.img')

  lazyImages.forEach((div, index) => {
    gsap.from(div, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      delay: index * 0.15,
      scrollTrigger: div,
    })
  })
})
</script>

<style></style>
