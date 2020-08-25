import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import path from 'path';
import db from '../database/connections';
import authConfig from '../config/auth';

import MailProvider from '../providers/MailProvider';

const mailProvider = new MailProvider();

export default class ForgotPasswordController {
  async index(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const findEmail = await (
        await db.select('*')
          .from('users')
          .where('email', '=', email))
        .pop();

      const tolken = sign({}, authConfig.jwt.secret);

      await db('tolken').insert({
        user_id: findEmail.id,
        tolken,
      });

      const completeName = `${findEmail.name} ${findEmail.lastname}`;

      const emailTemplateView = path.resolve(__dirname, '..', 'view', 'ForgetPassword.hbs');

      await mailProvider.sendMail({
        to: {
          name: completeName,
          email: findEmail.email,
        },
        subject: '[Proffy] Recuperação de senha',
        templateData: {
          file: emailTemplateView,
          variables: {
            name: completeName,
            link: `http://localhost:3000/recover-password?token=${tolken}`,
          },
        },
      });

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
      }).where('id', '=', findUser.id);

      return response.status(200).json('password reseted');
    } catch (error) {
      return response.status(400).json('error in reset password');
    }
  }
}
