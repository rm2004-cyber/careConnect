// src/app/bookingconfirmationscreen.tsx

import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../constants/navigationtypes';

type BookingConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'BookingConfirmationScreen'>;

const BookingConfirmationScreen = () => {
  const route = useRoute<BookingConfirmationScreenRouteProp>();
  const { appointment } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: appointment.doctor.image }} style={styles.doctorImage} />
        <Text style={styles.title}>Appointment Confirmed!</Text>
        <Text style={styles.message}>
          Your appointment with {appointment.doctor.name} has been successfully booked.
        </Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Doctor:</Text>
          <Text style={styles.value}>{appointment.doctor.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Specialization:</Text>
          <Text style={styles.value}>{appointment.doctor.specialization}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Time Slot:</Text>
          <Text style={styles.value}>{appointment.timeSlot}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{appointment.date}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745', // Green color for success
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
});

export default BookingConfirmationScreen;