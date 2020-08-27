import { Request, Response } from 'express';
import db from '../database/connections';
import ConvertTimeinMinutes, { convertMinutesInTime } from '../utils/ConvertTimeInMinutes';

interface ScheduleItems {
  from: number,
  to: number,
}

export default class ScheduleUpdateController {
  async index(request: Request, response: Response) {
    const { id } = request.user;

    const classArray = await db.select('id').from('classes').where('user_id', '=', id);

    const classes = classArray.pop();

    const classesScheduleArray = await db.select('*').from('class_schedule').where('class_id', '=', classes.id);

    const classesSchedule = classesScheduleArray.map((item: ScheduleItems) => ({
      ...item,
      to: convertMinutesInTime(item.to),
      from: convertMinutesInTime(item.from),
    }));

    return response.status(200).json(classesSchedule);
  }

  async update(request: Request, response: Response) {
    const {
      id, week_day, to, from,
    } = request.body;

    const classesSchedule = await db.select('*').from('class_schedule').where('id', '=', id);

    const schedule = classesSchedule.pop();

    schedule.week_day = week_day;
    schedule.to = ConvertTimeinMinutes(to);
    schedule.from = ConvertTimeinMinutes(from);

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

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const classesScheduleArray = await db.select('*').from('class_schedule').where('class_id', '=', id);

    const classesSchedule = classesScheduleArray.map((item: ScheduleItems) => ({
      ...item,
      to: convertMinutesInTime(item.to),
      from: convertMinutesInTime(item.from),
    }));

    return response.status(200).json(classesSchedule);
  }
}
