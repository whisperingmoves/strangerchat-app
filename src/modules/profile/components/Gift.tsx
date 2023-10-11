import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import icon_gift from '../../../assets/images/icons/icon_gift.png';
import {giftsReceived} from '../../../stores/user/slice';
import {useAppSelector} from '../../../hooks';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = useCallback(() => {
    navigation.push('MyGift');
  }, [navigation]);

  const giftsReceivedValue = useAppSelector(giftsReceived);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Image style={styles.icon} source={icon_gift} />

      <Text style={styles.txt}>{giftsReceivedValue}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00000033',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 6,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  txt: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
