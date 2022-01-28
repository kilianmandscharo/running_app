import React, {useState} from 'react';
import {View, Text, processColor} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
import {
  checkIfDayinObject,
  formatAltitude,
  formatDistance,
  formatSpeed,
  formatTime,
  parseDate,
} from '../functional/functions';
import {RunMeasurement, SingleRunVisualizer} from '../functional/interfaces';
import {
  backgroundBlack,
  HEIGHT,
  mainBlue,
  mainBlueDark,
  mainRed,
  styles,
  WIDTH,
} from '../styles/styles';
import {daysInAMonth} from '../functional/daysInAMonth';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BackButton, StandardButton} from './Buttons';
import Gradient from './Gradient';

export const VisualizerSingleRun = (props: SingleRunVisualizer) => {
  const [dataset, setDataset] = useState<1 | 2 | 3>(1);
  const [yValue, setYValue] = useState(0);
  const [xValue, setXValue] = useState(props.data.data[0].time);
  const selected = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{translateX: (WIDTH / 4) * selected.value}],
  }));

  const distanceData = props.data.data.map((entry: RunMeasurement) => {
    return {x: entry.time, y: entry.distance};
  });
  const altitudeData = props.data.data.map((entry: RunMeasurement) => {
    return {x: entry.time, y: entry.altitude};
  });
  const speedData = props.data.data.map((entry: RunMeasurement) => {
    return {x: entry.time, y: entry.speed};
  });

  const handleSelect = (event: any) => {
    const entry = event.nativeEvent;
    setYValue(entry.y);
    setXValue(entry.x);
  };

  const findYValue = (time: number, data: any) => {
    for (const entry of data) {
      if (time === entry.x) {
        return entry.y;
      }
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const displayText =
    dataset === 1
      ? `Distance: ${formatDistance(yValue)} km`
      : dataset === 2
      ? `Altitude: ${formatAltitude(yValue)} m`
      : `Speed: ${formatSpeed(yValue)} km/h`;

  return (
    <View style={styles.singleRunVisualizingSection}>
      <Gradient color1={mainBlueDark} color2={backgroundBlack} />
      <View style={styles.backSection}>
        <BackButton pressHandler={goBack} />
      </View>
      <View style={styles.singleRunDisplaySection}>
        <View style={styles.singleRunDateContainer}>
          <Text style={styles.singleRunDateText}>
            {parseDate(props.data.id)}
          </Text>
        </View>
        <View style={styles.singleRunDisplayContainer}>
          <Text style={styles.singleRunDisplayText}>{displayText}</Text>
          <Text style={styles.singleRunDisplayText}>
            Time: {formatTime(xValue)}
          </Text>
        </View>
      </View>
      <View style={styles.singleRunVisualizingButtonSection}>
        <Animated.View style={[styles.singleRunVisualizingSelection, style]} />
        <StandardButton
          pressHandler={() => {
            selected.value = withTiming(0);
            setYValue(findYValue(xValue, distanceData));
            setDataset(1);
          }}
          text="Distance"
          buttonStyle={styles.singleRunVisualizingButton}
          textStyle={styles.singleRunVisualizingButtonText}
          opacity={0.8}
        />
        <StandardButton
          pressHandler={() => {
            selected.value = withTiming(1);
            setYValue(findYValue(xValue, altitudeData));
            setDataset(2);
          }}
          text="Altitude"
          buttonStyle={styles.singleRunVisualizingButton}
          textStyle={styles.singleRunVisualizingButtonText}
          opacity={0.8}
        />
        <StandardButton
          pressHandler={() => {
            selected.value = withTiming(2);
            setYValue(findYValue(xValue, speedData));
            setDataset(3);
          }}
          text="Speed"
          buttonStyle={styles.singleRunVisualizingButton}
          textStyle={styles.singleRunVisualizingButtonText}
          opacity={0.8}
        />
      </View>
      <View style={styles.singleRunChartSection}>
        <LineChart
          style={styles.singleRunChart}
          data={{
            dataSets: [
              {
                label:
                  dataset === 1
                    ? 'Distance'
                    : dataset === 2
                    ? 'Altitude'
                    : 'Speed',
                values:
                  dataset === 1
                    ? distanceData
                    : dataset === 2
                    ? altitudeData
                    : speedData,
                config: {
                  drawValues: false,
                  circleColor: processColor(mainBlue),
                  color: processColor(mainBlue),
                  lineWidth: 3,
                  circleRadius: 4,
                },
              },
            ],
          }}
          xAxis={{
            enabled: false,
            drawLabels: false,
            drawGridLines: false,
            position: 'BOTTOM',
            axisLineWidth: WIDTH / 120,
            avoidFirstLastClipping: true,
            axisLineColor: processColor('black'),
          }}
          yAxis={{
            right: {enabled: false},
            left: {
              enabled: false,
              drawLabels: false,
              drawGridLines: false,
              axisLineWidth: WIDTH / 120,
              spaceTop: HEIGHT / 100,
              spaceBottom: 0,
              axisLineColor: processColor('black'),
              zeroLine: {
                enabled: false,
              },
            },
          }}
          doubleTapToZoomEnabled={false}
          onSelect={handleSelect}
          chartDescription={{text: ''}}
          legend={{enabled: false}}
        />
      </View>
    </View>
  );
};

// export const VisualizerAllRuns = (props: AllRunsVisualizer) => {
//   const [month, setMonth] = useState('01');
//   const [year, setYear] = useState(props.data.maxYear);
//   const [displayInfo, setDisplayInfo] = useState('Date: \nDistance: / Time: ');
//   const [valueSelected, setValueSelected] = useState(0);

//   const selected = useSharedValue(0);
//   const style = useAnimatedStyle(() => ({
//     transform: [{translateX: (WIDTH / 5) * selected.value}],
//   }));

//   const data = props.data;
//   const runsByDate = data.runsByDate;

//   const maxYear = parseInt(props.data.maxYear);
//   const minYear = parseInt(props.data.minYear);

//   const totalMonthDistance = getMonthTotal(runsByDate, month, year, 'd');
//   const totalYearDistance = getYearTotal(runsByDate, year, 'd');

//   const totalMonthTime = getMonthTotal(runsByDate, month, year, 't');
//   const totalYearTime = getYearTotal(runsByDate, year, 't');

//   const empty = totalMonthTime === 0 ? true : false;

//   const monthData = fillMonthData(runsByDate[year][month], month);

//   const valuesDistance = monthData.map((run: any, idx: number) => {
//     return {
//       y: run.distance,
//       x: idx + 1,
//     };
//   });

//   const valuesTime = monthData.map((run: any, idx: number) => {
//     return {
//       y: run.time,
//       x: idx + 1,
//     };
//   });

//   const handleSelect = (event: any) => {
//     const entry = event.nativeEvent;
//     const value = entry.y;
//     const day = entry.x;

//     let run;

//     if (valueSelected === 0) {
//       run = getRunByDay(runsByDate[year][month], day);
//     } else if (valueSelected === 1) {
//       run = getRunByDay(runsByDate[year][month], day);
//     }

//     if (run) {
//       if (run.id) {
//         const runInfo = `Date: ${parseDate(run.id)}\nDistance: ${formatDistance(
//           run.distance,
//         )} km / Time: ${formatTime(run.time)}`;
//         setDisplayInfo(runInfo);
//       }
//     }
//   };

//   const getRunByDay = (runs: any, day: number) => {
//     for (const run of runs) {
//       if (parseInt(run.day) === day) {
//         return run;
//       }
//     }
//     return false;
//   };

//   const goBack = () => {
//     props.navigation.goBack();
//   };

//   return (
//     <View style={styles.allRunsVisualizingSection}>
//       {/* <View style={styles.allRunsDisplaySection}>
//         <Text style={styles.allRunsDisplayText}>{displayInfo}</Text>
//       </View>
//       <View style={styles.allRunsChartButtonSection}>
//         <Animated.View style={[style, styles.allRunsButtonSelection]} />
//         <StandardButton
//           pressHandler={() => {
//             selected.value = withTiming(0);
//             setValueSelected(0);
//           }}
//           text="Distance"
//           buttonStyle={styles.allRunsChartButton}
//           textStyle={styles.allRunsChartButtonText}
//           opacity={0.8}
//         />
//         <StandardButton
//           pressHandler={() => {
//             selected.value = withTiming(1);
//             setValueSelected(1);
//           }}
//           text="Time"
//           buttonStyle={styles.allRunsChartButton}
//           textStyle={styles.allRunsChartButtonText}
//           opacity={0.8}
//         />
//       </View>
//       <View style={styles.allRunsChartSection}>
//         {empty && (
//           <View style={styles.allRunsWarning}>
//             <Text style={styles.allRunsWarningText}>No runs</Text>
//           </View>
//         )}
//         <BarChart
//           style={styles.allRunsChart}
//           data={{
//             dataSets: [
//               {
//                 values: valueSelected === 0 ? valuesDistance : valuesTime,
//                 label: 'Distance',
//                 config: {
//                   drawValues: false,
//                   color: processColor(valueSelected === 0 ? mainBlue : mainRed),
//                 },
//               },
//             ],
//           }}
//           doubleTapToZoomEnabled={false}
//           chartDescription={{text: ''}}
//           onSelect={handleSelect}
//           xAxis={{
//             drawLabels: false,
//             valueFormatter: getDaysInAMonth(month),
//             drawGridLines: false,
//             position: 'BOTTOM',
//             axisLineWidth: WIDTH / 120,
//             axisLineColor: processColor('#000000'),
//           }}
//           yAxis={{
//             right: {enabled: false},
//             left: {
//               enabled: false,
//               // drawLabels: dataEmpty ? false : true,
//               // drawGridLines: false,
//               spaceBottom: 0.5,
//               // axisLineWidth: WIDTH / 120,
//               // axisLineColor: processColor('#000000'),
//             },
//           }}
//           legend={{
//             enabled: false,
//           }}
//         />
//       </View>
//       <View style={styles.allRunsYearMonthSection}>
//         <StandardButton
//           pressHandler={() =>
//             setYear((prev: any) => {
//               prev = parseInt(prev);
//               return prev > minYear ? String(prev - 1) : String(maxYear);
//             })
//           }
//           text=""
//           buttonStyle={styles.allRunsArrowLeft}
//           textStyle={{}}
//           opacity={0.3}
//         />
//         <Text style={styles.allRunsYearMonthText}>{year}</Text>
//         <StandardButton
//           pressHandler={() =>
//             setYear((prev: any) => {
//               prev = parseInt(prev);
//               return prev < maxYear ? String(prev + 1) : String(minYear);
//             })
//           }
//           text=""
//           buttonStyle={styles.allRunsArrowRight}
//           textStyle={{}}
//           opacity={0.3}
//         />
//         <StandardButton
//           pressHandler={() =>
//             setMonth((prev: any) => {
//               prev = parseInt(prev);
//               return prev > 1 ? parseNum(prev - 1) : '12';
//             })
//           }
//           text=""
//           buttonStyle={styles.allRunsArrowLeft}
//           textStyle={{}}
//           opacity={0.3}
//         />
//         <Text style={styles.allRunsYearMonthText}>{month}</Text>
//         <StandardButton
//           pressHandler={() =>
//             setMonth((prev: any) => {
//               prev = parseInt(prev);
//               return prev < 12 ? parseNum(prev + 1) : '01';
//             })
//           }
//           text=""
//           buttonStyle={styles.allRunsArrowRight}
//           textStyle={{}}
//           opacity={0.3}
//         />
//       </View>
//       <View style={styles.allRunsTotalSection}>
//         <View style={styles.allRunsTotalElement}>
//           <Text style={styles.allRunsTotalHeader}>Yearly Total:{'\n'}</Text>
//           <Text style={styles.allRunsTotalText}>
//             Distance: {formatDistance(totalYearDistance)} km{'\n'}
//             Time: {formatTime(totalYearTime)} h
//           </Text>
//         </View>
//         <View style={styles.allRunsTotalElement}>
//           <Text style={styles.allRunsTotalHeader}> Monthly Total:{'\n'}</Text>
//           <Text style={styles.allRunsTotalText}>
//             Distance: {formatDistance(totalMonthDistance)} km{'\n'} Time:{' '}
//             {formatTime(totalMonthTime)} h
//           </Text>
//         </View>
//       </View>
//       <View style={styles.backSection}>
//         <BackButton pressHandler={goBack} />
//       </View> */}
//       <Chart />
//     </View>
//   );
// };

const fillMonthData = (monthData: any, month: string) => {
  let day = 1;
  while (monthData.length < daysInAMonth[month]) {
    if (checkIfDayinObject(String(day), monthData)) {
      day++;
      continue;
    } else {
      monthData.push({
        distance: 0,
        day: day < 10 ? `0${day}` : String(day),
        time: 0,
      });
      day++;
    }
  }
  monthData.sort((a: any, b: any) => {
    return a.day - b.day;
  });
  return monthData;
};

const getMonthTotal = (
  runsByDate: any,
  month: string,
  year: string,
  mode: string,
) => {
  const runs = runsByDate[year][month];
  if (runs.length === 0) {
    return 0;
  }
  if (mode === 'd') {
    return runsByDate[year][month]
      .map((run: any) => run.distance)
      .reduce((acc: number, dis: number) => acc + dis);
  } else {
    return runsByDate[year][month]
      .map((run: any) => run.time)
      .reduce((acc: number, t: number) => acc + t);
  }
};

const getYearTotal = (runsByDate: any, year: string, mode: string) => {
  const months = Object.keys(runsByDate[year]);
  let reVal = 0;
  for (const month of months) {
    if (runsByDate[year][month].length > 0) {
      reVal += getMonthTotal(runsByDate, month, year, mode === 'd' ? 'd' : 't');
    }
  }
  return reVal;
};
