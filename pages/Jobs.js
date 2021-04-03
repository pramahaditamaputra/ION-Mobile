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

const Jobs = ({navigation}) => {
  const [bankData, setBankData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userID, setUserID] = useState('');

  const navigateDetails = (userID, id, name, description, duedate) => {
    navigation.navigate('JobsDetail', {
      userID: userID,
      id: id,
      name: name,
      description: description,
      duedate: duedate,
    });
  };

  const filterData = data => {
    let currentJobs = [...jobs];
    let newJobs = currentJobs.filter(job => job.name === data);
    if (newJobs.length > 0) {
      setJobs(newJobs);
    } else {
      setJobs(bankData);
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

  const getJobs = async () => {
    var snapshot = await firestore()
      .collection('jobs')
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const {id, name, description, duedate} = doc.data();
          list.push({
            id: doc.id,
            name,
            description,
            duedate,
          });
        });
        console.log(list);
        setJobs(list);
        setBankData(list);
      });
  };

  useEffect(() => {
    getData();
    getJobs();
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
          Jobs
        </Text>
        <Text style={styles.text} category="h6">
          Find your dream job
        </Text>
        <SearchInput onFilter={data => filterData(data)} />
      </Layout>
      <ScrollView>
        <Layout style={{padding: 10}}>
          {jobs &&
            jobs.map(job => {
              return (
                <Cards
                  key={job.id}
                  move={() =>
                    navigateDetails(
                      userID,
                      job.id,
                      job.name,
                      job.description,
                      job.duedate.seconds,
                    )
                  }
                  jobName={job.name}
                  jobApplyDueDate={Date(job.duedate.seconds)}
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

export default Jobs;
