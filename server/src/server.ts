import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import scooterRouter from './routes/scooterRoutes';
import userRouter from './routes/userRoutes'; 
import parkingRouter from './routes/parkingRoutes'; 
import failureRouter from './routes/failureRoutes'; 
import loginUserRouter from './routes/loginUserRoutes';
import dotenv from 'dotenv';



dotenv.config();

const path = require("path")
const app = express();
const port = process.env.PORT ;

const mongoURL = process.env.MONGO_URL;
if (!mongoURL) {
  throw new Error('MONGO_URL is not defined in .env file');
}

mongoose.connect(mongoURL, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.use(cors());
app.use(express.json());


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

app.use('/scooters', scooterRouter);
app.use('/users', userRouter); 
app.use('/parkings', parkingRouter);
app.use('/failures', failureRouter); 
app.use('/auth', loginUserRouter); 


app.get('/', (req, res)=>{
    console.log(req.body);
    res.json({msg: 'Welcome to the SCOOTER app'})
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
