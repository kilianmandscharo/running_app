import React, {useState} from 'react';
import {View, Text, processColor} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
import {
  formatAltitude,
  formatDistance,
  formatSpeed,
  formatTime,
  parseDate,
} from './functional/functions';
import {RunMeasurement, SingleRunGraphProps} from './functional/interfaces';
import {
  backgroundBlack,
  HEIGHT,
  mainBlue,
  mainBlueBright,
  mainBlueDark,
  mainRed,
  mainRedBright,
  styles,
  WIDTH,
} from './styles/styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BackButton, StandardButton} from './components/Buttons';
import Gradient from './components/Gradient';

const SingleRunGraph = (props: SingleRunGraphProps) => {
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
    <View style={styles.singleRunGraph}>
      <Gradient color1={mainBlueDark} color2={backgroundBlack} />
      <View style={styles.backSection}>
        <BackButton pressHandler={goBack} />
      </View>
      <View style={styles.SingleRunGraphInfoSection}>
        <View style={styles.singleRunGraphDateContainer}>
          <Text style={styles.singleRunGraphDateText}>
            {parseDate(props.data.id)}
          </Text>
        </View>
        <View style={styles.singleRunGraphStatsContainer}>
          <Text
            style={[styles.singleRunGraphStatsText, {color: mainBlueBright}]}>
            {displayText}
          </Text>
          <Text
            style={[styles.singleRunGraphStatsText, {color: mainRedBright}]}>
            Time: {formatTime(xValue)}
          </Text>
        </View>
      </View>
      <View style={styles.singleRunGraphButtonSection}>
        <Animated.View style={[styles.singleRunGraphSelector, style]} />
        <StandardButton
          pressHandler={() => {
            selected.value = withTiming(0);
            setYValue(findYValue(xValue, distanceData));
            setDataset(1);
          }}
          text="Distance"
          buttonStyle={styles.singleRunGraphButton}
          textStyle={styles.singleRunGraphButtonText}
          opacity={0.8}
        />
        <StandardButton
          pressHandler={() => {
            selected.value = withTiming(1);
            setYValue(findYValue(xValue, altitudeData));
            setDataset(2);
          }}
          text="Altitude"
          buttonStyle={styles.singleRunGraphButton}
          textStyle={styles.singleRunGraphButtonText}
          opacity={0.8}
        />
        <StandardButton
          pressHandler={() => {
            selected.value = withTiming(2);
            setYValue(findYValue(xValue, speedData));
            setDataset(3);
          }}
          text="Speed"
          buttonStyle={styles.singleRunGraphButton}
          textStyle={styles.singleRunGraphButtonText}
          opacity={0.8}
        />
      </View>
      <View style={styles.singleRunGraphGraphSection}>
        <LineChart
          style={styles.singleRunGraphGraph}
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

export default SingleRunGraph;
