// @ts-check

const express = require('express')

const userRouter = express.Router()

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const PORT = 5000

userRouter.get('/', (req, res) => {
  res.send('User list')
})

const USERS = {
  3: {
    nickname: 'foo',
  },
}

userRouter.param('id', (req, res, next, value) => {
  console.log(`id parameter ${value}`)
  //@ts-ignore
  req.user = USERS[value]
  next()
})

//:id는 path parameter
userRouter.get('/:id', (req, res) => {
  console.log('userRouter get ID')
  //@ts-ignore
  res.send(req.user)
})

userRouter.post('/', (req, res) => {
  //Register user
  res.send('User registered')
})

userRouter.post('/:id/nickname', (req, res) => {
  //@ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname updated: ${nickname}`)
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log('The express server is listening at port:', PORT)
})
