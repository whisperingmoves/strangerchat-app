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

import {emitMessages} from '../socket';

export interface SendMessage {
  conversationId: string;
  clientMessageId: string;
  opponentUserId: string;
  content: string;
  contentLength?: number;
  type?: number;
  giftId?: string;
}

export const sendMessage = async (data: SendMessage): Promise<void> => {
  return await emitMessages({
    type: 4,
    data,
  });
};
