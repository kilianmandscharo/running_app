import React, {useRef, useState} from 'react';
import {Animated, View} from 'react-native';
import {ListItemBackButton, StandardButton} from './Buttons';
import {formatDistance, formatTime, parseDate} from '../functional/functions';
import {ListItemProps} from '../functional/interfaces';
import {mainBlueBright, mainRedBright, styles} from '../styles/styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

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
  };

  return (
    <AnimatedButton
      onPress={!flipped ? flip : () => null}
      style={{
        transform: [{scale: deleteAnimationValue}, {rotateY: rotation}],
        opacity: deleteAnimationValue,
      }}>
      <Animated.View style={[styles.historyEntry]}>
        <View style={styles.historyEntryFrontside}>
          <Animated.Text
            style={[styles.historyEntryDate, {opacity: frontOpacity}]}>
            {parseDate(props.date)}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.historyEntryText,
              {opacity: frontOpacityData, color: mainRedBright},
            ]}>
            Time: {formatTime(props.time)}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.historyEntryText,
              {opacity: frontOpacityData, color: mainBlueBright},
            ]}>
            Distance: {formatDistance(props.distance)} km
          </Animated.Text>
        </View>
        <Animated.View
          style={[styles.historyEntryBackside, {opacity: backOpacity}]}
          pointerEvents={!flipped ? 'none' : 'box-none'}>
          <View style={styles.historyEntryButtonContainer}>
            <StandardButton
              text="Export"
              pressHandler={() => {
                props.setIdOfCurrentRun(props.date);
                props.exportRun();
              }}
              buttonStyle={styles.historyEntryButton}
              textStyle={styles.historyEntryButtonText}
              opacity={0.8}
            />
            <StandardButton
              text="Graph"
              pressHandler={() => {
                if (props.visualizeSingleRun(props.date)) {
                  props.navigate();
                }
              }}
              buttonStyle={[styles.historyEntryButton, {borderTopWidth: 0.8}]}
              textStyle={styles.historyEntryButtonText}
              opacity={0.8}
            />
            <StandardButton
              text="Delete"
              pressHandler={() => {
                props.setIdOfCurrentRun(props.date);
                props.deleteRun();
              }}
              buttonStyle={[styles.historyEntryButton, {borderTopWidth: 0.8}]}
              textStyle={styles.historyEntryButtonText}
              opacity={0.8}
            />
          </View>
          <ListItemBackButton pressHandler={flipBack} />
        </Animated.View>
      </Animated.View>
    </AnimatedButton>
  );
};
