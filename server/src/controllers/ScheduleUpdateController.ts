import { Request, Response } from 'express';
import db from '../database/connections';

export default class ScheduleUpdateController {
  async index(request: Request, response: Response) {
    const { id } = request.user;

    const classArray = await db.select('id').from('classes').where('user_id', '=', id);

    const classes = classArray.pop();

    const classesScheduleArray = await db.select('*').from('class_schedule').where('class_id', '=', classes.id);

    return response.status(200).json(classesScheduleArray);
  }

  async update(request: Request, response: Response) {
    const {
      id, week_day, to, from,
    } = request.body;

    const classesSchedule = await db.select('*').from('class_schedule').where('id', '=', id);

    const schedule = classesSchedule.pop();

    schedule.week_day = week_day;
    schedule.to = to;
    schedule.from = from;

    await db('class_schedule').update({
      week_day: schedule.week_day,
      to: schedule.to,
      from: schedule.from,
    }).where('id', '=', id);

    return response.status(201).json(schedule);
  }

  async delete(request: Request, response: Response) {
    const {
      id,
    } = request.params;

    await db('class_schedule').delete().where('id', '=', id);

    return response.status(200).json({ message: 'schedule deleted' });
  }
}
