import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <View style={styles.container}>
      <Ionicons name="ios-search" size={25} />
      <View style={styles.searchInput}>
        <TextInput
          placeholder="Search for Rooms"
          value={searchInput}
          onChangeText={(text) => {
            setSearchInput(text);
          }}
          style={{ fontSize: 18 }}
        />
      </View>
      <Ionicons name="ios-options" size={25} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderBottomWidth: 1,
    borderColor: "grey",
    paddingVertical: 7,
    marginHorizontal: 10,
    width: "75%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default SearchBar;
