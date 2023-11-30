import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/user", userRouter); // localhost:5000/api/user/;
app.use("/api/blog", blogRouter); // localhost:5000/api/blog/;

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});



// const URL = "mongodb+srv://rahulv2001:rahulv2001@blogapp.ahu2ucc.mongodb.net/BlogApp?retryWrites=true&w=majority";
// mongoose.connect(URL)
//     .then(() => app.listen(5000))
//     .then(() => console.log("Connected to database and listening on port 5000."))
//     .catch((err) => console.log(err));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL).then(() => {
    const PORT = process.env.PORT || 5000;
    console.log("DB Connection Successfull");
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    });

}).catch((err) => {
    console.log(err);
});