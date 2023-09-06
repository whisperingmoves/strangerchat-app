import {Socket} from 'socket.io-client';
import {CONNECTION_DISCONNECTED} from '../constants/Config';

export const emitMessages = async (socket: Socket | undefined, args: any) => {
  if (!socket || socket.disconnected) {
    throw new Error(CONNECTION_DISCONNECTED);
  }

  socket.emit('messages', args);
};
