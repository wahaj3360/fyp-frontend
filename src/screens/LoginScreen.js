import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import Loader from '../components/Loader';

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);

    if (userEmail === 'a' && userPassword === '123') {
      setLoading(false);
      navigation.replace('DrawerNavigationRoutes');
    } else {
      setLoading(false);
      alert('Incorrect username or password');
    }
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/logo.png')}
                style={{
                  width: '80%',
                  height: 120,
                  resizeMode: 'contain',
                  margin: 50,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
             
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="✉️Enter Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType=" email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
                          <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="🔒Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext !== '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#008080',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#C70039',
    height: 50,
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'grey',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1.5,
    borderRadius: 15,
    height: 50,
    borderColor: 'silver',
  },
  registerTextStyle: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  iconStyle: {
    padding: 10,
    margin: 5,
    fontSize: 20,
  },
});
