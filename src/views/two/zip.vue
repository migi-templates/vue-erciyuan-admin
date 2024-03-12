<template>
  <div class="p-10px bg-#fff">
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
import { saveAs } from 'file-saver'
import { ElMessage } from 'element-plus'

import gsap from 'gsap'

const store = generalStore()

// 批量下载图
const downloadImg = () => {
  let imgBase64 = []
  let imageSuffix = [] // 图片后缀

  let zip = new JSZip()
  let img = zip.folder()
  for (let i = 0; i < store.imgList.length; i++) {
    // 获取每个图片的后缀
    let suffix = store.imgList[i].url.substring(store.imgList[i].url.lastIndexOf('.'))
    imageSuffix.push(suffix)

    getBase64(store.imgList[i].url).then(
      (base64) => {
        imgBase64.push(base64.substring(22))
      },
      (err) => {
        console.log(err) // 打印异常信息
      }
    )
  }

  function tt() {
    setTimeout(function () {
      if (store.imgList.length === imgBase64.length) {
        for (let i = 0; i < store.imgList.length; i++) {
          // 设置文件名每张图的
          img.file(i + imageSuffix[i], imgBase64[i], { base64: true })
        }
        zip.generateAsync({ type: 'blob' }).then(function (content) {
          saveAs(content, '压缩包名.zip')
          ElMessage.success(`下载${store.imgList.length}张图片`)
        })
      } else {
        tt()
      }
    }, 100)
  }
  tt()
}

const getBase64 = (img) => {
  function getBase64Image(img, width, height) {
    let canvas = document.createElement('canvas')
    canvas.width = width || img.width
    canvas.height = height || img.height

    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    let dataURL = canvas.toDataURL()
    return dataURL
  }
  return new Promise((resolve) => {
    let image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = img
    if (img) {
      image.onload = function () {
        // 读取图片之后的操作
        resolve(getBase64Image(image))
      }
    }
  })
}

// 单量下载
const xia = (imgsrc, fileName) => {
  let image = new Image()
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function () {
    let canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    let context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    let url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
    let a = document.createElement('a') // 生成一个a元素
    let event = new MouseEvent('click') // 创建一个单击事件
    a.download = fileName || 'photo' // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
  image.src = imgsrc
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
