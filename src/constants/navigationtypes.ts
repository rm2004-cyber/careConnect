// src/constants/navigationtypes.ts

import { StackNavigationProp } from '@react-navigation/stack';

export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
};

export type Appointment = {
  doctor: Doctor;
  timeSlot: string;
  id: string;
  date: string;
};

export type RootStackParamList = {
  DoctorListScreen: undefined;
  DoctorDetailScreen: { doctorId: string };
  BookingConfirmationScreen: { appointment: Appointment };
};

export type DoctorListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DoctorListScreen'>;
export type DoctorDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DoctorDetailScreen'>;
export type BookingConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookingConfirmationScreen'>;