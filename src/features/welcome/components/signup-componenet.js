import * as React from "react";
import { TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
import RalewayBold from "../../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";
import ip from "../../../Infrastructure/ip";


export const Signupform = ({ navigation, setIsLoggedIn, setAccountUsername }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const [fontsLoaded] = useFonts({
    RalewayBold: RalewayBold,
    RalewayRegular: RalewayRegular,
    RalewaySemiBold: RalewaySemiBold,
  });
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(number);
  };

  const validateUsername = (name) => {
    return name.length >= 3;
  };

  const validatePassword = (pass) => {
    return pass.length >= 6;
  };
  const handleSignUp = async () => {
    if (
      validatePhoneNumber(phoneNumber) &&
      validateUsername(username) &&
      validatePassword(password)
    ) {

      const formData = {
        username: username,
        password: password,
        phoneNumber: phoneNumber,
      };

      try {
        const response = await fetch(
          `${ip.address}/customer_signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setIsLoggedIn(true);
          setAccountUsername(formData.username);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
      }
    } else {
      alert("Please check your input.");
    }
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        outlineColor={"grey"}
        value={phoneNumber}
        style={styles.input}
        theme={{ roundness: 10 }}
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        placeholder="Phone Number"
        placeholderTextColor={"grey"}
        inputMode="numeric"
        maxLength={8}
      />
      <TextInput
        mode="outlined"
        outlineColor={"grey"}
        value={username}
        style={styles.input}
        theme={{ roundness: 10 }}
        onChangeText={(username) => setUsername(username)}
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
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
        placeholderTextColor={"grey"}
      />

      <Button
        mode="contained"
        style={styles.button}
        theme={{ roundness: 2 }}
        onPress={handleSignUp}
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
