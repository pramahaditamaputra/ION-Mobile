import {Button, Layout, Spinner, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Tts from 'react-native-tts';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {set} from 'react-native-reanimated';
import Gap from '../components/Gap';

const PendingView = props => (
  <Layout
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Spinner size="giant" />
    <Gap height={10} />
    <Text>{props.progress}%</Text>
  </Layout>
);

const RecordInterview = ({navigation}) => {
  const navigateBack = () => {
    Tts.stop();
    navigation.goBack();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bankQuestion, setBankQuestion] = useState([]);
  const [isInterviewStart, setIsInterviewStart] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [uid, setUid] = useState('');
  // const [reference, setReference] = useState('');

  const nextQuestion = async () => {
    if (isInterviewStart === false) {
      setIsInterviewStart(true);
    }

    const speak = await Tts.speak(bankQuestion[questionCounter].question);
    setQuestionCounter(questionCounter + 1);
    console.log(questionCounter);
  };

  const startRecording = async camera => {
    // default to mp4 for android as codec is not set
    console.log('Start Recording');
    setIsReady(true);
    Tts.speak('Please press the start button to start the interview.');
    // Tts.speak(bankQuestion[questionCounter].question);
    // setQuestionCounter(questionCounter + 1);
    const {uri, codec = 'mp4'} = await camera.recordAsync({
      quality: RNCamera.Constants.VideoQuality['4:3'],
      videoBitrate: 0.3 * 1000 * 1000,
      orientation: 'portrait',
      mirrorVideo: true,
    });
    const type = `video/${codec}`;
    const data = new FormData();
    data.append('video', {
      name: 'mobile-video-upload',
      type,
      uri,
    });
    //Set FileName
    let reference = storage().ref(`/videos/${uid}`);
    //Upload File
    let task = reference.putFile(uri);
    task.on('state_changed', taskSnapshot => {
      setIsLoading(true);
      setProgress(
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
      );
      // console.log(
      //   `${
      //     (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      //   }% transferred out of ${taskSnapshot.totalBytes}`,
      // );
    });
    task.then(() => {
      setIsLoading(false);
      console.log('Video uploaded to the bucket!');
      navigation.replace('MainApp');
    });
  };

  const stopRecording = camera => {
    console.log('Stop Recording');
    camera.stopRecording();
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        setUid(value);
        // value previously stored
        // console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const getQuestions = async () => {
    try {
      const list = [];
      var snapshot = await firestore()
        .collection('questions')
        .orderBy('id', 'asc')
        .get();
      console.log('Here');
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      setBankQuestion(list);
    } catch (e) {
      console.log('There is no question');
    }
  };

  useEffect(() => {
    getData();
    getQuestions();
    setIsInterviewStart(false);
    setIsReady(false);
    setQuestionCounter(0);
    Tts.speak(
      'Hello, my name is sam. i will be your interviewer for today. are you ready?',
    );
  }, []);

  return (
    <RNCamera
      style={styles.container}
      type={RNCamera.Constants.Type.front}
      flashMode={RNCamera.Constants.FlashMode.on}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}>
      {({camera, status, recordAudioPermissionStatus}) => {
        if (isLoading === true) return <PendingView progress={progress} />;
        return (
          <Layout
            style={{
              padding: 10,
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'space-between',
            }}>
            <Layout style={{padding: 10, borderRadius: 10}}>
              {isInterviewStart === false ? (
                <>
                  {isReady === false ? (
                    <Text category="h4">
                      Hello, my name is sam. i will be your interviewer for
                      today. are you ready?
                    </Text>
                  ) : (
                    <Text category="h4">
                      Please press the start button to start the interview.
                    </Text>
                  )}
                </>
              ) : (
                <Text category="h4">
                  {questionCounter > 0 &&
                    bankQuestion[questionCounter - 1].question}
                </Text>
              )}
            </Layout>

            <Layout
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                justifyContent: 'space-between',
              }}>
              {isReady === false ? (
                <>
                  <Button onPress={() => startRecording(camera)}>
                    <Text style={{color: 'white'}}> Ready </Text>
                  </Button>
                  <Button onPress={navigateBack}>
                    <Text style={{color: 'white'}}> Not Ready </Text>
                  </Button>
                </>
              ) : (
                <>
                  {isInterviewStart === false ? (
                    <Button onPress={nextQuestion}>
                      <Text style={{color: 'white'}}>Start Interview</Text>
                    </Button>
                  ) : (
                    <>
                      {questionCounter > bankQuestion.length - 1 ? (
                        <Button onPress={() => stopRecording(camera)}>
                          <Text style={{color: 'white'}}> End Interview </Text>
                        </Button>
                      ) : (
                        <>
                          <Button onPress={nextQuestion}>
                            <Text style={{color: 'white'}}>Next Question</Text>
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </Layout>
          </Layout>
        );
      }}
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RecordInterview;
