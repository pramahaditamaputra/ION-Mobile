import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';

const RecordInterviewResult = ({route, navigation}) => {
  const {uri} = route.params;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
      <Video source={{uri: uri}} style={styles.backgroundVideo} />
    </View>
  );
};

export default RecordInterviewResult;

const styles = StyleSheet.create({
  backgroundVideo: {position: 'absolute', top: 0, left: 0, bottom: 0, right: 0},
});
