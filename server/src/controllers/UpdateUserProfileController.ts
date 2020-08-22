import { Response, Request } from 'express';
import path from 'path';
import fs from 'fs';
import db from '../database/connections';
import uploadConfig from '../config/upload';

export default class UpdateUserProfilleController {
  async update(request: Request, response: Response) {
    const { id } = request.user;
    const {
      name, lastname, email, bio, whatsapp,
    } = request.body;

    const userArray = await db.select('*').from('users').where('id', '=', id);

    if (!userArray) {
      return response.status(400).json({ error: 'user dont existis' });
    }

    const user = userArray.pop();

    const findEmailArray = await db.select('id', 'email').from('users').where('email', '=', email);

    const findEmail = findEmailArray.pop();

    if (findEmail && findEmail.id !== user.id) {
      return response.status(400).json({ error: 'this email already existis' });
    }

    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.whatsapp = whatsapp;
    user.bio = bio;
    user.avatar = `http://192.168.1.101:3333/files/${user.avatar}`;

    delete user.password;

    await db('users').update({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      whatsapp: user.whatsapp,
      bio: user.bio,
    });

    return response.status(200).json(user);
  }

  async patch(request: Request, response: Response) {
    const { id } = request.user;
    const avatar = request.file.filename;

    try {
      const userArray = await db.select('*').from('users').where('id', '=', id);
      const user = userArray.pop();

      if (!user) {
        throw new Error('user not existis');
      }

      if (user.avatar) {
        const userAvatarPath = path.join(uploadConfig.directory, user.avatar);
        const userAvatarExistis = await fs.promises.stat(userAvatarPath);

        if (userAvatarExistis) {
          await fs.promises.unlink(userAvatarPath);
        }
      }

      user.avatar = avatar;

      await db('users').update({
        avatar: user.avatar,
      });

      delete user.password;
      user.avatar = `http://192.168.1.101:3333/files/${avatar}`;

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
