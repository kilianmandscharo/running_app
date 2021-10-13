import React from 'react';
import {useEffect} from 'react';
import {useRef} from 'react';
import {Animated} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {HEIGHT, mainBlue, WIDTH} from '../styles/styles';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const radius = Math.round(WIDTH / 8);
const strokeWidth = WIDTH / 40;

const LoadingCircle = () => {
  useEffect(() => {
    fillAnimation();
  }, []);

  const fillAnimation = () => {
    Animated.sequence([
      Animated.timing(animatedFillValue, {
        toValue: 0,
        duration: 800,
        delay: 0,
        useNativeDriver: true,
      }),
      Animated.timing(animatedFillValue, {
        toValue: -circumference,
        duration: 800,
        delay: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      animatedFillValue.setValue(circumference);
      fillAnimation();
    });
  };

  const halfcircle = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const animatedFillValue = useRef(new Animated.Value(circumference)).current;

  return (
    <Svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${halfcircle * 2} ${halfcircle * 2}`}
      style={{position: 'absolute', top: HEIGHT / 6}}>
      <AnimatedCircle
        cx="50%"
        cy="50%"
        stroke={mainBlue}
        strokeWidth={strokeWidth}
        r={radius}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={animatedFillValue}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default LoadingCircle;
