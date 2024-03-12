import { defineStore } from 'pinia'
import { ref } from 'vue'

export const generalStore = defineStore(
  'general',
  () => {
    const imgList = ref('')
    const setImglist = (value) => {
      imgList.value = value
    }
    return { imgList, setImglist }
  },
  {
    persist: true,
  }
)
