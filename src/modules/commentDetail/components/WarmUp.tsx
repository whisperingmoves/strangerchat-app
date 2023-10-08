import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FreeTimes from './FreeTimes';
import Gift from './Gift';
import {Gender} from '../../gender/store/slice';
import {WARM_UP} from '../../../constants/commentDetail/Config';
import {AuthorId, PostId} from '../store/slice';

type Props = {
  gender: Gender;
  postId: PostId;
  authorId: AuthorId;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.txt}>{WARM_UP(props.gender)}</Text>

      <FreeTimes postId={props.postId} />

      <Gift authorId={props.authorId} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  txt: {
    color: '#C7C4CC',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    flex: 1,
    height: 'auto',
  },
});
