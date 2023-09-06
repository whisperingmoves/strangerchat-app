import React from 'react';
import {StyleSheet, View} from 'react-native';

import TopUp from './TopUp';
import Send from './Send';

type Props = {
  handleTopUpPress: () => void;
};

export default (props: Props) => {
  const handleSendPress = () => {};

  return (
    <View style={styles.root}>
      <TopUp onPress={props.handleTopUpPress} />

      <Send onPress={handleSendPress} />
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
