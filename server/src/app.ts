import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}
))

//Policy for cors for developement period only
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN,);
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });


app.use(express.json({
  limit: "16kb"
}))

app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())
export { app }
