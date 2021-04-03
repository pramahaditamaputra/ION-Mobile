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
  TopNavigationAction,
  Datepicker,
} from '@ui-kitten/components';
import Logo from '../assets/images/register.svg';
import Gap from '../components/Gap';
import DocumentPicker from 'react-native-document-picker';

const CalendarIcon = props => <Icon {...props} name="calendar" />;

const Register = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const [date, setDate] = React.useState(new Date());

  const BackIcon = props => <Icon {...props} name="arrow-back" />;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

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
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        moveToLogin();
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

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <TopNavigation alignment="left" accessoryLeft={BackAction} /> */}
      {/* <Divider /> */}
      <Layout style={{flex: 1, padding: 25, justifyContent: 'center'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Layout style={{marginVertical: 65}}>
            <Logo style={{maxWidth: '100%'}} height={175} />
          </Layout>
          <Input size="large" label="Fullname" placeholder="Input Fullname" />
          <Gap height={10} />
          <Datepicker
            label="DOB"
            placeholder="Pick Date"
            date={date}
            onSelect={nextDate => setDate(nextDate)}
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
  );
};

export default Register;
