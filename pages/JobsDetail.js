import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
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

const JobsDetail = ({route, navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const {id, job} = route.params;

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
          {job}
        </Text>
        <Text style={{color: 'white'}} category="h6">
          Due Date Apply : 15 March 2021
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
            Job Requirements
          </Text>
          <Gap height={5} />
          <Text style={styles.text} category="h6">
            Knowing about Machine Learning
          </Text>
          <Gap height={50} />
          <Button size="medium">Apply Job</Button>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

export default JobsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
