
import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
//db and auth user
import connectDB from './db/connect.js'
import morgan from 'morgan'
// routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// middleware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import authenticateUser from './middleware/auth.js'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

if(process.env.NODE_ENV != 'production'){
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.json())
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname, 'client/build')));
    
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'));
    })
}
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        
        app.listen(port, ()=>{
            console.log(`Server listening on port ${port}`)
        })
    } catch (error) { 
        console.log(error)
    }
}

start()