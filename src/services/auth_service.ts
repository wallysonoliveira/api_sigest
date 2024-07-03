import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const prisma = new PrismaClient();
const { JWT_SECRET } = process.env;

export const register = async (name: string, cpf: string, email: string, phone: string, password: string, role: Role, city?: string, state?: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      cpf,
      email,
      phone,
      password: hashedPassword,
      role,
      city: role === Role.CLIENT ? city : null,
      state: role === Role.CLIENT ? state : null
    }
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('User not found');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid password');

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET as string, { expiresIn: '1h' });

  return token;
};
