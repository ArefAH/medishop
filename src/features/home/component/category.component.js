import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar, Button, TouchableRipple } from "react-native-paper";
import { useFonts } from "expo-font";
import RalewayBold from "../../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";

export const Category = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    RalewayBold: RalewayBold,
    RalewayRegular: RalewayRegular,
    RalewaySemiBold: RalewaySemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleCategoryPress = (category) => {
    navigation.navigate("Category", { filter: category });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => handleCategoryPress("Painkillers")}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Button
            style={styles.button}
            labelStyle={styles.label}
            contentStyle={styles.content}
            mode="contained"
            
          >
            Painkillers
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => handleCategoryPress("Vitamins")}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Button
            style={styles.button}
            labelStyle={styles.label}
            contentStyle={styles.content}
            mode="contained"
          >
            Vitamins
          </Button>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => handleCategoryPress("Creams")}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Button
            style={styles.button2}
            labelStyle={styles.label}
            contentStyle={styles.content}
            mode="contained"
          >
            Creams
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => handleCategoryPress("Anxiety")}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Button
            style={styles.button3}
            labelStyle={styles.label}
            contentStyle={styles.content}
            mode="contained"
          >
            Anxiety Med
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  touchable: {
    borderRadius: 10,
    marginHorizontal: 20,
  },
  button: {
    borderRadius: 10,
    elevation: 5,
    padding: 25,
    paddingVertical: 40,
    backgroundColor: "#f5f5f5",
  },
  button2: {
    borderRadius: 10,
    elevation: 5,
    padding: 25,
    paddingHorizontal: 34,
    paddingVertical: 40,
    backgroundColor: "#f5f5f5",
  },
  button3: {
    borderRadius: 10,
    elevation: 5,
    padding: 25,
    paddingHorizontal: 13,
    paddingVertical: 40,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    fontFamily: "RalewaySemiBold",
    color: "#2484fb",
  },
});
