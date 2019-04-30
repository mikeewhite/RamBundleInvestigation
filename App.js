/**
 * Example app to test RAM bundle line mappings
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import BadCode from './badCode.js';

function triggerException1() {
  bogusFunction();
}

function triggerException2() {
  // Add some lines that shouldn't be minified before and after the crashing call
  // to see if they affect the symbolication
  console.log('Line 1');
  console.log('Line 2');
  bogusFunction();
  console.log('Line 3');
  console.log('Line 4');
}

function triggerException3() {
  // Calls out to crashing code in another file
  BadCode.crash();
}

function triggerHandledException() {
  bogusHandledFunction();
}

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button title="Unhandled Error 1" onPress={triggerException1} />
        <Button title="Unhandled Error 2" onPress={triggerException2} />
        <Button title="Unhandled Error 3" onPress={triggerException3} />
        <Button
          title="Handled Error 1"
          onPress={() => {
            try { // execute crashy code
              triggerHandledException();
            } catch (error) {
              console.error(error);
            }
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
