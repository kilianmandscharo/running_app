import {determineDaysInMonth} from '../functional/daysInAMonth';

export const testDaysInMonth = () => {
  for (let i = 0; i < 50; i++) {
    console.log(determineDaysInMonth(2, 1995 + i), 1995 + i);
  }
};
