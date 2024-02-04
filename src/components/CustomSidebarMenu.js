import React from 'react';
import { View, Text, Alert, StyleSheet, Pressable, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <Pressable
        onPress={() => props.navigation.navigate('UserProfile')}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'red' : 'transparent', // Change background color on press
          },
          stylesSidebar.pressableStyle,
        ]}
      >
        <View style={stylesSidebar.profileHeader}>
          <View style={stylesSidebar.profileHeaderPicCircle}>
            <Image
              source={require('../assets/user.png')}
              style={stylesSidebar.profileImage}
            />
          </View>
          <Text style={stylesSidebar.profileHeaderText}>AALCAA</Text>
        </View>
      </Pressable>

      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <DrawerItem
          label={({ color }) => (
            <Text style={{ color: 'white' }}>Logout</Text>
          )}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    // AsyncStorage.clear();
                    props.navigation.replace('Login');
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
    backgroundColor: '#008080',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#008080',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60 / 2,
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
  pressableStyle: {
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default CustomSidebarMenu;
