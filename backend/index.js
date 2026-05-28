import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import geminiResponse from "./gemini.js"

const app=express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://virtual-assistant-final.vercel.app"
]

app.use(cors({
    origin: function (origin, callback) {
        // Allow local and Vercel domains
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        return callback(null, true); // Allow all other origins for ease of deployment, or we can restrict it
    },
    credentials: true
}))

const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())

// Connect to MongoDB immediately
connectDb()

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.get("/", (req, res) => {
    res.send("Server is running");
});

if (process.env.NODE_ENV !== "production") {
    app.listen(port,()=>{
        console.log(`server started on port ${port}`)
    })
}

export default app