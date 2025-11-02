import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.searchBox}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Search events by name or category..."
      />
    </View>
  );
}
const styles = StyleSheet.create({
  searchBox: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  input: { backgroundColor: "#fff", borderRadius: 7, fontSize: 15, padding: 10, borderWidth: 1, borderColor: "#eee", elevation: 1 },
});
