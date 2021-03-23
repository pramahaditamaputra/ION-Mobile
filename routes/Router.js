import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from '../components/BottomTabBar';
import Jobs from '../pages/Jobs';
import Interviews from '../pages/Interviews';
import Results from '../pages/Results';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import {ExamplePageTopNavigation} from '../pages/ExamplePageTopNavigation';
import {ExamplePageBackTopNavigation} from '../pages/ExamplePageBackTopNavigation';
import JobsDetail from '../pages/JobsDetail';
import Register from '../pages/Register';
import Splash from '../pages/Splash';
import InterviewsDetail from '../pages/InterviewsDetail';
import ResultsDetail from '../pages/ResultsDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      headerMode="none"
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Jobs" component={Jobs} />
      <Tab.Screen name="Interviews" component={Interviews} />
      <Tab.Screen name="Results" component={Results} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Jobs">
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JobsDetail"
        component={JobsDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InterviewsDetail"
        component={InterviewsDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResultsDetail"
        component={ResultsDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
