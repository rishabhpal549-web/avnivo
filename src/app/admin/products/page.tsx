"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { Package, Plus, Trash2, ExternalLink, X, Check } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [indicativePrice, setIndicativePrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = () => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      });
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete product.");
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          categoryId,
          indicativePrice,
          originalPrice,
          images: [imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"],
          description,
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        setName("");
        setCategoryId("");
        setIndicativePrice("");
        setOriginalPrice("");
        setImageUrl("");
        setDescription("");
        fetchProducts();
      } else {
        alert("Failed to create product.");
      }
    } catch {
      alert("Error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary font-display">
            Product Catalog Management
          </h2>
          <p className="text-xs text-gray-500">
            Total {products.length} products with verified multi-merchant offers
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Indicative Price</th>
                <th className="py-3 px-4">Offers</th>
                <th className="py-3 px-4">Clicks / Views</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => {
                let img = "";
                try {
                  const arr = JSON.parse(p.images);
                  img = arr[0];
                } catch {
                  img = p.images;
                }

                return (
                  <tr key={p.id} className="hover:bg-surface/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {img && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={img}
                            alt=""
                            className="w-10 h-10 object-contain rounded bg-white p-1 border shrink-0"
                          />
                        )}
                        <div>
                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            className="font-bold text-primary hover:text-secondary line-clamp-1"
                          >
                            {p.name}
                          </Link>
                          <span className="text-[10px] text-gray-400">/{p.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{p.category?.name}</td>
                    <td className="py-3 px-4 font-bold text-primary font-display">
                      {formatINR(p.indicativePrice)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-blue-50 text-secondary font-bold rounded">
                        {p.merchantOffers?.length || 0} Stores
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      <strong>{p.clicksCount}</strong> clicks / {p.viewsCount} views
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 relative border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-primary font-display mb-1">
              Add New Product to AVNIVO
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Enter genuine product details and indicative pricing.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sony WH-1000XM5 ANC Headphones"
                  className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Category</label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-secondary bg-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Indicative Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={indicativePrice}
                    onChange={(e) => setIndicativePrice(e.target.value)}
                    placeholder="26990"
                    className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="34990"
                    className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the product..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-secondary"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-3 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
              >
                {submitting ? "Saving Product..." : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
