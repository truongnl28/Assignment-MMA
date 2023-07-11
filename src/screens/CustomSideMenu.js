import { StyleSheet, Text, View, Image, FlatList, ImageBackground, TouchableOpacity, } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList, } from "@react-navigation/drawer";

const CustomSideMenu = (props) => {

  const Item = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.item}>
          <Ionicons name={item.icon} size={20} color="black" />
          <Text style={styles.textItem}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "white" }}
      >
        <View style={styles.itemContainer}>
          <DrawerItemList {...props} activeTintColor="gray" />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 10
  },
  textProfile: {
    fontWeight: "bold",
    marginTop: 10,
    overflow: "hidden",
    color: "white",
  },
  itemContainer: { backgroundColor: "white", marginTop: 10 },
  item: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical: 6,
  },
  textItem: {
    fontSize: 18,
    marginLeft: 10,
  },
  bottomContainer: {
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderTopColor: "lightgrey",
  },
});
