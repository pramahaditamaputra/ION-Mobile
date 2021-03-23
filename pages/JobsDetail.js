import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const JobsDetail = ({route, navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const {id, job} = route.params;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Job Details"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category="h1">{job}</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default JobsDetail;
