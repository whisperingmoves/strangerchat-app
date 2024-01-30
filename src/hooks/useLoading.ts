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

import {useEffect} from 'react';
import {status as loginStatus} from '../modules/login/store/slice';
import {status as verificationCodeStatus} from '../modules/verificationCode/store/slice';
import {status as avatarStatus} from '../modules/avatar/store/slice';
import {scene as userScene, status as userStatus} from '../stores/user/slice';
import {status as navigationBarStatus} from '../modules/navigationBar/store/slice';
import {status as homeStatus} from '../modules/home/store/slice';
import {status as newPostStatus} from '../modules/newPost/store/slice';
import {status as profileStatus} from '../modules/profile/store/slice';
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
import {status as myGiftStatus} from '../modules/myGift/store/slice';
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
  const myGiftStatusValue = useAppSelector(myGiftStatus);
  const profileStatusValue = useAppSelector(profileStatus);

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
    (giftStatusValue === 'loading' && giftSceneValue === 'sendGift') ||
    myGiftStatusValue === 'loading' ||
    profileStatusValue === 'loading';

  useEffect(() => {
    return () => {};
  }, []);

  return loading;
};

export default useLoading;
