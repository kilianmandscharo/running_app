export const daysInAMonth = {
  '01': 31,
  '02': 28,
  '03': 31,
  '04': 30,
  '05': 31,
  '06': 30,
  '07': 31,
  '08': 31,
  '09': 30,
  '10': 31,
  '11': 30,
  '12': 31,
} as const;

export type Month = keyof typeof daysInAMonth;

export const isLeapYear = (year: number) => {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const parseMonth = (month: number) => {
  return month < 10 ? `0${month}` : `${month}`;
};

export const getDaysInAMonth = (month: string) => {
  const days = daysInAMonth[month as Month];
  const reVal = [];
  for (let i = 1; i <= days; i++) {
    reVal.push(String(i));
  }
  return reVal;
};
