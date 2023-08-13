import React, {createContext} from 'react';
import {Socket} from 'socket.io-client';
import useSocket from '../hooks/useSocket';

export const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketProvider = (props: any) => {
  const socket = useSocket();

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
