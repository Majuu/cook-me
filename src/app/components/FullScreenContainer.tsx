import React, { PropsWithChildren } from 'react';
import {StyleSheet, View} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
});

const FullScreenContainer: React.FC<PropsWithChildren> = ({
  children
}) => {
  return <View style={[styles.container, { paddingTop: getStatusBarHeight() }]}>{children}</View>;}

export default FullScreenContainer;
