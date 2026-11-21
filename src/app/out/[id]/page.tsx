import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ExternalLink, ShieldCheck, ArrowRight, Store } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function OutboundRedirectPage({ params }: Props) {
  const offer = await prisma.merchantOffer.findUnique({
    where: { id: params.id },
    include: {
      product: {
        include: { brand: true },
      },
      merchant: true,
    },
  });

  if (!offer) {
    notFound();
  }

  // Redirect link through click-logging endpoint
  const redirectUrl = `/api/affiliate/redirect?offerId=${offer.id}&direct=true`;

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        {/* AVNIVO Brand Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white shadow-lg mb-6">
          <Store className="w-8 h-8 text-accent" />
        </div>

        <h1 className="text-2xl font-bold text-primary font-display mb-2">
          Redirecting to {offer.merchant.name}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          You are visiting the verified merchant store to complete your purchase.
        </p>

        {/* Product Snapshot */}
        <div className="bg-surface rounded-xl p-4 mb-6 border border-gray-200/60 text-left">
          <div className="text-xs uppercase font-semibold text-secondary mb-1">
            {offer.product.brand?.name || "Verified Product"}
          </div>
          <h2 className="text-base font-medium text-charcoal line-clamp-2 mb-2">
            {offer.product.name}
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              {formatINR(offer.indicativePrice)}
            </span>
            {offer.originalPrice && offer.originalPrice > offer.indicativePrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatINR(offer.originalPrice)}
              </span>
            )}
          </div>
          {offer.deliveryInfo && (
            <div className="text-xs text-green-700 mt-2 font-medium flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> {offer.deliveryInfo}
            </div>
          )}
        </div>

        {/* Affiliate Disclosure */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-900 text-left mb-6 leading-relaxed">
          <strong>Affiliate Disclosure:</strong> AVNIVO may earn a small referral commission if you complete an eligible purchase on {offer.merchant.name}, at zero extra cost to you. We do not process payments or handle fulfillment.
        </div>

        {/* Continue Button */}
        <a
          href={redirectUrl}
          rel="nofollow noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all group"
        >
          <span>Continue to {offer.merchant.name}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="mt-4">
          <Link
            href={`/product/${offer.product.slug}`}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Return to AVNIVO product details
          </Link>
        </div>
      </div>
    </div>
  );
}
