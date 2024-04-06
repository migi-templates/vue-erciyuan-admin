import express from 'express'
import fs from 'fs'
import cors from 'cors'
import { list } from './permission.js'

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
  res.status(200).send(list)
})

app.use(cors())
app.use('/images', express.static('images'))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
