import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import db from '../database/connections';
import authConfig from '../config/auth';

import MailProvider from '../providers/MailProvider';

const mailProvider = new MailProvider();

export default class ForgotPasswordController {
  async index(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const findEmail = await (
        await db.select('id', 'email')
          .from('users')
          .where('email', '=', email))
        .pop();

      const tolken = sign({}, authConfig.jwt.secret);

      await db('tolken').insert({
        user_id: findEmail.id,
        tolken,
      });

      await mailProvider.sendMail(
        email,
        `Email de recuperação: ${tolken}`,
      );

      return response.status(200).json({ message: 'email send' });
    } catch (error) {
      return response.status(400).json('error send the email');
    }
  }

  async update(request: Request, response: Response) {
    const { password, tolken } = request.body;

    try {
      const findToken = await (
        await db.select('user_id')
          .from('tolken')
          .where('tolken', '=', tolken))
        .pop();

      if (!findToken) {
        return response.status(400).json('token no valid');
      }

      const findUser = await (
        await db.select('*')
          .from('users')
          .where('id', '=', findToken.user_id))
        .pop();

      findUser.password = await hash(password, 8);

      await db('users').update({
        password: findUser.password,
      });

      return response.status(200).json('password reseted');
    } catch (error) {
      return response.status(400).json('error in reset password');
    }
  }
}
