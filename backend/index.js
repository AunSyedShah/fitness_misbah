import express from 'express';
import connect_db from './db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';

const app = express();

app.use(cors())

// Middleware
app.use(express.json());

// Connect to the database
connect_db();

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
