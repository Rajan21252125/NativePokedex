import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, View, Animated, Pressable } from "react-native";
import { PokemonData } from "../hooks/useGetPokemonData";

const SelfCreatedBottomSheet = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: PokemonData;
}) => {
  const slide = useRef(new Animated.Value(800)).current;

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }


  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 800,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }


  useEffect(() => {
    if (data) {
      slideUp();
    }else {
      setTimeout(() => {
        slideDown();
      }, 500);
    }
  }, []);

  return (
    <Pressable onPress={onClose} style={styles.container}>
      <Animated.View style={[styles.contentContainer , { transform : [{ translateY: slide }]}]}>
        <Text style={styles.title}>{data.name}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    inset: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  contentContainer: {
    height: "95%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SelfCreatedBottomSheet;
