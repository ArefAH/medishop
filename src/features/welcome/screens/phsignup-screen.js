import React from "react";
import { PhSignupForm } from "../../pharmacy/screens/phsignup";
import { View, Image, StyleSheet, StatusBar, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const PhSignup = ({ setIsLoggedIn, setIsPharmacy, setAccountUsername }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/medishop-logo.png")}
          style={styles.image}
        />
      </View>
      <PhSignupForm
        setIsLoggedIn={setIsLoggedIn}
        setIsPharmacy={setIsPharmacy}
        setAccountUsername={setAccountUsername}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: width * 0.05,
    paddingTop: StatusBar.currentHeight + height * 0.02,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    resizeMode: "contain",
  },
});

