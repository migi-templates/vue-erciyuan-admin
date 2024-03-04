const express = require('express')
const fs = require('fs')

const app = express()
const port = 9090

app.get('/images', (req, res) => {
  const imagesPath = './images'
  const images = fs.readdirSync(imagesPath).map((file) => `${req.protocol}://${req.get('host')}/images/${file}`)

  res.status(200).send(images)
})

app.post('/getList', (req, res) => {
  const list = [
    {
      meta: {
        hidden: false,
        title: '系统管理',
        icon: "document",
      },
      component: 'Layout',
      name: '/system',
      path: '/system',
      redirect: '/system/two',
      children: [
        {
          name: 'Two',
          path: 'two',
          meta: {
            hidden: false,
            keepAlive: true,
            title: '用户管理',
            icon: "document",
          },
          component: 'two/index',
        },
        {
          name: 'Test',
          path: 'test',
          meta: {
            hidden: false,
            keepAlive: true,
            title: '用户测试',
            icon: "document",
          },
          component: 'two/test',
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
