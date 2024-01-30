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

import {useEffect} from 'react';
import {ModalProps, Platform, StatusBar} from 'react-native';

const StatusBarManager = ({
  presentationStyle,
}: {
  presentationStyle?: ModalProps['presentationStyle'];
}) => {
  useEffect(() => {
    return () => StatusBar.setHidden(false);
  }, []);

  if (Platform.OS === 'ios' || presentationStyle !== 'overFullScreen') {
    return null;
  }

  //Can't get an actual state of app status bar with default RN. Gonna rely on "presentationStyle === overFullScreen" prop and guess application status bar state to be visible in this case.
  StatusBar.setHidden(true);

  return null;
};

export default StatusBarManager;
