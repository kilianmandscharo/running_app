const generateTestData = (startYear: number, endYear: number) => {
  const data: any = {};

  for(let i = 0; i <= endYear - startYear; i++) {
    const year: any = {}
    for (let j = 1; j < 13; j++) {
      year[j] = fillDays(); 
    }
    data[startYear + i] = year;
  }

  return data;
}

const fillDays = () => {
  return new Array(31).fill(0).map((_, idx) => ({distance: Math.round(Math.random() * 5000), day: idx + 1, time: Math.round(Math.random() * 1000)}));
}

export default generateTestData;