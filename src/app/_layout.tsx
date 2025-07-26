import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from '../constants/navigationtypes';
import BookingConfirmationScreen from './bookingconfirmationscreen';
import DoctorDetailScreen from './doctordetailscreen';
import DoctorListScreen from './index';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppLayout() {
  return (
    <Stack.Navigator initialRouteName="DoctorListScreen">
      <Stack.Screen
        name="DoctorListScreen"
        component={DoctorListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorDetailScreen"
        component={DoctorDetailScreen}
        options={{ title: 'Doctor Details' }}
      />
      <Stack.Screen
        name="BookingConfirmationScreen"
        component={BookingConfirmationScreen}
        options={{ title: 'Booking Confirmed' }}
      />
    </Stack.Navigator>
  );
}