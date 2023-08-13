import {
  DAY_AGO,
  DAYS_AGO,
  HOUR_AGO,
  HOURS_AGO,
  MINUTE_AGO,
  MINUTES_AGO,
  MONTH_AGO,
  MONTHS_AGO,
  SECOND_AGO,
  SECONDS_AGO,
  WEEK_AGO,
  WEEKS_AGO,
  YEAR_AGO,
  YEARS_AGO,
} from '../constants/home/Config';

export const isTimestampToday = (timestamp: number): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const dateFromTimestamp = new Date(timestamp * 1000); // 将秒级时间戳转换为毫秒级时间戳
  const yearFromTimestamp = dateFromTimestamp.getFullYear();
  const monthFromTimestamp = dateFromTimestamp.getMonth();
  const dayFromTimestamp = dateFromTimestamp.getDate();

  return (
    currentYear === yearFromTimestamp &&
    currentMonth === monthFromTimestamp &&
    currentDay === dayFromTimestamp
  );
};

export const getCurrentUnixTimestampInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

export const formatTimeAgo = (unixTimestamp: number) => {
  const now = Date.now() / 1000;
  const diff = Math.floor(now - unixTimestamp);

  if (diff < 60) {
    return `${diff === 1 ? SECOND_AGO(diff) : SECONDS_AGO(diff)}`;
  } else if (diff < 60 * 60) {
    const minutes = Math.floor(diff / 60);

    return `${minutes === 1 ? MINUTE_AGO(minutes) : MINUTES_AGO(minutes)}`;
  } else if (diff < 60 * 60 * 24) {
    const hours = Math.floor(diff / (60 * 60));

    return `${hours === 1 ? HOUR_AGO(hours) : HOURS_AGO(hours)}`;
  } else if (diff < 60 * 60 * 24 * 7) {
    const days = Math.floor(diff / (60 * 60 * 24));

    return `${days === 1 ? DAY_AGO(days) : DAYS_AGO(days)}`;
  } else if (diff < 60 * 60 * 24 * 30) {
    const weeks = Math.floor(diff / (60 * 60 * 24 * 7));

    return `${weeks === 1 ? WEEK_AGO(weeks) : WEEKS_AGO(weeks)}`;
  } else if (diff < 60 * 60 * 24 * 365) {
    const months = Math.floor(diff / (60 * 60 * 24 * 30));

    return `${months === 1 ? MONTH_AGO(months) : MONTHS_AGO(months)}`;
  } else {
    const years = Math.floor(diff / (60 * 60 * 24 * 365));

    return `${years === 1 ? YEAR_AGO(years) : YEARS_AGO(years)} ago`;
  }
};
