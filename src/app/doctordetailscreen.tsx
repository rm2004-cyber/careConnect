// src/app/doctordetailscreen.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { DOCTOR_DATA } from '../constants/doctordata';
import { Appointment, RootStackParamList } from '../constants/navigationtypes';

type DoctorDetailScreenRouteProp = RouteProp<RootStackParamList, 'DoctorDetailScreen'>;
type DoctorDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DoctorDetailScreen'>;

const timeSlots = ['10:00 AM', '11:00 PM', '3:00 PM', '5:00 PM'];

const DoctorDetailScreen = () => {
  const route = useRoute<DoctorDetailScreenRouteProp>();
  const navigation = useNavigation<DoctorDetailScreenNavigationProp>();
  const { doctorId } = route.params;
  const doctor = DOCTOR_DATA.find(doc => doc.id === doctorId);

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const existingAppointmentsString = await AsyncStorage.getItem('appointments');
        const existingAppointments: Appointment[] = existingAppointmentsString ? JSON.parse(existingAppointmentsString) : [];
        
        // Find booked slots for this specific doctor
        const doctorBookedSlots = existingAppointments
          .filter(app => app.doctor.id === doctorId)
          .map(app => app.timeSlot);
        
        setBookedSlots(doctorBookedSlots);

        // Filter out booked slots from the main list
        const remainingSlots = timeSlots.filter(slot => !doctorBookedSlots.includes(slot));
        setAvailableSlots(remainingSlots);

      } catch (e) {
        console.error('Failed to fetch appointments:', e);
      }
    };

    fetchBookedSlots();
    // Re-fetch on screen focus to update list if a new booking is made and user comes back
    const unsubscribe = navigation.addListener('focus', fetchBookedSlots);

    return unsubscribe;
  }, [navigation, doctorId]);

  if (!doctor) {
    return <Text style={styles.errorText}>Doctor not found!</Text>;
  }

  const handleBookAppointment = async () => {
    if (!selectedSlot) {
      Alert.alert('Error', 'Please select a time slot.');
      return;
    }

    try {
      const newAppointment: Appointment = {
        id: `booking_${Date.now()}`,
        doctor: doctor,
        timeSlot: selectedSlot,
        date: new Date().toLocaleDateString(),
      };

      // Get existing appointments from AsyncStorage
      const existingAppointmentsString = await AsyncStorage.getItem('appointments');
      const existingAppointments: Appointment[] = existingAppointmentsString ? JSON.parse(existingAppointmentsString) : [];

      // Check if the slot is already booked (a final check)
      const isSlotAlreadyBooked = existingAppointments.some(app => app.doctor.id === doctorId && app.timeSlot === selectedSlot);
      if (isSlotAlreadyBooked) {
          Alert.alert('Error', 'This time slot is already booked. Please select another one.');
          return;
      }

      // Add the new appointment
      const updatedAppointments = [...existingAppointments, newAppointment];
      await AsyncStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      Alert.alert(
        'Success!',
        'Your appointment has been booked.',
        [{ text: 'OK', onPress: () => {
          navigation.navigate('BookingConfirmationScreen', { appointment: newAppointment });
        }}]
      );
    } catch (e) {
      console.error('Failed to save appointment:', e);
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialization}>{doctor.specialization}</Text>
        <Text style={styles.doctorLocation}>{doctor.location}</Text>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <Text style={styles.sectionText}>{doctor.experience}</Text>

        <Text style={styles.sectionTitle}>Rating & Reviews</Text>
        <Text style={styles.sectionText}>⭐ {doctor.rating} ({doctor.reviews} reviews)</Text>
      </View>

      <View style={styles.slotsCard}>
        <Text style={styles.sectionTitle}>Available Time Slots</Text>
        <View style={styles.slotsContainer}>
          {availableSlots.length > 0 ? (
            availableSlots.map(slot => (
              <TouchableOpacity
                key={slot}
                style={[styles.slotButton, selectedSlot === slot && styles.selectedSlot]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text style={[styles.slotText, selectedSlot === slot && styles.selectedSlotText]}>{slot}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noSlotsText}>No slots available for today.</Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Booked Time Slots</Text>
        <View style={styles.slotsContainer}>
            {bookedSlots.length > 0 ? (
                bookedSlots.map(slot => (
                    <View key={slot} style={styles.bookedSlotButton}>
                        <Text style={styles.bookedSlotText}>{slot}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noSlotsText}>No slots have been booked yet.</Text>
            )}
        </View>

        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBookAppointment}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: verticalScale(20),
    backgroundColor: '#fff',
    marginBottom: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: scale(60),
    marginBottom: verticalScale(15),
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  doctorName: {
    fontSize: scale(26),
    fontWeight: 'bold',
    color: '#333',
  },
  doctorSpecialization: {
    fontSize: scale(18),
    color: '#666',
    marginTop: verticalScale(5),
  },
  doctorLocation: {
    fontSize: scale(14),
    color: '#999',
    marginTop: verticalScale(3),
  },
  detailCard: {
    backgroundColor: '#fff',
    marginHorizontal: scale(16),
    padding: scale(20),
    borderRadius: scale(10),
    marginBottom: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  slotsCard: {
    backgroundColor: '#fff',
    marginHorizontal: scale(16),
    padding: scale(20),
    borderRadius: scale(10),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(10),
  },
  sectionText: {
    fontSize: scale(16),
    color: '#555',
    marginBottom: verticalScale(15),
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: verticalScale(20),
    justifyContent: 'center',
  },
  slotButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(20),
    margin: scale(5),
    backgroundColor: '#f9f9f9',
  },
  selectedSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  slotText: {
    color: '#333',
  },
  selectedSlotText: {
    color: '#fff',
  },
  bookedSlotButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    borderWidth: scale(1),
    borderColor: '#ccc',
    borderRadius: scale(20),
    margin: scale(5),
    backgroundColor: '#f1f1f1',
  },
  bookedSlotText: {
    color: '#888',
    textDecorationLine: 'line-through',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingVertical: verticalScale(15),
    borderRadius: scale(25),
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  noSlotsText: {
    fontSize: scale(14),
    color: '#888',
    textAlign: 'center',
    width: '100%',
  },
  errorText: {
    textAlign: 'center',
    marginTop: verticalScale(50),
    fontSize: scale(18),
    color: 'red',
  },
});

export default DoctorDetailScreen;