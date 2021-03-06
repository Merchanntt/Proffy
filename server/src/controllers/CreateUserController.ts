import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import db from '../database/connections';

export interface UserDataInfo {
  id: number
  name: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string,
  whatsapp: string,
  bio: string,
}

export default class CreateUserController {
  async create(request: Request, response: Response) {
    const {
      name, lastname, email, password,
    } = request.body;

    try {
      const findEmail = await db.select('email').from('users').where('email', '=', email);

      if (findEmail.length === 1) {
        return response.status(400).json({ error: 'This email already existis' });
      }

      const hashedPassword = await hash(password, 8);

      const UserInfo = await db('users').insert({
        name,
        lastname,
        email,
        password: hashedPassword,
      });

      return response.status(201).json(UserInfo);
    } catch (err) {
      return response.status(400).json({
        error: 'Error in create your account',
      });
    }
  }
}
