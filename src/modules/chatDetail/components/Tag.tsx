import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  tag: string;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.txt}>{props.tag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F1F0F3',
    backgroundColor: '#FFF',
  },
  txt: {
    color: '#8E8895',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
