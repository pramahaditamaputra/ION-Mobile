import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Cards from '../components/Cards';
import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import Gap from '../components/Gap';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const ResultsDetail = ({route, navigation}) => {
  const {userID, id, name, description, duedate} = route.params;
  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateGoInterview = id => {
    navigation.navigate('RecordInterview');
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#6155a6'}}>
      <TopNavigation
        // title="Interviews Detail"
        alignment="center"
        accessoryLeft={BackAction}
        style={{backgroundColor: 'transparent'}}
      />
      {/* <Divider /> */}
      {/* <Layout style={styles.container}>
        <Cards
          key={id}
          type="interviewsDetail"
          jobName={job}
          goInterview={navigateGoInterview}
        />
      </Layout> */}

      <Layout
        style={{
          padding: 10,
          backgroundColor: '#6155a6',
          height: 125,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          // borderBottomLeftRadius: 30,
          // borderBottomRightRadius: 300,
        }}>
        <Text style={{color: 'white'}} category="h1">
          {name}
        </Text>
        <Text style={{color: 'white'}} category="h6">
          Interview Date : {Date(duedate)}
        </Text>
        {/* <SearchInput onFilter={data => filterData(data)} /> */}
      </Layout>

      <Layout
        style={{
          padding: 10,
          paddingTop: 40,
          paddingRight: 200,
          backgroundColor: '#fff',
          flex: 1,
          borderTopRightRadius: 300,
        }}>
        <ScrollView>
          <Text style={styles.text} category="h5">
            Messages
          </Text>
          <Gap height={5} />
          <Text style={styles.text} category="h6">
            Congratulation, you have passed the interview!
          </Text>
          <Gap height={50} />
          <Button size="medium" onPress={navigateGoInterview}>
            Contact HRD
          </Button>
        </ScrollView>
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

export default ResultsDetail;
