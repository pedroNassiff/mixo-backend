import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Usuario creado" });
    } catch (error: any) {
        console.error("Error in register", error);
        res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciales invalidas" });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    res.json({message: "Loggin succes, token generado", token});
  } catch (error) {
    res.status(500).json({ message: "ALgo salio mal", error });
  }
};