import { View, Text, Image, StyleSheet, ImageBackground, Pressable } from "react-native";
import React from "react";
import { PokemonData } from "../hooks/useGetPokemonData";
import { pokemonImageUrl } from "../constant/apiConstant.js";

const PokemonCard = ({ item, index, onClick }: { item: PokemonData; index: number; onClick : () => void }) => {
  return (
    <Pressable key={index} style={styles.pokemonContainer} onPress={() => onClick()}>
      <ImageBackground
        source={{ uri: `${pokemonImageUrl}${index + 1}.png` }}
        style={styles.pokemonBackgroundImage}
        blurRadius={8}
      >
      <Image source={{ uri: `${pokemonImageUrl}${index + 1}.png` }} style={styles.pokemonImage}/> 
        <Text style={styles.pokemonText} key={index}>{item.name}</Text>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pokemonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#1e1e1e",
    width: "40%",
    height: 180,
  },
  pokemonBackgroundImage: {
    resizeMode: "cover",
    height: 200,
    width: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonImage : {
    height: 120,
    width: 120,
    resizeMode: "contain",
  },
  pokemonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  }
});

export default PokemonCard;
