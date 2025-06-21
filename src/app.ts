import express from 'express';
import dotenv from 'dotenv';
import authRouter from './auth/auth.routes';
import notesRouter from './routes/notes.routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser())

// Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.get('/', (req, res) => {
    res.send('Hello, App');
}).listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});