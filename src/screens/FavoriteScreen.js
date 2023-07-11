import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList, ScrollView, Image, } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLANTS } from "../../database/plants";
import FavoriteItem from "../components/FavoriteItem";

const FavoriteScreen = ({ navigation }) => {
  const [favData, setFavData] = useState([]);
  const isFocused = useIsFocused();

  let plantFav;
  if (favData != null) {
    plantFav = PLANTS.filter((item) => favData.includes(item.id));
  } else {
    plantFav = [];
  }

  useEffect(() => {
    getFromStorage();
  }, [isFocused]);

  const getFromStorage = async () => {
    const storageData = await AsyncStorage.getItem("favorite");
    setFavData(storageData != null ? JSON.parse(storageData) : []);

    if (favData != null && storageData != null)
      plantFav = PLANTS.filter((item) =>
        JSON.parse(storageData).includes(item.id)
      );
    else plantFav = [];
  };

  const removeAllStorage = async () => {
    Alert.alert(
      "Are you sure?",
      "You really want to remove all your favorite collection?",
      [
        {
          text: "No",
          onPress: () => { },
          style: "destructive",
        },
        {
          text: "Yes",
          onPress: () => {
            AsyncStorage.clear();
            setFavData([]);
            plantFav = [];
          },
        },
      ]
    );
  };

  const removeDataFromStorage = async (id) => {
    const list = favData.filter((item) => item !== id);
    await AsyncStorage.setItem("favorite", JSON.stringify(list));
    setFavData(list);
  };

  return (
    <ScrollView style={styles.container}>
      {plantFav.length !== 0 ? (
        <View>
          <View style={styles.textHeaderContainer}>
            <Text style={styles.textHeader}>Favorite Collection</Text>
          </View>
          <View style={styles.clearContainer}>
            <TouchableOpacity
              style={styles.innerClearContainer}
              onPress={removeAllStorage}
            >
              <Ionicons name="trash" size={25} color="grey" />
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 5,
                  marginLeft: 5,
                  color: "grey",
                }}
              >
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              data={plantFav}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              scrollEnabled={false}
              numColumns={2}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <FavoriteItem
                  navigation={navigation}
                  data={item}
                  removeDataFromStorage={removeDataFromStorage}
                />
              )}
            />
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Image source={require("../../assets/images/EmptyBox.png")} />
          <Text style={styles.textEmpty}>Your favorite is empty</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  clearContainer: {
    marginHorizontal: 20,
  },
  innerClearContainer: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  textHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.green,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  emptyContainer: {
    height: 550,
    justifyContent: "center",
    alignItems: "center",
  },
  textEmpty: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
