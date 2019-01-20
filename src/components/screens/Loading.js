import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { f } from '../../config/firebase_config';
export default class Loading extends React.Component {
  componentDidMount() {
    f.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'SignUp');
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
