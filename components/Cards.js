import React from 'react';
import {Avatar, Button, Card, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import AI from '../assets/images/ai.svg';
import FE from '../assets/images/frontend.svg';
import BE from '../assets/images/backend.svg';
import FS from '../assets/images/fullstack.svg';
import DO from '../assets/images/devops.svg';

const Header = props => (
  <Layout
    {...props}
    style={{
      height: 175,
      backgroundColor: '#a685e2',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    {props.job === 'Front-End Engineer' && (
      <FE style={{maxWidth: '100%'}} height={100} />
    )}
    {props.job === 'Back-End Engineer' && (
      <BE style={{maxWidth: '100%'}} height={100} />
    )}
    {props.job === 'AI Engineer' && (
      <AI style={{maxWidth: '100%'}} height={100} />
    )}
    {props.job === 'Full-Stack Engineer' && (
      <FS style={{maxWidth: '100%'}} height={100} />
    )}
    {props.job === 'DevOps Engineer' && (
      <DO style={{maxWidth: '100%'}} height={100} />
    )}
  </Layout>
);

const Cards = props => {
  const jobName = props.jobName;

  if (props.type === 'interviews') {
    return (
      <Card
        style={styles.cardContainer}
        header={props => <Header {...props} job={jobName} />}
        onPress={props.move}>
        <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar source={require('../assets/images/icon.png')} />
          <Layout style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
            <Text category="s1">{props.jobName}</Text>
            <Text category="p2" appearance="hint">
              Due Date Interview : {props.jobApplyDueDate}
            </Text>
          </Layout>
        </Layout>
      </Card>
    );
  }

  if (props.type === 'results') {
    return (
      <Card
        style={styles.cardContainer}
        header={props => <Header {...props} job={jobName} />}
        onPress={props.move}>
        <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar source={require('../assets/images/icon.png')} />
          <Layout style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
            <Text category="s1">{props.jobName}</Text>
            <Text category="p2" appearance="hint">
              Due Date Interview : {props.jobApplyDueDate}
            </Text>
          </Layout>
        </Layout>
      </Card>
    );
  }

  return (
    <Card
      style={styles.cardContainer}
      onPress={props.move}
      header={props => <Header {...props} job={jobName} />}>
      <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar source={require('../assets/images/icon.png')} />
        <Layout style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
          <Text category="s1">{props.jobName}</Text>
          <Text category="p2" appearance="hint">
            Due Date Apply : {props.jobApplyDueDate}
          </Text>
        </Layout>
      </Layout>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
    borderRadius: 10,
  },
  interviewsDetailCardContainer: {
    borderRadius: 10,
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderColor: '#EDF1F7',
  },
  contentContainer: {justifyContent: 'space-around'},
});

export default Cards;
