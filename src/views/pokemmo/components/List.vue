<template>
  <div class="flex flex-wrap mt-40px gap-[40px_80px]">
    <div v-for="pokemon in store.pokemmo" :key="pokemon.id" class="five_half rounded-full" :style="{ backgroundColor: getColor(pokemon) }">
      <img lazy class="w-full transition-all hover:scale-[0.9]" :src="pokemon?.sprites?.front_default" />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { pokemmoStore } from '@/store/pokemmo'

const store = pokemmoStore()
console.log(store.pokemmo)

const getColor = computed(() => {
  return (e) => {
    return colors[e.types[0].type.name]
  }
})
const colors = reactive({
  fire: '#ff927d',
  grass: '#bdffa3',
  electric: '#ffcc33',
  water: '#77bbff',
  ground: '#f1dda0',
  rock: '#e1d08c',
  fairy: '#fbcbfb',
  poison: '#c689ba',
  bug: '#daec44',
  dragon: '#a194ff',
  psychic: '#ff9cc4',
  flying: '#99bbff',
  fighting: '#dd9988',
  normal: '#e7e7d8',
  ghost: '#9f9fec',
  steel: '#dfdfe1',
  ice: '#dbf6ff',
  dark: '#bda396',
})
</script>

<style scoped>
.five_half {
  position: relative;
  width: calc((100% - (5 - 1) * 80px) / 5);
}
</style>
