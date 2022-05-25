import express from 'express';
import cors from 'cors';

const app =  express();

import indexRoute from './src/routes/index.route.js';
import userRoute from './src/routes/users.route';
import postRoute from './src/routes/users.route';
import followRoute from './src/routes/users.route';

// Middlewares
app.use(cors());
app.use(express.json());


//Routes
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/follows', followRoute);

app.listen(8080,()=>{console.log('This server is running');}) 

export default app;

//endpoint de seguidores de un usuario