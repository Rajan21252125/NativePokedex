import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoadingComponent from "./components/LoadingComponent";
import { apiUrl } from "./constant/apiConstant";
import PokemonDetailPage from "./components/PokemonDetailPage";

const SearchPage = ({ navigation }: { navigation: any }) => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (query: string) => {
    if (loading || !query) return;
    setLoading(true);
    setError(null);

    try {
      const url = `${apiUrl}/${query.toLowerCase()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData([result]);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("No Pokémon found. Please try again.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData(searchText.trim());
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          placeholder="Search Pokémon by name"
          placeholderTextColor={"#ccc"}
          style={styles.textInput}
        />
        <Ionicons name="search" size={20} color="#ccc" style={styles.icon} />
      </View>

      {loading && <LoadingComponent />}

      {!loading && error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {!loading && !error && data.length === 0 && searchText.trim() !== "" && (
        <Text style={styles.noResultText}>No Pokémon Found</Text>
      )}

      {!loading && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item } : any) => (
            <PokemonDetailPage
            pokemonData={item}
            />
          )}
          numColumns={2}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    height: 40,
    color: "black",
  },
  icon: {
    marginLeft: 10,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#ccc",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  noResultText: {
    color: "#ccc",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default SearchPage;
