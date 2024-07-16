import React, { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Text, Alert } from "react-native";
import { useFonts } from "expo-font";
import RalewayBold from "../../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";
import axios from "axios";
import ip from "../../../Infrastructure/ip";

export const PhLoginForm = ({ navigation, setIsLoggedIn, setIsPharmacy, setAccountUsername }) => {
  const [pharmacyData, setPharmacyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip.address}/pharmacy`);
        setPharmacyData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const [fontsLoaded] = useFonts({
    RalewayBold: RalewayBold,
    RalewayRegular: RalewayRegular,
    RalewaySemiBold: RalewaySemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    if (username && password) {
      const user = pharmacyData.find((pharmacy) => pharmacy.name === username);

      if (user) {
        if (user.password === password) {
          setAccountUsername(username);
          setIsLoggedIn(true);
          setIsPharmacy(true);
        } else {
          Alert.alert("Invalid Password", "Please enter correct password.");
        }
      } else {
        Alert.alert("User not found", "Please enter correct username.");
      }
    } else {
      Alert.alert("Incomplete fields", "Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        outlineColor={"grey"}
        value={username}
        style={styles.input}
        theme={{ roundness: 10 }}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor={"grey"}
      />
      <TextInput
        theme={{ roundness: 10 }}
        outlineColor={"grey"}
        mode="outlined"
        placeholder="Password"
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? "eye" : "eye-off"}
            onPress={toggleSecureEntry}
          />
        }
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor={"grey"}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        theme={{ roundness: 2 }}
      >
        <Text style={styles.text}>Login</Text>
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('PhSignup')}
        style={styles.button}
        theme={{ roundness: 2 }}
      >
        <Text style={styles.text}>SignUp</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    margin: 12,
    fontFamily: "RalewayRegular",
  },
  button: {
    marginTop: 20,
    padding: 10,
    width: "50%",
  },
  text: {
    fontFamily: "RalewaySemiBold",
    fontSize: 18,
    textAlign: "center",
  },
});
