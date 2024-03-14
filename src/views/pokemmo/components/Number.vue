<template>
  <div class="number">
    <div class="num-container">
      <label for="amount">Amount: </label>
      <input v-model.trim.number="amount" maxlength="3" @blur="lose" />
    </div>
    <div class="num-container">
      <label for="firstId">First id: </label>
      <input v-model.trim.number="firstId" maxlength="3" @blur="lose" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { pokemmoStore } from '@/store/pokemmo'
const store = pokemmoStore()
const amount = ref(5)
const firstId = ref(1)

const Cycle = computed(() => parseInt(amount.value / 1 + firstId.value / 1 - 1))

const lose = () => {
  if (amount.value >= 887) {
    ElMessage({
      message: '超出最大宝可梦数量',
      type: 'warning',
    })
    return
  }
  if (!firstId.value || !amount.value) {
    firstId.value = 1
    amount.value = 1
  }
  store.removePoke()
  initPokemons()
}

const initPokemons = async () => {
  for (let i = firstId.value; i <= Cycle.value; i++) {
    await store.getPokemmo(i)
  }
}
onMounted(() => {
  store.removePoke()
  initPokemons()
})
</script>

<style scoped>
.number {
  display: flex;
  justify-content: center;
  align-items: center;
}

.num-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 161px;
  height: 50px;
  font-size: 18px;
  border-radius: 25px;
  margin: 10px;
  box-shadow: 0px 0px 5px #ccc;
}

input {
  width: 45px;
  height: 25px;
  border-radius: 12px;
  text-align: center;
}
</style>
