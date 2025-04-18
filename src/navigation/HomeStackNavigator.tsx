import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
    <HomeStack.Screen name="SearchResults" component={SearchResultsScreen} options={{ title: 'Results' }} />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
