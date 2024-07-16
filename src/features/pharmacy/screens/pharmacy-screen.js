import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { Card, Avatar, Searchbar } from "react-native-paper";
import { useFonts } from "expo-font";
import axios from "axios";

import RalewayBold from "../../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";
import images from "../../../Infrastructure/images/images";
import ip from "../../../Infrastructure/ip";

export const PharmacyScreen = ({ navigation, accountUsername }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [medicineData, setMedicineData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fontsLoaded, error] = useFonts({
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
        console.error("Error fetching orders data:", error.message);
      }
    };

    fetchOrdersData(accountUsername);
  }, [accountUsername]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${ip.address}/orders/${orderId}`,
        {
          status: newStatus,
        }
      );
      if (response.status === 200) {
        setOrdersData((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  const userOrders = ordersData.filter(
    (order) => order.pharmacy_name === accountUsername
  );

  const groupedOrders = {};
  userOrders.forEach((order) => {
    if (order.status === "pending") {
      if (!groupedOrders[order.medicine_name]) {
        groupedOrders[order.medicine_name] = [];
      }
      groupedOrders[order.medicine_name].push(order);
    }
  });

  const medicineWithDetails = [];
  Object.keys(groupedOrders).forEach((medicineName) => {
    const orders = groupedOrders[medicineName];
    orders.forEach((order) => {
      medicineWithDetails.push({
        ...medicineData.find((medicine) => medicine.name === medicineName),
        status: order.status,
        price: order.price,
        customerName: order.customer_name,
        id: order.id,
        quantity: order.quantity,
      });
    });
  });

  if (!fontsLoaded) {
    return null;
  }

  const showConfirmationAlert = (orderId, newStatus) => {
    Alert.alert(
      "Are you sure?",
      `Do you want to mark this order as ${newStatus}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => updateOrderStatus(orderId, newStatus),
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.medicineContainer}>
      <Card style={styles.card}>
        <Card.Title
          title={item.name}
          
          left={(props) => (
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={75}
                source={images[item.medicine_id - 1]}
                theme={{ colors: { primary: "white" } }}
              />
            </View>
          )}
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
        />
        <Card.Content>
          <View style={styles.statusContainer}>
            <Text style={styles.content}>{item.price + " LL"}</Text>
            <Text style={styles.content}>Ordered by: {item.customerName}</Text>
            <Text style={styles.content}>Quantity: {item.quantity}</Text>
          </View>
        </Card.Content>

        <Card.Actions style={styles.cardActions}>
          <TouchableOpacity
            style={styles.confirm}
            onPress={() => showConfirmationAlert(item.id, "done")}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => showConfirmationAlert(item.id, "canceled")}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      {medicineWithDetails.length === 0 ? (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessage}>No items found.</Text>
        </View>
      ) : (
        <FlatList
          data={medicineWithDetails}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
  },
  searchBar: {
    margin: 15,
    marginTop: 10,
    backgroundColor: "white",
    alignSelf: "center",
    width: "93%",
  },
  emptyMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 16,
    color: "gray",
    fontFamily: "RalewaySemiBold",
  },
  medicineContainer: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    gap: 40,
  },
  title: {
    fontFamily: "RalewayBold",
    marginLeft: 10,
  },
  subtitle: {
    fontFamily: "RalewayRegular",
    marginLeft: 10,
  },
  flatListContent: {
    paddingHorizontal: 15,
  },
  content: {
    fontFamily: "RalewaySemiBold",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
   
  },
  confirm: {
    backgroundColor: "#2484fb",
    padding: 10,
    borderRadius: 5,
  },
  cancel: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "RalewayRegular",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
