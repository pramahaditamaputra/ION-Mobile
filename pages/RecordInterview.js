import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Tts from 'react-native-tts';

const PendingView = () => (
  <Layout
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </Layout>
);

const RecordInterview = ({navigation}) => {
  const navigateBack = () => {
    Tts.stop();
    navigation.goBack();
  };
  const [bankQuestion, setBankQuestion] = useState([
    {question: 'What is your name?'},
    {question: 'What is your father name?'},
    {question: 'What is your mother name?'},
    {
      question:
        'Your interview has been finished. Please press the End Interview button to end the interview',
    },
  ]);
  const [isInterviewStart, setIsInterviewStart] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [questionCounter, setQuestionCounter] = useState(0);

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
    const {uri, codec = 'mp4'} = await camera.recordAsync();
    const type = `video/${codec}`;
    const data = new FormData();
    data.append('video', {
      name: 'mobile-video-upload',
      type,
      uri,
    });

    console.log(data);

    try {
      // await fetch(ENDPOINT, {
      //   method: 'post',
      //   body: data,
      // });
      // console.log(data);
      navigation.navigate('RecordInterviewResult', {uri: uri});
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = camera => {
    console.log('Stop Recording');
    camera.stopRecording();
  };

  useEffect(() => {
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
        if (status !== 'READY') return <PendingView />;
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
