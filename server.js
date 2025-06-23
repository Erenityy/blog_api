const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')

dotenv.config()
const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB bağlantısı başarılı'))
.catch(err => console.error(' MongoDB bağlantı hatası:', err))

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`)
})
