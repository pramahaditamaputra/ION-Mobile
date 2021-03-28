// import React from 'react';
// import {SafeAreaView} from 'react-native';
// import {Button, Divider, Layout, TopNavigation} from '@ui-kitten/components';

// const Login = ({navigation}) => {
//   const navigateDetails = () => {
//     navigation.navigate('Details');
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       {/* <TopNavigation title="Login" alignment="center" />
//       <Divider />
//       <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Button onPress={navigateDetails}>OPEN DETAILS</Button>
//       </Layout> */}

//       <Layout>COMPONENT</Layout>
//     </SafeAreaView>
//   );
// };

// export default Login;

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button} from '@ui-kitten/components';

const Login = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signin = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Button onPress={signin}>Login</Button>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button onPress={signOut}>Logout</Button>
    </View>
  );
};

export default Login;
