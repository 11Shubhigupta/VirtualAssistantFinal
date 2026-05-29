import multer from "multer"
import fs from "fs"
import os from "os"

// Vercel serverless environment is read-only except for /tmp.
// Use temporary directory in production, and ./public in local development.
const uploadDir = process.env.NODE_ENV === "production" ? os.tmpdir() : "./public"

if (process.env.NODE_ENV !== "production" && !fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDir)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + "-" + file.originalname)
    }
})

const upload = multer({storage})
export default upload