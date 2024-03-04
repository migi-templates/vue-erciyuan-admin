import { defineStore } from 'pinia';
import { ref } from 'vue';

export const mainStore = defineStore(
  'index',
  () => {
    const token = ref('');
    const setToken = () => {
      token.value = 'www';
    };

    return { setToken, token };
  },

  {
    // persist: true,
    persist: {
      key: 'test-Z', // 存儲的key
      // storage: sessionStorage, // 默认 localStorage
      paths: ['token'],
    },
  }
);