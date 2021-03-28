import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Cards from '../components/Cards';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const InterviewsDetail = ({route, navigation}) => {
  const {id, job} = route.params;
  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateGoInterview = (id, job) => {
    navigation.navigate('RecordInterview');
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Interviews Detail"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.container}>
        <Cards
          key={id}
          type="interviewsDetail"
          jobName={job}
          goInterview={navigateGoInterview}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default InterviewsDetail;
