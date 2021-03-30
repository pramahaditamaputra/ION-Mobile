import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Gap = props => {
  return <View style={styles.gap(props)} />;
};

export default Gap;

const styles = StyleSheet.create({
  gap: props => ({
    height: props.height,
    width: props.width,
  }),
});
