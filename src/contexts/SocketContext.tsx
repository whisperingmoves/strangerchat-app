import React, {createContext, useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {useAppSelector} from '../hooks';
import {token} from '../stores/user/slice';
import Config from 'react-native-config';
import {showError} from '../utils/notification';

export const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketProvider = (props: any) => {
  const tokenValue = useAppSelector(token);

  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    if (!tokenValue) {
      return;
    }

    setSocket(
      io(Config.BASE_URL as string, {
        auth: {
          token: tokenValue,
        },
      }),
    );

    socket?.connect();

    socket?.on('connect_error', err => {
      showError(err.message);
    });

    socket?.on('disconnect', reason => {
      showError(reason);
    });

    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenValue]);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
