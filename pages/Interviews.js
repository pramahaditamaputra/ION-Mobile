import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
  Card,
} from '@ui-kitten/components';
import SearchInput from '../components/SearchInput';
import Cards from '../components/Cards';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Interviews = ({navigation}) => {
  const [bankData, setBankData] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [userID, setUserID] = useState('');

  const navigateDetails = (userID, id, name, description, duedate) => {
    navigation.navigate('InterviewsDetail', {
      userID: userID,
      id: id,
      name: name,
      description: description,
      duedate: duedate,
    });
  };

  const filterData = data => {
    let currentJobs = [...interviews];
    let newJobs = currentJobs.filter(interview => interview.job.name === data);
    if (newJobs.length > 0) {
      setInterviews(newJobs);
    } else {
      setInterviews(bankData);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        // value previously stored
        // console.log(value);
        setUserID(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const getInterviews = async () => {
    var snapshot = await firestore()
      .collection('interviews')
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const {job, result, status, user, video, applyDate} = doc.data();
          list.push({
            id: doc.id,
            user: user,
            job: job,
            result: result,
            status: status,
            video: video,
            applyDate: applyDate,
          });
          console.log(list);
        });
        console.log(list);
        setInterviews(list);
        setBankData(list);
      });
  };

  useEffect(() => {
    getData();
    getInterviews();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout
        style={{
          padding: 10,
          paddingBottom: 20,
          backgroundColor: '#6155a6',
          height: 175,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}>
        <Text style={styles.text} category="h1">
          Interviews
        </Text>
        <Text style={styles.text} category="h6">
          Find your job interview
        </Text>
        <SearchInput onFilter={data => filterData(data)} />
      </Layout>
      <ScrollView>
        <Layout style={{padding: 10}}>
          {interviews &&
            interviews.map(interview => {
              return (
                <Cards
                  key={interview.job.id}
                  type="interviews"
                  move={() =>
                    navigateDetails(
                      interview.user.id,
                      interview.job.id,
                      interview.job.name,
                      interview.job.description,
                      interview.job.duedate,
                    )
                  }
                  jobName={interview.job.name}
                  jobApplyDueDate={interview.job.duedate}
                />
              );
            })}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
  },
});

export default Interviews;
