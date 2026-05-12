import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const PH_TIMEZONE = 'Asia/Manila';

export const toPHTime = (date) => {
  if (!date) return null;
  return dayjs(date).tz(PH_TIMEZONE);
};

export const formatPHTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return '';
  return toPHTime(date).format(format);
};

export const nowPH = () => {
  return dayjs().tz(PH_TIMEZONE);
};

export const parsePHTime = (dateString) => {
  return dayjs.tz(dateString, PH_TIMEZONE);
};

export default {
  toPHTime,
  formatPHTime,
  nowPH,
  parsePHTime,
  PH_TIMEZONE
};
