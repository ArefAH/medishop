import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Searchbar } from "react-native-paper";
import { useFonts } from "expo-font";
import RalewayBold from "../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../Infrastructure/font/Raleway-SemiBold.ttf";
import axios from "axios";
import images from "../../Infrastructure/images/images";
import ip from "../../Infrastructure/ip";

import { AntDesign } from "@expo/vector-icons";

export const CategoryPage = ({ navigation , route }) => {
  const { filter } = route.params;
  const [medicineData, setMedicineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ip.address}/medicine`);
        setMedicineData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [fontsLoaded] = useFonts({
    RalewayBold: RalewayBold,
    RalewayRegular: RalewayRegular,
    RalewaySemiBold: RalewaySemiBold,
  });
  
 
  const filteredData = medicineData.filter(
    (item) =>
      item.category.toLowerCase().includes(filter.toLowerCase())
  );


  if (!fontsLoaded) {
    return null;
  }

  const handlePress = (item) => {
    navigation.navigate("Product", { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginBottom: 20 }}
      onPress={() => handlePress(item)}
    >
      <Card style={{ backgroundColor: "white" }}>
        <Card.Title
          id={item.medicine_id}
          title={item.name}
          subtitle={item.price + " LL"}
          left={(props) => (
            <Avatar.Image
              size={75}
              source={images[item.medicine_id - 1]}
              theme={{ colors: { primary: "white" } }}
            />
          )}
          style={style.medicine}
          titleStyle={{ fontFamily: "RalewayBold" }}
          subtitleStyle={{ fontFamily: "RalewayRegular" }}
        />
      </Card>
    </TouchableOpacity>
  );

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
          Home
        </Text>
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        elevation={1}
        style={style.searchBar}
        selectionColor={"#2484fb"}
        rippleColor={"#2484fb"}
        placeholderTextColor={"grey"}
        iconColor="grey"
        clearIcon={"close"}
      />
      {filteredData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={style.emptyMessage}>No items found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.medicine_id.toString()}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  medicine: {
    padding: 20,
    gap: 40,
  },
  emptyMessage: {
    fontSize: 16,
    color: "gray",
    fontFamily: "RalewaySemiBold",
  },
  searchBar: {
    margin: 15,
    marginTop: 10,
    backgroundColor: "white",
    alignSelf: "center",
    width: "93%",

  },
});
