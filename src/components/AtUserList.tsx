import React from 'react';
import {StyleSheet, View} from 'react-native';
import AtUserItem from './AtUserItem';
import {AtUser, UserId} from '../modules/newPost/store/slice';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  style?: StyleProp<ViewStyle>;
  atUsers: AtUser[];
  onItemPress: (userId: UserId) => void;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      {props.atUsers.map((atUser, index) => (
        <AtUserItem
          key={`${index}-${atUser.userId}`}
          userId={atUser.userId}
          username={atUser.username}
          onPress={props.onItemPress}
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
