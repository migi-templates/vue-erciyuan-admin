const express = require('express')
const fs = require('fs')

const app = express()
const port = 9090

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // 或者指定允许访问的域名，如 'http://localhost:5173'
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/images', (req, res) => {
  const imagesPath = './images'

  const images = fs.readdirSync(imagesPath).map((file, i) => {
    return {
      url: `${req.protocol}://${req.get('host')}/images/${file}`,
      full_loaded: false,
      id: i + 1,
    }
  })

  res.status(200).send(images)
})

app.post('/getList', (req, res) => {
  const list = [
    {
      meta: {
        hidden: false,
        title: 'echarts',
        icon: 'document',
      },
      component: 'Layout',
      name: '/echarts',
      path: '/echarts',
      redirect: '/echarts/echarts',
      children: [
        {
          name: 'echarts',
          path: 'echarts',
          meta: {
            hidden: false,
            keepAlive: true,
            title: 'echarts',
            icon: 'document',
          },
          component: 'echarts/index', // 文件夹/文件名
        },
      ],
    },
    {
      meta: {
        hidden: false,
        title: '宝可梦',
        icon: 'document',
      },
      component: 'Layout',
      name: '/pokemmo',
      path: '/pokemmo',
      redirect: '/pokemmo/pokemmo',
      children: [
        {
          name: 'pokemmo',
          path: 'pokemmo',
          meta: {
            hidden: false,
            keepAlive: true,
            title: '宝可梦',
            icon: 'document',
          },
          component: 'pokemmo/index',
        },
      ],
    },
    {
      meta: {
        hidden: false,
        title: '组件管理',
        icon: 'document',
      },
      component: 'Layout',
      name: '/system',
      path: '/system',
      redirect: '/system/table',
      children: [
        {
          name: 'Table',
          path: 'table',
          meta: {
            hidden: false,
            keepAlive: true,
            title: '动态table',
            icon: 'table',
          },
          component: 'two/table',
        },
        {
          name: 'Zip',
          path: 'zip',
          meta: {
            hidden: false,
            keepAlive: true,
            title: '下载zip',
            icon: 'download',
          },
          component: 'two/zip',
        },
        {
          name: 'Icons',
          path: 'icons',
          meta: {
            hidden: false,
            keepAlive: true,
            title: 'Icons',
            icon: 'icon',
          },
          component: 'two/icons',
        },
      ],
    },

    {
      meta: {
        hidden: false,
        title: 'tree',
        icon: 'document',
      },
      component: 'Layout',
      name: '/tree',
      path: '/tree',
      redirect: '/tree/cascade',
      children: [
        {
          name: 'Cascade',
          path: 'Cascade',
          meta: {
            hidden: false,
            keepAlive: true,
            title: '级联组件',
            icon: 'document',
          },
          component: 'tree/cascade',
        },
      ],
    },
  ]

  res.status(200).send(list)
})

app.use('/images', express.static('images'))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
