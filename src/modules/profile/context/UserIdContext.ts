import {createContext} from 'react';
import {UserId} from '../store/slice';

export const UserIdContext = createContext<UserId>('');
