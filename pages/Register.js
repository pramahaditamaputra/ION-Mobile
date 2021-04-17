import React, {useState, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
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
  TopNavigationAction,
  Datepicker,
  Spinner,
} from '@ui-kitten/components';
import Logo from '../assets/images/register.svg';
import Gap from '../components/Gap';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

const CalendarIcon = props => <Icon {...props} name="calendar" />;

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
        source={require('./../assets/images/register.json')}
        autoPlay
        loop
      />
    </Layout>
    <Spinner size="giant" />
    <Gap height={20} />
    <Text style={{color: 'black'}}>Registering Data ...</Text>
  </Layout>
);

const Register = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = React.useState(new Date());
  const [cv, setCV] = React.useState('');

  const BackIcon = props => <Icon {...props} name="arrow-back" />;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const [fullname, setFullname] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const moveToLogin = () => {
    navigation.replace('Login');
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Files Permission',
          message:
            'App needs access to your files ' +
            'so you can run face detection.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('We can now read files');
      } else {
        console.log('File read permission denied');
      }
      return granted;
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermission();
  });

  const convertUri = async uri => {
    const split = uri.split('/');
    const name = split.pop();
    const inbox = split.pop();
    const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
    // const stat = await RNFetchBlob.fs.stat(realPath);
    // console.log(`ANJING ${realPath}`);
    // return realPath;
  };

  const getCV = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      const split = res.uri.split('/');
      const name = split.pop();
      const inbox = split.pop();
      const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
      const stat = await RNFetchBlob.fs.readFile(res.uri, 'base64');

      // const uri = convertUri(res.uri);
      // console.log(`bangsat ${stat}`);
      // console.log(`Path ${uri}`);

      // const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/name`;

      // //Set FileName
      // let reference = storage().ref(`/cv/hadi`);
      // //Upload File
      // let task = reference.putString(stat, 'base64');
      // task.on('state_changed', taskSnapshot => {
      //   // setIsLoading(true);
      //   // setProgress(
      //   //   (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
      //   // );
      //   console.log(
      //     `${
      //       (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      //     }% transferred out of ${taskSnapshot.totalBytes}`,
      //   );
      // });
      // task.then(async () => {
      //   const url = await storage().ref(`/cv/${res.name}`).getDownloadURL();
      //   console.log(url);
      // });

      setCV(stat);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const signUp = () => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        // console.log(res.user.uid);
        const uid = res.user.uid;
        const uri = cv;

        //Set FileName
        let reference = storage().ref(`/cv/${uid}`);
        //Upload File
        let task = reference.putString(uri, 'base64');
        task.on('state_changed', taskSnapshot => {
          // setIsLoading(true);
          // setProgress(
          //   (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
          // );
          console.log(
            `${
              (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            }% transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
        task.then(async () => {
          const url = await storage().ref(`/cv/${uid}`).getDownloadURL();
          console.log(url);

          const data = {
            uid: uid,
            fullname: fullname,
            dob: dob,
            email: email,
            cv: url,
          };
          firestore()
            .collection('candidates')
            .add(data)
            .then(
              setIsLoading(false),
              showMessage({
                message: 'Register Success, Welcome ...',
                type: 'success',
              }),
              moveToLogin(),
            );
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  if (isLoading === true) return <PendingView />;

  return (
    <Layout style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        {/* <TopNavigation alignment="left" accessoryLeft={BackAction} /> */}
        {/* <Divider /> */}
        <Layout style={{flex: 1, padding: 25, justifyContent: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Layout style={{marginVertical: 65}}>
              <Logo style={{maxWidth: '100%'}} height={175} />
            </Layout>
            <Input
              size="large"
              label="Fullname"
              placeholder="Input Fullname"
              value={fullname}
              onChangeText={nextValue => setFullname(nextValue)}
            />
            <Gap height={10} />
            <Datepicker
              label="DOB"
              placeholder="Pick Date"
              date={dob}
              onSelect={nextDate => setDob(nextDate)}
              accessoryRight={CalendarIcon}
            />
            <Gap height={10} />
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
            <Gap height={10} />
            <Layout
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button size="small" onPress={getCV}>
                Upload CV
              </Button>
              <Text>NamaFileCV.pdf</Text>
            </Layout>
            <Gap height={50} />
            <Button onPress={signUp}>Register</Button>
            <Layout
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Gap height={15} />
              <TouchableOpacity onPress={moveToLogin}>
                <Text appearance="hint">Already have an account? Sign In.</Text>
              </TouchableOpacity>
            </Layout>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default Register;
