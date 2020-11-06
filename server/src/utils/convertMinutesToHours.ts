/**
 * @name convertMinutesToHours
 * @description This method convert minutes in hours
 * @param {Number} time
 * @returns {String} hours
 */
export default function convertMinutesToHours(time: number) {
  const hours = Math.floor(time / 60).toString();
  const minutes = time % 60;
  return String(
    (hours.length === 1 ? `0${hours}` : hours) +
      ":" +
      (minutes === 0 ? "00" : minutes)
  );
}
