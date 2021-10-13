export const degToRad = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

//https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
export const calculateDistance = (
  lon1: number,
  lon2: number,
  lat1: number,
  lat2: number,
) => {
  const earthRadius = 6371 * 1000;
  const dLon = degToRad(lon2 - lon1);
  const dLat = degToRad(lat2 - lat1);
  lat1 = degToRad(lat1);
  lat2 = degToRad(lat2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

// https://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path/10477334#10477334
export const circlePath = (cx: number, cy: number, r: number) => {
  return (
    'M ' +
    cx +
    ' ' +
    cy +
    ' m -' +
    r +
    ', 0 a ' +
    r +
    ',' +
    r +
    ' 0 1,0 ' +
    r * 2 +
    ',0 a ' +
    r +
    ',' +
    r +
    ' 0 1,0 -' +
    r * 2 +
    ',0'
  );
};

export const parseDate = (date: string) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let monthNumber = parseInt(month);
  month = months[monthNumber - 1];
  const day = date.slice(8, 10);

  return `${day} ${month} ${year}`;
};

export const formatTime = (time: number) => {
  let hours: number | string = Math.floor(time / 3600);
  time = time - 3600 * hours;
  let minutes: number | string = Math.floor(time / 60);
  let seconds: number | string = time % 60;
  hours = hours < 10 ? `${0}${hours}` : hours;
  minutes = minutes < 10 ? `${0}${minutes}` : minutes;
  seconds = seconds < 10 ? `${0}${seconds}` : seconds;
  return `${hours}:${minutes}:${seconds}`;
};

export const formatDistance = (distance: number) => {
  let d = Math.floor(distance);
  if (d < 10) {
    return `${0}.${0}${0}`;
  }
  let kilometers: number | string = Math.floor(d / 1000);
  let meters: number | string = Math.floor((d - 1000 * kilometers) / 10);
  meters = meters < 10 ? `${0}${meters}` : meters;
  return `${kilometers}.${meters}`;
};

export const formatAltitude = (altitude: number) => {
  return Math.round(altitude);
};

export const formatSpeed = (speed: number) => {
  return Math.round(speed);
};

export const extractYearMonthDay = (date: string) => {
  return [date.slice(0, 4), date.slice(5, 7), date.slice(8, 10)];
};

export const checkIfDayinObject = (day: string, runs: any) => {

  day = parseInt(day) < 10 ? `0${day}` : day;

  for (const run of runs) {
    if (day === run.day) {
      return true;
    }
  }
  return false;
};

export const parseNum = (num: number) => {
  if (num > 9) {
    return String(num);
  } else {
    return `0${num}`;
  }
};
