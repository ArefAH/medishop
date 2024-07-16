import React, { useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { View, StyleSheet, StatusBar } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./src/Infrastructure/theme/colors";
import { Customer } from "./src/features/welcome/screens/customer-screen";
import { Home } from "./src/features/home/screens/home.screen";
import { SearchScreen } from "./src/features/medicine/screens/search-screen";
import { Signup } from "./src/features/welcome/screens/signup-screen";
import { PhSignup } from "./src/features/welcome/screens/phsignup-screen";
import { Product } from "./src/features/product/p/product-screen";
import { Settings } from "./src/features/settings/settings";
import { Welcome } from "./src/features/welcome/screens/welcome-screen";
import { Pharmacy } from "./src/features/welcome/screens/pharmacy-screen";
import { Category } from "./src/features/home/component/category.component";
import { CategoryPage } from "./src/features/categories/category-page";
import { Result } from "./src/features/medicine/components/card-component";
import { PharmacyScreen } from "./src/features/pharmacy/screens/pharmacy-screen";
import { PharmacySettings } from "./src/features/pharmacy/screens/pharmacy-settings";
import { useFonts } from "expo-font";
import RalewayBold from "./src/Infrastructure/font/Raleway-Bold.ttf";
import RalewayRegular from "./src/Infrastructure/font/Raleway-Regular.ttf";
import RalewaySemiBold from "./src/Infrastructure/font/Raleway-SemiBold.ttf";
import { Reservations } from "./src/features/reservations/reservations";
import { OrderHistoryScreen } from "./src/features/order-history/order-history";
const theme = {
  ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RalewayBold: RalewayBold,
    RalewayRegular: RalewayRegular,
    RalewaySemiBold: RalewaySemiBold,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPharmacy, setIsPharmacy] = useState(false);
  const [accountUsername, setAccountUsername] = useState("");

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <NavigationContainer>
          {isLoggedIn ? (
            !isPharmacy ? (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                      iconName = "home";
                    } else if (route.name === "Settings") {
                      iconName = "settings";
                    }

                    return <Ionicons name={iconName} size={40} color={color} />;
                  },
                  tabBarLabelStyle: {
                    fontSize: 14,
                    fontFamily: "RalewayBold",
                  },
                  tabBarStyle: {
                    backgroundColor: "white",
                    borderTopColor: "white",
                    borderTopWidth: 1,
                    elevation: 10,
                    shadowOpacity: 0.25,
                    justifyContent: "center",
                    height: 60,
                  },
                  tabBarActiveTintColor: colors.primary,
                  tabBarInactiveTintColor: "grey",
                })}
              >
                <Tab.Screen name="Home" options={{ headerShown: false }}>
                  {(props) => (
                    <HomeStackScreen
                      {...props}
                      accountUsername={accountUsername}
                    />
                  )}
                </Tab.Screen>
                <Tab.Screen name="Settings" options={{ headerShown: false }}>
                  {(props) => (
                    <SettingsStackScreen
                      {...props}
                      accountUsername={accountUsername}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            ) : (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                      iconName = "home";
                    } else if (route.name === "Settings") {
                      iconName = "settings";
                    }

                    return <Ionicons name={iconName} size={40} color={color} />;
                  },
                  tabBarLabelStyle: {
                    fontSize: 14,
                    fontFamily: "RalewayBold",
                  },
                  tabBarStyle: {
                    backgroundColor: "white",
                    borderTopColor: "white",
                    borderTopWidth: 1,
                    elevation: 10,
                    shadowOpacity: 0.25,
                    justifyContent: "center",
                    height: 60,
                  },
                  tabBarActiveTintColor: colors.primary,
                  tabBarInactiveTintColor: "grey",
                })}
              >
                <Tab.Screen name="Home" options={{ headerShown: false }}>
                  {(props) => (
                    <PharmacyScreen
                      {...props}
                      accountUsername={accountUsername}
                    />
                  )}
                </Tab.Screen>
                <Tab.Screen name="Settings" options={{ headerShown: false }}>
                  {(props) => (
                    <PharmacySettingsStackScreen
                      {...props}
                      setIsLoggedIn={setIsLoggedIn}
                      accountUsername={accountUsername}
                      setIsPharmacy={setIsPharmacy}
                      setAccountUsername={setAccountUsername}
                    />
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Customer" options={{ headerShown: false }}>
                {(props) => (
                  <Customer
                    {...props}
                    setIsLoggedIn={setIsLoggedIn}
                    setAccountUsername={setAccountUsername}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Pharmacy" options={{ headerShown: false }}>
                {(props) => (
                  <Pharmacy
                    {...props}
                    setIsLoggedIn={setIsLoggedIn}
                    setIsPharmacy={setIsPharmacy}
                    setAccountUsername={setAccountUsername}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Signup" options={{ headerShown: false }}>
                {(props) => (
                  <Signup
                    {...props}
                    setIsLoggedIn={setIsLoggedIn}
                    setAccountUsername={setAccountUsername}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="PhSignup" options={{ headerShown: false }}>
                {(props) => (
                  <PhSignup
                    {...props}
                    setIsLoggedIn={setIsLoggedIn}
                    setIsPharmacy={setIsPharmacy}
                    setAccountUsername={setAccountUsername}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </NavigationContainer>
        <ExpoStatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const HomeStackScreen = ({ accountUsername }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NestedHome"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Product" options={{ headerShown: false }}>
        {(props) => <Product {...props} accountUsername={accountUsername} />}
      </Stack.Screen>
      <Stack.Screen
        name="Category"
        component={CategoryPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reservations"
        component={Reservations}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SettingsStackScreen = ({ accountUsername, setIsLoggedIn }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NestedSettings" options={{ headerShown: false }}>
        {(props) => (
          <Settings
            {...props}
            accountUsername={accountUsername}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Reservations" options={{ headerShown: false }}>
        {(props) => (
          <Reservations {...props} accountUsername={accountUsername} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Product" options={{ headerShown: false }}>
        {(props) => <Product {...props} accountUsername={accountUsername} />}
      </Stack.Screen>
      <Stack.Screen name="OrderHistory" options={{ headerShown: false }}>
        {(props) => <OrderHistoryScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
const PharmacySettingsStackScreen = ({ accountUsername, setIsLoggedIn, setIsPharmacy, setAccountUsername, navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NestedSettings" options={{ headerShown: false }}>
        {(props) => (
          <PharmacySettings
            {...props}
            setIsLoggedIn={setIsLoggedIn}
            accountUsername={accountUsername}
            setIsPharmacy={setIsPharmacy}
            setAccountUsername={setAccountUsername}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="OrderHistory" options={{ headerShown: false }}>
        {(props) => <OrderHistoryScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight + 5 || 0,
  },
});
