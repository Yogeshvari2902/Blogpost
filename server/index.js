import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

dotenv.config({path:"./"})

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (_, res) => res.send('Hello to Blogpost API'))

const PORT = process.env.PORT || 5000

mongoose // https://www.mongodb.com/cloud/atlas
	.connect(process.env.CONNECTION_URL)
	.then(console.log('Connected to MongoDB Database 🌐'))
	.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT} 🚀`)))
	.catch((error) => console.log(`❎ Server did not connect ⚠️\n${error}`))

// CONFIGURE Connection URL: https://stackoverflow.com/questions/25090524/hide-mongodb-password-using-heroku-so-i-can-also-push-to-public-repo-on-github
// CONFIGURE AUTODEPLOY From Github:
// https://stackoverflow.com/questions/39197334/automated-heroku-deploy-from-subfolder
// https://github.com/timanovsky/subdir-heroku-buildpack
