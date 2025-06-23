const Post = require('../models/Post')


exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body
    const newPost = new Post({
      title,
      content,
      author: req.user.userId 
    })
    await newPost.save()
    res.status(201).json(newPost)
  } catch (err) {
    res.status(500).json({ error: 'Post oluşturulamadı', details: err.message })
  }
}


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username')
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Postlar getirilemedi', details: err.message })
  }
}


exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.userId })
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: 'Kendi postların getirilemedi', details: err.message })
  }
}


exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).json({ error: 'Post bulunamadı' })
    if (post.author.toString() !== req.user.userId)
      return res.status(403).json({ error: 'Bu postu güncelleyemezsiniz' })

    post.title = req.body.title
    post.content = req.body.content
    await post.save()

    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: 'Post güncellenemedi', details: err.message })
  }
}


exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).json({ error: 'Post bulunamadı' })
    if (post.author.toString() !== req.user.userId)
      return res.status(403).json({ error: 'Bu postu silemezsiniz' })

    await post.deleteOne()
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Post silinemedi', details: err.message })
  }
}
