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
import {
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  TopNavigation,
  Text,
} from '@ui-kitten/components';
import Logo from '../assets/images/login.svg';
import Gap from '../components/Gap';

const Login = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
      });
  };

  const moveToMainApp = () => {
    console.log(user.email);
    navigation.replace('MainApp');
  };

  const moveToRegister = () => {
    navigation.replace('Register');
  };

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Layout style={{flex: 1, padding: 25, justifyContent: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Layout style={{marginVertical: 75}}>
              <Logo style={{maxWidth: '100%'}} height={175} />
            </Layout>
            <Input
              size="large"
              label="Email"
              placeholder="Input Email"
              value={email}
              onChangeText={nextValue => setEmail(nextValue)}
            />
            <Gap height={10} />
            <Input
              size="large"
              value={password}
              label="Password"
              placeholder="Input Password"
              caption="Should contain at least 8 symbols"
              accessoryRight={renderIcon}
              captionIcon={AlertIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={nextValue => setPassword(nextValue)}
            />
            <Gap height={50} />
            <Button onPress={signIn}>Login</Button>
            <Layout
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Gap height={15} />
              <TouchableOpacity onPress={moveToRegister}>
                <Text appearance="hint">
                  Don't have an account yet? Sign Up.
                </Text>
              </TouchableOpacity>
            </Layout>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    );
  }

  if (user) {
    return <>{moveToMainApp()}</>;
  }
};

export default Login;
