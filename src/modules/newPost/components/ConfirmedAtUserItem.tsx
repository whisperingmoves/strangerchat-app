import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AtUser, removeAtUser, removeConfirmedAtUser} from '../store/slice';
import {getUsername} from '../../helper';
import {useAppDispatch} from '../../../hooks';

type Props = AtUser;

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    dispatch(removeConfirmedAtUser(props.userId));

    dispatch(removeAtUser(props.userId));
  }, [dispatch, props.userId]);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Text style={styles.txt}>
        {props.username ? props.username : getUsername(props.userId)}
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
