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
