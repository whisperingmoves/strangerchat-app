import React, {createContext} from 'react';
import ViewShot from 'react-native-view-shot';

export const ViewShotContext = createContext<
  React.RefObject<ViewShot> | undefined
>(undefined);
