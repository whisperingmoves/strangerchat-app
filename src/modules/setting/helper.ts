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

import {Props as ItemProps} from './components/Item';
import {NEW_NOTICE, SIGN_OUT} from '../../constants/setting/Config';
import icon_notice from '../../assets/images/icons/icon_notice.png';
import icon_wallet_outlined from '../../assets/images/icons/icon_wallet_outlined.png';
import {GOLD_COIN_RECHARGE} from '../../constants/Config';
import icon_logout from '../../assets/images/icons/icon_logout.png';
import {Linking} from 'react-native';
import {LOG_OUT} from '../../stores/store';

export const MENU_LIST: ItemProps[] = [
  // {
  //   icon: icon_account_security,
  //   label: ACCOUNT_SECURITY,
  // },
  {
    icon: icon_notice,
    label: NEW_NOTICE,
    callback: async () => {
      await Linking.openSettings();
    },
  },
  // {
  //   icon: icon_privacy,
  //   label: PRIVACY,
  // },
  // {
  //   icon: icon_accessibility,
  //   label: ACCESSIBILITY,
  // },
  {
    icon: icon_wallet_outlined,
    label: GOLD_COIN_RECHARGE,
    target: 'Wallet',
  },
  // {
  //   icon: icon_promote,
  //   label: PROMOTE,
  //   description: PROMOTE_DESC,
  // },
  // {
  //   icon: icon_help,
  //   label: HELP_FEEDBACK,
  // },
  // {
  //   icon: icon_about,
  //   label: ABOUT_US,
  // },
  {
    icon: icon_logout,
    label: SIGN_OUT,
    callback: (dispatch, navigation) => {
      if (dispatch) {
        dispatch({type: LOG_OUT});
      }

      navigation?.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    },
  },
];
