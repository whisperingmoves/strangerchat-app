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

import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  date: Date;
  setDate?: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
  modal?: boolean;
  open?: boolean;
  onConfirm?: (date: Date) => void;
  onCancel?: () => void;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <DatePicker
        mode={'date'}
        date={props.date}
        theme={'light'}
        style={styles.datePicker}
        onDateChange={props.setDate}
        textColor={'#554C5F'}
        modal={props.modal}
        open={props.open}
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  datePicker: {
    width: Dimensions.get('window').width - 60,
    height: 222,
  },
});
