import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const JobsIcon = props => <Icon {...props} name="briefcase-outline" />;
const InterviewsIcon = props => <Icon {...props} name="people-outline" />;
const ResultsIcon = props => <Icon {...props} name="bell-outline" />;
const ProfileIcon = props => <Icon {...props} name="person-outline" />;

const BottomTabBar = ({navigation, state}) => {
  return (
    <BottomNavigation
      // appearance="noIndicator"
      style={styles.bottomNavigation}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="Jobs" icon={JobsIcon} />
      <BottomNavigationTab title="Interviews" icon={InterviewsIcon} />
      <BottomNavigationTab title="Results" icon={ResultsIcon} />
      <BottomNavigationTab title="Profile" icon={ProfileIcon} />
    </BottomNavigation>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    paddingVertical: 15,
    // activeBackgroundColor: 'tomato',
  },
});

export default BottomTabBar;
