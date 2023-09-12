import React from 'react';
import {StyleSheet, View} from 'react-native';

import TitleBar from './TitleBar';
import Reward from './Reward';
import MarkButton from './MarkButton';
import {useAppSelector} from '../../../hooks';
import {checkedDays} from '../../../stores/user/slice';
import {rewardData} from '../helper';

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
