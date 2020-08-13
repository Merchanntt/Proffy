import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import db from '../database/connections';
import authConfig from '../config/auth';
import { UserDataInfo } from './CreateUserController';

export default class CreateSessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const findUser = await db.select('*').from('users').where('email', '=', email);

    if (findUser.length === 0) {
      return response.status(401).json({ error: 'Wrong email/password' });
    }

    const findPassword = findUser.map((item: UserDataInfo) => ({
      password: item.password,
    })).pop()?.password;

    const userPasswordCompare = await compare(password, String(findPassword));

    if (!userPasswordCompare) {
      return response.status(401).json({ error: 'Wrong email/password' });
    }

    const UserDataFormated = findUser.map((item: UserDataInfo) => ({
      id: item.id,
      name: item.name,
      lastname: item.lastname,
      email: item.email,
      avatar: item.avatar,
      whatsapp: item.whatsapp,
      bio: item.bio,
    }));

    const findId = findUser.map((item: UserDataInfo) => ({
      id: item.id,
    })).pop()?.id;

    const token = sign({}, authConfig.jwt.secret, {
      subject: String(findId),
    });

    return response.status(201).json({ UserDataFormated, token });
  }
}
