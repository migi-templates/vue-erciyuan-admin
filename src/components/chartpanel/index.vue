<template>
    <div class="border-1px border-solid border-#2196f340 relative px-10px flex flex-col">
        <div class="h-4vh leading-4vh font-800 text-#2196f3 text-20px" v-if="title">{{ title }}</div>
        <div class="flex-1 h-0">
            <slot></slot>
        </div>
        <div class="absolute bg-#009688 top-0 left-0 w-[0.8vw] h-[0.2vh]"></div>
        <div class="absolute bg-#009688 top-[0.8vh] left-[-0.4vw] w-[0.8vw] h-[0.2vh] rotate-90"></div>
        <div class="absolute bg-#009688 top-0 right-0 w-[0.8vw] h-[0.2vh]"></div>
        <div class="absolute bg-#009688 top-[0.8vh] right-[-0.4vw] w-[0.8vw] h-[0.2vh] rotate-90"></div>
        <div class="absolute bg-#009688 bottom-[-0.2vh] left-[-0.1vh] w-[0.8vw] h-[0.2vh]"></div>
        <div class="absolute bg-#009688 bottom-[0.6vh] left-[-0.4vw] w-[0.8vw] h-[0.2vh] rotate-90"></div>
        <div class="absolute bg-#009688 bottom-[-0.2vh] right-[-0.1vh] w-[0.8vw] h-[0.2vh]"></div>
        <div class="absolute bg-#009688 bottom-[0.6vh] right-[-0.4vw] w-[0.8vw] h-[0.2vh] rotate-90"></div>
    </div>
</template>

<script setup>
import { ref, reactive, defineEmits, defineProps } from 'vue'

//外部参数
const props = defineProps({
    title: String,
})
</script>
<style scoped></style>
