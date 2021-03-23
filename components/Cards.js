import React from 'react';
import {Card, Text} from '@ui-kitten/components';
import {TouchableOpacity, StyleSheet} from 'react-native';

const Cards = props => {
  return (
    <Card style={styles.cardContainer}>
      <TouchableOpacity onPress={props.move} style={styles.touchContainer}>
        <Text category="h6">{props.jobName}</Text>
        <Text category="h6" appearance="hint">
          Due Date Apply : {props.jobApplyDueDate}
        </Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  touchContainer: {},
  cardContainer: {
    marginVertical: 5,
  },
});

export default Cards;
