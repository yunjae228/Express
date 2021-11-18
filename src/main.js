// @ts-check

const express = require('express')
const fs = require('fs')
const app = express()

const PORT = 5000

app.use('/', async (req, res, next) => {
  console.log('middleware 1-1')

  const fileContent = await fs.promises.readFile('.gitignore')

  const requestedAt = new Date()
  //@ts-ignore
  req.requestedAt = requestedAt
  //@ts-ignore
  req.fileContent = fileContent
  next()
})

app.use((req, res) => {
  console.log('Middleware 2')
  res.send(
    //@ts-ignore
    `hello, express: Requested at  ${req.requestedAt}, ${req.fileContent}`
  )
})

app.listen(PORT, () => {
  console.log('The express server is listening at port:', PORT)
})
