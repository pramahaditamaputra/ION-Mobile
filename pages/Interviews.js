import React, {useState} from 'react';
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

const Interviews = ({navigation}) => {
  const navigateDetails = (id, job) => {
    navigation.navigate('InterviewsDetail', {
      id: id,
      job: job,
    });
  };

  const bankData = [
    {
      id: 1,
      jobName: 'Front-End Engineer',
      jobDescription: 'Front-End Engineer',
      jobApplyDueDate: '01 December 2021',
    },
    {
      id: 2,
      jobName: 'Back-End Engineer',
      jobDescription: 'Back-End Engineer',
      jobApplyDueDate: '02 December 2021',
    },
    {
      id: 3,
      jobName: 'Full-Stack Engineer',
      jobDescription: 'Full-Stack Engineer',
      jobApplyDueDate: '03 December 2021',
    },
    {
      id: 4,
      jobName: 'DevOps Engineer',
      jobDescription: 'DevOps Engineer',
      jobApplyDueDate: '04 December 2021',
    },
    {
      id: 5,
      jobName: 'AI Engineer',
      jobDescription: 'AI Engineer',
      jobApplyDueDate: '05 December 2021',
    },
    {
      id: 6,
      jobName: 'Big Data Engineer',
      jobDescription: 'Big Data Engineer',
      jobApplyDueDate: '06 December 2021',
    },
  ];

  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobName: 'Front-End Engineer',
      jobDescription: 'Front-End Engineer',
      jobApplyDueDate: '01 December 2021',
    },
    {
      id: 2,
      jobName: 'Back-End Engineer',
      jobDescription: 'Back-End Engineer',
      jobApplyDueDate: '02 December 2021',
    },
    {
      id: 3,
      jobName: 'Full-Stack Engineer',
      jobDescription: 'Full-Stack Engineer',
      jobApplyDueDate: '03 December 2021',
    },
    {
      id: 4,
      jobName: 'DevOps Engineer',
      jobDescription: 'DevOps Engineer',
      jobApplyDueDate: '04 December 2021',
    },
    {
      id: 5,
      jobName: 'AI Engineer',
      jobDescription: 'AI Engineer',
      jobApplyDueDate: '05 December 2021',
    },
    {
      id: 6,
      jobName: 'Big Data Engineer',
      jobDescription: 'Big Data Engineer',
      jobApplyDueDate: '06 December 2021',
    },
  ]);

  const filterData = data => {
    let currentJobs = [...jobs];
    let newJobs = currentJobs.filter(job => job.jobName === data);
    if (newJobs.length > 0) {
      setJobs(newJobs);
    } else {
      setJobs(bankData);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout
        style={{
          padding: 10,
          backgroundColor: '#3366FF',
          height: 200,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
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
          {jobs &&
            jobs.map(job => {
              return (
                <Cards
                  key={job.id}
                  type="interviews"
                  move={() => navigateDetails(job.id, job.jobName)}
                  jobName={job.jobName}
                  jobApplyDueDate={job.jobApplyDueDate}
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
