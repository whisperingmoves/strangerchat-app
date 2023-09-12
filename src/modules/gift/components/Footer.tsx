import React from 'react';
import {StyleSheet, View} from 'react-native';

import TopUp from './TopUp';
import Send from './Send';
import {HandleSend} from '../../chatDetail/store/slice';

type Props = {
  handleTopUpPress: () => void;
  handleSend: HandleSend;
  hide: () => void;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <TopUp onPress={props.handleTopUpPress} />

      <Send handleSend={props.handleSend} hide={props.hide} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
