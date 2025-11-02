import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RegisteredEventsScreen from '../screens/RegisteredEventsScreen';
import AboutScreen from '../screens/AboutScreen';
import LiveSessionsScreen from '../screens/LiveSessionsScreen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide header for all tab screens!
        tabBarActiveTintColor: '#5c258d',
        tabBarInactiveTintColor: '#bbb',
        tabBarStyle: { paddingBottom: 4, height: 60 }, // optional: nicer style
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Live Sessions"
        component={LiveSessionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="live-tv" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Registered Events"
        component={RegisteredEventsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="pricetag" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
