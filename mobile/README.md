# AVNIVO Mobile App (React Native / Expo)

India's Next-Generation Affiliate Product Discovery & Price Comparison Mobile Application.

## Key Mobile Features
- **Live Cloud Sync**: Seamlessly connected to the live AVNIVO Supabase database and Vercel APIs.
- **Amazon & Flipkart Comparison**: Shows live indicative prices from Indian merchant feeds.
- **Direct Merchant Checkout**: "Buy Now" links redirect directly to merchant store apps/browsers with your tracking ID.
- **Smart Category Navigation**: Electronics, Fashion, Home, Beauty, Fitness, Books, Baby & Travel.
- **Native Bottom Tab Navigation**: Home, Shop/Search, Best Deals, Saved Wishlist.

## Running Locally

1. Open a terminal in the `mobile` directory:
   ```bash
   cd mobile
   npm install
   ```

2. Start the Expo development server:
   ```bash
   npx expo start
   ```

3. Scan the QR code using the **Expo Go** app on your Android or iPhone.

## Building Android APK / AAB for Play Store

Using Expo Application Services (EAS):

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to your Expo account
eas login

# Build standalone Android APK
eas build -p android --profile preview
```
