import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(C, '../public/uploads'))
    // if (process.env.NODE_ENV === 'production') {
    //   cb(null, path.join(__dirname, '../client/build/uploads'))
    // } else {
    //   cb(null, path.join(__dirname, '../client/public/uploads'))
    // }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extname = file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extname)
  },
})

// const upload = multer({ storage }).array('images', 5)
const upload = multer({ storage }).any();

function multerMiddleware(req, res, next) {
  next()
}

export { multerMiddleware, upload }
