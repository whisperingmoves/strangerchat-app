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

import {Conversation} from '../chat/store/slice';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import icon_coin from '../../assets/images/icons/icon_coin.png';
import icon_coin_supreme from '../../assets/images/icons/icon_coin_supreme.png';
import {
  FIFTH_DAY,
  FIRST_DAY,
  FOURTH_DAY,
  SECOND_DAY,
  SEVENTH_DAY,
  SIXTH_DAY,
  THIRD_DAY,
} from '../../constants/navigationBar/Config';

export const calculateTotalUnreadCount = (
  conversationList: Conversation[],
): number => {
  return conversationList.reduce((total, conversation) => {
    return total + (conversation.unreadCount || 0);
  }, 0);
};

export type RewardProps = {
  icon: ImageSourcePropType;
  amount: number;
  label: string;
  active: boolean;
};

export const rewardData: RewardProps[] = [
  {
    icon: icon_coin,
    amount: 10,
    label: FIRST_DAY,
    active: false,
  },
  {
    icon: icon_coin,
    amount: 15,
    label: SECOND_DAY,
    active: false,
  },
  {
    icon: icon_coin,
    amount: 30,
    label: THIRD_DAY,
    active: false,
  },
  {
    icon: icon_coin,
    amount: 50,
    label: FOURTH_DAY,
    active: false,
  },
  {
    icon: icon_coin,
    amount: 70,
    label: FIFTH_DAY,
    active: false,
  },
  {
    icon: icon_coin,
    amount: 100,
    label: SIXTH_DAY,
    active: false,
  },
  {
    icon: icon_coin_supreme,
    amount: 200,
    label: SEVENTH_DAY,
    active: false,
  },
];
