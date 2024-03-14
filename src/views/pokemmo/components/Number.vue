<template>
  <div class="number">
    <div class="num-container">
      <label for="amount">Amount: </label>
      <input v-model.trim.number="store.amount" maxlength="3" @blur="lose" />
    </div>
    <div class="num-container">
      <label for="firstId">First id: </label>
      <input v-model.trim.number="store.firstId" maxlength="3" @blur="lose" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { pokemmoStore } from '@/store/pokemmo'
const store = pokemmoStore()

const Cycle = computed(() => parseInt(store.amount + store.firstId - 1))

const lose = () => {
  if (store.amount >= 887) {
    ElMessage({
      message: '超出最大宝可梦数量',
      type: 'warning',
    })
    return
  }
  if (store.firstId > store.pokemmo[0].id) {
    store.removePokeFront()
  }
  if (!store.firstId || !store.amount) {
    store.firstId = 1
    store.amount = 1
    store.removePoke()
  }
  if (store.amount != store.pokemmo.length) {
    store.removePoke()
  }

  initPokemons()
}

const initPokemons = async () => {
  for (let i = store.firstId; i <= Cycle.value; i++) {
    await store.getPokemmo(i)
  }
}
onMounted(() => {
  console.log(store.pokemmo, '2312')
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
