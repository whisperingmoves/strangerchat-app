import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {NEW_STORIES} from '../../../constants/home/Config';
import StoryList from './StoryList';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Text style={styles.titleTxt}>{NEW_STORIES}</Text>

      <StoryList style={styles.storyList} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  titleTxt: {
    color: '#554C5F',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  storyList: {
    marginTop: 22,
  },
});
