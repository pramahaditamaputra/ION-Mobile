import React from 'react';
import {Button, Card, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

const Cards = props => {
  if (props.type === 'interviews') {
    return (
      <Card style={styles.cardContainer} onPress={props.move}>
        <Text category="s1">{props.jobName}</Text>
        <Text category="p2" appearance="hint">
          Due Date Interview : {props.jobApplyDueDate}
        </Text>
      </Card>
    );
  }

  if (props.type === 'interviewsDetail') {
    return (
      <Layout style={styles.interviewsDetailCardContainer}>
        <Layout
          style={{
            height: 100,
            backgroundColor: '#3366FF',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text category="h5" style={{color: 'white'}}>
            {props.jobName}
          </Text>
          <Text category="p1" style={{color: 'white'}}>
            Due Date Interview 31 December 2021
          </Text>
        </Layout>
        <Layout style={{padding: 10, flex: 1, justifyContent: 'space-around'}}>
          <Layout>
            <Text category="h6">Description</Text>
            <Text category="p1" style={{textAlign: 'justify'}}>
              Magna qui magna labore minim ut aliqua quis deserunt duis. Ullamco
              enim veniam pariatur sit occaecat laborum dolore excepteur id elit
              mollit sint cillum. Duis cupidatat ut nulla non minim nulla dolor
              irure enim. Cillum nisi id consectetur exercitation amet veniam
              consequat amet reprehenderit et. Labore sint exercitation
              incididunt esse commodo eiusmod tempor aliqua elit officia
              pariatur. Tempor aliquip proident eu in fugiat consequat voluptate
              eiusmod amet. Commodo voluptate qui culpa dolor ea eiusmod Lorem
              ex exercitation. Voluptate ex eiusmod occaecat amet est labore. Et
              laboris fugiat nisi est. Pariatur eiusmod proident sint est et in
              et sint enim esse id culpa. Cillum veniam ullamco elit ea
              exercitation eu officia ea consectetur commodo aute proident. Enim
              ut cupidatat minim consectetur pariatur duis ut ut ut nisi commodo
              esse ullamco reprehenderit. Cupidatat minim incididunt eu laboris.
              Est fugiat incididunt nisi cupidatat eu do Lorem officia eiusmod
              dolor elit. Velit dolore excepteur veniam minim cillum laboris
              adipisicing anim. Reprehenderit aliqua Lorem dolore anim id mollit
              officia qui consectetur nulla duis non irure Lorem. Sit quis duis
              adipisicing nulla velit ea velit.
            </Text>
          </Layout>
          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Button onPress={props.goInterview}>Interview</Button>
            <Button>Demo</Button>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  return (
    <Card style={styles.cardContainer} onPress={props.move}>
      <Text category="s1">{props.jobName}</Text>
      <Text category="p2" appearance="hint">
        Due Date Apply : {props.jobApplyDueDate}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
  },
  interviewsDetailCardContainer: {
    borderRadius: 10,
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderColor: '#EDF1F7',
  },
  contentContainer: {justifyContent: 'space-around'},
});

export default Cards;
