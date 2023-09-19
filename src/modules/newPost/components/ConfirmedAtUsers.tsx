import React from 'react';
import {StyleSheet, View} from 'react-native';
import ConfirmedAtUserItem from './ConfirmedAtUserItem';
import {AtUser} from '../store/slice';

type Props = {
  confirmedAtUsers: AtUser[];
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      {props.confirmedAtUsers.map((atUser, index) => (
        <ConfirmedAtUserItem
          key={`${index}-${atUser.userId}`}
          userId={atUser.userId}
          username={atUser.username}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
