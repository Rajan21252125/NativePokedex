import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, View, Image, ImageBackground, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { PokemonData } from "../hooks/useGetPokemonData";
import { pokemonImageUrl } from "../constant/apiConstant";
import useGetSpecificPokemonData from "../hooks/useGetSPecificPokemonData";

const PokemonPage = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: PokemonData;
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { pokemonData, error, loading } = useGetSpecificPokemonData(data.name);

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={["100%"]}
        enablePanDownToClose
        onDismiss={onClose}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.indicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Loading State */}
          {loading && (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#f0b429" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View style={styles.centered}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          )}

          {/* Pokemon Data */}
          {!loading && !error && pokemonData && (
            <>
              {/* Pokemon Image with Background */}
              <ImageBackground
                source={{ uri: `${pokemonImageUrl}${data.url.split("/")[6]}.png` }}
                blurRadius={8}
                style={styles.imageContainer}
              >
                <Image
                  source={{
                    uri: `${pokemonImageUrl}${data.url.split("/")[6]}.png`,
                  }}
                  style={styles.pokemonImage}
                />
              </ImageBackground>

              {/* Pokemon Info */}
              <View style={styles.dataContainer}>
                <Text style={styles.title}>{data.name}</Text>

                <View style={styles.infoGroup}>
                  <Text style={styles.infoText}>
                    <Text style={styles.infoTitle}>Abilities: </Text>
                    {pokemonData?.abilities
                      .map((ability: any) => ability.ability.name)
                      .join(", ")}
                  </Text>
                </View>

                <View style={styles.infoGroup}>
                  <Text style={styles.infoText}>
                    Type: {pokemonData?.types[0]?.type.name}
                  </Text>
                  <Text style={styles.infoText}>
                    Weight: {pokemonData?.weight} g
                  </Text>
                  <Text style={styles.infoText}>
                    Height: {pokemonData?.height} cm
                  </Text>
                </View>
              </View>

              {/* Pokemon Stats */}
              <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Stats</Text>
                <View style={styles.statsGrid}>
                  {pokemonData?.stats.map((stat: any, index: number) => (
                    <View key={index} style={styles.statContainer}>
                      <Text style={styles.statName}>{stat.stat.name}</Text>
                      <Text style={styles.statValue}>{stat.base_stat}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomSheetBackground: {
    backgroundColor: "#2d2d2d",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  indicator: {
    backgroundColor: "#A0A0A0",
    width: 40,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderRadius: 20,
    overflow: "hidden",
    height: 250,
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  dataContainer: {
    backgroundColor: "#1e1e1e",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    marginVertical: 10,
  },
  infoGroup: {
    marginTop: 10,
  },
  infoTitle: {
    color: "#f0b429",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 2,
    textTransform: "capitalize",
  },
  statsContainer: {
    marginBottom: 10,
  },
  statsTitle: {
    color: "#f0b429",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statContainer: {
    backgroundColor: "#383838",
    borderRadius: 10,
    padding: 10,
    width: "48%",
    marginBottom: 10,
  },
  statName: {
    color: "#a0a0a0",
    fontSize: 16,
    textAlign: "center",
  },
  statValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default PokemonPage;
