// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React, {useCallback, useContext} from 'react';
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
import {UserPostData} from '../../../apis/user/getUserPosts';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

export type Props = MyPostData | UserPostData;

export default (props: Props) => {
  const handleAtUserPress = useCallback(() => {}, []);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const tabBarHeight = useContext(TabBarHeightContext);

  const handlePress = useCallback(() => {
    navigation.push('CommentDetail', {
      tabBarHeight,
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
