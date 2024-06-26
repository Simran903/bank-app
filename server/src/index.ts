import { app } from "./app";
import dotenv from "dotenv";


dotenv.config({
  path: './env'
})


app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at port: ${process.env.PORT}`);
})
