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
  Spinner,
} from '@ui-kitten/components';
import Logo from '../assets/images/login.svg';
import Gap from '../components/Gap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage, hideMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';

const PendingView = props => (
  <Layout
    style={{
      flex: 1,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Layout style={{minHeight: 200, minWidth: 200}}>
      <LottieView
        source={require('./../assets/images/login.json')}
        autoPlay
        loop
      />
    </Layout>
    <Spinner size="giant" />
    <Gap height={20} />
    <Text style={{color: 'black'}}>Login ...</Text>
  </Layout>
);
const Login = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [isLoading, setIsLoading] = useState(false);
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

  const storeData = async (uid, email) => {
    try {
      await AsyncStorage.setItem('uid', uid);
      await AsyncStorage.setItem('email', email);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (!user) {
      storeData('', '');
    } else {
      storeData(user.uid, user.email);
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signIn = () => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        showMessage({
          message: 'Welcome ...',
          type: 'success',
        });
        setIsLoading(false);
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

  if (isLoading === true) return <PendingView />;

  if (initializing) return null;

  if (!user) {
    return (
      <Layout style={{flex: 1}}>
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
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={nextValue => setPassword(nextValue)}
              />
              <Gap height={50} />
              <Button onPress={signIn}>Login</Button>
              <Layout
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
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
      </Layout>
    );
  }

  if (user) {
    return <>{moveToMainApp()}</>;
  }
};

export default Login;
