import React from 'react';
import {Text, View} from 'react-native';

import {NOT_FOUND} from '../constants/api/Config';
import {monitorError} from '../stores/monitor/api';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    error.stack = errorInfo.componentStack;
    monitorError(error).then();
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <View>
          <Text>{NOT_FOUND}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}
