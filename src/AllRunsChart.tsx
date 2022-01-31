import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Animated} from 'react-native';
import Svg, {G, Rect, Text as SvgText} from 'react-native-svg';
import {formatDistance, formatTime} from './functional/functions';
import generateTestData from './functional/generateTestData';
import {AllRunsChartProps} from './functional/interfaces';
import {
  backgroundBlack,
  HEIGHT,
  mainBlue,
  mainBlueDark,
  mainRed,
  standardWidth,
} from './styles/styles';
import {styles} from './styles/styles';
import {BackButton} from './components/Buttons';
import Gradient from './components/Gradient';

const itemHeight = HEIGHT / 25;

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const runs = generateTestData(2019, 2021);

const width = standardWidth;
const height = HEIGHT / 1.6;
const dayWidth = height / 31;

const months = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, -2];
const days = [-1, ...new Array(31).fill(0).map((_, idx) => idx + 1), -2];

const AllRunsChart = ({allRunsData, navigation}: AllRunsChartProps) => {
  const years = [-1, ...allRunsData.years, -2];

  const [year, setYear] = useState(allRunsData.maxYear);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  const animatedDistanceValues = useRef(
    new Array(31).fill(0).map(_ => new Animated.Value(0)),
  ).current;

  const animatedTimeValues = useRef(
    new Array(31).fill(0).map(_ => new Animated.Value(0)),
  ).current;

  const data: any = allRunsData.runsByDate[`${year}`][`${month}`];

  // Test data
  // const data: any = runs[`${year}`][`${month}`];

  useEffect(() => {
    const maxValue = Math.max(...data.map((run: any) => run.distance));
    const unit = maxValue === 0 ? 0 : (height / maxValue) * 0.67;
    const maxValueTime = Math.max(...data.map((run: any) => run.time));
    const unitTime = maxValueTime === 0 ? 0 : (height / maxValueTime) * 0.67;

    for (let i = 0; i < 31; i++) {
      const d = data[i].distance;
      Animated.timing(animatedDistanceValues[i], {
        toValue: d * unit,
        duration: 500,
        useNativeDriver: true,
      }).start();
      const t = data[i].time;
      Animated.timing(animatedTimeValues[i], {
        toValue: t * unitTime,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [month, year]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Gradient color1={mainBlueDark} color2={backgroundBlack} />
      <View style={styles.backSection}>
        <BackButton pressHandler={() => navigation.goBack()} />
      </View>
      <View
        style={{
          flex: 1.5,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: standardWidth,
        }}>
        <Text style={[styles.AllRunsChartDataText, {borderColor: mainBlue}]}>
          Distance: {formatDistance(data[`${day - 1}`].distance)} km
        </Text>
        <Text style={[styles.AllRunsChartDataText, {borderColor: mainRed}]}>
          Time: {formatTime(data[`${day - 1}`].time)}
        </Text>
      </View>
      <View style={{flex: 7.5}}>
        <Svg width={width} height={height}>
          {data.map((run: any, idx: number) => (
            <G key={run.day} opacity={run.day === day ? 1 : 0.6}>
              <AnimatedRect
                x="20"
                y={dayWidth * (run.day - 1)}
                width={animatedDistanceValues[idx]}
                height={dayWidth / 1.1 / 2}
                fill={mainBlue}
              />
              <AnimatedRect
                x="20"
                y={dayWidth * (run.day - 1) + dayWidth / 2}
                width={animatedTimeValues[idx]}
                height={dayWidth / 1.1 / 2}
                fill={mainRed}
              />
              <SvgText
                fill="white"
                fontSize="10"
                fontFamily="Quicksand-Regular"
                x="10"
                y={dayWidth * (run.day - 1) + HEIGHT / 70}
                textAnchor="middle">
                {idx + 1}
              </SvgText>
            </G>
          ))}
        </Svg>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: 10,
          width: standardWidth,
        }}>
        <ScrollList data={years} handler={setYear} />
        <ScrollList data={months} handler={setMonth} />
        <ScrollList data={days} handler={setDay} />
      </View>
    </View>
  );
};

const ScrollList = ({
  data,
  handler,
}: {
  data: number[];
  handler: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={[styles.AllRunsChartList, {height: itemHeight * 3}]}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.toString()}
        bounces={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={event => {
          const index =
            Math.round(event.nativeEvent.contentOffset.y / itemHeight) + 1;
          const value = data[index];
          handler(value);
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 2) * itemHeight,
            (index - 1) * itemHeight,
            index * itemHeight,
          ];
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
          });
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
          });
          return (
            <View>
              <Animated.Text
                style={[
                  styles.AllRunsChartItem,
                  {opacity, transform: [{scale}], height: itemHeight},
                ]}>
                {parseNumber(item)}
              </Animated.Text>
            </View>
          );
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
      />
    </View>
  );
};

const parseNumber = (number: number) => {
  if (number < 0) {
    return '';
  } else if (number < 10) {
    return `0${number}`;
  } else {
    return number.toString();
  }
};

export default AllRunsChart;
