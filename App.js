import React, { useState, useEffect } from "react";

// Stocker le token de l'utilisateur dans la mémoire du téléphone
import { AsyncStorage, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native"; // toute la navigation
import { createStackNavigator } from "@react-navigation/stack"; //créer des piles d'écran
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // // barre de nav en bas

// icons
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

// // imports des containers (screens)
import SignInScreen from "./Screens/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import HomeScreen from "./Screens/HomeScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import AroundmeScreen from "./Screens/AroundmeScreen";
import RoomScreen from "./Screens/RoomScreen";
/* import Hometabscreen from "./components/Hometabscreen"; */

// déclaration de constantes qui font appel à des fonctions importées plus haut
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true); // affichage conditionnel si on a récupéré les données ou pas
  const [userToken, setUserToken] = useState({}); // changer l'état user pour pouvoir rafraichir app

  // Fonction SetToken  qu'on appelle pour mettre à jour ce qu'il y a dans l'asynchstorage
  // Affichage conditionnel: si j'envoie un token, je vais mettre à jour le token sinon je le supprime
  // Utilité pour le SignIn, le SignUp (setItem) et le LogOut (removeItem)
  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      // sinon je vais vers logOut
      AsyncStorage.removeItem("userToken");
    }

    // Mise à jour de UserToken avec sa
    // setUserToken provoque un refresh qui va faire qu'on va passer dans les conditions plus bas (quid leboncoin exo)
    setUserToken(token);
  };

  useEffect(() => {
    // fonction qui va être appelée une fois au chargement du composant
    const bootstrapAsync = async () => {
      // fonction va regarder s'il y a un token au chargement de l'application et va récuperer ce qu'il y a dans l'asyncstorage de getItem
      const userToken = await AsyncStorage.getItem("userToken");

      setIsLoading(false);
      // on fait un setUserToken avec ce qu'a récupéré la fonction: soit il y a quelque chose et on met à jour avec le token de l'utilisateur
      // Soit il n'y a rien et le "usertoken" sera nul, ce qui va provoquer un rafraichissement et on va repasser dans les conditions (on fait cela une fois au chargement de l'app)
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // isLoading: on est en train de checker le token (ou autre chose) on ne renvoie rien
        // sinon on checke si le token existe (est-ce que j'ai un token)

        // soit l'utilisateur n'est pas connecté alors j'affiche le stack navigator avec le logIn et le signup
        <Stack.Navigator>
          <Stack.Screen
            name="LogIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {(props) => <SignInScreen {...props} setToken={setToken} />}
            {/* component={SignInScreen}  */}
          </Stack.Screen>

          <Stack.Screen
            name="SignUp"
            /*  component={SignUpScreen} */
            options={{ header: () => null, animationEnabled: false }}
          >
            {(props) => <SignUpScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // Soit l'utilisateur est connecté, j'affiche les écrans suivants
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "black",
                  inactiveTintColor: "white",
                  style: { backgroundColor: "#F35960" },
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: () => (
                      <Ionicons name={"ios-home"} size={32} color={"white"} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="My Airbnb Portal">
                        {(props) => <HomeScreen {...props} />}
                      </Stack.Screen>

                      <Stack.Screen name="Room">
                        options =
                        {{
                          title: "Room",
                          headerStyle: { backgroundColor: "red" },
                          headerTitleStyle: { color: "white" },
                        }}
                        {() => <RoomScreen />}
                      </Stack.Screen>

                      <Stack.Screen name="Profile">
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Around me"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: () => (
                      <Ionicons
                        name={"ios-options"}
                        size={32}
                        color={"white"}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Around me"
                        options={{
                          title: "Around me ",
                          tabBarLabel: "Around me",
                        }}
                      >
                        {(props) => <AroundmeScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Settings"
                  options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: () => (
                      <Ionicons
                        name={"ios-options"}
                        size={32}
                        color={"white"}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
