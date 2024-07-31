import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import { db } from "./db.js";
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express()
const port = 3000;

db.connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname); 
    }
  })

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => console.log(`app listening on port ${port}!`))