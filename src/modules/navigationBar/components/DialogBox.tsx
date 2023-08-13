import React from 'react';
import {StyleSheet, View} from 'react-native';

import TitleBar from './TitleBar';
import Reward, {Props as RewardProps} from './Reward';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import icon_coin_supreme from '../../../assets/images/icons/icon_coin_supreme.png';
import MarkButton from './MarkButton';
import {
  FIFTH_DAY,
  FIRST_DAY,
  FOURTH_DAY,
  SECOND_DAY,
  SEVENTH_DAY,
  SIXTH_DAY,
  THIRD_DAY,
} from '../../../constants/navigationBar/Config';
import {useAppSelector} from '../../../hooks';
import {checkedDays} from '../../../stores/user/slice';

export default () => {
  const checkedDaysValue = useAppSelector(checkedDays);

  return (
    <View style={styles.root}>
      <TitleBar />

      <View style={styles.content}>
        <View style={styles.rewardContainer}>
          {rewardData.map((value, index) => {
            if (checkedDaysValue && checkedDaysValue - 1 >= index) {
              value.active = true;
            }

            return <Reward {...value} key={index} />;
          })}
        </View>

        <MarkButton style={styles.markBtn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rewardContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    columnGap: 8,
    rowGap: 18,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  markBtn: {
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 60,
  },
});

const rewardData: RewardProps[] = [
  {
    icon: icon_coin,
    amount: 10,
    label: FIRST_DAY,
    active: false,
  },
  {
    icon: icon_coin,
    amount: 15,
    label: SECOND_DAY,
    active: false,
  },
  {
    icon: icon_coin,
    amount: 30,
    label: THIRD_DAY,
    active: false,
  },
  {
    icon: icon_coin,
    amount: 50,
    label: FOURTH_DAY,
    active: false,
  },
  {
    icon: icon_coin,
    amount: 70,
    label: FIFTH_DAY,
    active: false,
  },
  {
    icon: icon_coin,
    amount: 100,
    label: SIXTH_DAY,
    active: false,
  },
  {
    icon: icon_coin_supreme,
    amount: 200,
    label: SEVENTH_DAY,
    active: false,
  },
];
