import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {useAppSelector} from '../../../hooks';
import {NearestUser} from '../../../apis/notification/nearestUsers';
import {nearestUsers} from '../store/slice';
import People from './People';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const list: NearestUser[] = useAppSelector(nearestUsers);

  return (
    <View style={[styles.root, props.style]}>
      {list.map((value, index) => (
        <People
          key={index}
          style={{...styles.people, ...POSITION_LIST[index]}}
          userId={value.userId}
          distance={value.distance}
          avatar={value.avatarUrl}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  people: {
    position: 'absolute',
  },
});

const POSITION_LIST = [
  {
    top: 48,
    left: 37,
  },
  {
    top: 97,
    right: 39,
  },
  {
    bottom: 84,
    right: 48,
  },
  {
    bottom: 43,
    left: 32,
  },
  {
    bottom: 50,
    left: 48,
  },
];
