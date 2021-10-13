import React from 'react';
import {View} from 'react-native';
import {StandardButton} from './components/Buttons';
import {MenuProps} from './functional/interfaces';
import Logo from './components/Logo';
import {
  backgroundBlack,
  HEIGHT,
  mainBlue,
  mainBlueDark,
  mainWhite,
  styles,
  WIDTH,
} from './styles/styles';
import {Text as SvgText, Svg} from 'react-native-svg';
import Gradient from './components/Gradient';

const Menu = (props: MenuProps) => {
  return (
    <View style={styles.menu}>
      <Gradient color1={mainBlueDark} color2={backgroundBlack} />
      <View style={styles.headerSection}>
        <Logo />
        <Svg width={WIDTH / 1.35} height={HEIGHT / 11}>
          <SvgText
            fontFamily="FugazOne-Regular"
            fill={mainBlue}
            stroke={mainWhite}
            strokeWidth="2"
            fontSize={WIDTH / 5.5}
            textAnchor="start"
            y={HEIGHT / 12}>
            RUNNER
          </SvgText>
        </Svg>
      </View>
      <View style={styles.menuButtonSection}>
        <StandardButton
          pressHandler={() => {
            props.navigation.navigate('Running');
          }}
          text="New Run"
          buttonStyle={styles.menuButton}
          textStyle={styles.menuButtonText}
          opacity={0.8}
        />
        <StandardButton
          pressHandler={() => props.navigation.navigate('History')}
          text="History"
          buttonStyle={styles.menuButton}
          textStyle={styles.menuButtonText}
          opacity={0.8}
        />
      </View>
    </View>
  );
};

export default Menu;
