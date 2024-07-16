import React, { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import RalewayBold from "../../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";
import axios from "axios";
import ip from "../../../Infrastructure/ip";

export const LoginForm = ({ navigation, setIsLoggedIn, setAccountUsername }) => {
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
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip.address}/customers`);
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    if (username && password) {
      const user = customerData.find((customer) => customer.name === username);
  
      if (user) {
        if (user.password === password) {
          setIsLoggedIn(true);
          setAccountUsername(username);
          navigation.setParams({ setIsLoggedIn, setAccountUsername });
        } else {
          alert("Invalid Password", "Please enter correct password.");
        }
      } else {
        alert("User not found", "Please enter correct username.");
      }
    } else {
      alert("Incomplete fields", "Please fill in all fields.");
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
        onPress={() => navigation.navigate('Signup')}
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
