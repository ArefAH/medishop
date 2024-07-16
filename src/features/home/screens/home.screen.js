import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Searchbar } from "react-native-paper";
import { colors } from "../../../Infrastructure/theme/colors";
import { Category } from "../component/category.component";
import styled from "styled-components/native";
import { useFonts } from "expo-font";
import RalewayBold from "../../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";

const { width, height } = Dimensions.get("window");

const HomeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Logo = styled.Image`
  width: ${width * 0.8}px;
  height: ${height * 0.3}px;
  align-self: center;
  margin-top: ${-height * 0.1}px;
  resize-mode: contain;
`;

export const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fontsLoaded] = useFonts({
    RalewayBold: RalewayBold,
    RalewayRegular: RalewayRegular,
    RalewaySemiBold: RalewaySemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSearch = () => {
    navigation.navigate("Search", { query: searchQuery });
    setSearchQuery("");
  };

  return (
    <HomeContainer>
      <Logo source={require("../../../../assets/medishop-logo.png")} />
      
      <Searchbar
        placeholder="Search"
        onSubmitEditing={handleSearch}
        onChangeText={setSearchQuery}
        value={searchQuery}
        elevation={1}
        style={styles.searchBar}
        selectionColor={colors.primary}
        rippleColor={colors.primary}
        placeholderTextColor="grey"
        iconColor="grey"
        clearIcon="close"
      />

      <Category navigation={navigation} />
    </HomeContainer>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: "90%",
    backgroundColor: "white",
    fontFamily: "RalewayRegular",
    marginVertical: height * 0.02,
  },
});
