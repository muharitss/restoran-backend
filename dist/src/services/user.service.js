"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
const userRepository = new user_repository_1.UserRepository();
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman';
class UserService {
    async registerUser(data) {
        // 1. Cek apakah email sudah terdaftar
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email sudah digunakan oleh akun lain.");
        }
        // 2. Hash password (jangan simpan plain text!)
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(data.password, salt);
        // 3. Simpan user dengan password yang sudah di-hash
        return userRepository.create({
            ...data,
            password: hashedPassword,
        });
    }
    async loginUser(email, password) {
        // 1. Cari user berdasarkan email
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Email atau password salah.");
        }
        // 2. Bandingkan password yang diinput dengan yang di database
        const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Email atau password salah.");
        }
        // 3. Buat Token JWT yang berisi ID dan Role
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' } // Token berlaku 1 hari
        );
        // 4. Kirim data user (tanpa password) dan tokennya
        const { password: _, ...userResponse } = user;
        return { user: userResponse, token };
    }
}
exports.UserService = UserService;
