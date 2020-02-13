import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';

import api from './services/api';

export default class App extends Component {
  state = {
    errorMessage: null,
  };

  //Conecta com api
  signIn = async () => {
    try {
      const response = await api.post('/auth/authenticate', {
        email: 'ederpbj@gmail.com',
        password: '123456',
      });

      console.log(response);

      //recebe user e token da api
      const {user, token} = response.data;

      //usar memoria interna, gravar vários, objetos recebidos da api
      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:user', JSON.stringify(user)],
      ]);

      Alert.alert('Login efetuado com sucesso!');
    } catch (response) {
      this.setState({errorMessage: response.data.error});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
        <Text> textInComponent </Text>
        <Button onPress={this.signIn} title="Entrar" />
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
});
