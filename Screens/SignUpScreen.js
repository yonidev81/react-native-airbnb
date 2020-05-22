import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

function SignUpScreen({ setToken }) {
  const [name, setName] = useState("Yoni");
  const [userName, setUserName] = useState("yoyo");
  const [email, setEmail] = useState("yoni1981@dev.io");
  const [description, setDescription] = useState("hello guys");
  const [password, setPassword] = useState("qwerty");
  const [confirmPassword, setConfirmPassword] = useState("qwerty");
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#F35960" }}>
      <View>
        <Text style={styles.title}> Rejoignez-nous !</Text>
      </View>

      <KeyboardAwareScrollView>
        <View>
          <TextInput
            placeholder="email"
            placeholderTextColor="white"
            style={styles.placeholder}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
        </View>

        <View>
          <TextInput
            placeholder="username"
            placeholderTextColor="white"
            style={styles.placeholder}
            onChangeText={(text) => {
              setUserName(text);
            }}
            value={userName}
          />
        </View>

        <View>
          <TextInput
            placeholder="name"
            placeholderTextColor="white"
            style={styles.placeholder}
            onChangeText={(text) => {
              setName(text);
            }}
            value={name}
          />
        </View>

        <View>
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="Présentez-vous en quelques mots..."
            placeholderTextColor="white"
            style={styles.multiline}
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />
        </View>

        <View>
          <TextInput
            placeholder="mot de passe"
            placeholderTextColor="white"
            style={styles.placeholderpwd}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
            secureTextEntry={true}
          />
        </View>

        <View>
          <TextInput
            placeholder="confirmer le mot de passe"
            placeholderTextColor="white"
            style={styles.placeholderconfirm}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={confirmPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={{ marginLeft: 85 }}>
          <TouchableOpacity
            style={styles.buttonconnexion}
            onPress={async () => {
              const response = await axios.post(
                "https://express-airbnb-api.herokuapp.com/user/sign_up",

                {
                  email: email,
                  password: password,
                  username: userName,
                  name: name,
                  description: description,
                }
              );
              /*          console.log(response.data); */
              setToken(response.data.token);

              /*      navigation.navigate("Home"); */
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
            navigation.navigate("LogIn");
          }}
        >
          <Text style={styles.connect}>Déjà un compte ? Se connecter </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#FFFFFF",
    marginTop: 20,
  },

  placeholder: {
    marginTop: 5,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 320,
    margin: 10,
    padding: 10,
  },

  multiline: {
    marginTop: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 320,
    margin: 10,
    padding: 10,
    borderStyle: "solid",
    borderWidth: 0.4,
    borderColor: "white",
    height: 90,
  },

  placeholderpwd: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 320,
    margin: 10,
    padding: 10,
  },

  placeholderconfirm: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 320,
    margin: 10,
    padding: 10,
  },

  buttonconnexion: {
    width: 190,
    height: 65,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginTop: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  connect: {
    textDecorationLine: "underline",
    color: "white",
  },
});

export default SignUpScreen;
