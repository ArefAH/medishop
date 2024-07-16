import React from "react";
import { Signupform } from "../components/signup-componenet";
import { View, Image, StyleSheet, StatusBar, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Signup = ({ setIsLoggedIn }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/medi-shop.png")}
          style={styles.image}
        />
      </View>
      <Signupform setIsLoggedIn={setIsLoggedIn} />
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


