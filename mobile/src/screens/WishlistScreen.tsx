import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";

export function WishlistScreen({ navigation }: any) {
  const [items] = useState<any[]>([]);

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.icon}>❤️</Text>
          <Text style={styles.title}>Your Wishlist is Empty</Text>
          <Text style={styles.sub}>
            Save your favorite electronics, fashion, and home appliances to track price drops!
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Shop")}
          >
            <Text style={styles.btnText}>Explore Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList data={items} renderItem={() => null} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 8,
  },
  sub: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
  },
  btn: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
