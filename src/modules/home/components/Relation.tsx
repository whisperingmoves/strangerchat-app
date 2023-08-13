import React from 'react';
import {StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {Relation, RELATION_MAP} from '../store/slice';

type Props = {
  relation: Relation;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <LinearGradient
      colors={['#D988FF', '#8B5CFF']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={[styles.root, props.style]}>
      <Text style={styles.txt}>{RELATION_MAP[props.relation]}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 30,
    height: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#FFFFFF',
    fontSize: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
