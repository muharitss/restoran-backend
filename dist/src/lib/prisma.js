"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Pastikan .env terbaca dengan benar
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const prisma_1 = require("../generated/prisma");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
// 1. Bersihkan URL (pg tidak kenal prisma+postgres://)
const originalUrl = process.env.DATABASE_URL || "";
const fixedUrl = originalUrl.replace('prisma+postgres://', 'postgresql://');
// 2. Konfigurasi Pool dengan deteksi SSL yang lebih ketat
const pool = new pg_1.Pool({
    connectionString: fixedUrl,
    // Jika bukan localhost, paksa SSL dengan rejectUnauthorized false (untuk Supabase/Neon)
    ssl: fixedUrl.includes('localhost') || fixedUrl.includes('127.0.0.1')
        ? false
        : { rejectUnauthorized: false },
    max: 20, // Jumlah maksimal koneksi
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
// 3. Log Error Pool agar kita tahu ALASAN pemutusan koneksi
pool.on('error', (err) => {
    console.error('❌ [Postgres Pool Error]:', err.message);
});
// 4. Inisialisasi Adapter
const adapter = new adapter_pg_1.PrismaPg(pool);
// 5. Buat Client
exports.prisma = new prisma_1.PrismaClient({
    // @ts-ignore - Mengatasi ketidaksinkronan tipe data di Prisma 7
    adapter: adapter,
    log: ['error', 'warn']
});
exports.default = exports.prisma;
