import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Text,
} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';

const Profile = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.replace('Login');
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Profile" alignment="center" />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={signOut}>Log Out</Button>
      </Layout>
    </SafeAreaView>
  );
};

export default Profile;
