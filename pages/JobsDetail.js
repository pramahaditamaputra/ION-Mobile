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
import firestore from '@react-native-firebase/firestore';
import Gap from '../components/Gap';
import {showMessage, hideMessage} from 'react-native-flash-message';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const JobsDetail = ({route, navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const {userID, id, name, description, duedate} = route.params;

  const applyJob = async () => {
    let data = {
      user: {
        id: userID,
      },
      job: {
        id: id,
        name: name,
        description: description,
        duedate: duedate,
      },
      video: '',
      status: 'Waiting for Interview',
      result: {
        status: 'none',
        message: 'none',
      },
      applyDate: new Date(),
    };

    const insertData = await firestore()
      .collection('interviews')
      .add(data)
      .then(() => {
        console.log('Interview added!');
        showMessage({
          message:
            'Success, please check on interviews tab to do the online interview!',
          type: 'success',
        });
        navigateBack();
      });
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
        <Text style={{color: 'white'}} category="h4">
          {name}
        </Text>
        <Text style={{color: 'white'}} category="p1">
          Due Date Apply : {Date(duedate)}
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
          <Text style={styles.text} category="h6">
            Job Requirements
          </Text>
          <Gap height={5} />
          <Text style={styles.text} category="p1">
            {description}
          </Text>
          <Gap height={50} />
          <Button size="medium" onPress={applyJob}>
            Apply Job
          </Button>
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
