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

import React, {useCallback, useEffect, useRef} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import icon_gift from '../../../assets/images/icons/icon_gift.png';
import Gift, {GiftRef} from '../../gift/Gift';
import {
  HandleSend as HandleGiftSend,
  resetStatus,
  scene,
  sendGiftAsync,
  setScene,
  status,
} from '../../gift/store/slice';
import {AuthorId} from '../store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {showError, showSuccess} from '../../../utils/notification';
import {SUCCESSFUL_GIFT_GIVING} from '../../../constants/commentDetail/Config';
import {store} from '../../../stores/store';

type Props = {
  authorId: AuthorId;
};

export default (props: Props) => {
  const giftRef = useRef<GiftRef>(null);

  const dispatch = useAppDispatch();

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'sendGift') {
      dispatch(resetStatus());

      showSuccess(SUCCESSFUL_GIFT_GIVING);

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'sendGift') {
      dispatch(resetStatus());

      showError(store.getState().gift.error);

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handleGiftSend: HandleGiftSend = useCallback(
    gift => {
      dispatch(setScene('sendGift'));

      dispatch(
        sendGiftAsync({
          giftId: gift.id,
          quantity: 1,
          receiverId: props.authorId,
        }),
      );
    },
    [dispatch, props.authorId],
  );

  const handlePress = useCallback(() => {
    giftRef.current?.show();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Image source={icon_gift} />

      <Gift ref={giftRef} handleSend={handleGiftSend} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    backgroundColor: '#FFF',
  },
});
