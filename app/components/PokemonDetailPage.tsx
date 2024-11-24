import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { pokemonImageUrl } from "../constant/apiConstant";

const PokemonDetailPage = ({ pokemonData }: { pokemonData: any; }) => {

  return (
    <View style={styles.container}>

      {pokemonData && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Pokémon Image */}
          <ImageBackground
            source={{ uri: `${pokemonImageUrl}${pokemonData.id}.png` }}
            blurRadius={8}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: `${pokemonImageUrl}${pokemonData.id}.png` }}
              style={styles.pokemonImage}
            />
          </ImageBackground>

          {/* Pokémon Name */}
          <Text style={styles.title}>{pokemonData.name}</Text>

          {/* Pokémon Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Abilities: </Text>
              {pokemonData.abilities
                .map((ability: any) => ability.ability.name)
                .join(", ")}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Type: </Text>
              {pokemonData.types.map((type: any) => type.type.name).join(", ")}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Weight: </Text>
              {pokemonData.weight} g
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Height: </Text>
              {pokemonData.height} cm
            </Text>
          </View>

          {/* Pokémon Stats */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Stats</Text>
            <View style={styles.statsGrid}>
              {pokemonData.stats.map((stat: any, index: number) => (
                <View key={index} style={styles.statCard}>
                  <Text style={styles.statName}>{stat.stat.name}</Text>
                  <Text style={styles.statValue}>{stat.base_stat}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContainer: {
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    height: 250,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 125,
    overflow: "hidden",
    marginVertical: 20,
  },
  pokemonImage: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
    textAlign: "center",
    marginBottom: 10,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#f0b429",
  },
  statsContainer: {
    width: "100%",
  },
  statsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f0b429",
    marginBottom: 10,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: "#383838",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  statName: {
    fontSize: 16,
    color: "#ccc",
    textTransform: "capitalize",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PokemonDetailPage;
