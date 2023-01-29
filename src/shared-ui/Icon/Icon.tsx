import React from 'react';
import { Svg, G, Path, Polygon, SvgProps } from 'react-native-svg';
import theme from '../../theme';

import { IconList, IconName, SVGProps } from './IconList';

interface IconProps extends SvgProps {
  name: IconName;
  fill?: any;
  width?: number;
  height?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  fill = theme.text,
  width = 32,
  height = 32,
  ...props
}) => {
  const haveSVG = IconList.hasOwnProperty(name);
  const svg: SVGProps | null = haveSVG ? IconList[name] : null;

  if (!svg) {
    return null;
  }

  return (
    <Svg
      viewBox={svg.viewbox}
      width={width}
      height={height}
      strokeWidth={svg.strokeWidth}
      {...props}>
      <G fill={fill}>
        {svg.paths ? <Path d={svg.paths} /> : null}
        {svg.points ? <Polygon points={svg.points} /> : null}
      </G>
    </Svg>
  );
};
