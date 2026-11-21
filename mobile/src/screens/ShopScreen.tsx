import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { fetchProducts, fetchCategories, Product, Category } from "../services/api";
import { ProductCard } from "../components/ProductCard";
import { colors } from "../theme/colors";

export function ShopScreen({ route, navigation }: any) {
  const initialCategory = route?.params?.category || "";
  const initialQuery = route?.params?.query || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [cats, prods] = await Promise.all([
      fetchCategories(),
      fetchProducts({ q: query, category: selectedCat, limit: 30 }),
    ]);
    setCategories(cats);
    setProducts(prods.products);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [selectedCat]);

  const handleSearchSubmit = () => {
    load();
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search all products..."
          placeholderTextColor="#94A3B8"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.btn} onPress={handleSearchSubmit}>
          <Text style={styles.btnText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Category Pills */}
      <View style={styles.pillsContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: "all", name: "All Categories", slug: "" }, ...categories]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.pill,
                selectedCat === item.slug && styles.activePill,
              ]}
              onPress={() => setSelectedCat(item.slug)}
            >
              <Text
                style={[
                  styles.pillText,
                  selectedCat === item.slug && styles.activePillText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Product List */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate("ProductDetail", { product: item })}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Products Found</Text>
              <Text style={styles.emptySub}>
                Try adjusting your search keyword or selected category.
              </Text>
            </View>
          }
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
  searchBar: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: colors.surface,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
  },
  btn: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  pillsContainer: {
    backgroundColor: colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    marginRight: 8,
  },
  activePill: {
    backgroundColor: colors.primary,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.charcoal,
  },
  activePillText: {
    color: "#FFFFFF",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    paddingHorizontal: 30,
  },
});
