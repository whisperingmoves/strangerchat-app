import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  FollowersCount,
  FollowingCount,
  VisitorsCount,
} from '../../../stores/user/slice';

type Props = {
  count: FollowingCount | FollowersCount | VisitorsCount;
  label: string;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = useCallback(() => {
    navigation.push('MyFollowing');
  }, [navigation]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Text style={styles.countTxt}>{props.count}</Text>

      <Text style={styles.labelTxt}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 4,
    alignItems: 'center',
  },
  countTxt: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  labelTxt: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
