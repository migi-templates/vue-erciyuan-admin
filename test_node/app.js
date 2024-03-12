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
            icon: 'document',
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
            icon: 'document',
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
            icon: 'document',
          },
          component: 'two/icons',
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
