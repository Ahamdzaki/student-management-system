import express from 'express';
import './db/mongoose.js';
import studentRouter from './routers/studentRoute.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use(studentRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
