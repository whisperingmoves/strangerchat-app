import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import icon_setting from '../../../assets/images/icons/icon_setting.png';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = () => {
    navigation.push('Setting');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={styles.root}>
      <Image source={icon_setting} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000033',
  },
});
