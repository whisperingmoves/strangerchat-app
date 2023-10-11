import React from 'react';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {StyleSheet, Text, View} from 'react-native';

import Photo from './Photo';
import Location from './Location';

export type Props = {
  updateTime: string;
  content?: string;
  photoList?: ImageSourcePropType[];
  location?: string;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.updateTimeTxt}>{props.updateTime}</Text>

      {props.content && <Text style={styles.contentTxt}>{props.content}</Text>}

      {props.photoList && (
        <Photo photoList={props.photoList} style={styles.photo} />
      )}

      {props.location && (
        <Location
          location={props.location}
          color={'#8B5CFF'}
          style={styles.location}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 20,
  },
  updateTimeTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  contentTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 16,
  },
  photo: {
    marginTop: 10,
  },
  location: {
    marginTop: 16,
  },
});
