<template>
    <div class="p-10px bg-#fff h-full overflow-auto flex items-center justify-center">
        <er-tabs>
            <div v-for="(tab, index) in tabs" :key="index" class="w-120px h-40px leading-40px text-center bg-#f0f0f0">{{
                tab }}</div>
        </er-tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const tabs = ref(['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6', 'Tab 7', 'Tab 8', 'Tab 9', 'Tab 10', 'Tab 11', 'Tab 12', 'Tab 13', 'Tab 15', 'Tab 16', 'Tab 17'])
</script>

<style></style>
