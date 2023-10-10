import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import Like from './Like';
import {
  AuthorAvatar,
  AuthorId,
  AuthorName,
  CommentId,
  Content,
  CreateTime,
  IsLiked,
  setCommentParentId,
  setCommentParentUserId,
  setCommentParentUsername,
  setCommentPlaceHolder,
} from '../store/slice';
import {generateFullURL, getUsername} from '../../helper';
import {formatTimeAgo} from '../../../utils/date';
import {REPORT} from '../../../constants/Config';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {
  reportUserAsync,
  setScene as setUserScene,
} from '../../../stores/user/slice';
import {useAppDispatch} from '../../../hooks';
import {REPLY_COMMENT} from '../../../constants/commentDetail/Config';

export type Props = {
  commentId: CommentId;
  userId: AuthorId;
  avatar: AuthorAvatar;
  username?: AuthorName;
  createTime: CreateTime;
  content: Content;
  isLiked?: IsLiked;
  replyUserId?: AuthorId;
  replyUsername?: AuthorName;
};

export default (props: Props) => {
  const [showFab, setShowFab] = useState(false);

  const handleLongPress = useCallback(() => {
    LayoutAnimation.spring();

    setShowFab(true);
  }, []);

  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    LayoutAnimation.spring();

    setShowFab(false);

    dispatch(
      setCommentPlaceHolder(
        REPLY_COMMENT(
          props.username ? props.username : getUsername(props.userId),
        ),
      ),
    );

    dispatch(setCommentParentId(props.commentId));

    dispatch(setCommentParentUserId(props.userId));

    dispatch(setCommentParentUsername(props.username));
  }, [dispatch, props.commentId, props.userId, props.username]);

  const tabStyle: ViewStyle = useMemo(() => {
    return {
      opacity: showFab ? 1 : 0,
    };
  }, [showFab]);

  const handleReport = useCallback(() => {
    dispatch(setUserScene('reportUserOnCommentDetail'));

    dispatch(reportUserAsync(props.userId));

    LayoutAnimation.spring();

    setShowFab(false);
  }, [dispatch, props.userId]);

  const [replyTxtColor, setReplyTxtColor] = useState('#D988FF');

  const handleOnReplyTxtPress = useCallback(() => {}, []);

  const handleOnReplyTxtPressIn = useCallback(() => {
    LayoutAnimation.easeInEaseOut();

    setReplyTxtColor('#D988FF90');
  }, []);

  const handleOnReplyTxtPressOut = useCallback(() => {
    LayoutAnimation.easeInEaseOut();

    setReplyTxtColor('#D988FF');
  }, []);

  const replyTxtStyle: TextStyle = useMemo(() => {
    return {
      color: replyTxtColor,
    };
  }, [replyTxtColor]);

  return (
    <Pressable
      style={styles.root}
      onLongPress={handleLongPress}
      onPress={handlePress}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={{uri: generateFullURL(props.avatar)}}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={styles.usernameTxt}>
            {props.username ? props.username : getUsername(props.userId)}
          </Text>

          <Text style={styles.createTimeTxt}>
            {formatTimeAgo(props.createTime)}
          </Text>
        </View>

        <Like commentId={props.commentId} isLiked={props.isLiked} />
      </View>

      <Text style={styles.contentTxt}>
        {props.replyUserId && (
          <Text
            style={replyTxtStyle}
            onPress={handleOnReplyTxtPress}
            onPressIn={handleOnReplyTxtPressIn}
            onPressOut={handleOnReplyTxtPressOut}>
            @{''}
            {props.replyUsername
              ? props.replyUsername
              : getUsername(props.replyUserId)}
          </Text>
        )}
        {props.content}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.fab, tabStyle]}
        onPress={handleReport}>
        <Text style={styles.fabTxt}>{REPORT}</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    resizeMode: 'cover',
  },
  info: {
    gap: 4,
    flex: 1,
    height: 'auto',
  },
  usernameTxt: {
    color: '#8E8895',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
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
    marginLeft: 46 + 10,
  },
  fab: {
    backgroundColor: '#F1F0F3',
    width: 56,
    height: 30,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    marginLeft: -28,
  },
  fabTxt: {
    color: '#696173',
    textAlignVertical: 'center',
    includeFontPadding: false,
    fontSize: 12,
  },
});
