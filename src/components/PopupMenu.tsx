import React from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {View, Animated} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Svg, {
  Defs,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import {
  mainBlue,
  styles,
  WIDTH as w,
  HEIGHT as h,
  mainBlueDark,
  mainRedDark,
  mainRed,
} from '../styles/styles';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface PopupMenuProps {
  children: any;
}

// https://www.youtube.com/watch?v=B52na2LxQu4

const SIZE = w / 5;

const WIDTH = 3.14 * SIZE;
const HEIGHT = 3.5 * SIZE;

const R = SIZE / 4;

const H = HEIGHT - SIZE - 2 * R;
const W = WIDTH - 2 * R;
const W_2 = WIDTH / 2 - 4 * R;
const S = SIZE - 2 * R;

const arc = (x: number, y: number, rotation: boolean = false) =>
  `a ${R} ${R} 0 0 ${rotation ? 0 : 1} ${x} ${y}`;

const d = [
  `M 0 ${R}`,
  arc(R, -R),
  `h ${W}`,
  arc(R, R),
  `v ${H}`,
  arc(-R, R),
  `h ${-W_2}`,
  arc(-R, R, true),
  `v ${S}`,
  arc(-R, R),
  `h ${-S}`,
  arc(-R, -R),
  `v ${-S}`,
  arc(-R, -R, true),
  `h ${-W_2}`,
  arc(-R, -R),
  'Z',
].join(' ');

const PopupMenu = (props: PopupMenuProps) => {
  const [opened, setOpened] = useState(false);

  const handlePress = () => {
    if (opened) {
      disappear().start(() => {
        setOpened(false);
      });
    } else {
      appear().start(() => {
        setOpened(true);
      });
    }
  };

  const animationValue = useRef(new Animated.Value(0)).current;

  const maskHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZE, HEIGHT],
    extrapolate: 'clamp',
  });

  const maskWidth = maskHeight.interpolate({
    inputRange: [2 * SIZE, HEIGHT],
    outputRange: [SIZE, WIDTH],
    extrapolate: 'clamp',
  });

  const maskX = maskWidth.interpolate({
    inputRange: [SIZE, WIDTH],
    outputRange: [WIDTH / 2 - SIZE / 2, 0],
  });

  const maskY = maskHeight.interpolate({
    inputRange: [SIZE, HEIGHT],
    outputRange: [HEIGHT - SIZE, 0],
  });

  const itemsOpacity = animationValue.interpolate({
    inputRange: [0.85, 1],
    outputRange: [0, 0.87],
    extrapolate: 'clamp',
  });

  const itemsTranslate = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const crossRoation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '0deg'],
  });

  const menuElevation = animationValue.interpolate({
    inputRange: [0, 0.1],
    outputRange: [6, 10],
  });

  const appear = () => {
    return Animated.timing(animationValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    });
  };

  const disappear = () => {
    return Animated.timing(animationValue, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    });
  };

  return (
    <Animated.View style={[styles.popupMenu, {elevation: menuElevation}]}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            zIndex: 3,
            position: 'absolute',
            bottom: 0,
          }}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Svg width={SIZE} height={SIZE}>
              <Path
                d={`M 0 ${R} ${arc(R, -R)} h ${S} ${arc(R, R)} v ${S} ${arc(
                  -R,
                  R,
                )} h ${-S} ${arc(-R, -R)} v ${-S}`}
                fill="transparent"
              />
            </Svg>
          </TouchableWithoutFeedback>
        </View>
        <View pointerEvents="none">
          <Svg width={WIDTH} height={HEIGHT}>
            <Defs>
              <LinearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
                <Stop offset="0" stopColor={mainRedDark} stopOpacity="1" />
                <Stop offset="1" stopColor="#467183" stopOpacity="1" />
              </LinearGradient>
              <Mask id="mask">
                <AnimatedRect
                  width={maskWidth}
                  height={maskHeight}
                  x={maskX}
                  y={maskY}
                  rx={R}
                  ry={R}
                  fill="white"
                />
              </Mask>
            </Defs>
            <Path d={d} fill={mainRed} mask="url(#mask)" />
          </Svg>
        </View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 30,
              left: WIDTH / 2 - SIZE / 8,
              zIndex: 5,
              transform: [{rotate: crossRoation}],
            },
          ]}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Svg
              width={SIZE / 4}
              height={SIZE / 4}
              viewBox="0 0 57 57"
              fill="none"
              opacity="0.87">
              <Rect y="23" width="57" height="10" fill="white" />
              <Rect
                x="23"
                y="57"
                width="57"
                height="10"
                transform="rotate(-90 23 57)"
                fill="white"
              />
            </Svg>
          </TouchableWithoutFeedback>
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: h / 70,
              opacity: itemsOpacity,
              transform: [{translateY: itemsTranslate}],
            },
          ]}>
          {props.children}
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default PopupMenu;
