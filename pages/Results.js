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
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Gap from '../components/Gap';

const Results = ({navigation}) => {
  const [bankData, setBankData] = useState([]);
  const [results, setResults] = useState([]);
  const [userID, setUserID] = useState('');

  const navigateDetails = (userID, id, name, description, duedate) => {
    navigation.navigate('ResultsDetail', {
      userID: userID,
      id: id,
      name: name,
      description: description,
      duedate: duedate,
    });
  };

  const filterData = data => {
    let currentJobs = [...results];
    let newJobs = currentJobs.filter(interview => interview.job.name === data);
    if (newJobs.length > 0) {
      setResults(newJobs);
    } else {
      setResults(bankData);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        // value previously stored
        // console.log(value);
        setUserID(value);
        getInterviews(value);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const getInterviews = async userID => {
    var snapshot = await firestore()
      .collection('interviews')
      .where('user.id', '==', userID)
      .where('status', '==', 'Waiting For Review')
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
        setResults(list);
        setBankData(list);
      });
  };

  useEffect(() => {
    getData();
    // getInterviews(userID);
  }, []);

  return (
    <>
      <Layout
        style={{
          padding: 10,
          paddingBottom: 20,
          backgroundColor: '#6155a6',
          height: 200,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}>
        <SafeAreaView>
          <Text style={styles.text} category="h3">
            Results
          </Text>
          <Gap height={10} />
          <Text style={styles.text} category="s2">
            Interview announcements
          </Text>
          <Gap height={20} />
          <SearchInput onFilter={data => filterData(data)} />
        </SafeAreaView>
      </Layout>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <Layout style={{padding: 10}}>
            {results &&
              results.map(result => {
                return (
                  <Cards
                    key={result.job.id}
                    type="results"
                    move={() =>
                      navigateDetails(
                        result.user.id,
                        result.job.id,
                        result.job.name,
                        result.job.description,
                        result.job.duedate,
                      )
                    }
                    jobName={result.job.name}
                    jobApplyDueDate={Date(result.job.duedate.seconds)}
                  />
                );
              })}
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
  },
});

export default Results;
