import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import menuRoutes from './routes/menu.routes';

dotenv.config();

const app = express();
app.use(express.json()); 

// Daftarkan route
app.use('/api/users', userRoutes);
app.use('/menus', menuRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});