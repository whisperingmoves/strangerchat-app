import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import Location from '../../../components/Location';
import {MyPostData} from '../../../apis/user/getMyPosts';
import PhotoList from '../../../components/photoList/PhotoList';
import {generateFullURL} from '../../helper';
import {formatDatetime} from '../../../utils/date';
import AtUserList from '../../../components/atUserList/AtUserList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {store} from '../../../stores/store';

export type Props = MyPostData;

export default (props: Props) => {
  const handleAtUserPress = useCallback(() => {}, []);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = useCallback(() => {
    navigation.push('CommentDetail', {
      postId: props.postId,
      authorId: store.getState().user.userId,
      authorName: store.getState().user.username,
    });
  }, [navigation, props.postId]);

  return (
    <TouchableOpacity
      style={styles.root}
      activeOpacity={0.7}
      onPress={handlePress}>
      <Text style={styles.createTimeTxt}>
        {formatDatetime(props.createTime)}
      </Text>

      {props.content && <Text style={styles.contentTxt}>{props.content}</Text>}

      {props?.images && (
        <PhotoList
          photoList={props.images.map(item => generateFullURL(item))}
          isMarginLeft={false}
          style={styles.photoList}
        />
      )}

      {props.atUsers && props.atUsers.length > 0 && (
        <AtUserList
          style={styles.atUserList}
          atUsers={props.atUsers.map(atUser => {
            return {userId: atUser.id, username: atUser.username};
          })}
          onItemPress={handleAtUserPress}
        />
      )}

      {props?.city && (
        <Location
          location={props.city}
          color={'#8B5CFF'}
          style={styles.location}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 20,
  },
  createTimeTxt: {
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
  photoList: {
    marginTop: 10,
  },
  atUserList: {
    marginTop: 14,
  },
  location: {
    marginTop: 16,
  },
});
