import React, {useCallback, useContext} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import OnlineIndicator from '../../../components/OnlineIndicator';
import {
  OpponentAvatar,
  OpponentOnlineStatus,
  OpponentUserId,
  UnreadCount,
} from '../store/slice';
import {generateFullURL} from '../../helper';
import Badge from '../../../components/Badge';
import {convertNumberToString} from '../../../utils/number';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  userId: OpponentUserId;
  avatar: OpponentAvatar;
  online?: OpponentOnlineStatus;
  unreadCount?: UnreadCount;
};

export default (props: Props) => {
  const unreadCount = props.unreadCount || 0;

  const tabBarHeight = useContext(TabBarHeightContext);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = useCallback(() => {
    navigation.push('Profile', {
      tabBarHeight,
      profileUserIdValue: props.userId,
    });
  }, [navigation, props.userId, tabBarHeight]);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Image
        source={{uri: generateFullURL(props.avatar)}}
        style={styles.avatar}
      />

      {props.online === 1 && <OnlineIndicator style={styles.onlineIndicator} />}

      {unreadCount > 0 && (
        <Badge style={styles.badge} text={convertNumberToString(unreadCount)} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    resizeMode: 'cover',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: -8,
    transform: [
      {
        scale: 1.2,
      },
    ],
  },
});
