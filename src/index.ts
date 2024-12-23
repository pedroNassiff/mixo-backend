import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import machineRoutes from './routes/machineRoutes';
import serviceRoutes from './routes/serviceRoutes';

console.log("MONGO_URI:", process.env.MONGO_URI);

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/services', serviceRoutes); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));