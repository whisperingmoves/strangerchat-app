import {useEffect} from 'react';
import {status as loginStatus} from '../modules/login/store/slice';
import {status as verificationCodeStatus} from '../modules/verificationCode/store/slice';
import {status as avatarStatus} from '../modules/avatar/store/slice';
import {scene as userScene, status as userStatus} from '../stores/user/slice';
import {status as navigationBarStatus} from '../modules/navigationBar/store/slice';
import {status as homeStatus} from '../modules/home/store/slice';
import {status as newPostStatus} from '../modules/newPost/store/slice';
import {
  scene as commentDetailScene,
  status as commentDetailStatus,
} from '../modules/commentDetail/store/slice';
import {
  scene as topUpScene,
  status as topUpStatus,
} from '../modules/topUp/store/slice';
import {
  scene as chatDetailScene,
  status as chatDetailStatus,
} from '../modules/chatDetail/store/slice';
import {
  scene as giftScene,
  status as giftStatus,
} from '../modules/gift/store/slice';
import {useAppSelector} from './index';

const useLoading = () => {
  const loginStatusValue = useAppSelector(loginStatus);
  const verificationCodeStatusValue = useAppSelector(verificationCodeStatus);
  const avatarStatusValue = useAppSelector(avatarStatus);
  const userStatusValue = useAppSelector(userStatus);
  const userSceneValue = useAppSelector(userScene);
  const navigationBarStatusValue = useAppSelector(navigationBarStatus);
  const homeStatusValue = useAppSelector(homeStatus);
  const newPostStatusValue = useAppSelector(newPostStatus);
  const chatDetailStatusValue = useAppSelector(chatDetailStatus);
  const chatDetailSceneValue = useAppSelector(chatDetailScene);
  const topUpStatusValue = useAppSelector(topUpStatus);
  const commentDetailStatusValue = useAppSelector(commentDetailStatus);
  const commentDetailSceneValue = useAppSelector(commentDetailScene);
  const topUpSceneValue = useAppSelector(topUpScene);
  const giftStatusValue = useAppSelector(giftStatus);
  const giftSceneValue = useAppSelector(giftScene);

  const loading =
    loginStatusValue === 'loading' ||
    verificationCodeStatusValue === 'loading' ||
    avatarStatusValue === 'loading' ||
    (userStatusValue === 'loading' && userSceneValue !== 'getMyPosts') ||
    navigationBarStatusValue === 'loading' ||
    homeStatusValue === 'loading' ||
    newPostStatusValue === 'loading' ||
    (commentDetailStatusValue === 'loading' &&
      commentDetailSceneValue !== 'getPostComments') ||
    (chatDetailStatusValue === 'loading' &&
      chatDetailSceneValue === 'uploadMessage') ||
    (topUpStatusValue === 'loading' && topUpSceneValue === 'buyCoinProduct') ||
    (giftStatusValue === 'loading' && giftSceneValue === 'sendGift');

  useEffect(() => {
    return () => {};
  }, []);

  return loading;
};

export default useLoading;
