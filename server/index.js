import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import adRoutes from './routes/ads.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import categoryRoutes from './routes/category.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();
const app = express();

// body parser middlewares
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// cors
app.use(cors());



// router
app.use('/api/auth', authRoutes);
app.use('/api', adRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/resources', express.static(__dirname + '/public/uploads'));




app.get('/', async (req, res) => {
    res.send('Hello from BaichOye.com!');
})

// //serve static file
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'client', 'build')))
  
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
//   } else {
//     app.get('*', (req, res) => {
//       res.send('haha')
//     })
//   }



const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => console.log(`Server has started on port http://localhost:${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

startServer();
