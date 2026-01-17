import dotenv from "dotenv";
dotenv.config({
  path: "./.env"
})
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.on("error", (error) => {   // for checking app is working or not
        console.log(`Error: `, error);
        throw error;
      })
    app.listen(PORT, () => {
      console.log(`Server is running on port: http://localhost:${PORT}`);
    })
  })
  .catch((err) => {
  console.log("MONGO db connection failed!!", err);
  })
