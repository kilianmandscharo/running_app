import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Svg, {Path, Rect} from 'react-native-svg';
import {
  BackButtonProps,
  HistoryButtonProps,
  ListItemBackButtonProps,
  RunningButtonProps,
  StandardButtonProps,
} from '../functional/interfaces';
import {entryHeight, HEIGHT, mainRed, styles, WIDTH} from '../styles/styles';

export const BackButton = (props: BackButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.arrowContainer}
      onPress={() => props.pressHandler()}
      activeOpacity={0.5}>
      <Svg
        width="29"
        height="23"
        viewBox="0 0 29 23"
        fill="none"
        opacity="0.87">
        <Path
          d="M0.933769 10.3197C0.347983 10.9055 0.347983 11.8553 0.933769 12.4411L10.4797 21.987C11.0655 22.5728 12.0152 22.5728 12.601 21.987C13.1868 21.4012 13.1868 20.4515 12.601 19.8657L4.11575 11.3804L12.601 2.89512C13.1868 2.30934 13.1868 1.35959 12.601 0.773802C12.0152 0.188016 11.0655 0.188016 10.4797 0.773802L0.933769 10.3197ZM28.0056 9.88041L1.99443 9.88041V12.8804L28.0056 12.8804V9.88041Z"
          fill="white"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export const ListItemBackButton = (props: ListItemBackButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.arrowContainer, {height: entryHeight}]}
      onPress={() => props.pressHandler()}>
      <Svg
        width={WIDTH / 7}
        height={HEIGHT / 20}
        viewBox="0 0 55 96"
        fill="none">
        <Rect
          x="7.07107"
          y="41"
          width="67"
          height="10"
          transform="rotate(45 7.07107 41)"
          fill={mainRed}
        />
        <Rect
          x="6.31192"
          y="41.117"
          width="57"
          height="10"
          transform="rotate(-45 6.31192 41.117)"
          fill={mainRed}
        />
      </Svg>
    </TouchableOpacity>
  );
};

export const RunningSectionButton = (props: RunningButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => props.pressHandler()}
      activeOpacity={0.8}
      disabled={props.disabled}
      style={props.disabled ? props.disabledStyle : props.buttonStyle}>
      <View>
        <Text style={props.textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const StandardButton = (props: StandardButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => props.pressHandler()}
      activeOpacity={props.opacity}
      style={props.buttonStyle}>
      <View>
        <Text style={props.textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const HistoryButton = (props: HistoryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => props.pressHandler()}
      activeOpacity={props.opacity}
      style={props.buttonStyle}>
      <View>
        <Text style={props.textStyle}>{props.text}</Text>
      </View>
      {props.children}
    </TouchableOpacity>
  );
};
