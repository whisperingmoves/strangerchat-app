import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {UserId, Username} from '../modules/newPost/store/slice';
import {getUsername} from '../modules/helper';

type Props = {
  userId: UserId;
  username?: Username;
  onPress: (userId: UserId) => void;
};

export default (props: Props) => {
  const handlePress = useCallback(() => {
    props.onPress(props.userId);
  }, [props]);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Text style={styles.txt}>
        {`@${props.username ? props.username : getUsername(props.userId)}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: '#8B5CFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
