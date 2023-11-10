import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import icon_next from '../../../assets/images/icons/icon_next.png';
import icon_dialog_outlined from '../../../assets/images/icons/icon_dialog_outlined.png';
import Avatar from './Avatar';
import {VIEW_DETAILS} from '../../../constants/notification/Config';

export type Props = {
  title: string;
  updateTime: string;
  content: string;
  type: 'purchased' | 'reminder';
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Avatar type={props.type} />

      <ImageBackground
        source={icon_dialog_outlined}
        style={styles.container}
        imageStyle={styles.containerIcon}>
        <Text style={styles.titleTxt}>{props.title}</Text>

        <Text style={styles.updateTimeTxt}>{props.updateTime}</Text>

        <Text style={styles.contentTxt}>{props.content}</Text>

        {props.type === 'reminder' && <View style={styles.line} />}

        {props.type === 'reminder' && (
          <TouchableOpacity activeOpacity={0.7} style={styles.viewContainer}>
            <Text style={styles.viewTxt}>{VIEW_DETAILS}</Text>

            <Image source={icon_next} style={styles.viewIcon} />
          </TouchableOpacity>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 6,
  },
  container: {
    flex: 1,
  },
  containerIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  titleTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 14,
    marginHorizontal: 22,
  },
  updateTimeTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 10,
    marginHorizontal: 22,
  },
  contentTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 22,
  },
  line: {
    height: 0,
    borderWidth: 1,
    borderColor: '#F1F0F3',
    marginTop: -2,
    marginHorizontal: 22,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 16,
    marginHorizontal: 22,
  },
  viewTxt: {
    color: '#8B5CFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  viewIcon: {
    tintColor: '#8B5CFF',
  },
});
