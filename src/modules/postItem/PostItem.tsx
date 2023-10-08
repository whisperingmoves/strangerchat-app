import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Header from './components/Header';
import {RecommendedPostData} from '../../apis/post/getRecommendedPosts';
import {FollowedPostData} from '../../apis/post/getFollowedPosts';
import PhotoList from '../../components/photoList/PhotoList';
import {generateFullURL} from '../helper';
import Location from './components/Location';
import Footer from './components/Footer';
import {LatestPostData} from '../../apis/post/getLatestPosts';
import AtUserList from '../../components/AtUserList';
import {GetPostResponse} from '../../apis/post/getPost';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {UpdateListItemCallback} from '../recommend/store/slice';

type CustomProps = {
  isFollowing?: boolean;
  isRecommend?: boolean;
  isLatest?: boolean;
  showCollect?: boolean;
  isCommentDetail?: boolean;
  contentContainerStyle?: ViewStyle;
  locationStyle?: ViewStyle;
  footerStyle?: ViewStyle;
  updateListItemCallback?: UpdateListItemCallback;
  focusInput?: () => void;
};

type PostDetailProps = FollowedPostData &
  RecommendedPostData &
  LatestPostData &
  GetPostResponse;

export type Props = PostDetailProps & CustomProps;

export default (props: Props) => {
  const handleAtUserPress = useCallback(() => {}, []);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = useCallback(() => {
    if (props.isCommentDetail) {
      return;
    }

    navigation.push('CommentDetail', {
      postId: props.postId,
      authorId: props.authorId,
      authorName: props.authorName,
    });
  }, [
    navigation,
    props.authorId,
    props.authorName,
    props.isCommentDetail,
    props.postId,
  ]);

  let photoIsMarginLeft: boolean = true;
  if (
    props.contentContainerStyle &&
    props.contentContainerStyle.marginLeft === 0
  ) {
    photoIsMarginLeft = false;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Header
        authorId={props.authorId}
        authorAvatar={props.authorAvatar}
        postId={props.postId}
        authorName={props.authorName}
        createTime={props.createTime}
        isFollowing={props.isFollowing}
        isRecommend={props.isRecommend}
        isLatest={props.isLatest}
        isCommentDetail={props.isCommentDetail}
        isFollowed={props.isFollowed}
        isBlocked={props.isBlocked}
        conversationId={props.conversationId}
        style={styles.header}
        updateListItemCallback={props.updateListItemCallback}
      />

      <View style={[styles.contentContainer, props.contentContainerStyle]}>
        {props?.images && (
          <PhotoList
            photoList={props.images.map(item => generateFullURL(item))}
            isMarginLeft={photoIsMarginLeft}
            style={styles.photoList}
          />
        )}

        {props?.content && <Text style={styles.content}>{props.content}</Text>}

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
            style={[styles.location, props.locationStyle]}
          />
        )}

        <Footer {...props} style={[styles.footer, props.footerStyle]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  header: {
    marginBottom: 22,
  },
  contentContainer: {
    flex: 1,
    height: 'auto',
    marginLeft: 50 + 10,
  },
  photoList: {
    marginBottom: 14,
  },
  atUserList: {
    marginTop: 14,
  },
  content: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  location: {
    marginTop: 20,
  },
  footer: {
    marginTop: 26,
  },
});
