import {useEffect} from 'react';
import {status as loginStatus} from '../modules/login/store/slice';
import {status as verificationCodeStatus} from '../modules/verificationCode/store/slice';
import {status as avatarStatus} from '../modules/avatar/store/slice';
import {status as userStatus} from '../stores/user/slice';
import {status as navigationBarStatus} from '../modules/navigationBar/store/slice';
import {status as homeStatus} from '../modules/home/store/slice';
import {status as newPostStatus} from '../modules/newPost/store/slice';
import {useAppSelector} from './index';

const useLoading = () => {
  const loginStatusValue = useAppSelector(loginStatus);
  const verificationCodeStatusValue = useAppSelector(verificationCodeStatus);
  const avatarStatusValue = useAppSelector(avatarStatus);
  const userStatusValue = useAppSelector(userStatus);
  const navigationBarStatusValue = useAppSelector(navigationBarStatus);
  const homeStatusValue = useAppSelector(homeStatus);
  const newPostStatusValue = useAppSelector(newPostStatus);

  const loading =
    loginStatusValue === 'loading' ||
    verificationCodeStatusValue === 'loading' ||
    avatarStatusValue === 'loading' ||
    userStatusValue === 'loading' ||
    navigationBarStatusValue === 'loading' ||
    homeStatusValue === 'loading' ||
    newPostStatusValue === 'loading';

  useEffect(() => {
    return () => {};
  }, []);

  return loading;
};

export default useLoading;
