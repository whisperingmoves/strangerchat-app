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
