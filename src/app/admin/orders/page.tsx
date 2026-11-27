"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  IndianRupee,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  User,
  ShieldCheck,
} from "lucide-react";
import { formatINR, formatTimeAgo } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
        );
      } else {
        alert("Failed to update order status");
      }
    } catch {
      alert("Error updating order");
    } finally {
      setUpdatingId(null);
    }
  };

  // Stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
  const shippedOrders = orders.filter((o) => ["SHIPPED", "DELIVERED"].includes(o.status)).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      (o.orderNumber || "").toLowerCase().includes(term) ||
      (o.customerName || "").toLowerCase().includes(term) ||
      (o.customerPhone || "").toLowerCase().includes(term) ||
      (o.city || "").toLowerCase().includes(term) ||
      (o.pincode || "").toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "PROCESSING":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "SHIPPED":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "DELIVERED":
        return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCustomerWhatsAppUrl = (order: any) => {
    const cleanPhone = (order.customerPhone || "").replace(/\D/g, "");
    const phoneWithCountry = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
    const text = encodeURIComponent(
      `Hello ${order.customerName}! 📦\nThis is regarding your AVNIVO order #${order.orderNumber}.\n` +
      `Your order for ₹${order.totalAmount} (${order.paymentMethod === "COD" ? "Cash on Delivery" : "UPI"}) is currently: *${order.status}*.\n` +
      `Thank you for shopping on avnivo.in!`
    );
    return `https://wa.me/${phoneWithCountry}?text=${text}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary font-display flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-secondary" />
            Customer Direct Orders
          </h2>
          <p className="text-xs text-gray-500">
            Manage real customer orders placed directly on your AVNIVO store (Cash on Delivery & Online)
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-secondary px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 transition-colors shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
            Total Orders
          </span>
          <div className="text-2xl font-black text-primary font-display mt-1">
            {totalOrders}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider block">
            New / Pending
          </span>
          <div className="text-2xl font-black text-amber-700 font-display mt-1">
            {pendingOrders}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block">
            Shipped / Delivered
          </span>
          <div className="text-2xl font-black text-indigo-700 font-display mt-1">
            {shippedOrders}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block">
            Total Order Value
          </span>
          <div className="text-2xl font-black text-emerald-700 font-display mt-1">
            {formatINR(totalRevenue)}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by Order #, Customer Name, Phone, City, Pincode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/30"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          {["ALL", "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
                  statusFilter === status
                    ? "bg-secondary text-white"
                    : "bg-surface text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
          <RefreshCw className="w-6 h-6 animate-spin text-secondary mx-auto mb-2" />
          <p className="text-xs text-gray-500">Loading customer orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-3">
          <Package className="w-12 h-12 text-gray-300 mx-auto" />
          <h4 className="text-sm font-bold text-primary">No Direct Orders Found</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {searchTerm || statusFilter !== "ALL"
              ? "No orders match your filter criteria."
              : "When customers place orders directly on your website using Cash on Delivery or UPI, they will appear here with full customer contact & shipping address!"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-all space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-secondary flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-primary font-mono">
                        {order.orderNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                      <span>({formatTimeAgo(order.createdAt)})</span>
                    </span>
                  </div>
                </div>

                {/* Status Changer */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[11px] text-gray-400">Change Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                    disabled={updatingId === order.id}
                    className="text-xs font-bold border border-gray-200 rounded-lg px-2.5 py-1.5 bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  >
                    <option value="PENDING">PENDING (New)</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PROCESSING">PROCESSING (Packing)</option>
                    <option value="SHIPPED">SHIPPED (In Transit)</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              {/* Order Grid: Customer Info + Shipping + Items + Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
                {/* 1. Customer & Delivery Address */}
                <div className="lg:col-span-5 bg-surface rounded-xl p-3.5 space-y-2 border border-gray-200/60">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Customer & Shipping Details
                  </span>

                  <div className="font-bold text-primary text-sm flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-secondary" />
                    <span>{order.customerName}</span>
                  </div>

                  <div className="space-y-1 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <strong className="text-primary font-mono">{order.customerPhone}</strong>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        {order.customerAddress}
                        {order.city ? `, ${order.city}` : ""}
                        {order.state ? `, ${order.state}` : ""}
                        {order.pincode ? ` - PIN: ${order.pincode}` : ""}
                      </span>
                    </div>
                  </div>

                  {/* Customer Quick Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200/80">
                    <a
                      href={`tel:${order.customerPhone}`}
                      className="inline-flex items-center gap-1 bg-white border border-gray-200 hover:border-emerald-500 text-gray-700 hover:text-emerald-700 px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-colors"
                    >
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>Call Customer</span>
                    </a>

                    <a
                      href={getCustomerWhatsAppUrl(order)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>

                {/* 2. Products Ordered */}
                <div className="lg:col-span-4 bg-surface rounded-xl p-3.5 space-y-2 border border-gray-200/60">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Ordered Items
                  </span>

                  {order.items && order.items.length > 0 ? (
                    order.items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-2.5 py-1">
                        {item.productImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.productImage}
                            alt=""
                            className="w-10 h-10 object-contain rounded-lg bg-white p-0.5 border border-gray-200 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                            <Package className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-primary truncate">
                            {item.productTitle || "Product Item"}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Qty: <strong className="text-primary">{item.quantity}</strong> × {formatINR(item.unitPrice)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 py-1">Direct Store Item</div>
                  )}
                </div>

                {/* 3. Payment Mode & Total */}
                <div className="lg:col-span-3 bg-surface rounded-xl p-3.5 flex flex-col justify-between border border-gray-200/60">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Payment Details
                    </span>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-gray-200">
                      <span className="text-secondary">●</span>
                      <span>{order.paymentMethod === "COD" ? "Cash on Delivery" : "UPI / Online"}</span>
                    </div>

                    {order.notes && (
                      <div className="text-[11px] text-gray-500 bg-white p-2 rounded-lg border border-gray-200">
                        <strong>Note:</strong> {order.notes}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-200/80">
                    <span className="text-[11px] text-gray-400 block">Total Amount:</span>
                    <span className="text-base font-black text-primary font-display">
                      {formatINR(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
