import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const UserProfile = () => {
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    reports: "5",
    age: "30",
    gender: "Male",
    address: "123 Main St, City"
  };

  const handlePress = (detail) => {
    // Handle the click event for each detail here
    console.log(`Clicked on: ${detail}`);
  };

  const renderPressableItem = (label, value) => (
    <Pressable onPress={() => handlePress(value)}>
      <Text style={styles.listItem}>{label}: {value}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/user.png")}
      />

      <View style={styles.listContainer}>
        {renderPressableItem("Name", userData.name)}
        {renderPressableItem("Email", userData.email)}
        {renderPressableItem("Reports", userData.reports)}
        {renderPressableItem("Age", userData.age)}
        {renderPressableItem("Gender", userData.gender)}
        {renderPressableItem("Address", userData.address)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  image: {
    width: wp('70%'),
    height: hp('20%'),
    marginVertical: hp('2%'),
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    width: wp('95%'),
    paddingLeft: wp('5%'),
  },
  listItem: {
    fontSize: wp('4%'),
    marginVertical: hp('1%'),
  },
});

export default UserProfile;
//it give me error that found screens have same name nested inside one another