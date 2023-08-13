import {useEffect} from 'react';
import io from 'socket.io-client';
import Config from 'react-native-config';
import {store} from '../stores/store';

const socket = io(Config.BASE_URL as string, {
  auth: {
    token: store.getState().user.token,
  },
});

const useSocket = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
