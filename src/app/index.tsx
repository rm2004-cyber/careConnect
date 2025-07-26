// src/app/index.tsx

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import DoctorCard from '../components/doctorcard';
import { DOCTOR_DATA } from '../constants/doctordata';
import { RootStackParamList } from '../constants/navigationtypes';

type DoctorListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DoctorListScreen'>;

const DoctorListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<DoctorListScreenNavigationProp>();

  // Filter the doctor data based on search query
  const filteredDoctors = DOCTOR_DATA.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>CareConnect</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or specialization..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={() => navigation.navigate('DoctorDetailScreen', { doctorId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: scale(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: verticalScale(30),
    color: '#007AFF', 
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: scale(25),
    marginHorizontal: moderateScale(16),
    marginBottom: verticalScale(15),
    fontSize: scale(16),
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default DoctorListScreen;