import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/AALCAA.gif')}
        style={{ width: '80%', resizeMode: 'contain', margin: '5%' }}
      />
      <ActivityIndicator
        animating={animating}
        color="#008080"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#008080',
  },
  activityIndicator: {
    marginTop: height * 0.03,
  },
});
