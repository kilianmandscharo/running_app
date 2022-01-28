import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {Animated, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Svg, {Circle, G} from 'react-native-svg';
import {LockCircleProps} from '../functional/interfaces';
import {styles, WIDTH} from '../styles/styles';

const radius = Math.round(WIDTH / 8);
const strokeWidth = WIDTH / 40;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const LockCircle = (props: LockCircleProps) => {
  const [finished, setFinished] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (props.ended) {
      fadeIn().start(() => {
        setFinished(false);
        setUnlocked(false);
        Animated.timing(animatedFillValue, {
          toValue: circumference,
          duration: 500,
          delay: 0,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [props.ended]);

  const halfcircle = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const animatedFillValue = useRef(new Animated.Value(circumference)).current;
  const animatedFadeValue = useRef(new Animated.Value(1)).current;
  const colorValue = animatedFadeValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(36, 123, 160)', 'rgb(21, 73, 96)'],
  });

  const fillAnimation = () => {
    return Animated.timing(animatedFillValue, {
      toValue: 0,
      duration: 2000,
      delay: 0,
      useNativeDriver: true,
    });
  };

  const onPressIn = () => {
    if (!props.started) {
      return;
    }
    fillAnimation().start(({finished}) => {
      if (finished) {
        setFinished(true);
        props.unlockedCallback();
        fadeOut().start();
      }
    });
  };

  const onPressOut = () => {
    if (!props.started) {
      return;
    }
    if (finished) {
      setUnlocked(true);
    }
    if (!finished) {
      fillAnimation().stop();
      animatedFillValue.setValue(circumference);
    }
  };

  const onPress = () => {
    if (!props.started) {
      return;
    }
    if (unlocked) {
      setFinished(false);
      setUnlocked(false);
      animatedFillValue.setValue(circumference);
      fadeIn().start();
      props.lockedCallback();
    }
  };

  const fadeIn = () => {
    return Animated.timing(animatedFadeValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });
  };

  const fadeOut = () => {
    return Animated.timing(animatedFadeValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });
  };

  return (
    <View style={styles.lockCircle}>
      <TouchableWithoutFeedback
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}>
        <View style={styles.lock}>
          <Animated.View
            style={[styles.lockShackle, {opacity: animatedFadeValue}]}
          />
          <View style={styles.lockBody} />
          <View style={styles.keyWay} />
        </View>
        <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${halfcircle * 2} ${halfcircle * 2}`}>
          <G rotation="-90" origin={`${halfcircle}, ${halfcircle}`}>
            <Circle
              cx="50%"
              cy="50%"
              stroke="white"
              strokeWidth={strokeWidth}
              r={radius}
              strokeOpacity={0.5}
              fill="transparent"
            />
            <AnimatedCircle
              cx="50%"
              cy="50%"
              stroke={colorValue}
              strokeWidth={strokeWidth}
              r={radius}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={animatedFillValue}
            />
          </G>
        </Svg>
      </TouchableWithoutFeedback>
    </View>
  );
};
