import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo";
import useGetPokemonData, { PokemonData } from "./hooks/useGetPokemonData";
import PokemonCard from "./components/PokemonCard";
import LoadingComponent from "./components/LoadingComponent";
import PokemonPage from "./components/PokemonPage";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import { useNavigation } from "expo-router";

const Index = () => {
  const [offset, setOffset] = useState(0);
  const navigation = useNavigation();
  const limit = 30;
  const [selectedPokemon, setSelectedPokemon] = useState<null | PokemonData>(
    null
  );
  const [hasNetwork, setHasNetwork] = useState(true);

  const { pokemonDatas, loading, error } = useGetPokemonData(limit, offset);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setHasNetwork(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  const loadMoreData = () => {
    if (!loading && hasNetwork) {
      setOffset((prev) => prev + limit);
    } else if (!hasNetwork) {
      Alert.alert("No Internet", "Please check your internet connection.");
    }
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headingText}>Pokemon Finder App</Text>
          {hasNetwork ? (
            <FlatList
              data={pokemonDatas}
              renderItem={({ item, index }) => (
                <PokemonCard
                  item={item}
                  index={index}
                  onClick={() => setSelectedPokemon(item)}
                />
              )}
              numColumns={2}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={loading ? <LoadingComponent /> : null}
            />
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>No Internet Connection</Text>
              <Text style={styles.infoText}>
                Please turn on your internet to load data.
              </Text>
            </View>
          )}
          <StatusBar backgroundColor={"black"} />
          {selectedPokemon && (
            <PokemonPage
              onClose={() => setSelectedPokemon(null)}
              data={selectedPokemon}
            />
          )}
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => navigation.navigate("Search")}
          >
            <Ionicons
              style={styles.searchIcon}
              name="search"
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "black",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 20,
    borderRadius: 5,
    paddingHorizontal: 15,
    color: "#ccc",
    flex: 1,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#ccc",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
  },
  searchContainer: {
    position: "absolute",
    bottom: 50,
    right: 30,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#1e1e1e",
  },
  searchIcon: {},
});

export default Index;
