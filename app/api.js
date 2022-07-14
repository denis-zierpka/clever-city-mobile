// den
import AsyncStorage from "@react-native-async-storage/async-storage";
// разделение import
// nik


// --------------------------------------

export const setCredentials = async (login, password) => {
  try {
    await removeCredentials();
    await AsyncStorage.setItem("login", login);
    await AsyncStorage.setItem("password", password);
  } catch (err) {
    console.log(err);
  }
};

export const getCredentials = async () => {
  try {
    const login = await AsyncStorage.getItem("login");
    const password = await AsyncStorage.getItem("password");
    if (login !== null && password !== null) {
      return {
        login: login,
        password: password,
      }
    }
    return null;
  } catch (err) {
    console.log(err);
  }
};

export const removeCredentials = async () => {
  try {
    await AsyncStorage.removeItem("login");
    await AsyncStorage.removeItem("password");
  } catch (err) {
    console.log(err);
  }
};



// den
// разделение function
// nik