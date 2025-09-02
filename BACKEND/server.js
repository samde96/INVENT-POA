import dotenv from "dotenv"; dotenv.config()
import express from "express"
import mongoose from "mongoose";
import cors from "cors"    
import userRoute from "../BACKEND/routes/userRoute.js"
import errorHandler from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser"; 





const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/api/users", userRoute);

// Error Handler Middleware
app.use(errorHandler);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log('Server is running on Port 5000!');
        });
    })
    .catch((err) => {
        console.log(err);
    });