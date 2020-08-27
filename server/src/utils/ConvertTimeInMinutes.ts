export default function convertTimeInMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = (hour * 60) + minutes;

  return timeInMinutes;
}

export function convertMinutesInTime(time: number) {
  const minutesIntime = String(time / 60);

  const convertedMinutes = `${minutesIntime}:00`;

  return convertedMinutes;
}
