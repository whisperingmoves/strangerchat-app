import {Text, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  children?: ReactNode;
  onPress?: () => void;
  style?: any;
  textStyle?: any;
  activeOpacity?: number;
  disabled?: boolean;
};

export default (props: Props) => {
  const {
    children,
    onPress,
    style,
    textStyle,
    activeOpacity = 0.7,
    disabled,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={style}
      disabled={disabled}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};
