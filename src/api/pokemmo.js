import axios from 'axios'
const server = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/', // 设置axios请求的基础的基础地址
})

export function getPoke(data) {
  return server({
    url: 'pokemon/' + data,
    method: 'get',
  })
}
