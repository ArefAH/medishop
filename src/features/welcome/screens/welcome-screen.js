import React from "react";
import { View, Image, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import RalewayBold from "../../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../../Infrastructure/font/Raleway-SemiBold.ttf";
import RalewaySemiBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";
import { colors } from "../../../Infrastructure/theme/colors";

const { width, height } = Dimensions.get('window');

export const Welcome = () => {
  const navigation = useNavigation();

  const handleCustomer = () => {
    navigation.navigate('Customer', { navigation: navigation }); 
  };
  const handlePharmacy = () => {
    navigation.navigate('Pharmacy', { navigation: navigation });
  };

  const [fontsLoaded] = useFonts({
    RalewayBold: RalewayBold,
    RalewayRegular: RalewayRegular,
    RalewaySemiBold: RalewaySemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/medi-shop.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>To Medishop</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCustomer}>
          <Button style={styles.button} mode="contained">
            <Text style={styles.buttonText}>Customer</Text>
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePharmacy}>
          <Button style={styles.button2} mode="contained">
            <Text style={styles.buttonText2}>Pharmacy</Text>
          </Button>
        </TouchableOpacity>
      </View>
      <Text style={styles.subText}>Let's get started</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: width * 0.05,
    backgroundColor: colors.white,
  },
  imageContainer: {
    marginTop: StatusBar.currentHeight + 5 || 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
  },
  button: {
    width: width * 0.4,
    height: height * 0.1,
    justifyContent: "center",
  },
  button2: {
    width: width * 0.4,
    height: height * 0.1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontFamily: "RalewayBold",
    fontSize: width * 0.1,
    textAlign: "center",
    color: "grey",
  },
  buttonText: {
    fontFamily: "RalewaySemiBold",
    fontSize: width * 0.045,
    textAlign: "center",
  },
  buttonText2: {
    fontFamily: "RalewaySemiBold",
    fontSize: width * 0.045,
    textAlign: "center",
    color: colors.primary,
  },
  subText: {
    fontFamily: "RalewaySemiBold",
    fontSize: width * 0.045,
    textAlign: "center",
    color: "grey",
  },
});

