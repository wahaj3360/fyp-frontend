import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';
import About from './About';
import Chatbot from './Chatbot';
import Doctors_schedulling from './Doctors_schedulling';
import Upload_image from './Upload_image';
import UserProfile from './UserProfile';
import Symptoms_Tracking from './Symptoms_Tracking';
import CustomSidebarMenu from '../components/CustomSidebarMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#008080',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AboutStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="About">
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: 'About',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#008080',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const UserProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: 'UserProfile',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#008080',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ChatbotStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Chatbot">
      <Stack.Screen
        name="Chatbot"
        component={Chatbot}
        options={{
          title: 'Chatbot',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#008080',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const DoctorsSchedulingStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Doctors_schedulling">
      <Stack.Screen
        name="Doctors_schedulling"
        component={Doctors_schedulling}
        options={{
          title: 'Doctors Scheduling',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#008080',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const UploadImageStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Upload_image">
      <Stack.Screen
        name="Upload_image"
        component={Upload_image}
        options={{
          title: 'Upload Image',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#008080',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SymptomsTrackingStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Symptoms_Tracking">
      <Stack.Screen
        name="Symptoms_Tracking"
        component={Symptoms_Tracking}
        options={{
          title: 'Symptoms Tracking',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#008080',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        activeTintColor: '#008080',
        color: 'white',
        itemStyle: { marginVertical: 5, color: 'white' },
        labelStyle: {
          color: '#008080',
        },
        headerShown: false,
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="homeScreenStack"
        options={{ drawerLabel: 'Home' }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="UserProfile"
        options={{ drawerLabel: 'Profile' }}
        component={UserProfileStack}
      />
      <Drawer.Screen
        name="AboutStack"
        options={{ drawerLabel: 'About' }}
        component={AboutStack}
      />
      <Drawer.Screen
        name="ChatbotStack"
        options={{ drawerLabel: 'Chatbot' }}
        component={ChatbotStack}
      />
      <Drawer.Screen
        name="DoctorsSchedulingStack"
        options={{ drawerLabel: 'Doctors Scheduling' }}
        component={DoctorsSchedulingStack}
      />
      <Drawer.Screen
        name="UploadImageStack"
        options={{ drawerLabel: 'Upload Image' }}
        component={UploadImageStack}
      />
      <Drawer.Screen
        name="SymptomsTrackingStack"
        options={{ drawerLabel: 'Symptoms Tracking' }}
        component={SymptomsTrackingStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
