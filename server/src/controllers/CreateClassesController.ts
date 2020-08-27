import { Request, Response } from 'express';
import db from '../database/connections';
import convertTimeInMinutes from '../utils/ConvertTimeInMinutes';

interface ScheduleItems {
  week_day: number;
  from: string;
  to: string;
}

interface ClassItems {
  id: number,
  subject: string,
  cost: number,
  user_id: number,
  name: string,
  lastname: string,
  email: string,
  avatar: string,
  whatsapp: string,
  bio: string;
}

export default class CreateClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search',
      });
    }

    try {
      const timeInMinutes = convertTimeInMinutes(time);

      const classesArray = await db('classes')
        .whereExists(function () {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

      const classes = classesArray.map((item: ClassItems) => ({
        id: item.id,
        subject: item.subject,
        cost: item.cost,
        user_id: item.user_id,
        name: item.name,
        lastname: item.lastname,
        email: item.email,
        avatar: `http://192.168.1.101:3333/files/${item.avatar}`,
        whatsapp: item.whatsapp,
        bio: item.bio,
      }));

      if (classes.length === 0) {
        throw new Error('classes not found');
      }

      return response.json(classes);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async create(request: Request, response: Response) {
    const {
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await db.transaction();
    try {
      const user_id = request.user.id;

      const userArray = await trx.select('whatsapp', 'bio').from('users').where('id', '=', user_id);

      const user = userArray.pop();

      if (user.whatsapp !== whatsapp || user.bio !== bio) {
        user.whatsapp = whatsapp;
        user.bio = bio;

        await trx('users').update({
          whatsapp: user.whatsapp,
          bio: user.bio,
        }).where('id', '=', user_id);
      }

      const classReturnId = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const class_id = classReturnId[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItems) => ({
        class_id,
        week_day: scheduleItem.week_day,
        from: convertTimeInMinutes(scheduleItem.from),
        to: convertTimeInMinutes(scheduleItem.to),
      }));

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: err.message,
      });
    }
  }

  async show(request: Request, response: Response) {
    const totalProffessors = await db('classes').count('* as total');

    const { total } = totalProffessors[0];

    return response.json({ total });
  }
}
