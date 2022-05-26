import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connect } from './src/configs/db.configs.js';


const app =  express();

import indexRoute from './src/routes/index.route.js';
// import userRoute from './src/routes/users.route.js';
// import postRoute from './src/routes/posts.route.js';
// import followRoute from './src/routes/users.route.js';

// Middlewares
app.use(cors());
app.use(express.json());


//Routes
app.use('/', indexRoute);
// app.use('/users', userRoute);
// app.use('/posts', postRoute);
// app.use('/follows', followRoute);

connect();

app.listen(8080,()=>{console.log('This server is running');}) 

export default app;

//endpoint de seguidores de un usuario