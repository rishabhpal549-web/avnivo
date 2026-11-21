import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { fetchProducts, Product } from "../services/api";
import { ProductCard } from "../components/ProductCard";
import { colors } from "../theme/colors";

export function DealsScreen({ navigation }: any) {
  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ limit: 30 }).then((res) => {
      // Sort by highest discount percentage
      const sorted = res.products.sort((a, b) => b.discountPercent - a.discountPercent);
      setDeals(sorted);
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.tag}>⚡ VERIFIED LIVE DEALS</Text>
        <Text style={styles.title}>Up to 70% Off on Amazon &amp; Flipkart</Text>
        <Text style={styles.sub}>
          Real discounts verified against merchant price histories in India.
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={deals}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate("ProductDetail", { product: item })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  banner: {
    backgroundColor: "#DC2626",
    padding: 16,
  },
  tag: {
    color: "#FEE2E2",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  sub: {
    color: "#FECACA",
    fontSize: 11,
  },
});
