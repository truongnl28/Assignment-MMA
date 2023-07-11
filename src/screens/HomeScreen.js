import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CategoryList from "../components/CategoryList";
import Card from "../components/Card";
import { useIsFocused } from "@react-navigation/native";
import { CATEGORIES } from "../../database/categories";
import { PLANTS } from "../../database/plants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [plants, setPlant] = useState(PLANTS);
  const [categoryIndex, setCategoryIndex] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [favData, setFavData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getFromStorage();
  }, [isFocused]);

  const updateFavData = (list) => {
    setFavData(list);
  };

  const getFromStorage = async () => {
    const data = await AsyncStorage.getItem("favorite");
    setFavData(data != null ? JSON.parse(data) : []);
  };

  const selectCategory = (categoryIndex) => {
    setCategoryIndex(categoryIndex);
    if (categoryIndex == "c0") {
      setPlant(PLANTS);
    } else {
      setPlant(PLANTS.filter((item) => item.categoriId === categoryIndex));
    }
  };

  const changeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: COLORS.green, }}>Feng Shui Plants</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="black" />
          <TextInput
            placeholder="Search"
            style={styles.textInput}
            onChangeText={changeSearch}
          />
        </View>
      </View>

      <CategoryList
        categories={CATEGORIES}
        categoryIndex={categoryIndex}
        setCategoryIndex={selectCategory}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        numColumns={2}
        data={plants.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={({ item }) => (
          <Card
            navigation={navigation}
            data={item}
            favData={favData}
            setFavData={setFavData}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  searchBox: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  textInput: {
    marginLeft: 15,
    flex: 1,
    fontWeight: "bold",
  },
});
