import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Index from "./Index";
import SearchPage from "./SearchPage";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Index} options={{ headerShown: false }}/>
      <Stack.Screen name="Search" component={SearchPage} options={{
          title: "Search Pokémon",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;
