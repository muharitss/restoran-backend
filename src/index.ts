import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import menuRoutes from "./routes/menu.routes";
import categoriesRoutes from "./routes/category.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://restorana.netlify.app",
  "http://localhost:5173",
  "https://restoran-app-five.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

// Daftarkan route
app.use("/api/users", userRoutes);
app.use("/menus", menuRoutes);
app.use("/categories", categoriesRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
