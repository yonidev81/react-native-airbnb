import React from "react";
import { View, Button, Text } from "react-native";

const SettingsScreen = ({ setToken }) => {
  return (
    <View>
      <Text>Hello Settings</Text>
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
};

export default SettingsScreen;
