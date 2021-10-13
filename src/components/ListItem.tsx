import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, Animated, View} from 'react-native';
import {ListItemBackButton, StandardButton} from './Buttons';
import {formatDistance, formatTime, parseDate} from '../functional/functions';
import {ListItemProps} from '../functional/interfaces';
import {entryHeight, HEIGHT, mainBlue, mainRed, styles} from '../styles/styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const elementHeight = entryHeight + HEIGHT / 48;
const height = HEIGHT * 0.7;

const AnimatedButton = Animated.createAnimatedComponent(
  TouchableWithoutFeedback,
);

export const ListItem = (props: ListItemProps) => {
  const [flipped, setFlipped] = useState(false);

  // ================================================================== //
  // Flipping
  // const backOpacity = useRef(new Animated.Value(0)).current;
  const frontAnimationValue = useRef(new Animated.Value(0)).current;

  const rotation = frontAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const frontOpacity = frontAnimationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  });

  const frontOpacityData = frontAnimationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.87, 0, 0],
  });

  const backOpacity = frontAnimationValue.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0, 0.87],
  });

  const flip = () => {
    Animated.timing(frontAnimationValue, {
      toValue: 1,
      duration: 400,
      delay: 0,
      useNativeDriver: true,
    }).start(() => {
      setFlipped(true);
    });
  };

  const flipBack = () => {
    Animated.timing(frontAnimationValue, {
      toValue: 0,
      duration: 400,
      delay: 0,
      useNativeDriver: true,
    }).start(() => setFlipped(false));
  };

  // ================================================================== //
  // Scroll values
  // https://www.youtube.com/watch?v=NiFdK-s6OP8&t=580s
  const position = Animated.subtract(props.index * elementHeight, props.y);
  const isDisappearing = -elementHeight;
  const isTop = 0;
  const isBottom = height - elementHeight / 2;
  const isAppearing = height + elementHeight;

  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.7, 1, 1, 0.7],
    extrapolate: 'clamp',
  });

  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  const translateY = Animated.add(
    Animated.add(
      props.y,
      props.y.interpolate({
        inputRange: [0, props.index * elementHeight],
        outputRange: [0, -props.index * elementHeight],
        extrapolateRight: 'clamp',
      }),
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -entryHeight / 4],
      extrapolate: 'clamp',
    }),
  );

  // ================================================================== //
  // Delete item
  const deleteAnimationValue = useRef(new Animated.Value(1)).current;

  const shrinkOnDelete = () => {
    return Animated.timing(deleteAnimationValue, {
      toValue: 0,
      duration: 400,
      delay: 0,
      useNativeDriver: true,
    });
  };

  const deleteItem = () => {
    shrinkOnDelete().start();
    props.deleteItem(props.date);
  };

  return (
    <AnimatedButton
      onPress={!flipped ? flip : () => null}
      style={{
        transform: [{scale: deleteAnimationValue}, {rotateY: rotation}],
        opacity: deleteAnimationValue,
      }}>
      <Animated.View
        style={[
          styles.historyEntry,
          {opacity, transform: [{translateY: translateY}, {scale}]},
        ]}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Animated.Text
            style={[styles.historyEntryDate, {opacity: frontOpacity}]}>
            {parseDate(props.date)}
          </Animated.Text>
          <Animated.Text
            style={[styles.historyEntryText, {opacity: frontOpacityData}]}>
            Time: {formatTime(props.time)}
            {'\n'} Distance: {formatDistance(props.distance)} km
          </Animated.Text>
        </View>
        <Animated.View
          style={[styles.historyEntryButtonSection, {opacity: backOpacity}]}
          pointerEvents={!flipped ? 'none' : 'box-none'}>
          <View style={styles.historyEntryButtonContainer}>
            <StandardButton
              text="Export"
              pressHandler={() => {
                props.exportRun(props.date);
              }}
              buttonStyle={styles.historyEntryMenuButton}
              textStyle={styles.historyEntryMenuButtonText}
              opacity={0.8}
            />
            <StandardButton
              text="Visualize"
              pressHandler={() => {
                if (props.visualizeHistory(props.date)) {
                  props.navigate();
                }
              }}
              buttonStyle={[
                styles.historyEntryMenuButton,
                {borderTopWidth: 0.8},
              ]}
              textStyle={styles.historyEntryMenuButtonText}
              opacity={0.8}
            />
            <StandardButton
              text="Delete"
              pressHandler={deleteItem}
              buttonStyle={[
                styles.historyEntryMenuButton,
                {borderTopWidth: 0.8},
              ]}
              textStyle={styles.historyEntryMenuButtonText}
              opacity={0.8}
            />
          </View>
          <ListItemBackButton pressHandler={flipBack} />
        </Animated.View>
      </Animated.View>
    </AnimatedButton>
  );
};
