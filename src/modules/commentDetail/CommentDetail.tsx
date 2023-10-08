import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {Route, useNavigation} from '@react-navigation/native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {
  AuthorId,
  AuthorName,
  getPostAsync,
  postDetail,
  PostId,
  resetPostDetail,
  resetStatus as resetCommentDetailStatus,
  scene as commentDetailScene,
  setPostDetail,
  setScene as setCommentDetailScene,
  status as commentDetailStatus,
} from './store/slice';
import DetailHeader from '../../components/DetailHeader';
import List from './components/List';
import Footer from './components/Footer';
import {StackNavigationProp} from '@react-navigation/stack';
import {InputRef} from '../../components/Input';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  BLOCK,
  BLOCK_SUCCESSFULLY,
  FOLLOW_SUCCESSFULLY,
  UNBLOCK,
  UNBLOCK_SUCCESSFULLY,
  UNFOLLOW,
  UNFOLLOW_SUCCESSFULLY,
} from '../../constants/chatDetail/Config';
import {CANCEL, FOLLOW} from '../../constants/Config';
import {
  blockOrUnblockUserAsync,
  followOrUnfollowUserAsync,
  resetStatus as resetUserStatus,
  scene as userScene,
  setOperationUserId,
  setScene as setUserScene,
  status as userStatus,
} from '../../stores/user/slice';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {
  updateListItemByAuthorId as updateFollowingListItemByAuthorId,
  updateListItemByPostId as updateFollowingListItemByPostId,
} from '../following/store/slice';
import {
  IsBlocked,
  IsFollowed,
  updateListItemByAuthorId as updateRecommendListItemByAuthorId,
  updateListItemByPostId as updateRecommendListItemByPostId,
  UpdateListItemCallback,
} from '../recommend/store/slice';
import {
  updateListItemByAuthorId as updateLatestListItemByAuthorId,
  updateListItemByPostId as updateLatestListItemByPostId,
} from '../latest/store/slice';
import {showError, showSuccess} from '../../utils/notification';
import {store} from '../../stores/store';
import ViewShot from 'react-native-view-shot';
import {ViewShotContext} from '../../contexts/ViewShotContext';

type Props = {
  route: Route<
    string,
    {
      postId: PostId;
      authorId: AuthorId;
      authorName?: AuthorName;
    }
  >;
};

export default (props: Props) => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      paddingTop: insets.top,
    };
  }, [insets.top]);

  const {postId, authorId, authorName} = props.route.params;

  const navigation = useNavigation<StackNavigationProp<any>>();

  const inputRef = useRef<InputRef>(null);

  const dispatch = useAppDispatch();

  const userStatusValue = useAppSelector(userStatus);
  const userSceneValue = useAppSelector(userScene);

  const postDetailValue = useAppSelector(postDetail);

  const commentDetailStatusValue = useAppSelector(commentDetailStatus);

  const commentDetailSceneValue = useAppSelector(commentDetailScene);

  useEffect(() => {
    dispatch(setCommentDetailScene('getPost'));

    dispatch(getPostAsync(postId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateListItemCallback: UpdateListItemCallback = useCallback(
    param => {
      if ('isFollowed' in param || 'isBlocked' in param) {
        dispatch(
          updateFollowingListItemByAuthorId({
            authorId,
            ...param,
          }),
        );

        dispatch(
          updateRecommendListItemByAuthorId({
            authorId,
            ...param,
          }),
        );

        dispatch(
          updateLatestListItemByAuthorId({
            authorId,
            ...param,
          }),
        );
      }

      if (
        'isLiked' in param ||
        'likeCount' in param ||
        'commentCount' in param ||
        'shareCount' in param
      ) {
        dispatch(
          updateFollowingListItemByPostId({
            postId,
            ...param,
          }),
        );

        dispatch(
          updateRecommendListItemByPostId({
            postId,
            ...param,
          }),
        );

        dispatch(
          updateLatestListItemByPostId({
            postId,
            ...param,
          }),
        );
      }

      if ('commentCount' in param) {
        dispatch(setPostDetail({...param}));
      }
    },
    [authorId, dispatch, postId],
  );

  useEffect(() => {
    if (
      userStatusValue === 'success' &&
      (userSceneValue === 'followUserOnCommentDetail' ||
        userSceneValue === 'unfollowUserOnCommentDetail' ||
        userSceneValue === 'blockUserOnCommentDetail' ||
        userSceneValue === 'unblockUserOnCommentDetail')
    ) {
      dispatch(resetUserStatus());

      let successMsg = '';

      let isFollowed: IsFollowed | undefined = postDetailValue.isFollowed;

      if (userSceneValue === 'followUserOnCommentDetail') {
        isFollowed = 1;

        successMsg = FOLLOW_SUCCESSFULLY;
      } else if (userSceneValue === 'unfollowUserOnCommentDetail') {
        isFollowed = 0;

        successMsg = UNFOLLOW_SUCCESSFULLY;
      }

      let isBlocked: IsBlocked | undefined = postDetailValue.isBlocked;

      if (userSceneValue === 'blockUserOnCommentDetail') {
        isBlocked = 1;

        successMsg = BLOCK_SUCCESSFULLY;
      } else if (userSceneValue === 'unblockUserOnCommentDetail') {
        isBlocked = 0;

        successMsg = UNBLOCK_SUCCESSFULLY;
      }

      dispatch(
        setPostDetail({
          isFollowed,
          isBlocked,
        }),
      );

      showSuccess(successMsg);

      return;
    }

    if (
      userStatusValue === 'failed' &&
      (userSceneValue === 'followUserOnCommentDetail' ||
        userSceneValue === 'unfollowUserOnCommentDetail' ||
        userSceneValue === 'blockUserOnCommentDetail' ||
        userSceneValue === 'unblockUserOnCommentDetail')
    ) {
      dispatch(resetUserStatus());

      showError(store.getState().user.error);

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatusValue]);

  const handleBackPress = useCallback(() => {
    inputRef.current?.blur();

    setTimeout(() => {
      navigation.goBack();

      dispatch(resetPostDetail());
    }, 200);
  }, [dispatch, navigation]);

  useEffect(() => {
    if (
      commentDetailStatusValue === 'success' &&
      commentDetailSceneValue === 'getPost'
    ) {
      dispatch(resetCommentDetailStatus());

      return;
    }

    if (
      commentDetailStatusValue === 'failed' &&
      commentDetailSceneValue === 'getPost'
    ) {
      dispatch(resetCommentDetailStatus());

      showError(store.getState().commentDetail.error);

      handleBackPress();

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentDetailStatusValue]);

  const {showActionSheetWithOptions} = useActionSheet();

  const handleMorePress = useCallback(() => {
    const options = [
      postDetailValue.isFollowed ? UNFOLLOW : FOLLOW,
      postDetailValue.isBlocked ? UNBLOCK : BLOCK,
      CANCEL,
    ];

    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        textStyle: {
          textAlign: 'center',
          textAlignVertical: 'center',
          width: '100%',
        },
      },
      async selectedIndex => {
        switch (selectedIndex) {
          case 0:
            dispatch(
              setUserScene(
                postDetailValue.isFollowed
                  ? 'unfollowUserOnCommentDetail'
                  : 'followUserOnCommentDetail',
              ),
            );

            dispatch(setOperationUserId(authorId));

            dispatch(
              followOrUnfollowUserAsync(postDetailValue.isFollowed ? 0 : 1),
            );

            break;
          case 1:
            dispatch(
              setUserScene(
                postDetailValue.isBlocked
                  ? 'unblockUserOnCommentDetail'
                  : 'blockUserOnCommentDetail',
              ),
            );

            dispatch(setOperationUserId(authorId));

            dispatch(
              blockOrUnblockUserAsync(postDetailValue.isBlocked ? 0 : 1),
            );

            break;
        }
      },
    );
  }, [
    authorId,
    dispatch,
    postDetailValue.isBlocked,
    postDetailValue.isFollowed,
    showActionSheetWithOptions,
  ]);

  const hideHeaderMore = useMemo(
    () => store.getState().user.userId === authorId,
    [authorId],
  );

  const showCollect = useMemo(
    () => store.getState().user.userId !== authorId,
    [authorId],
  );

  const viewShotRef = useRef<ViewShot>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <ViewShot style={[styles.root, statusBarStyle]} ref={viewShotRef}>
      <ViewShotContext.Provider value={viewShotRef}>
        <DetailHeader
          userId={authorId}
          username={authorName}
          onBackPress={handleBackPress}
          onMorePress={handleMorePress}
          style={styles.header}
          hideMore={hideHeaderMore}
        />

        <List
          {...postDetailValue}
          postId={postId}
          updateListItemCallback={updateListItemCallback}
          showCollect={showCollect}
          focusInput={focusInput}
        />

        <Footer
          style={styles.footer}
          postId={postId}
          ref={inputRef}
          updateListItemCallback={updateListItemCallback}
          commentCount={postDetailValue.commentCount}
        />
      </ViewShotContext.Provider>
    </ViewShot>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  header: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F0F3',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
});
