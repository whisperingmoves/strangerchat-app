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

import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

import {Route, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import moment from 'moment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import DatePicker from '../../components/DatePicker';
import NextButton from '../../components/NextButton';
import {BIRTHDAY, BIRTHDAY_DESC} from '../../constants/birthday/Config';
import BackHeader from '../../components/BackHeader';
import {Gender, GENDER_MAP} from '../gender/store/slice';
import {Mobile} from '../login/store/slice';

type Props = {
  route: Route<string, {gender: Gender; mobile: Mobile}>;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [birthday, setBirthday] = useState<Date>(new Date());

  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {
    paddingTop: insets.top,
  };

  const {gender, mobile} = props.route.params;

  const handleNextPress = () => {
    navigation.push('Avatar', {
      gender: gender,
      mobile,
      birthday: moment(birthday).format('YYYY-MM-DD'),
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[styles.root, statusBarStyle]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      <BackHeader onPress={handleBackPress} style={styles.backHeader} />

      <Text style={styles.titleTxt}>{BIRTHDAY}</Text>

      <Text style={styles.descTxt}>{BIRTHDAY_DESC}</Text>

      <DatePicker
        date={birthday}
        setDate={setBirthday}
        style={styles.datePicker}
      />

      <Text style={styles.infoTxt}>{`${moment(birthday).format(
        'MMM Do,YYYY',
      )} ${GENDER_MAP[gender]}`}</Text>

      <NextButton style={styles.nextBtn} onPress={handleNextPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  backHeader: {
    marginTop: 16,
    marginLeft: -10,
  },
  titleTxt: {
    color: '#554C5F',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 54,
  },
  descTxt: {
    color: '#8E8895',
    fontSize: 16,
    marginTop: 16,
  },
  datePicker: {
    marginTop: 90,
  },
  infoTxt: {
    textAlign: 'center',
    color: '#C7C4CC',
    fontSize: 16,
    marginTop: 70,
  },
  nextBtn: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 112 - 30,
  },
});
