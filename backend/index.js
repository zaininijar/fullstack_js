import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import router from "./routes/index.js";
import cors from "cors";
import multer from "multer";
import Mahasiswa from "./models/MahasiswaModel.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

try {
  await db.authenticate();
  console.log("database connected...");
  await Mahasiswa.sync();
} catch (error) {
  console.error("connection error", error);
}

const fileStorage = multer.diskStorage({

  destination: (req, file, cb)=> {
    cb(null, 'images');
  },
  filename: (req, file, cb)=> {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }

})

const fileFilter = (req, file, cb)=> {
  if( file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
  ){
    cb(null, true);
  }else {
    cb(null, false);
  }
}

app.use(cookieParser());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(router);

app.listen(5000, () => console.log("server running at port 5000"));
