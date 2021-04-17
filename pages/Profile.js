// import React from 'react';
// import {SafeAreaView} from 'react-native';
// import {
//   Button,
//   Divider,
//   Layout,
//   TopNavigation,
//   Text,
// } from '@ui-kitten/components';
// import auth from '@react-native-firebase/auth';

// const Profile = ({navigation}) => {
//   const navigateDetails = () => {
//     navigation.navigate('Details');
//   };

//   const signOut = () => {
//     auth()
//       .signOut()
//       .then(() => {
//         console.log('User signed out!');
//         navigation.replace('Login');
//       });
//   };

//   return (
//     <Layout style={{flex: 1}}>
//       <SafeAreaView style={{flex: 1}}>
//         {/* <TopNavigation title="Profile" alignment="center" /> */}
//         {/* <Divider /> */}
//         <Layout
//           style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <Button onPress={signOut}>Log Out</Button>
//         </Layout>
//       </SafeAreaView>
//     </Layout>
//   );
// };

// export default Profile;

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import {Layout, Text, Card, Divider, Button} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Gap from '../components/Gap';
// import moment from 'moment';

const Profile = ({navigation}) => {
  const [bankData, setBankData] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [userID, setUserID] = useState('');
  // const navigateDetails = () => {
  //   navigation.navigate('Details');
  // };
  const navigateEdit = () => {
    navigation.navigate('EditProfile');
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.replace('Login');
      });
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        // value previously stored
        console.log(value);
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
      .collection('candidates')
      .where('uid', '==', userID)
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const {cv, dob, email, fullname} = doc.data();
          list.push({
            id: doc.id,
            cv: cv,
            dob: dob,
            email: email,
            fullname: fullname,
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
    // getInterviews();
  }, []);

  return (
    <>
      <Layout
        style={{
          padding: 10,
          paddingBottom: 20,
          backgroundColor: '#6155a6',
          height: 250,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}>
        <SafeAreaView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
            }}
          />
          <Gap height={20} />
          {interviews.length > 0 && (
            <Text style={styles.name}>{interviews[0].fullname}</Text>
          )}
        </SafeAreaView>
      </Layout>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <ScrollView>
          <Card style={styles.card}>
            {interviews &&
              interviews.map(interview => {
                return (
                  <>
                    <Text style={styles.textLabel}>Name</Text>
                    <Text style={styles.text}>{interview.fullname}</Text>
                    <Divider />

                    <Text style={styles.textLabel}>DOB</Text>
                    <Text style={styles.text}>
                      {/* {moment(interview.dob).format('DD-MM-YYYY')} */}
                      {Date(interview.dob)}
                    </Text>
                    <Divider />

                    <Text style={styles.textLabel}>Email</Text>
                    <Text style={styles.text}>{interview.email}</Text>
                    <Divider />

                    <Text style={styles.textLabel}>CV</Text>
                    <Text
                      style={styles.textCV}
                      onPress={() => Linking.openURL(`${interview.cv}`)}>
                      View CV
                    </Text>

                    <Divider />
                    <Text style={styles.textLabel}>Password</Text>
                    <Text style={styles.text}>******</Text>
                  </>
                );
              })}
            <Gap height={30} />
            <Button
              style={styles.button}
              // appearance="outline"
              onPress={signOut}
              status="danger">
              Logout
            </Button>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    padding: 10,
    paddingBottom: 20,
    backgroundColor: '#6155a6',
    height: 100,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  card: {
    backgroundColor: '#ffff',
    // position: 'absolute',
    // marginTop: 10,
    // marginRight: 20,
    // marginLeft: 20,
    height: 450,
    width: 350,
    borderRadius: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    // marginBottom: 10,
    alignSelf: 'center',
    // position: 'absolute',
    // marginTop: 30,
  },
  name: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '600',
    // position: 'absolute',
    // marginTop: 110,
    alignSelf: 'center',
  },
  body: {
    // marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  text: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  textCV: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    color: 'blue',
  },
  textLabel: {
    marginLeft: 20,
    fontSize: 12,
    marginTop: 10,
  },
  button: {
    margin: 5,
    width: '100%',
    height: 50,
    borderRadius: 10,
  },
});
export default Profile;
