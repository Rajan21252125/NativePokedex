import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default LoadingComponent;
