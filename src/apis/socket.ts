import io from 'socket.io-client';
import {CONNECTION_DISCONNECTED} from '../constants/Config';
import Config from 'react-native-config';
import {store} from '../stores/store';
import {showError} from '../utils/notification';

export const socket = io(Config.BASE_URL as string, {
  auth: {
    token: store.getState().user.token,
  },
});

socket.connect();

socket.on('connect_error', err => {
  showError(err.message);
});

socket.on('disconnect', reason => {
  showError(reason);
});

export const emitMessages = async (args: any) => {
  if (!socket || socket.disconnected) {
    throw new Error(CONNECTION_DISCONNECTED);
  }

  socket.emit('messages', args);
};
