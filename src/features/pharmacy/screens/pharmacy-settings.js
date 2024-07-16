import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Avatar } from "react-native-paper";
import { useFonts } from "expo-font";
import RalewayBold from "../../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";

export const PharmacySettings = ({ accountUsername, setIsLoggedIn, navigation, setIsPharmacy }) => {
  const [fontsLoaded] = useFonts({
    RalewayBold: RalewayBold,
    RalewayRegular: RalewayRegular,
    RalewaySemiBold: RalewaySemiBold,
  });
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsPharmacy(false);

  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Avatar.Image
          size={75}
          source={require("../../../../assets/medishop-logo.png")}
          theme={{ colors: { primary: "white" } }}
        />
        <View style={styles.info}>
          <Text style={styles.userName}>{accountUsername}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('OrderHistory')}
          style={styles.button}
        >
          <Text style={styles.text}>Order History</Text>
        </Button>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.button}
        >
          <Text style={styles.text}>Logout</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  infoContainer: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "#2484fb",
    padding: 20,
  },
  buttonContainer: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    
  },
  text: {
    fontFamily: "RalewaySemiBold",
    fontSize: 20,
    color: "white",
  },
  button: {
    width: 175,
    height: 75,
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  userName: {
    fontFamily: "RalewaySemiBold",
    fontSize: 20,
    color: "white",
    
  },
  info: {
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
