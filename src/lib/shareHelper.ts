/**
 * Helper to share products and deals with friends.
 * Opens WhatsApp sharing without displaying any third-party WhatsApp logo.
 */
export function shareWithFriends({
  title,
  indicativePrice,
  discountPercent,
  slug,
  customUrl,
}: {
  title: string;
  indicativePrice?: number | string;
  discountPercent?: number;
  slug?: string;
  customUrl?: string;
}) {
  if (typeof window === "undefined") return;

  const origin = window.location.origin || "https://avnivo.vercel.app";
  let targetUrl = customUrl || (slug ? `${origin}/product/${slug}` : window.location.href);

  // Append partner referral code if present
  try {
    const partner = localStorage.getItem("avnivo_partner_account");
    if (partner) {
      const parsed = JSON.parse(partner);
      if (parsed.affiliateCode) {
        const sep = targetUrl.includes("?") ? "&" : "?";
        targetUrl = `${targetUrl}${sep}ref=${parsed.affiliateCode}`;
      }
    }
  } catch (e) {
    // Ignore
  }

  // Pre-formatted message for friends
  const priceText = indicativePrice ? `\n💰 सिर्फ ₹${Number(indicativePrice).toLocaleString("en-IN")} में!` : "";
  const discountText = discountPercent && discountPercent > 0 ? ` (${discountPercent}% OFF)` : "";

  const text = `🔥 *${title}*${priceText}${discountText}\n\n✨ AVNIVO पर बेहतरीन डील और प्राइस कंपैरिजन देखें:\n👉 ${targetUrl}`;

  // Try native navigator.share first on mobile devices if available
  if (navigator.share && /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)) {
    navigator
      .share({
        title: title,
        text: text,
        url: targetUrl,
      })
      .catch(() => {
        // Fallback to WhatsApp URL if user cancels or share fails
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
      });
  } else {
    // Desktop / Web fallback directly opens WhatsApp send link
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }
}
