import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  BackHandler,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import Routes from './src/routes';

class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Routes />
      </SafeAreaView>
    );
  }
}

export default App;
