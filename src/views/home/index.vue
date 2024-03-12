<template>
  <div class="p-10px w-full overflow-auto h-full">
    <div class="lg:content-w lt-lg:w-[calc(100%)] lg:mx-auto gap-[5px] relative" id="image-container"></div>
  </div>
</template>

<script setup lang="jsx">
import { onMounted, ref, render } from 'vue'
import { getUrl } from '@/api/home.js'
import { sleep } from '@/utils'
import { generalStore } from '@/store/general.js'
import gsap from 'gsap'
import BuncingBall from '@/assets/icons/buncing-ball.svg'
import imageViewer from './components/imageViewer'
const imgList = ref([])

const store = generalStore()
let imageContainer = null,
  widthOfImage = 0,
  gap = 5,
  lineArr = [],
  rowNum = 3,
  imageNodes = []

onMounted(() => {
  getUrl().then((res) => {
    imgList.value = res.data
    store.setImglist(res.data)
    rowNum = window.innerWidth < 992 ? 2 : 3

    imageContainer = document.getElementById('image-container')
    if (imageContainer) {
      widthOfImage = (imageContainer.offsetWidth - gap * (rowNum - 1)) / rowNum
      initImage()
    }

    // listen window resize
    window.addEventListener('resize', () => {
      rowNum = window.innerWidth < 992 ? 2 : 3
      widthOfImage = (imageContainer.offsetWidth - gap * (rowNum - 1)) / rowNum
      lineArr = []
      imageNodes.forEach((node, index) => {
        const element = node
        const withRowNum = index % rowNum
        element.style.width = `${widthOfImage}px`
        element.style.left = `${withRowNum * (widthOfImage + gap)}px`
        element.style.top = `${lineArr[withRowNum] || 0}px`
        const img = element.querySelector('img')
        const height = img.height * (widthOfImage / img.width)
        lineArr[withRowNum] = (lineArr[withRowNum] || 0) + height + gap
        imageContainer.style.height = `${Math.max(...lineArr)}px`
      })
    })
  })
})

const handleView = (index, e) => {
  if (imgList.value[index].full_loaded) {
    imageViewer.show(imgList.value[index].url, e)
  } else {
    const el = e.currentTarget || e.target
    const parent = el.parentElement
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.inset = '0'
    parent.append(div)
    render(<ImageLoading />, div)
    gsap.from(div, {
      opacity: 0,
      y: 20,
      duration: 0.2,
    })
    const img = new Image()
    img.src = imgList.value[index].url
    Promise.all([sleep(1000), img.onload]).then(() => {
      imgList.value[index].full_loaded = true
      gsap.to(div, {
        opacity: 0,
        y: 20,
        duration: 0.1,
        onComplete: () => {
          imageViewer.show(imgList.value[index].url, e)
          div.remove()
        },
      })
    })
  }
}
const initImage = () => {
  imgList.value.forEach((url, index) => {
    const withRowNum = index % rowNum
    const div = document.createElement('div')
    div.style.width = `${widthOfImage}px`
    div.style.position = 'absolute'
    div.style.left = `${withRowNum * (widthOfImage + gap)}px`
    imageNodes.push(div)

    gsap.from(div, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      delay: index * 0.15,
      scrollTrigger: div,
    })

    const img = new Image()
    img.src = url.url
    img.onload = () => {
      const height = img.height * (widthOfImage / img.width)
      div.style.top = `${lineArr[withRowNum] || 0}px`
      lineArr[withRowNum] = (lineArr[withRowNum] || 0) + height + gap
      imageContainer.style.height = `${Math.max(...lineArr)}px`
    }
    render(<ImageNode src={url.url} index={index} />, div)
  })
  imageContainer.append(...imageNodes)
}
function ImageNode({ src, index }) {
  return (
    <div class="flex relative">
      <img src={src} class="w-full h-full rounded-sm" onClick={(e) => handleView(index, e)} />
    </div>
  )
}
function ImageLoading() {
  return (
    <div class="flex flex-col bg-black/20 absolute inset-0 items-center justify-center">
      <img class="w-[40px] h-[40px] object-cover" src={BuncingBall} />
      <span class="text-[12px] mt-[10px]">加载原图中</span>
    </div>
  )
}
</script>

<style></style>
