import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
} from "react-native";
import { Card, Avatar, Searchbar } from "react-native-paper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import axios from "axios";

import RalewayBold from "../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../Infrastructure/font/Raleway-SemiBold.ttf";
import images from "../../Infrastructure/images/images";
import ip from "../../Infrastructure/ip";

export const Reservations = ({ navigation, accountUsername }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [medicineData, setMedicineData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [fontsLoaded] = useFonts({
    RalewayBold: RalewayBold,
    RalewayRegular: RalewayRegular,
    RalewaySemiBold: RalewaySemiBold,
  });

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const response = await axios.get(`${ip.address}/medicine`);
        setMedicineData(response.data);
      } catch (error) {
        console.error("Error fetching medicine data:", error);
      }
    };

    fetchMedicineData();
  }, []);

  useEffect(() => {
    const fetchOrdersData = async (username) => {
      try {
        const response = await axios.get(`${ip.address}/orders`);
        setOrdersData(response.data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchOrdersData(accountUsername);
  }, [accountUsername]);

  const userOrders = ordersData.filter(
    (order) => order.customer_name === accountUsername
  );

  const orderedMedicineNames = userOrders.map((order) => order.medicine_name);

  const filteredMedicineData = medicineData.filter(
    (medicine) =>
      orderedMedicineNames.includes(medicine.name) &&
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const medicineWithStatus = filteredMedicineData.map((medicine) => {
    const order = userOrders.find(
      (order) => order.medicine_name === medicine.name
    );
    return {
      ...medicine,
      status: order ? order.status : null,
      price: order ? order.price : null, 
    };
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderRightIcon = (status) => {
    switch (status) {
      case "pending":
        return (
          <MaterialIcons name="hourglass-empty" size={24} color="orange" />
        );
      case "done":
        return (
          <MaterialIcons name="check-circle-outline" size={24} color="green" />
        );
      case "canceled":
        return <MaterialIcons name="cancel" size={24} color="red" />;
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
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
          right={(props) => renderRightIcon(item.status)}
          style={style.medicine}
          titleStyle={{ fontFamily: "RalewayBold" }}
          subtitleStyle={{ fontFamily: "RalewayRegular" }}
        />
      </Card>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          margin: 15,
        }}
      >
        <AntDesign
          name="back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
          style={{ paddingRight: 10 }}
        />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 20,
            fontFamily: "RalewaySemiBold",
          }}
        >
          Settings
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
      {medicineWithStatus.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={style.emptyMessage}>No items found.</Text>
        </View>
      ) : (
        <FlatList
          data={medicineWithStatus}
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
