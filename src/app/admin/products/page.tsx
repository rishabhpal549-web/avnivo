"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import {
  Package,
  Plus,
  Trash2,
  Edit3,
  Upload,
  Eye,
  EyeOff,
  Sparkles,
  Search,
  ExternalLink,
  X,
  Check,
  AlertCircle,
  Tag,
  Link2,
  RefreshCw,
  CheckCircle2,
  Copy,
} from "lucide-react";

interface MerchantItem {
  id: string;
  name: string;
  slug: string;
}

interface CategoryItem {
  id: string;
  name: string;
  nameHindi?: string;
  slug: string;
}

interface OfferFormData {
  merchantId: string;
  merchantName: string;
  affiliateUrl: string;
  indicativePrice: string;
  originalPrice: string;
  deliveryInfo: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [merchants, setMerchants] = useState<MerchantItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [indicativePrice, setIndicativePrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [availability, setAvailability] = useState("IN_STOCK"); // IN_STOCK or UNPUBLISHED
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isBestDeal, setIsBestDeal] = useState(false);
  const [isTopPick, setIsTopPick] = useState(false);

  // Merchant Offers
  const [offers, setOffers] = useState<OfferFormData[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pageError, setPageError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = () => {
    setLoading(true);
    setPageError("");
    fetch("/api/admin/products")
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.products) {
          setProducts(data.products);
        } else {
          setPageError(data.error || "Failed to load products");
        }
      })
      .catch(() => {
        setPageError("Connection error loading products. Please click Refresh.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) {
          const flat: CategoryItem[] = [];
          data.categories.forEach((cat: any) => {
            flat.push({ id: cat.id, name: cat.name, slug: cat.slug, nameHindi: cat.nameHindi });
            if (Array.isArray(cat.children)) {
              cat.children.forEach((sub: any) => {
                flat.push({ id: sub.id, name: `↳ ${sub.name}`, slug: sub.slug, nameHindi: sub.nameHindi });
              });
            }
          });
          setCategories(flat);
        }
      })
      .catch(() => {});

    fetch("/api/merchants")
      .then((res) => res.json())
      .then((data) => {
        if (data.merchants) setMerchants(data.merchants);
      })
      .catch(() => {});
  }, []);

  const resetForm = () => {
    setIsEditing(false);
    setEditId("");
    setName("");
    setCategoryId(categories[0]?.id || "");
    setIndicativePrice("");
    setOriginalPrice("");
    setImageUrl("");
    setDescription("");
    setShortDescription("");
    setAvailability("IN_STOCK");
    setIsFeatured(false);
    setIsTrending(false);
    setIsBestDeal(false);
    setIsTopPick(false);
    setFormError("");
    setUploadError("");

    // Initialize default merchant offers for Amazon, Flipkart, Meesho
    const defaultOffers: OfferFormData[] = (merchants.length > 0 ? merchants : [
      { id: "cmwo8zrh50002banpurmp9ji8", name: "Amazon India", slug: "amazon-india" },
      { id: "cmwo8zrhc0003banplxvmvqhp", name: "Flipkart", slug: "flipkart" },
      { id: "m-meesho-01", name: "Meesho", slug: "meesho" },
    ]).map((m) => ({
      merchantId: m.id,
      merchantName: m.name,
      affiliateUrl: "",
      indicativePrice: "",
      originalPrice: "",
      deliveryInfo: "Free Delivery",
    }));

    setOffers(defaultOffers);
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (p: any) => {
    setIsEditing(true);
    setEditId(p.id);
    setName(p.name);
    setCategoryId(p.categoryId);
    setIndicativePrice(String(p.indicativePrice || ""));
    setOriginalPrice(String(p.originalPrice || ""));

    let img = "";
    try {
      const arr = JSON.parse(p.images);
      img = arr[0] || "";
    } catch {
      img = p.images || "";
    }
    setImageUrl(img);
    setDescription(p.description || "");
    setShortDescription(p.shortDescription || "");
    setAvailability(p.availability || "IN_STOCK");
    setIsFeatured(Boolean(p.isFeatured));
    setIsTrending(Boolean(p.isTrending));
    setIsBestDeal(Boolean(p.isBestDeal));
    setIsTopPick(Boolean(p.isTopPick));
    setFormError("");
    setUploadError("");

    // Map existing merchant offers
    const existingOffers: OfferFormData[] = (p.merchantOffers || []).map((o: any) => ({
      merchantId: o.merchantId || o.merchant?.id,
      merchantName: o.merchant?.name || "Merchant",
      affiliateUrl: o.affiliateUrl || "",
      indicativePrice: String(o.indicativePrice || ""),
      originalPrice: String(o.originalPrice || ""),
      deliveryInfo: o.deliveryInfo || "Free Delivery",
    }));

    // If no offers exist, create rows for known merchants
    if (existingOffers.length === 0) {
      setOffers(
        merchants.map((m) => ({
          merchantId: m.id,
          merchantName: m.name,
          affiliateUrl: "",
          indicativePrice: String(p.indicativePrice || ""),
          originalPrice: String(p.originalPrice || ""),
          deliveryInfo: "Free Delivery",
        }))
      );
    } else {
      setOffers(existingOffers);
    }

    setShowModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");

    // Client-side MIME validation
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setUploadError("Only JPG, JPEG, PNG, and WEBP formats are supported.");
      return;
    }

    // Client-side size validation (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(`File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 5 MB limit.`);
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImageUrl(data.url);
        setUploadError("");
      } else {
        setUploadError(data.error || "Failed to upload image.");
      }
    } catch {
      setUploadError("Network error while uploading image. Please try again.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleTogglePublish = async (p: any) => {
    const newStatus = p.availability === "UNPUBLISHED" ? "IN_STOCK" : "UNPUBLISHED";
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability: newStatus }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((item) => (item.id === p.id ? { ...item, availability: newStatus } : item))
        );
      }
    } catch {
      alert("Failed to update status.");
    }
  };

  const handleToggleFeatured = async (p: any) => {
    const newFeatured = !p.isFeatured;
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: newFeatured }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((item) => (item.id === p.id ? { ...item, isFeatured: newFeatured } : item))
        );
      }
    } catch {
      alert("Failed to update featured flag.");
    }
  };

  const handleDelete = async (id: string, prodName: string) => {
    if (!confirm(`Are you sure you want to delete "${prodName}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete product.");
      }
    } catch {
      alert("Failed to delete product.");
    }
  };

  const handleDuplicateProduct = async (p: any) => {
    try {
      const duplicatedData = {
        name: `${p.name} (Copy)`,
        slug: `${p.slug}-copy-${Date.now().toString().slice(-4)}`,
        categoryId: p.categoryId,
        brandId: p.brandId,
        indicativePrice: p.indicativePrice,
        originalPrice: p.originalPrice || p.indicativePrice,
        imageUrl: p.imageUrl || (p.images && p.images[0]) || "",
        shortDescription: p.shortDescription || "",
        description: p.description || p.name,
        availability: "UNPUBLISHED",
        isFeatured: false,
        isTrending: false,
        isBestDeal: false,
        isTopPick: false,
        offers: (p.merchantOffers || []).map((o: any) => ({
          merchantId: o.merchantId || o.merchant?.id,
          affiliateUrl: o.affiliateUrl || "",
          indicativePrice: o.indicativePrice || p.indicativePrice,
          originalPrice: o.originalPrice || p.originalPrice,
          deliveryInfo: o.deliveryInfo || "Free Delivery",
        })),
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicatedData),
      });

      if (res.ok) {
        setSuccessMessage(`Product "${p.name}" duplicated as unpublished draft!`);
        setTimeout(() => setSuccessMessage(""), 4000);
        fetchProducts();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to duplicate product.");
      }
    } catch {
      alert("Network error while duplicating product.");
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !categoryId || !indicativePrice) {
      setFormError("Product name, category, and indicative price are required.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    const validOffers = offers.filter(
      (o) => o.affiliateUrl && o.affiliateUrl.trim().length > 0 && o.indicativePrice
    );

    const payload = {
      name,
      categoryId,
      indicativePrice: parseFloat(indicativePrice),
      originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(indicativePrice),
      images: [imageUrl || "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80"],
      description: description || name,
      shortDescription,
      availability,
      isFeatured,
      isTrending,
      isBestDeal,
      isTopPick,
      offers: validOffers,
    };

    try {
      const url = isEditing ? `/api/admin/products/${editId}` : "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setShowModal(false);
        setSuccessMessage(
          isEditing
            ? `Product "${name}" updated successfully!`
            : `Product "${name}" created successfully and is now live on the dashboard!`
        );
        fetchProducts();
      } else {
        setFormError(data.error || "Failed to save product.");
      }
    } catch {
      setFormError("Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchFilter ||
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = !categoryFilter || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Title & Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary font-display">
            Product Catalog & Multi-Merchant Manager
          </h2>
          <p className="text-xs text-gray-500">
            Add small affordable products, enter Amazon / Flipkart / Meesho affiliate links, and control visibility.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-charcoal text-xs font-semibold px-3 py-2.5 rounded-xl shadow-sm transition-all"
            title="Refresh product list"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-secondary ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-xs text-green-700 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage("")}
            className="text-gray-400 hover:text-charcoal p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {pageError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{pageError}</span>
          </div>
          <button
            onClick={fetchProducts}
            className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg font-bold text-[11px]"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search products by name or slug..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-charcoal focus:border-secondary outline-none"
          >
            <option value="">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
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
                <th className="py-3 px-4">Affiliate Offers</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No products found matching filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  let img = "";
                  try {
                    const arr = JSON.parse(p.images);
                    img = arr[0];
                  } catch {
                    img = p.images;
                  }

                  const isUnpublished = p.availability === "UNPUBLISHED";

                  return (
                    <tr key={p.id} className="hover:bg-surface/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {img && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={img}
                              alt=""
                              className="w-11 h-11 object-contain rounded-lg bg-surface p-1 border border-gray-100 shrink-0"
                            />
                          )}
                          <div className="max-w-xs">
                            <Link
                              href={`/product/${p.slug}`}
                              target="_blank"
                              className="font-bold text-primary hover:text-secondary line-clamp-1"
                            >
                              {p.name}
                            </Link>
                            <span className="text-[10px] text-gray-400 block truncate">
                              /{p.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="bg-blue-50 text-secondary px-2 py-0.5 rounded text-[11px] font-semibold border border-blue-100">
                          {p.category?.name || "Category"}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-primary">{formatINR(p.indicativePrice)}</div>
                        {p.originalPrice > p.indicativePrice && (
                          <div className="text-[10px] text-gray-400 line-through">
                            {formatINR(p.originalPrice)}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {(p.merchantOffers || []).map((o: any, idx: number) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 bg-surface border border-gray-200 px-1.5 py-0.5 rounded text-[10px] text-gray-600"
                            >
                              <strong>{o.merchant?.name || "Merchant"}</strong>: ₹{o.indicativePrice}
                            </span>
                          ))}
                          {(!p.merchantOffers || p.merchantOffers.length === 0) && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-bold">
                              <AlertCircle className="w-2.5 h-2.5" />
                              <span>No Offers</span>
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTogglePublish(p)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                              isUnpublished
                                ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                            }`}
                            title="Click to toggle publish status"
                          >
                            {isUnpublished ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            <span>{isUnpublished ? "Unpublished" : "Live"}</span>
                          </button>

                          {p.isFeatured && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleDuplicateProduct(p)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-secondary hover:bg-blue-50 transition-colors"
                            title="Duplicate Product (as draft)"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-secondary hover:bg-blue-50 transition-colors"
                            title="Edit Product & Offers"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-charcoal rounded-full hover:bg-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary font-display">
                  {isEditing ? "Edit Product & Affiliate Links" : "Add New Product"}
                </h3>
                <p className="text-xs text-gray-400">
                  Manage product specifications, image, and external affiliate merchant offers.
                </p>
              </div>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-5">
              {/* Product Title */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 6-Piece Reusable Stretch Silicone Food Lids Set"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
                />
              </div>

              {/* Category & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs bg-white text-charcoal focus:border-secondary outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                    Indicative Price (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={indicativePrice}
                    onChange={(e) => setIndicativePrice(e.target.value)}
                    placeholder="249"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                    Original Price / MRP (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="499"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none"
                  />
                </div>
              </div>

              {/* Image Upload & URL */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Product Image (Upload File or Enter URL)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      if (uploadError) setUploadError("");
                    }}
                    placeholder="https://... or click Upload Image button"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-secondary outline-none"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-secondary text-white hover:bg-secondary/90 rounded-xl text-xs font-semibold shadow-sm transition-all shrink-0 disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? "Uploading..." : "Upload Image"}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-1 text-[11px] text-gray-400">
                  <span>Supported: JPG, PNG, WEBP (Max 5MB)</span>
                  {imageUrl && (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Image saved & ready
                    </span>
                  )}
                </div>

                {uploadError && (
                  <div className="mt-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {imageUrl && (
                  <div className="mt-2.5 p-2.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-12 h-12 rounded-lg object-contain bg-white border p-1 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-gray-700 truncate">Image Preview</p>
                        <p className="text-[10px] text-gray-400 truncate max-w-xs">{imageUrl}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Short Highlight / Tagline
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Set of 6 expandable airtight silicone lids to replace single-use plastic wrap."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-secondary outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe material, compatibility, pack contents, and practical daily use..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-secondary outline-none"
                />
              </div>

              {/* Merchant Offers Section */}
              <div className="pt-3 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-primary uppercase">
                    Partner Merchant Affiliate Links & Offers
                  </label>
                  <span className="text-[10px] text-gray-400">
                    Amazon, Flipkart, Meesho, Croma
                  </span>
                </div>

                <div className="space-y-2">
                  {offers.map((offer, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-surface rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                    >
                      <div className="sm:col-span-3 font-bold text-xs text-primary flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-secondary" />
                        <span>{offer.merchantName}</span>
                      </div>

                      <div className="sm:col-span-6">
                        <input
                          type="url"
                          value={offer.affiliateUrl}
                          onChange={(e) => {
                            const newOffers = [...offers];
                            newOffers[idx].affiliateUrl = e.target.value;
                            setOffers(newOffers);
                          }}
                          placeholder={`Enter ${offer.merchantName} affiliate URL...`}
                          className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-gray-200 text-[11px] outline-none focus:border-secondary"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <input
                          type="number"
                          step="0.01"
                          value={offer.indicativePrice}
                          onChange={(e) => {
                            const newOffers = [...offers];
                            newOffers[idx].indicativePrice = e.target.value;
                            setOffers(newOffers);
                          }}
                          placeholder="Price (₹)"
                          className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-gray-200 text-[11px] outline-none focus:border-secondary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visibility & Badges */}
              <div className="pt-3 border-t border-gray-100">
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-2">
                  Visibility & Homepage Badges
                </label>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availability === "IN_STOCK"}
                      onChange={(e) => setAvailability(e.target.checked ? "IN_STOCK" : "UNPUBLISHED")}
                      className="rounded text-secondary focus:ring-0"
                    />
                    <span>Publish (Live on Website)</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="rounded text-secondary focus:ring-0"
                    />
                    <span>Featured Product</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTrending}
                      onChange={(e) => setIsTrending(e.target.checked)}
                      className="rounded text-secondary focus:ring-0"
                    />
                    <span>Trending Now</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isBestDeal}
                      onChange={(e) => setIsBestDeal(e.target.checked)}
                      className="rounded text-secondary focus:ring-0"
                    />
                    <span>Best Deal</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTopPick}
                      onChange={(e) => setIsTopPick(e.target.checked)}
                      className="rounded text-secondary focus:ring-0"
                    />
                    <span>Editorial Top Pick</span>
                  </label>
                </div>
              </div>

              {/* Bottom Error Indicator if any */}
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-surface transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
