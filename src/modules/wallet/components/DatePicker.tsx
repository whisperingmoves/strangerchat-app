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

import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import moment from 'moment/moment';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_dropdown from '../../../assets/images/icons/icon_dropdown.png';
import DatePicker from '../../../components/DatePicker';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  date,
  getCoinTransactionsAsync,
  resetPage,
  setDate,
} from '../store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const handlePress = useCallback(() => {
    setOpen(open => {
      return !open;
    });
  }, []);

  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const dateValue = useAppSelector(date);

  const handleConfirm = useCallback(
    (value: Date) => {
      dispatch(setDate(value.toDateString()));

      dispatch(resetPage());

      dispatch(getCoinTransactionsAsync());

      setOpen(false);
    },
    [dispatch],
  );

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <View style={[styles.root, props.style]}>
      <Text style={styles.dateTxt}>
        {moment(new Date(dateValue)).format('YYYY-MM-DD')}
      </Text>

      <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
        <Image source={icon_dropdown} />
      </TouchableOpacity>

      <DatePicker
        date={new Date(dateValue)}
        modal={true}
        open={open}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F1F0F3',
    gap: 14,
  },
  dateTxt: {
    color: '#8E8895',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
