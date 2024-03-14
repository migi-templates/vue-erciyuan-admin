import request from '@/utils/request.js'

export const getPoke = (data) => {
  return request({
    url: 'https://pokeapi.co/api/v2/pokemon/' + data,
    method: 'get',
  })
}
