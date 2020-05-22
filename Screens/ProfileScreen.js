import React from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";

const ProfileScreen = ({ route }) => {
  console.log(route);
  const { params } = useRoute();
  console.log(params);
  return (
    <View>
      <Text>user id : {"params.userId"}</Text>
    </View>
  );
};

export default ProfileScreen;
