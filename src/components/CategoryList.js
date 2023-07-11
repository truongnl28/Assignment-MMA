import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Pressable, } from "react-native";
import React, { useState } from "react";
import COLORS from "../constants/colors";

const CategoryList = ({ categories, categoryIndex, setCategoryIndex }) => {
  const CategoryItem = ({ category }) => {
    return (
      <TouchableOpacity
        key={category.id}
        activeOpacity={0.8}
        onPress={() => setCategoryIndex(category.id)}
      >
        <View
          style={[
            styles.categoryItemContainer,
            categoryIndex === category.id && {
              backgroundColor: category.color,
            },
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              categoryIndex === category.id && {
                color: "white",
                fontWeight: "bold",
              },
            ]}
          >
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.categoryContainer}>
      <FlatList
        data={categories}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item }) => <CategoryItem category={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  categoryContainer: {
    marginTop: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
  },
  categoryItemContainer: {
    backgroundColor: COLORS.light,
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
