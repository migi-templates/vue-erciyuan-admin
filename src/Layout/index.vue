<template>
  <div class="h-100vh bg-#000 flex overflow-hidden">
    <Sidebar />
    <div class="flex-1 w-0 flex flex-col">
      <div class="h-80px bg-#fff w-full flex items-center px-10px">
        <Header />
      </div>
      <div class="flex-1 h-0 bg-#eee overflow-auto p-10px">
        <div class="h-full bg-#fff">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './components/header.vue';
import Sidebar from './components/sidebar.vue';
</script>

<style></style>
