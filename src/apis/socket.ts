import io from 'socket.io-client';
import Config from 'react-native-config';
import {store} from '../stores/store';

export const socket = io(Config.BASE_URL as string, {
  auth: {
    token: store.getState().user.token,
  },
});

socket.connect();

export const emitMessages = async (args: any) => {
  socket.emit('messages', args);
};
