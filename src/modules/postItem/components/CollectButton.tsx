import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import icon_collect from '../../../assets/images/icons/icon_collect.png';

export default () => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Image source={icon_collect} />
    </TouchableOpacity>
  );
};
