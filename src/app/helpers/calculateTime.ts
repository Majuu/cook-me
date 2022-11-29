const convertToTwoDigits = (digit: number) => {
  return `0${digit}`;
};

export const calculateTime = (timePeriod: number): string => {
  const hours: number = Math.floor(timePeriod / 60);
  const minutes: number = timePeriod % 60;
  const returnHours: string = hours > 10 ? hours.toString() : convertToTwoDigits(hours);
  const returnMinutes: string = minutes < 10 ? convertToTwoDigits(minutes) : minutes.toString();

  return `${returnHours}:${returnMinutes}:00`;
};
