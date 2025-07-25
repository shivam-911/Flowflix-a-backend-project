import fs from "fs";
import path from "path";
import multer from "multer";


const TEMP_DIR = path.join(process.cwd(), "public", "temp");


fs.mkdirSync(TEMP_DIR, { recursive: true });  

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);                     
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage });