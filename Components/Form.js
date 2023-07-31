import React, {useState} from 'react';
import styles from '../Css/style.js';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const Form = props => {
  const emailRegex = /^[a-zA-Z0-9.a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  const passwordRegex = /^(?=.*[A-Z]{1})(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8}$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPassError] = useState('');
  const [display, setDisplay] = useState(false);
  const [finalEmail, setFinalEmail] = useState(false);
  const [finalPass, setFinalPass] = useState(false);

  const emailVal = text => {
    setEmail(text);
    // console.warn(text);
    if (!emailRegex.test(text)) {
      setEmailError('Invalid email format');
      setFinalEmail(false);
    } else {
      setEmailError('');
      setFinalEmail(true);
    }

    if (finalEmail && finalPass) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  const passVal = val => {
    setPassword(val);
    // console.warn(val.length)
    // console.warn(val);
    if (passwordRegex.test(val)) {
      setPassError('');
      setFinalPass(true);
      setDisplay(true);
    } else {
      setPassError('Password must contain atleast 1 uppercase, any one (@%^$#&) and numbers');
      setFinalPass(false);
      setDisplay(false);
    }
  };

  

  return (
    <View
      style={{
        backgroundColor: 'darkblue',
        flex: 1,
        padding: 30,
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../assets/bus.jpg')}
          style={styles.image}></Image>
      </View>
      {/* <Text>Your email is: {email} </Text> */}

      <TextInput
        placeholder="Enter email"
        placeholderTextColor={'black'}
        textAlign="center"
        value={email}
        style={styles.input}
        onChangeText={text => {
          emailVal(text);
        }}></TextInput>
      <Text style={{textAlign: 'center'}}>{emailError}</Text>

      {/* <Text>Your Password is: {password} </Text> */}

      <TextInput
        placeholder="Enter Password"
        placeholderTextColor={'black'}
        textAlign="center"
        value={password}
        secureTextEntry={true}
        style={styles.input}
        onChangeText={val => {
          passVal(val);
        }}></TextInput>
      <Text style={{textAlign: 'center'}}>{passwordError}</Text>

      {display ? (
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={styles.btnText}
              onPress={() => props.navigation.navigate('Home', {email})}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Form;
