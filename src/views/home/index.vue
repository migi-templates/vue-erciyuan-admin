<template>
  <div class="p-10px w-full overflow-auto h-full">
    <div class="lg:content-w lt-lg:w-[calc(100%-40px)] lg:mx-auto gap-[5px] relative" id="image-container"></div>
  </div>
</template>

<script setup lang="jsx">
import { onMounted, ref, render } from 'vue'
import { getUrl } from '@/api/home.js'
import gsap from 'gsap'
const imgList = ref([])

let imageContainer = null,
  widthOfImage = 0,
  gap = 5,
  lineArr = [],
  // mdImages = [],
  rowNum = 3,
  imageNodes = []

onMounted(() => {
  getUrl().then((res) => {
    imgList.value = res.data

    rowNum = window.innerWidth < 992 ? 3 : 4

    imageContainer = document.getElementById('image-container')
    if (imageContainer) {
      widthOfImage = (imageContainer.offsetWidth - gap * (rowNum - 1)) / rowNum
      initImage()
    }

    // listen window resize
    window.addEventListener('resize', () => {
      rowNum = window.innerWidth < 992 ? 3 : 4
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

function ImageNode({ src, index }) {
  return (
    <div class="flex relative">
      <img src={src} class="w-full h-full rounded-sm" onClick={(e) => handleView(index, e)} />
    </div>
  )
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
    img.src = url
    img.onload = () => {
      const height = img.height * (widthOfImage / img.width)
      div.style.top = `${lineArr[withRowNum] || 0}px`
      lineArr[withRowNum] = (lineArr[withRowNum] || 0) + height + gap
      imageContainer.style.height = `${Math.max(...lineArr)}px`
    }
    render(<ImageNode src={url} index={index} />, div)
  })
  imageContainer.append(...imageNodes)
}
</script>

<style></style>
