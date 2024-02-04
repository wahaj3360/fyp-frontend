import React, { useState } from "react";
import { View, StyleSheet, TextInput, Image, Pressable, Alert, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Chatbot = () => {
  const [inputText, setInputText] = useState("");

  const handleButtonClick = () => {
    if (inputText.trim() !== "") {
      // You can perform an action when the button is clicked and the input is not empty.
      console.log("Button clicked with input: " + inputText);
    } else {
      Alert.alert("Input Field Empty", "Please enter a message.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Image
          style={styles.image}
          source={require("../assets/bot.png")}
        />
        <TextInput
          placeholder="HOW MAY I HELP YOU?"
          style={styles.input}
          onChangeText={(text) => setInputText(text)}
        />
        <Pressable style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Enter</Text>
        </Pressable>
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
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: wp('70%'),
    height: hp('25%'),
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "silver",
    borderWidth: 1,
    borderRadius: wp('8%'),
    padding: wp('4%'),
    width: wp('80%'),
    height: hp('6%'),
    marginVertical: hp('2%'),
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: wp('1%'), height: hp('2%') },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: wp('1.5%'),
  },
  button: {
    backgroundColor: "#008080",
    borderRadius: wp('8%'),
    padding: wp('4%'),
    marginVertical: hp('2%'),
    width: wp('80%'),
    justifyContent: "center",
    shadowOffset: { width: wp('1%'), height: hp('2%') },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: wp('1.5%'),
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default Chatbot;
