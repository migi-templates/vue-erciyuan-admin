<template>
    <div class="relative overflow-hidden  w-full" :class="{ 'px-20px': showBtn }">
        <div class="overflow-x-hidden flex" ref="tabsWrapper">
            <!-- 添加ref属性 -->
            <div class="flex gap-10px transition-all duration-500" :style="{ transform: `translateX(-${scroll}px)` }">
                <slot></slot>
            </div>
        </div>
        <button v-if="showBtn" class="h-full w-20px bg-#ddd absolute top-0 left-0" @click="scrollTabs(-1)"
            :disabled="scroll === 0">&lt;</button>
        <button v-if="showBtn" class="h-full w-20px bg-#ddd absolute top-0 right-0" @click="scrollTabs(1)"
            :disabled="scroll === maxScroll">&gt;</button>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const scroll = ref(0)
const maxScroll = ref(0)
const wrapperWidth = ref(0)
const showBtn = ref(false)

const tabsWrapper = ref(null)

onMounted(() => {
    setTimeout(() => {
        setWrapperWidth()
    }, 100)

    window.addEventListener('resize', setWrapperWidth) // 监听窗口大小变化
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', setWrapperWidth) // 组件销毁时移除resize监听器
})

const setWrapperWidth = () => {
    wrapperWidth.value = tabsWrapper.value.offsetWidth // 更新容器宽度   
    maxScroll.value = tabsWrapper.value.scrollWidth - tabsWrapper.value.offsetWidth + 40  // + padding的内边距
    if (maxScroll.value > 0) {
        showBtn.value = true
    } else {
        showBtn.value = false
    }
}
const scrollTabs = (direction) => {
    const step = wrapperWidth.value  // 调整滚动速度
    scroll.value += direction * step
    if (scroll.value < 0) {
        scroll.value = 0
    } else if (scroll.value > maxScroll.value) {
        scroll.value = maxScroll.value
    }
}
</script>

<style></style>
