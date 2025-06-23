const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/', authMiddleware, postController.createPost)


router.get('/', postController.getAllPosts)


router.get('/mine', authMiddleware, postController.getMyPosts)


router.put('/:id', authMiddleware, postController.updatePost)


router.delete('/:id', authMiddleware, postController.deletePost)

module.exports = router
