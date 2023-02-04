import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/ads.js';

dotenv.config();

const app = express();
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use('/api/v1/post', postRoutes);
app.get('/', async (req, res) => {
    res.send('Hello from BaichOye.com!');
})



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
