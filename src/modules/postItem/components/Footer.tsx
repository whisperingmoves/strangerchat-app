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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import PlaceHolder from '../../../components/PlaceHolder';
import ShareButton from './ShareButton';
import CollectButton from './CollectButton';
import {CommentCount, IsLiked, LikeCount} from '../../following/store/slice';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';
import {Content, PostId} from '../../../stores/post/slice';
import {UpdateListItemCallback} from '../../recommend/store/slice';
import {IsCollected} from '../../commentDetail/store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
  postId: PostId;
  showCollect?: boolean;
  shareCount?: number;
  likeCount?: LikeCount;
  commentCount?: CommentCount;
  isLiked?: IsLiked;
  isCommentDetail?: boolean;
  updateListItemCallback?: UpdateListItemCallback;
  content: Content;
  isCollected?: IsCollected;
  focusInput?: () => void;
};

export default (props: Props) => {
  const handlePress = () => {
    props.focusInput && props.focusInput();
  };

  return (
    <View style={[styles.footer, props.style]}>
      {!props.showCollect && (
        <ShareButton
          count={props.shareCount}
          updateListItemCallback={props.updateListItemCallback}
          isCommentDetail={props.isCommentDetail}
          postId={props.postId}
          content={props.content}
        />
      )}

      {props.showCollect && (
        <CollectButton postId={props.postId} isCollected={props.isCollected} />
      )}

      <PlaceHolder />

      {props.showCollect && (
        <ShareButton
          count={props.shareCount}
          updateListItemCallback={props.updateListItemCallback}
          isCommentDetail={props.isCommentDetail}
          postId={props.postId}
          content={props.content}
          style={styles.likeBtn}
        />
      )}

      <LikeButton
        postId={props.postId}
        isLiked={props.isLiked}
        count={props.likeCount}
        isCommentDetail={props.isCommentDetail}
        updateListItemCallback={props.updateListItemCallback}
        style={styles.likeBtn}
      />

      <CommentButton
        style={styles.likeBtn}
        onPress={handlePress}
        count={props.commentCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeBtn: {
    marginLeft: 26,
  },
});
