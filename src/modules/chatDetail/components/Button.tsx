// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
