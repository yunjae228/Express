// @ts-check

const express = require('express')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

const USERS = {
  15: {
    nickname: 'foo',
    profileImageKey: undefined,
  },
  16: {
    nickname: 'bar',
    profileImageKey: undefined,
  },
}

router.get('/', (req, res) => {
  res.send('user list')
})

router.param('id', async (req, res, next, value) => {
  try {
    //@ts-ignore
    const user = USERS[value]

    if (!user) {
      const err = new Error('user not found')
      err.statusCode = 404
      throw err
    }

    //@ts-ignore
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
})

//:id는 path parameter
router.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    //@ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      //@ts-ignore
      nickname: req.user.nickname,
      userId: req.params.id,
      //profileImageKeyURL: '/uploads/f880696d64796dba9ed45c13c957e4ba',
      profileImageURL: `/uploads/${req.user.profileImageKey}`,
    })
  }
})

router.post('/', (req, res) => {
  //Register user
  res.send('User registered')
})

router.post('/:id/nickname', (req, res) => {
  //@ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname updated: ${nickname}`)
})

router.post('/:id/profile', upload.single('profile'), (req, res, next) => {
  console.log(req.file)

  const { user } = req
  const { filename } = req.file
  user.profileImageKey = filename

  res.send(`User profile image uploaded : ${filename}`)
})

module.exports = router
