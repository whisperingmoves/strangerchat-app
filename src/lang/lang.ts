import {sprintf} from 'sprintf-js';
import {LangMap} from './@types';
import apiMap from './api';
import appMap from './app';
import avatarMap from './avatar';
import birthdayMap from './birthday';
import chatDetailMap from './chatDetail';
import commentDetailMap from './commentDetail';
import exploreMap from './explore';
import genderMap from './gender';
import geolocationMap from './geolocation';
import giftMap from './gift';
import homeMap from './home';
import interactiveNotificationMap from './interactiveNotification';
import loginMap from './login';
import myFollowingMap from './myFollowing';
import myGiftMap from './myGift';
import navigationBarMap from './navigationBar';
import newPostMap from './newPost';
import notificationMap from './notification';
import profileMap from './profile';
import searchMap from './search';
import settingMap from './setting';
import statusNotificationMap from './statusNotification';
import topUpMap from './topUp';
import verificationCodeMap from './verificationCode';
import giftNotificationMap from './giftNotification';
import walletMap from './wallet';

function getLangMap(): LangMap {
  const langMap: LangMap = {};

  const langMaps = [
    apiMap,
    appMap,
    avatarMap,
    birthdayMap,
    chatDetailMap,
    commentDetailMap,
    exploreMap,
    genderMap,
    geolocationMap,
    giftMap,
    homeMap,
    interactiveNotificationMap,
    loginMap,
    myFollowingMap,
    myGiftMap,
    navigationBarMap,
    newPostMap,
    notificationMap,
    profileMap,
    searchMap,
    settingMap,
    statusNotificationMap,
    topUpMap,
    verificationCodeMap,
    walletMap,
    giftNotificationMap,
  ];

  langMaps.forEach(item => {
    Object.entries(item).forEach(([key, value]: [string, any]) => {
      if (key in langMap) {
        langMap[key] = {...langMap[key], ...value};
      } else {
        langMap[key] = value;
      }
    });
  });

  return langMap;
}

export function __(name: string, vars: any[] = [], lang = 'en'): string {
  const langMap = getLangMap();

  if (!(lang in langMap[name])) {
    lang = 'en';
  }

  let value = langMap[name][lang];

  if (vars.length > 0 && Array.isArray(vars)) {
    vars.unshift(value);

    // @ts-ignore
    value = sprintf.apply(null, vars);
  }

  return value;
}
