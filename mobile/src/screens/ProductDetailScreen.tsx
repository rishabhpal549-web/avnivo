import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import { Product } from "../services/api";
import { colors } from "../theme/colors";

export function ProductDetailScreen({ route }: any) {
  const { product }: { product: Product } = route.params;

  const handleBuyNow = (affiliateUrl: string) => {
    const fullUrl = affiliateUrl.startsWith("http")
      ? affiliateUrl
      : `https://avnivo.vercel.app${affiliateUrl}`;
    Linking.openURL(fullUrl).catch((err) => console.error("Could not open merchant link:", err));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${product.name} at ₹${product.indicativePrice.toLocaleString("en-IN")} on AVNIVO: https://avnivo.vercel.app/product/${product.slug}`,
      });
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  const imageUrl = product.images?.[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800";

  return (
    <ScrollView style={styles.container}>
      {/* Product Image Gallery */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
        {product.discountPercent > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discountPercent}% OFF</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        {/* Brand & Category */}
        <View style={styles.metaRow}>
          {product.brandName && <Text style={styles.brand}>{product.brandName.toUpperCase()}</Text>}
          <Text style={styles.category}>{product.categoryName}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{product.name}</Text>

        {/* Rating Row */}
        <View style={styles.ratingRow}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingText}>{product.rating.toFixed(1)} / 5.0</Text>
          <Text style={styles.reviewsText}>
            ({product.reviewCount.toLocaleString("en-IN")} verified buyer ratings)
          </Text>
        </View>

        {/* Price Card */}
        <View style={styles.priceCard}>
          <View>
            <Text style={styles.priceLabel}>Lowest Indicative Price</Text>
            <View style={styles.priceValues}>
              <Text style={styles.price}>₹{product.indicativePrice.toLocaleString("en-IN")}</Text>
              {product.originalPrice > product.indicativePrice && (
                <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString("en-IN")}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>Share ↗</Text>
          </TouchableOpacity>
        </View>

        {/* Merchant Comparison Table */}
        <View style={styles.compareSection}>
          <Text style={styles.sectionHeading}>Compare Merchant Stores</Text>
          <Text style={styles.sectionSubheading}>
            Prices verified from official merchant product listings.
          </Text>

          {product.offers && product.offers.length > 0 ? (
            product.offers.map((offer, idx) => (
              <View key={offer.id || idx} style={styles.offerCard}>
                <View style={styles.offerInfo}>
                  <Text style={styles.merchantName}>{offer.merchantName}</Text>
                  <Text style={styles.deliveryText}>{offer.deliveryInfo || "In Stock"}</Text>
                </View>

                <View style={styles.offerPriceSection}>
                  <Text style={styles.offerPrice}>
                    ₹{offer.indicativePrice.toLocaleString("en-IN")}
                  </Text>
                  <TouchableOpacity
                    style={styles.buyButton}
                    onPress={() => handleBuyNow(offer.affiliateUrl)}
                  >
                    <Text style={styles.buyButtonText}>Buy Now ↗</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noOffers}>No merchant offers currently available.</Text>
          )}
        </View>

        {/* Key Features */}
        {product.keyFeatures && product.keyFeatures.length > 0 && (
          <View style={styles.featuresSection}>
            <Text style={styles.sectionHeading}>Key Highlights</Text>
            {product.keyFeatures.map((feat, idx) => (
              <View key={idx} style={styles.featureItem}>
                <Text style={styles.featureBullet}>✓</Text>
                <Text style={styles.featureText}>{feat}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <View style={styles.specsSection}>
            <Text style={styles.sectionHeading}>Technical Specifications</Text>
            {Object.entries(product.specifications).map(([key, val], idx) => (
              <View key={idx} style={styles.specRow}>
                <Text style={styles.specKey}>{key}</Text>
                <Text style={styles.specVal}>{String(val)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Description */}
        <View style={styles.descSection}>
          <Text style={styles.sectionHeading}>Product Overview</Text>
          <Text style={styles.descText}>{product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    height: 300,
    backgroundColor: colors.surface,
    padding: 20,
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#DC2626",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  brand: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.secondary,
    letterSpacing: 1,
  },
  category: {
    fontSize: 12,
    color: colors.muted,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
    lineHeight: 24,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 16,
  },
  ratingStar: {
    color: colors.warning,
    fontSize: 14,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.charcoal,
  },
  reviewsText: {
    fontSize: 12,
    color: colors.muted,
  },
  priceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 11,
    color: colors.muted,
    marginBottom: 2,
  },
  priceValues: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  shareButton: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  shareButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.secondary,
  },
  compareSection: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 4,
  },
  sectionSubheading: {
    fontSize: 11,
    color: colors.muted,
    marginBottom: 12,
  },
  offerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  offerInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.charcoal,
  },
  deliveryText: {
    fontSize: 11,
    color: colors.success,
    marginTop: 2,
  },
  offerPriceSection: {
    alignItems: "flex-end",
    gap: 6,
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
  },
  buyButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  noOffers: {
    fontSize: 12,
    color: colors.muted,
    fontStyle: "italic",
  },
  featuresSection: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  featureBullet: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  featureText: {
    fontSize: 12,
    color: colors.charcoal,
    flex: 1,
    lineHeight: 18,
  },
  specsSection: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  specKey: {
    fontSize: 12,
    color: colors.muted,
    flex: 1,
  },
  specVal: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.charcoal,
    flex: 1,
    textAlign: "right",
  },
  descSection: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 40,
  },
  descText: {
    fontSize: 13,
    color: colors.charcoal,
    lineHeight: 20,
    marginTop: 8,
  },
});
