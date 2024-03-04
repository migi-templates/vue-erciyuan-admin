<template>
  <div class="absolute left-0 right-0 top-0 bottom-0">
    <div
      class="flex absolute top-50% left-50% shadow rounded-15px w-50vw h-30vh translate-[-50%]"
    >
      <div
        :class="['left_container', { 'transform-full': mode == 'registered' }]"
      ></div>
      <div class="flex flex-1 flex-col justify-center ">
        <div class="flex justify-center w-full">
          <el-radio-group v-model="mode">
            <el-radio-button label="registered">注册</el-radio-button>
            <el-radio-button label="login">登录</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="flex flex-1 flex-col justify-center">
        <div class="flex justify-center"></div>
        <div class="flex justify-center w-full">
          <el-radio-group v-model="mode">
            <el-radio-button label="registered">注册</el-radio-button>
            <el-radio-button label="login">登录</el-radio-button>
          </el-radio-group>

          <el-button @click="setToken">setToken</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { mainStore } from '@/store/index';
import { useRouter } from 'vue-router';
const store = mainStore();
const router = useRouter();
const mode = ref('login');

const setToken = () => {
  store.setToken();
  router.push('/');
};
</script>

<style>
.left_container {
  background: url('https://images8.alphacoders.com/132/thumbbig-1323361.webp')
    no-repeat center center;
  background-size: cover;
  border-radius: 15px;
  position: absolute;
  width: 50%;
  height: 100%;
  bottom: 0;
  left: 0;
  z-index: 999;
  transition: all 1s;
  transform: translateX(0);
}
.transform-full {
  transform: translateX(100%);
}
</style>
