import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const About = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/About.png")}
      />
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to AALCAA</Text>
        <Text style={styles.description}>
          Android-based lung cancer prediction and detection application using machine learning algorithms. 
          The application's primary goal is to improve the accuracy and speed of lung cancer diagnosis by analyzing CT scan images and identifying the risk of lung cancer. The system would operate on mobile devices and provide users with real-time results, personalized user profiles, medicine reminders, symptom tracking, scheduling, and even a chatbot for assistance.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: wp('50%'),
    height: hp('25%'),
    margin: wp('5%'),
    marginVertical: hp('1%'),
    justifyContent: 'center',
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: wp('4%'),
    padding: wp('5%'),
    margin: wp('5%'),
    maxWidth: wp('80%'),
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: wp('4%'),
    elevation: 5,
    height: wp('100%'),
  },
  title: {
    fontWeight: "bold",
    color: "#008080",
    fontSize: wp('5%'),
    marginVertical: hp('2%'),
    textAlign: "center",
  },
  description: {
    textAlign: "justify",
    fontSize: wp('4%'),
    marginVertical: hp('2%'),
    color: "#333",
  },
});

export default About;
