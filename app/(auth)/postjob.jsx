import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert,
  ScrollView, TouchableOpacity, Keyboard, PermissionsAndroid, Platform
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Voice from '@react-native-voice/voice';
import { Ionicons } from '@expo/vector-icons'; // or react-native-vector-icons

// Validation schema
const schema = yup.object({
  companyName: yup.string().trim().required('Company Name is required'),
  jobTitle: yup.string().trim().required('Job Title is required'),
  experience: yup.string().trim().required('Experience is required'),
  skills: yup.string().trim().required('Skills are required'),
  location: yup.string().trim().required('Location is required'),
  workMode: yup.array().min(1, 'Select at least one Work Mode').required('Work Mode is required'),
  description: yup.string().trim().optional(),
});

export default function PostJob() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    clearErrors
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      workMode: [],
    },
  });

  const workModes = ["WFO", "Hybrid", "Remote"];
  const selectedWorkModes = watch('workMode');

  // ========== Voice Setup ==========
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = (e) => console.error('Speech error:', e);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestMicPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone to convert speech to text.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const onSpeechResults = (e) => {
    const text = e.value?.[0];
    if (text) {
      setValue('jobTitle', text);
    }
    setIsRecording(false);
  };

  const handleMicPress = async () => {
    const hasPermission = await requestMicPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Microphone access is required.');
      return;
    }

    try {
      if (!isRecording) {
        await Voice.start('en-US');
        setIsRecording(true);
      } else {
        await Voice.stop();
        setIsRecording(false);
      }
    } catch (err) {
      console.error('Voice start error:', err);
      setIsRecording(false);
    }
  };
  // ========== End Voice Setup ==========

  const toggleWorkMode = (mode) => {
    const currentModes = selectedWorkModes || [];
    let updatedModes;

    if (currentModes.includes(mode)) {
      updatedModes = currentModes.filter((m) => m !== mode);
    } else {
      updatedModes = [...currentModes, mode];
    }

    setValue('workMode', updatedModes, { shouldValidate: true });
    if (updatedModes.length > 0) clearErrors('workMode');
  };

  const postJob = async (data) => {
    try {
      await axios.post('http://localhost:3000/jobs', data);
      Alert.alert('Success', 'Job posted successfully 🎉');
      reset();
    } catch (error) {
      console.error('Post job failed:', error);
      Alert.alert('Error', 'Failed to post job. Try again later.');
    }
  };

  const onSubmit = (data) => {
    postJob(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Post a New Job</Text>

      {/* Company Name */}
      <Controller
        control={control}
        name="companyName"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField label="Company Name" value={value} onChange={onChange} onBlur={onBlur} error={errors.companyName} />
        )}
      />

      {/* Job Title with Mic */}
      <Controller
        control={control}
        name="jobTitle"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text>
              Job Title <Text style={styles.asterisk}>*</Text>
            </Text>
            <View style={styles.voiceRow}>
              <TextInput
                style={[styles.input, errors.jobTitle && styles.inputError, { flex: 1 }]}
                placeholder="Enter job title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <TouchableOpacity onPress={handleMicPress} style={styles.micButton}>
                <Ionicons name={isRecording ? "mic-off" : "mic"} size={24} color={isRecording ? 'red' : '#007AFF'} />
              </TouchableOpacity>
            </View>
            {errors.jobTitle && <Text style={styles.errorText}>{errors.jobTitle.message}</Text>}
          </View>
        )}
      />

      {/* Experience */}
      <Controller
        control={control}
        name="experience"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField label="Experience (e.g., 2-5 years)" value={value} onChange={onChange} onBlur={onBlur} error={errors.experience} />
        )}
      />

      {/* Skills */}
      <Controller
        control={control}
        name="skills"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField label="Skills (comma separated)" value={value} onChange={onChange} onBlur={onBlur} error={errors.skills} />
        )}
      />

      {/* Location */}
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, onBlur, value } }) => {
          const filteredCities = cities.filter(city => city.toLowerCase().includes(value?.toLowerCase() || ''));
          const handleCitySelect = (city) => {
            onChange(city);
            setSelectedCity(city);
            setShowDropdown(false);
          };
          return (
            <View style={styles.inputContainer}>
              <Text>Location <Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={[styles.input, errors.location && styles.inputError]}
                placeholder="Enter or select city"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  setShowDropdown(text.length >= 3);
                }}
                onBlur={onBlur}
              />
              {errors.location && <Text style={styles.errorText}>{errors.location.message}</Text>}
              {showDropdown && value && filteredCities.length > 0 && (
                <View style={styles.dropdown}>
                  {filteredCities.map((city) => (
                    <TouchableOpacity
                      key={city}
                      onPress={() => { Keyboard.dismiss(); handleCitySelect(city); }}
                      style={[styles.dropdownItem, selectedCity === city && styles.dropdownItemSelected]}
                    >
                      <Text>{city}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        }}
      />

      {/* Work Mode */}
      <View style={styles.inputContainer}>
        <Text>Work Mode <Text style={styles.asterisk}>*</Text></Text>
        {workModes.map((mode) => (
          <TouchableOpacity key={mode} style={styles.checkboxContainer} onPress={() => { Keyboard.dismiss(); toggleWorkMode(mode); }}>
            <CheckBox
              isChecked={selectedWorkModes.includes(mode)}
              onClick={() => toggleWorkMode(mode)}
              tintColors={{ true: '#007AFF', false: '#aaa' }}
              boxType="square"
              style={styles.checkbox}
              checkedCheckBoxColor="lightgreen"
              uncheckedCheckBoxColor="lightgray"
            />
            <Text style={styles.checkboxLabel}>{mode}</Text>
          </TouchableOpacity>
        ))}
        {errors.workMode && <Text style={styles.errorText}>{errors.workMode.message}</Text>}
      </View>

      {/* Description */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text>Description</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Job description (optional)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          </View>
        )}
      />

      {/* Submit */}
      <Button
        title={isSubmitting ? 'Submitting...' : 'Post Job'}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
    </ScrollView>
  );
}

// Reusable Input
const InputField = ({ label, value, onChange, onBlur, error }) => (
  <View style={styles.inputContainer}>
    <Text>{label} <Text style={styles.asterisk}>*</Text></Text>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={`Enter ${label.toLowerCase()}`}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
    />
    {error && <Text style={styles.errorText}>{error.message}</Text>}
  </View>
);

// City List
const cities = [
  "Bengaluru", "Hyderabad", "Pune", "Chennai", "Gurgaon", "Noida",
  "Mumbai", "Delhi", "Kolkata", "Ahmedabad", "Kochi", "Thiruvananthapuram",
  "Chandigarh", "Indore", "Jaipur", "Mysuru", "Visakhapatnam",
  "Coimbatore", "Lucknow", "Bhubaneswar"
];

// Styles
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#007AFF', textAlign: 'center' },
  inputContainer: { marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginTop: 5 },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', marginTop: 5, fontSize: 12 },
  asterisk: { color: 'red' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  checkboxLabel: { marginLeft: 8 },
  checkbox: { width: 20, height: 20 },
  dropdown: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#CCC', borderRadius: 8, marginTop: 5, maxHeight: 150 },
  dropdownItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  dropdownItemSelected: { backgroundColor: '#007AFF', color: '#fff' },
  micButton: { marginLeft: 10, justifyContent: 'center' },
  voiceRow: { flexDirection: 'row', alignItems: 'center' },
});
