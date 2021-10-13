import React from 'react';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {backgroundBlack, HEIGHT, mainRedDark, WIDTH} from '../styles/styles';

interface GradientProps {
  color1: string;
  color2: string;
}

const Gradient = ({color1, color2}: GradientProps) => {
  return (
    <Svg height={HEIGHT} width={WIDTH} style={{position: 'absolute'}}>
      <Defs>
        <LinearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="1" stopColor={color1} stopOpacity="1" />
          <Stop offset="0" stopColor={color2} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect fill="url(#gradient)" width={WIDTH} height={HEIGHT} />
    </Svg>
  );
};

export default Gradient;
