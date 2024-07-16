import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView
} from "react-native";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import RalewayBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";
import RalewayRegular from "../../../Infrastructure/font/Raleway-SemiBold.ttf";
import RalewaySemiBold from "../../../Infrastructure/font/Raleway-SemiBold.ttf";
import DropDownPicker from "react-native-dropdown-picker";
import images from "../../../Infrastructure/images/images";
import ip from "../../../Infrastructure/ip";

export const Product = ({ route, navigation, accountUsername }) => {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [fontsLoaded] = useFonts({
    RalewayBold: RalewayBold,
    RalewayRegular: RalewayRegular,
    RalewaySemiBold: RalewaySemiBold,
  });
  const [showModal, setShowModal] = useState(false);
  const { item } = route.params;
  const [stockData, setStockData] = useState([]);
  const { name, price, description, medicine_id, category } = item;

  useEffect(() => {
    fetch(`${ip.address}/stock`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (stock) => stock.medicine_name === name
        );
        const formattedData = filteredData.map((stock) => ({
          label: `${stock.pharmacy_name} - ${stock.pharmacy_location}`,
          value: stock.pharmacy_name,
        }));
        setStockData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [name]);

  const submitReservation = () => {
    const reservationData = {
      customer_name: accountUsername,
      pharmacy_name: value,
      medicine_name: name,
      quantity: quantity,
      reservation_date: new Date().toISOString().split("T")[0],
      status: 'pending',
      price: price * quantity,
    };
  
    console.log("Submitting reservation data:", reservationData);
  
    fetch(`${ip.address}/reserve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Reservation response data:", data);
        if (data.error) {
          Alert.alert("Reservation failed", data.error);
        } else {
          setShowModal(false);
          Alert.alert("Reservation successful!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Reservation failed", "Please try again.");
      });
  };
  
  
  

  if (!fontsLoaded) {
    return null;
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
    console.log(stockData);
  };

  const handleReserve = () => {
    setShowModal(true);
  };

  return (
    <Container>
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
          {name}
        </Text>
      </View>
      <ImageContainer>
        <StyledImage source={images[medicine_id - 1]} />
      </ImageContainer>

      <InfoContainer>
        <Name>{name}</Name>
        <Price>{price} LL</Price>
        <ScrollView showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1,}}>
          <Description style={{ marginTop: 30 }}>{description}</Description>
        </ScrollView>
      </InfoContainer>
      <ButtonContainer>
        <StyledButton
          mode="outlined"
          onPress={handleReserve}
          theme={{ roundness: 2 }}
        >
          <ButtonText>Reserve</ButtonText>
        </StyledButton>
      </ButtonContainer>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <ReservationModalContainer>
          <ReservationTab>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 20, fontFamily: "RalewaySemiBold" }}>
                Reserve
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <CloseIcon name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "RalewaySemiBold",
                  marginBottom: 10,
                }}
              >
                Pharmacy
              </Text>
              <View style={{ zIndex: 1 }}>
                <DropDownPicker
                  searchable={true}
                  open={open}
                  value={value}
                  items={stockData}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setStockData}
                  scrollViewProps={{ nestedScrollEnabled: true }}
                  placeholderStyle={{
                    fontSize: 20,
                    fontFamily: "RalewaySemiBold",
                    color: "grey",
                  }}
                  labelStyle={{ fontSize: 20, fontFamily: "RalewaySemiBold" }}
                  placeholder="Select a Pharmacy"
                  style={{ backgroundColor: "white", zIndex: 2 }}
                  dropDownContainerStyle={{
                    backgroundColor: "white",
                    borderRadius: 5,
                    zIndex: 10,
                  }}
                  dropDownDirection="BOTTOM"
                />
              </View>
            </View>
            <QuantityContainer>
              <Text style={{ fontSize: 20, fontFamily: "RalewaySemiBold" }}>
                Quantity
              </Text>
              <Border>
                <TouchableOpacity onPress={decrementQuantity}>
                  <AntDesign name="minus" size={24} color="black" />
                </TouchableOpacity>
                <QuantityText>{quantity}</QuantityText>
                <TouchableOpacity onPress={incrementQuantity}>
                  <AntDesign name="plus" size={24} color="black" />
                </TouchableOpacity>
              </Border>
            </QuantityContainer>
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 20, fontFamily: "RalewaySemiBold" }}>
                Total Price:
              </Text>
              <Text style={{ fontSize: 20, fontFamily: "RalewaySemiBold" }}>
                {price * quantity} LL
              </Text>
            </View>
            <TouchableOpacity onPress={submitReservation}>
              <Button mode="contained" style={{ marginTop: 30 }}>
                Reserve
              </Button>
            </TouchableOpacity>
          </ReservationTab>
        </ReservationModalContainer>
      </Modal>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ImageContainer = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 300px;
  height: 300px;
`;

const InfoContainer = styled.View`
  flex: 0.3;
  padding: 20px;
  background-color: white;
`;

const Name = styled.Text`
  font-size: 24px;
  font-family: "RalewayBold";
  margin-vertical: 10px;
`;

const Price = styled.Text`
  font-size: 20px;
  color: gray;
  font-family: "RalewayRegular";
`;
const Description = styled.Text`
  font-size: 16px;
  color: gray;
  font-family: "RalewayRegular";
`;

const ButtonContainer = styled.View`
  flex: 0.2;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  padding: 10px;
  width: 50%;
  align-self: center;
  border-width: 0;
  background-color: #f5f5f5;
`;

const ButtonText = styled.Text`
  font-family: "RalewayBold";
  font-size: 16px;
`;

const ReservationModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ReservationTab = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  width: 100%;
`;
const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

const QuantityText = styled.Text`
  margin-horizontal: 10px;
  padding-horizontal: 10px;
`;

const Border = styled.View`
  border: 1px solid black;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

const CloseIcon = styled(AntDesign)``;
