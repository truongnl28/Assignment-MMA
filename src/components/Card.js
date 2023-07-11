import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TouchableWithoutFeedback, Animated, } from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const width = Dimensions.get("screen").width / 2 - 30;

const Card = ({ data, navigation, favData, setFavData }) => {
  const [scaleValue, setScaleValue] = useState(new Animated.Value(1));

  const setDataToStorage = async () => {
    let list;
    if (favData == []) {
      list = [data.id];
      await AsyncStorage.setItem("favorite", JSON.stringify(list));
    } else {
      list = [...favData, data.id];
      await AsyncStorage.setItem("favorite", JSON.stringify(list));
    }
    setFavData(list);
  };

  const removeDataFromStorage = async () => {
    const list = favData.filter((item) => item !== data.id);
    await AsyncStorage.setItem("favorite", JSON.stringify(list));
    setFavData(list);
  };

  const changeFavorite = () => {
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    if (favData.includes(data.id)) {
      removeDataFromStorage();
    } else {
      setDataToStorage();
    }
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", data)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageItem} source={{ uri: data.imageUrl }} />
        </View>
        <Text numberOfLines={1} style={styles.nameItem}>
          {data.name}
        </Text>
        <Text style={styles.origin} numberOfLines={1}>
          {data.origin}
        </Text>
        <View style={styles.infoContainer}>
          <TouchableWithoutFeedback onPress={changeFavorite}>
            <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
              {favData.includes(data.id) ? (
                <AntDesign
                  style={[styles.iconStar, { marginLeft: 2.5 }]}
                  name="heart"
                  size={22}
                  color="#ff007f"
                />
              ) : (
                <AntDesign
                  style={[styles.iconStar, { marginLeft: 2.5 }]}
                  name="hearto"
                  size={22}
                  color="#ff007f"
                />
              )}
            </Animated.View>
          </TouchableWithoutFeedback>

          <View style={styles.ratingContainer}>
            <AntDesign
              style={styles.iconStar}
              name="star"
              size={14}
              color="#fff700"
            />
            <Text style={styles.ratingText}>{data.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.pink,
    width,
    marginHorizontal: 2,
    borderRadius: 20,
    marginVertical: 20,
    padding: 15,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
  },
  imageContainer: {
    width: "100%",
    height: 110,
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "black",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
  },
  imageItem: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    borderRadius: 20,
  },
  nameItem: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 18,
    color: COLORS.green,
    justifyContent: "center",
  },
  origin: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: "700",
    marginTop: 2,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  priceItem: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightgreen,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  iconStar: {
    marginRight: 5,
  },
  ratingText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});
