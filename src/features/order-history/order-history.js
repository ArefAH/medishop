import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import { Card } from "react-native-paper";
import axios from "axios";
import { useFonts } from "expo-font";
import RalewayBold from "../../Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "../../Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "../../Infrastructure/font/Raleway-SemiBold.ttf";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ip from "../../Infrastructure/ip";

export const OrderHistoryScreen = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        RalewayBold: RalewayBold,
        RalewayRegular: RalewayRegular,
        RalewaySemiBold: RalewaySemiBold,
      });
    
      if (!fontsLoaded) {
        return null;
      }
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await axios.get(`${ip.address}/orders`);
        setOrdersData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders data:", error.message);
        setLoading(false);
      }
    };

    fetchOrdersData();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Card style={styles.card}>
        <Card.Title
          title={`Order ID: ${item.id}`}
          subtitle={`Customer: ${item.customer_name}`}
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
        />
        <Card.Content>
          <Text style={styles.detail}>Medicine: {item.medicine_name}</Text>
          <Text style={styles.detail}>Quantity: {item.quantity}</Text>
          <Text style={styles.detail}>Price: {item.price} LL</Text>
          <Text style={styles.detail}>Status: {item.status}</Text>
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
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
      {ordersData.length === 0 ? (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessage}>No orders found.</Text>
        </View>
      ) : (
        <FlatList
          data={ordersData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orderContainer: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontFamily: "RalewayBold",
  },
  subtitle: {
    color: "gray",
    fontFamily: "RalewaySemiBold",
  },
  detail: {
    marginTop: 5,
    fontFamily: "RalewayRegular",
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
  flatListContent: {
    paddingBottom: 20,
  },
});
