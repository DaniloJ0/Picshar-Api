import express from 'express';
import cors from 'cors';

const app =  express();

import indexRoute from './src/routes/index.route.js';

// Middlewares
app.use(cors());
app.use(express.json());


//Routes
app.use('/', indexRoute);

app.listen(8080,()=>{console.log('This server is running');}) 

export default app;