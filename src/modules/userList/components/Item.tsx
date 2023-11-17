import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FollowingButton from '../../../components/FollowingButton';
import FollowButton from '../../../components/FollowButton';
import {UserData} from '../../../apis/user/getFriends';
import {generateFullURL, getUsername} from '../../helper';
import {LATEST_POST_CONTENT} from '../../../constants/Config';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  followOrUnfollowUserAsync,
  resetStatus as resetUserStatus,
  setOperationUserId,
  setScene as setUserScene,
  status,
} from '../../../stores/user/slice';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {setState as setFollowingUserState} from '../../followingUser/store/slice';
import {setState as setCloseFriendState} from '../../closeFriend/store/slice';
import {setState as setFollowerState} from '../../follower/store/slice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

export type Props = UserData;

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const [isFollowed, setIsFollowed] = useState(0);

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();

    setIsFollowed(props.isFollowed || 0);
  }, [props.isFollowed]);

  const userStatusValue = useAppSelector(status);

  useEffect(() => {
    const scene = store.getState().user.scene;

    if (
      userStatusValue === 'success' &&
      (scene === 'followUserOnMyFollowing' ||
        scene === 'unfollowUserOnMyFollowing')
    ) {
      dispatch(resetUserStatus());

      const totalCloseFriend = store.getState().closeFriend.total;

      if (scene === 'followUserOnMyFollowing') {
        dispatch(
          setFollowingUserState({
            list: [
              {...props, isFollowed: 1},
              ...store.getState().followingUser.list,
            ],
          }),
        );

        dispatch(
          setFollowerState({
            list: store.getState().follower.list.map(value => {
              return {
                ...value,
                isFollowed:
                  value.userId === props.userId ? 1 : value.isFollowed,
              };
            }),
          }),
        );

        const followerList = store.getState().follower.list;

        followerList.forEach(value => {
          if (value.userId === props.userId) {
            dispatch(
              setCloseFriendState({
                list: [
                  {...props, isFollowed: 1},
                  ...store.getState().closeFriend.list,
                ],
                total: totalCloseFriend + 1,
              }),
            );
          }
        });

        return;
      }

      if (scene === 'unfollowUserOnMyFollowing') {
        dispatch(
          setFollowingUserState({
            list: store
              .getState()
              .followingUser.list.filter(
                value => value.userId !== props.userId,
              ),
          }),
        );

        dispatch(
          setFollowerState({
            list: store.getState().follower.list.map(value => {
              return {
                ...value,
                isFollowed:
                  value.userId === props.userId ? 0 : value.isFollowed,
              };
            }),
          }),
        );

        const closeFriendList = store.getState().closeFriend.list;

        closeFriendList.forEach(value => {
          if (value.userId === props.userId) {
            dispatch(
              setCloseFriendState({
                list: store
                  .getState()
                  .closeFriend.list.filter(
                    inValue => inValue.userId !== props.userId,
                  ),
                total:
                  totalCloseFriend > 0
                    ? totalCloseFriend - 1
                    : totalCloseFriend,
              }),
            );
          }
        });
        return;
      }

      return;
    }

    if (
      userStatusValue === 'failed' &&
      (scene === 'followUserOnMyFollowing' ||
        scene === 'unfollowUserOnMyFollowing')
    ) {
      dispatch(resetUserStatus());

      showError(store.getState().user.error);

      LayoutAnimation.easeInEaseOut();

      if (scene === 'followUserOnMyFollowing') {
        setIsFollowed(0);
      } else {
        setIsFollowed(1);
      }

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatusValue]);

  const handleFollow = useCallback(() => {
    dispatch(setUserScene('followUserOnMyFollowing'));

    dispatch(setOperationUserId(props.userId));

    dispatch(followOrUnfollowUserAsync(1));
  }, [dispatch, props.userId]);

  const handleUnFollow = useCallback(() => {
    dispatch(setUserScene('unfollowUserOnMyFollowing'));

    dispatch(setOperationUserId(props.userId));

    dispatch(followOrUnfollowUserAsync(0));
  }, [dispatch, props.userId]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const tabBarHeight = useContext(TabBarHeightContext);

  const handleAvatarPress = useCallback(() => {
    navigation.push('Profile', {
      tabBarHeight,
      profileUserIdValue: props.userId,
    });
  }, [navigation, props.userId, tabBarHeight]);

  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleAvatarPress}>
        <Image
          source={{uri: generateFullURL(props.userAvatar)}}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.usernameTxt}>
          {props.username ? props.username : getUsername(props.userId)}
        </Text>

        {props.latestPostContent && (
          <Text style={styles.behaviorTxt} numberOfLines={1}>
            {LATEST_POST_CONTENT(props.latestPostContent)}
          </Text>
        )}
      </View>

      {isFollowed === 1 ? (
        <FollowingButton onPress={handleUnFollow} />
      ) : (
        <FollowButton onPress={handleFollow} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    height: 'auto',
    gap: 6,
  },
  usernameTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  behaviorTxt: {
    color: '#C7C4CC',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
