import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getPoke } from '@/api/pokemmo'

export const pokemmoStore = defineStore(
  'pokemmo',
  () => {
    const pokemmo = ref([])
    const setPokemmo = (value) => {
      pokemmo.value.push(value)
    }
    const removePoke = () => {
      pokemmo.value = []
    }

    const getPokemmo = async (e) => {
      let ids = pokemmo.value.map((v) => v.id)

      if (!ids.includes(e)) {
        const result = await getPoke(e)
        if (result.data) {
          setPokemmo(result.data)
        }
      }
    }
    return { pokemmo, getPokemmo, removePoke }
  },
  {
    persist: true,
  }
)
