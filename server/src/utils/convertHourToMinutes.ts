/**
 * @name convertHourToMinutes
 * @description This method convert hours in minutes
 * @param {String} time
 * @returns {Number} minutes
 */
export default function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(":").map(Number);

  const timeInMinutes = hour * 60 + minutes;

  return timeInMinutes;
}
