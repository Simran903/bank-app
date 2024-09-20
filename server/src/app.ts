import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}
))


app.use(express.json({
  limit: "16kb"
}))

app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())


//Routes import 
import userRouter from './routes/user.routes';
import transferRouter from "./routes/transfer.routes";
import beneficiaryRouter from './routes/beneficiary.routes';

app.use("/api/v1/user", userRouter);
app.use("/api/v1/transfer", transferRouter);
app.use("/api/v1/beneficiary", beneficiaryRouter);

export { app }
