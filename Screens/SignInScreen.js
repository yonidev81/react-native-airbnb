import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pass");
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#F35960" }}>
      <View style={styles.logo}>
        <Image source={require("../assets/Airbnb.png")} />
      </View>

      <KeyboardAwareScrollView>
        <TextInput
          placeholder="roger@federer.io"
          placeholderTextColor="white"
          style={styles.placeholder}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="white"
          style={styles.placeholder}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />

        <View style={{ marginLeft: 85 }}>
          <TouchableOpacity
            style={styles.buttonconnexion}
            onPress={async () => {
              const response = await axios.post(
                "https://express-airbnb-api.herokuapp.com/user/log_in",
                { email: email, password: password }
              );

              /*  console.log(response.data); */
              const userToken = "secret-token";
              setToken(userToken);
              // stockage du token que je reçois de la requête dans la mémoire du téléphone
            }}
          >
            <Text
              style={{
                /* marginTop: 20, */
                color: "#F35960",
                fontSize: 24,
              }}
            >
              Se connecter{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.register}>Pas de compte ? S'inscire </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 90,
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },

  row: {
    marginTop: 30,
    borderBottomColor: "#FFFFFF",
  },

  placeholder: {
    marginTop: 60,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 320,
    margin: 20,
    padding: 10,
  },

  buttonconnexion: {
    width: 190,
    height: 65,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  register: {
    textDecorationLine: "underline",
    color: "white",
  },
});

export default SignInScreen;
