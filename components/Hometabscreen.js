import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Hometabscreen = () => {
  return (
    <View>
      <Ionicons name={"ios-home"} size={32} color={"black"} />
      <Text> Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Hometabscreen;
