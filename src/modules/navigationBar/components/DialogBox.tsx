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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import TitleBar from './TitleBar';
import Reward from './Reward';
import MarkButton from './MarkButton';
import {useAppSelector} from '../../../hooks';
import {checkedDays} from '../../../stores/user/slice';
import {rewardData} from '../helper';

export default () => {
  const checkedDaysValue = useAppSelector(checkedDays);

  const rewardDataValue = useMemo(() => {
    return rewardData.map((value, index) => {
      if (checkedDaysValue && checkedDaysValue - 1 >= index) {
        value.active = true;
      } else {
        value.active = false;
      }

      return value;
    });
  }, [checkedDaysValue]);

  return (
    <View style={styles.root}>
      <TitleBar />

      <View style={styles.content}>
        <View style={styles.rewardContainer}>
          {rewardDataValue.map((value, index) => {
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
