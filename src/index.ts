import express, { Request, Response } from 'express';

import morgan from 'morgan'

import { hobbiesRouter, userRouter } from './routes';
import { connectToDB } from './utils';

const app = express();
const port = 3000;

connectToDB()

// request logger
app.use(morgan('dev'))

// request body parser
app.use(express.json())

// Health Check API route
app.get('/health-check', (req: Request, res: Response) => {
    const currentTimestamp = new Date().getTime();
    res.send({ timestamp: currentTimestamp });
});

// Register routes
app.use('/hobbies', hobbiesRouter);
app.use('/users', userRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


export default app