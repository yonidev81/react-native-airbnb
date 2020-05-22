import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      /*   console.log(response.data); */
      setData(response.data.rooms);
      setisLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View>
      {isLoading ? (
        <Text> Loading in progress </Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            // Contenu à afficher

            const renderStars = () => {
              const tab = [];
              for (let i = 0; i < 5; i++) {
                if (i < item.ratingValue) {
                  tab.push(
                    <AntDesign key={i} name="star" size={24} color="#F5B304" />
                  );
                  // je push des étoiles jaunes
                } else {
                  // je push des étoiles grises
                  tab.push(
                    <AntDesign key={i} name="star" size={24} color="grey" />
                  );
                }
              }
              return tab;
            };

            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Room", { id: item._id });
                  }}
                >
                  <Image
                    style={styles.picture}
                    source={{ uri: item.photos[0] }}
                  />
                  <Text style={styles.title}>{item.title}</Text>

                  <Text style={styles.reviews}> {item.reviews} avis </Text>
                  <Text style={styles.stars}> {renderStars()} </Text>
                  <Image
                    source={{ uri: item.user.account.photos[0] }}
                    style={{ height: 50, width: 50, borderRadius: 25 }}
                  />

                  <View style={styles.display}>
                    <Text style={styles.price}> {item.price} €</Text>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    height: 200,
    width: "70%",
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    margin: 10,
  },

  stars: {
    marginLeft: 10,
  },

  price: {
    fontSize: 18,
    position: "absolute",
    color: "white",
  },

  title: {
    fontSize: 16,
    alignContent: "center",
    color: "#000000",
    marginLeft: 10,
  },

  reviews: {
    marginLeft: 10,
  },

  display: {
    height: 30,
    width: 60,
    backgroundColor: "black",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowOpacity: 0.8,
    margin: 10,
  },
});

export default HomeScreen;
