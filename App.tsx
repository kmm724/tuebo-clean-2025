import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeStackNavigator from './src/navigation/HomeStackNavigator';
import FunFactsScreen from './src/screens/FunFactsScreen';
import ParentAuthScreen from './src/screens/ParentAuthScreen';
import ParentToolsScreen from './src/screens/ParentToolsScreen';
import VideoSearchScreen from './src/screens/VideoSearchScreen';

const Tab = createBottomTabNavigator();
const ParentStack = createNativeStackNavigator();

const ParentStackNavigator = () => (
  <ParentStack.Navigator>
    <ParentStack.Screen
      name="ParentAuth"
      component={ParentAuthScreen}
      options={{ title: 'Enter PIN', headerShown: false }}
    />
    <ParentStack.Screen
      name="ParentTools"
      component={ParentToolsScreen}
      options={{ title: 'Parent Tools' }}
    />
  </ParentStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = 'home';
            if (route.name === 'Fun Facts') iconName = 'bulb';
            else if (route.name === 'Parent Tools') iconName = 'settings';
            else if (route.name === 'Videos') iconName = 'play-circle';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1d3557',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Fun Facts" component={FunFactsScreen} />
        <Tab.Screen name="Videos" component={VideoSearchScreen} />
        <Tab.Screen name="Parent Tools" component={ParentStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
