import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Icon, Input} from '@ui-kitten/components';

const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;

const SearchInput = props => {
  const [value, setValue] = React.useState('');
  //   const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  //   const toggleSecureEntry = () => {
  //     setSecureTextEntry(!secureTextEntry);
  //   };

  const renderIcon = props => (
    // <TouchableWithoutFeedback onPress={toggleSecureEntry}>
    //   <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    // </TouchableWithoutFeedback>

    // <TouchableWithoutFeedback onPress={toggleSecureEntry}>
    <Icon {...props} name="search" />
    // </TouchableWithoutFeedback>
  );

  return (
    <Input
      value={value}
      //   label="Password"
      placeholder="Search Job Name .."
      //   caption="Should contain at least 8 symbols"
      accessoryRight={renderIcon}
      //   captionIcon={AlertIcon}
      //   secureTextEntry={secureTextEntry}
      onChangeText={nextValue => {
        setValue(nextValue);
        props.onFilter(nextValue);
      }}
    />
  );
};

export default SearchInput;
