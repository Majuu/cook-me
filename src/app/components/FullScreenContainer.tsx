import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
});

const FullScreenContainer: React.FC<{children: React.ReactNode}> = ({
  children,
}) => <View style={styles.container}>{children}</View>;

export default FullScreenContainer;
