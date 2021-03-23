import React from 'react';
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

const Jobs = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('JobsDetail');
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
          Job List
        </Text>
        <Text style={styles.text} category="h6">
          Find your job
        </Text>
        <SearchInput />
      </Layout>
      <ScrollView>
        <Layout style={{padding: 10}}>
          <Cards move={navigateDetails} />
          <Cards move={navigateDetails} />
          <Cards move={navigateDetails} />
          <Cards move={navigateDetails} />
          <Cards move={navigateDetails} />
          <Cards move={navigateDetails} />
          <Cards move={navigateDetails} />
          <Cards move={navigateDetails} />
          <Cards move={navigateDetails} />
          <Cards move={navigateDetails} />
          <Cards move={navigateDetails} />
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
