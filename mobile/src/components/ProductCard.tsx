import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "../services/api";
import { colors } from "../theme/colors";

interface Props {
  product: Product;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: Props) {
  const imageUrl = product.images?.[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500";
  const primaryOffer = product.offers?.[0];

  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.card} onPress={onPress}>
      {product.discountPercent > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{product.discountPercent}% OFF</Text>
        </View>
      )}

      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />

      <View style={styles.content}>
        {product.brandName ? (
          <Text style={styles.brand}>{product.brandName.toUpperCase()}</Text>
        ) : null}

        <Text numberOfLines={2} style={styles.title}>
          {product.name}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.reviewsText}>({product.reviewCount.toLocaleString("en-IN")})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.indicativePrice.toLocaleString("en-IN")}</Text>
          {product.originalPrice > product.indicativePrice && (
            <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString("en-IN")}</Text>
          )}
        </View>

        {primaryOffer && (
          <View style={styles.merchantRow}>
            <Text style={styles.merchantLabel}>Lowest on: </Text>
            <Text style={styles.merchantName}>{primaryOffer.merchantName}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#DC2626",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    zIndex: 2,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#F8FAFC",
  },
  content: {
    gap: 4,
  },
  brand: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.secondary,
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.charcoal,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  ratingStar: {
    color: colors.warning,
    fontSize: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.charcoal,
  },
  reviewsText: {
    fontSize: 11,
    color: colors.muted,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  merchantRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  merchantLabel: {
    fontSize: 10,
    color: colors.muted,
  },
  merchantName: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.secondary,
  },
});
