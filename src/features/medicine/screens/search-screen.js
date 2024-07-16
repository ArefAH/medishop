import React from "react";
import { View, Button, Text } from "react-native";
// import { Search } from "../components/search-compoonent";
import { Result } from "../components/card-component";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import RalewayBold from "../../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";

export const SearchScreen = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    'RalewayBold': RalewayBold,
    'RalewayRegular': RalewayRegular,
    'RalewaySemiBold': RalewaySemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  const { query } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 ,margin:15}}>
        <AntDesign
          name="back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          style={{ paddingRight: 10 }}
        />
        <Text
          style={{ marginLeft: 10, fontSize: 20, fontFamily: "RalewaySemiBold" }}
        >
          Search
        </Text>
      </View>

      <Result filter={query} navigation={navigation} />
    </View>
  );
};

SearchScreen.navigationOptions = {
  headerShown: false,
};
