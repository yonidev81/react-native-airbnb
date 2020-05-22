import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useroute } from "@react-navigation/native";

const RoomScreen = () => {
  const route = useRoute();
  console.log(route.params.id);

  return (
    <View style={styles.container}>
      <Text>Room</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RoomScreen;
