import React from 'react';
import Svg, {Mask, Path, Rect} from 'react-native-svg';
import {HEIGHT, WIDTH} from '../styles/styles';

export const ExportIcon = () => {
  return (
    <Svg
      width={WIDTH / 22}
      height={HEIGHT / 34}
      viewBox="0 0 101 110"
      fill="none">
      <Path
        d="M32.5 37.5H15C9.47715 37.5 5 41.9772 5 47.5V94.5C5 100.023 9.47715 104.5 15 104.5H86C91.5228 104.5 96 100.023 96 94.5V47.5C96 41.9772 91.5228 37.5 86 37.5H69"
        stroke="white"
        strokeWidth="10"
      />
      <Path
        d="M52.1213 0.87868C50.9497 -0.292893 49.0503 -0.292893 47.8787 0.87868L28.7868 19.9706C27.6152 21.1421 27.6152 23.0416 28.7868 24.2132C29.9584 25.3848 31.8579 25.3848 33.0294 24.2132L50 7.24264L66.9706 24.2132C68.1421 25.3848 70.0416 25.3848 71.2132 24.2132C72.3848 23.0416 72.3848 21.1421 71.2132 19.9706L52.1213 0.87868ZM53 67L53 3H47L47 67H53Z"
        fill="white"
      />
    </Svg>
  );
};

export const VisualizationIcon = () => {
  return (
    <Svg
      width={WIDTH / 22}
      height={HEIGHT / 34}
      viewBox="0 0 123 134"
      fill="none">
      <Path d="M18 14V116H108" stroke="white" strokeWidth="10" />
      <Path
        d="M35 96.5L43 69.5L56.5 76L62.5 58.5L68 40H91.5"
        stroke="white"
        strokeWidth="5"
      />
      <Path d="M4 22L17.9203 8.30977L32 22" stroke="white" strokeWidth="10" />
      <Path
        d="M101 102L114.69 115.92L101 130"
        stroke="white"
        strokeWidth="10"
      />
    </Svg>
  );
};

export const DeleteIcon = () => {
  return (
    <Svg
      width={WIDTH / 22}
      height={HEIGHT / 34}
      viewBox="0 0 116 133"
      fill="none">
      <Path
        d="M92.5 127.5H22.5C16.9772 127.5 12.5 123.023 12.5 117.5V37.5H102.5V117.5C102.5 123.023 98.0229 127.5 92.5 127.5Z"
        stroke="white"
        strokeWidth="10"
      />
      <Rect x="30" y="59" width="8" height="47" fill="white" />
      <Rect x="76" y="59" width="8" height="47" fill="white" />
      <Rect x="53" y="59" width="8" height="47" fill="white" />
      <Mask id="path-5-inside-1" fill="white">
        <Rect y="13" width="116" height="28" rx="5" />
      </Mask>
      <Rect
        y="13"
        width="116"
        height="28"
        rx="5"
        stroke="white"
        strokeWidth="15"
        mask="url(#path-5-inside-1)"
      />
      <Mask id="path-6-inside-2" fill="white">
        <Rect x="24" width="67" height="21" rx="5" />
      </Mask>
      <Rect
        x="24"
        width="67"
        height="21"
        rx="5"
        stroke="white"
        strokeWidth="10"
        mask="url(#path-6-inside-2)"
      />
    </Svg>
  );
};
