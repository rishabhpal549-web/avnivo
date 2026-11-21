import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { fetchCategories, fetchProducts, Product, Category } from "../services/api";
import { ProductCard } from "../components/ProductCard";
import { colors } from "../theme/colors";

export function HomeScreen({ navigation }: any) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [bestDeals, setBestDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    const [cats, prods] = await Promise.all([
      fetchCategories(),
      fetchProducts({ limit: 12 }),
    ]);
    setCategories(cats);
    setTrending(prods.products.filter((p) => p.isTrending || p.rating >= 4.4).slice(0, 6));
    setBestDeals(prods.products.filter((p) => p.discountPercent >= 20).slice(0, 6));
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate("Shop", { query: searchQuery.trim() });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Brand Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerBrand}>AVNIVO</Text>
          <Text style={styles.headerTagline}>Discover. Compare. Shop.</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>India's #1 Hub</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search smartphones, laptops, shoes, brands..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Offer Banner */}
      <View style={styles.heroBanner}>
        <Text style={styles.heroTag}>⚡ SMART SHOPPING ENGINE</Text>
        <Text style={styles.heroTitle}>Compare Amazon &amp; Flipkart Prices Live</Text>
        <Text style={styles.heroSub}>Find genuine deals with 100% verified indicative prices.</Text>
      </View>

      {/* Categories Horizontal Pills */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={styles.categoryPill}
            onPress={() => navigation.navigate("Shop", { category: c.slug })}
          >
            <Text style={styles.categoryPillText}>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Trending Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🔥 Trending Products</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={{ marginVertical: 30 }} />
      ) : (
        <View style={styles.grid}>
          {trending.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onPress={() => navigation.navigate("ProductDetail", { product: p })}
            />
          ))}
        </View>
      )}

      {/* Best Deals Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🏷️ Top Discounted Deals</Text>
      </View>

      <View style={styles.grid}>
        {bestDeals.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onPress={() => navigation.navigate("ProductDetail", { product: p })}
          />
        ))}
      </View>

      {/* Affiliate Transparency Footer */}
      <View style={styles.transparencyBox}>
        <Text style={styles.transparencyTitle}>AVNIVO Transparency Guarantee</Text>
        <Text style={styles.transparencyText}>
          We display indicative prices from verified merchant feeds. When you purchase via our
          links, we may receive an affiliate fee without any extra cost to you.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  headerBrand: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.primary,
    letterSpacing: 1.5,
  },
  headerTagline: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: "500",
  },
  badge: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.secondary,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: colors.charcoal,
  },
  searchButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  heroBanner: {
    margin: 16,
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  heroTag: {
    color: "#60A5FA",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
    marginBottom: 6,
  },
  heroSub: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.secondary,
  },
  categoryScroll: {
    paddingLeft: 16,
    marginBottom: 10,
  },
  categoryPill: {
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.charcoal,
  },
  grid: {
    paddingHorizontal: 16,
  },
  transparencyBox: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    marginBottom: 30,
  },
  transparencyTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 4,
  },
  transparencyText: {
    fontSize: 11,
    color: "#475569",
    lineHeight: 16,
  },
});
