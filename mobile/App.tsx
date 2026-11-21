import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import { HomeScreen } from "./src/screens/HomeScreen";
import { ShopScreen } from "./src/screens/ShopScreen";
import { DealsScreen } from "./src/screens/DealsScreen";
import { WishlistScreen } from "./src/screens/WishlistScreen";
import { ProductDetailScreen } from "./src/screens/ProductDetailScreen";
import { colors } from "./src/theme/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontWeight: "800" },
      }}
    >
      <Stack.Screen name="HomeFeed" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product Details" }}
      />
    </Stack.Navigator>
  );
}

function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontWeight: "800" },
      }}
    >
      <Stack.Screen name="ShopCatalog" component={ShopScreen} options={{ title: "Catalog & Search" }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product Details" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: colors.secondary,
            tabBarInactiveTintColor: colors.muted,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              height: 60,
              paddingBottom: 8,
              paddingTop: 6,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: "700",
            },
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: colors.primary,
            headerTitleStyle: { fontWeight: "800" },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏠</Text>,
            }}
          />
          <Tab.Screen
            name="Shop"
            component={ShopStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🛍️</Text>,
            }}
          />
          <Tab.Screen
            name="Deals"
            component={DealsScreen}
            options={{
              title: "Best Deals",
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏷️</Text>,
            }}
          />
          <Tab.Screen
            name="Wishlist"
            component={WishlistScreen}
            options={{
              title: "Saved Items",
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>❤️</Text>,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
