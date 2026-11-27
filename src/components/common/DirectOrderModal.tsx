"use client";

import React, { useState } from "react";
import {
  X,
  ShoppingBag,
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  Send,
  Loader2,
  Clock,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface DirectOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    indicativePrice: number;
    originalPrice?: number;
    images?: string[];
  };
}

export function DirectOrderModal({ isOpen, onClose, product }: DirectOrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI">("COD");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  if (!isOpen) return null;

  const unitPrice = Number(product.indicativePrice) || 0;
  const totalAmount = unitPrice * quantity;
  const thumbImage = product.images?.[0] || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!customerName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit mobile number for order verification.");
      return;
    }
    if (!customerAddress.trim()) {
      setError("Please enter complete delivery address (House No, Street, Landmark).");
      return;
    }
    if (!pincode.trim() || pincode.trim().length < 6) {
      setError("Please enter a valid 6-digit delivery pincode.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim() || null,
          customerAddress: customerAddress.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          paymentMethod,
          notes: notes.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to place order. Please try again.");
      }

      setOrderSuccess(data.order);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = (order: any) => {
    const text = encodeURIComponent(
      `Hello AVNIVO Store! 🛍️\nI just placed an order on avnivo.in!\n\n` +
      `📦 *Order ID:* ${order.orderNumber}\n` +
      `🏷️ *Product:* ${order.productName}\n` +
      `🔢 *Quantity:* ${order.quantity}\n` +
      `💰 *Total Amount:* ${formatINR(order.totalAmount)}\n` +
      `💳 *Payment:* ${order.paymentMethod === "COD" ? "Cash on Delivery" : "UPI / Online"}\n` +
      `👤 *Name:* ${order.customerName}\n` +
      `📞 *Phone:* ${order.customerPhone}\n` +
      `📍 *Delivery Address:* ${order.customerAddress}, ${order.city || ""} - ${order.pincode}\n\n` +
      `Please confirm my order and share dispatch details!`
    );
    return `https://wa.me/919519572366?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-light text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-secondary" />
            <div>
              <h3 className="font-bold text-base leading-tight font-display">
                {orderSuccess ? "Order Confirmed! 🎉" : "Order Directly from AVNIVO Store"}
              </h3>
              <p className="text-[11px] text-gray-300">
                {orderSuccess ? "Your order has been recorded" : "Fast delivery across India • Verified Genuine"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {orderSuccess ? (
          /* Success Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                Congratulations!
              </span>
              <h4 className="text-xl font-black text-primary font-display mt-0.5">
                Order Placed Successfully!
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Order Number: <strong className="text-primary font-mono bg-gray-100 px-2 py-0.5 rounded">{orderSuccess.orderNumber}</strong>
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-4 text-left border border-gray-200 text-xs space-y-2">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-500">Product:</span>
                <span className="font-bold text-primary truncate max-w-[200px]">{orderSuccess.productName}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-500">Quantity & Total:</span>
                <span className="font-bold text-primary">{orderSuccess.quantity} pcs • {formatINR(orderSuccess.totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-500">Payment Mode:</span>
                <span className="font-bold text-secondary bg-blue-50 px-2 py-0.5 rounded">
                  {orderSuccess.paymentMethod === "COD" ? "Cash on Delivery" : "UPI / Online"}
                </span>
              </div>
              <div className="flex justify-between items-start pt-1">
                <span className="text-gray-500 shrink-0">Deliver To:</span>
                <span className="font-medium text-right text-gray-700 ml-4">
                  {orderSuccess.customerName}, {orderSuccess.customerAddress}, {orderSuccess.city} ({orderSuccess.pincode})
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={getWhatsAppLink(orderSuccess)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-xs sm:text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Send Order Details to WhatsApp Support</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 text-xs font-semibold text-gray-500 hover:text-primary transition-colors"
              >
                Close & Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Product Summary Card */}
            <div className="flex items-center gap-3 bg-surface p-3 rounded-2xl border border-gray-200">
              {thumbImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbImage}
                  alt={product.name}
                  className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-gray-200 shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-primary truncate leading-tight">
                  {product.name}
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-black text-primary font-display">
                    {formatINR(unitPrice)}
                  </span>
                  {product.originalPrice && product.originalPrice > unitPrice && (
                    <span className="text-[11px] text-gray-400 line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Free Delivery
                  </span>
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-sm font-bold text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold text-primary">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-sm font-bold text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl">
                {error}
              </div>
            )}

            {/* Customer Contact Details */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                1. Delivery & Contact Details
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/30"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    10-Digit Mobile / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/30"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                  Complete Address (House No, Street, Colony, Landmark) *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="e.g. Flat 302, Green Valley Apartments, Near City Hospital"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/30 resize-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    placeholder="6 Digits"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/30"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lucknow"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UP"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                2. Choose Payment Mode
              </span>

              <div className="grid grid-cols-2 gap-3">
                <label
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                    paymentMethod === "COD"
                      ? "border-secondary bg-blue-50/50 ring-2 ring-secondary/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-primary">Cash on Delivery</div>
                    <div className="text-[10px] text-gray-500">Pay cash at doorstep</div>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod("UPI")}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                    paymentMethod === "UPI"
                      ? "border-secondary bg-blue-50/50 ring-2 ring-secondary/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-primary">UPI / Online</div>
                    <div className="text-[10px] text-gray-500">GPay, PhonePe, Paytm</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Total & Place Order Button */}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Total Payable Amount:</span>
                <span className="text-lg font-black text-primary font-display">
                  {formatINR(totalAmount)}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming Order...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Place Order ({formatINR(totalAmount)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-secondary" />
                  Free Home Delivery
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-green-600" />
                  100% Genuine Guarantee
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
