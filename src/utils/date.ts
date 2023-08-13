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
