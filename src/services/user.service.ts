import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { Prisma } from '../generated/prisma';

const userRepository = new UserRepository();
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman';

export class UserService {
  async registerUser(data: Prisma.UserCreateInput) {
    // 1. Cek apakah email sudah terdaftar
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email sudah digunakan oleh akun lain.");
    }

    // 2. Hash password (jangan simpan plain text!)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // 3. Simpan user dengan password yang sudah di-hash
    return userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async loginUser(email: string, password: string) {
    // 1. Cari user berdasarkan email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email atau password salah.");
    }

    // 2. Bandingkan password yang diinput dengan yang di database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Email atau password salah.");
    }

    // 3. Buat Token JWT yang berisi ID dan Role
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' } // Token berlaku 1 hari
    );

    // 4. Kirim data user (tanpa password) dan tokennya
    const { password: _, ...userResponse } = user;
    return { user: userResponse, token };
  }
}