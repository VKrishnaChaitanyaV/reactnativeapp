import AsyncStorage from '@react-native-async-storage/async-storage';

// After successful OTP verification
const storeUserMobileNumber = async (mobileNumber) => {
    try {
        debugger;
      await AsyncStorage.setItem('userMobileNumber', mobileNumber);
      console.log('Mobile number saved!');
    } catch (error) {
      console.error('Error saving mobile number:', error);
    }
  };
  
  // To get it back later
  const getUserMobileNumber = async () => {
    try {
        debugger;
      const mobileNumber = await AsyncStorage.getItem('userMobileNumber');
      if (mobileNumber !== null) {
        console.log('Retrieved mobile number:', mobileNumber);
        return mobileNumber;
      }
    } catch (error) {
      console.error('Error retrieving mobile number:', error);
    }
  };

  export default DataStore = { setMobileNumber: (num) => storeUserMobileNumber(num), getMobileNumber: () => getUserMobileNumber()   };