'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Layers,
  Database,
  Eye,
  KeyRound,
  X
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Breadcrumb } from '@/components/Breadcrumb';
import { 
  getCustomProducts, 
  saveCustomProduct, 
  deleteCustomProduct, 
  getAllMergedProducts 
} from '@/lib/storage';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Products state
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    slug: '',
    brand: '',
    category: 'Kitchen Gadgets',
    categorySlug: 'kitchen-gadgets',
    description: '',
    shortDescription: '',
    images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'],
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE?tag=avnivo-demo-21',
    rating: 4.4,
    ratingCount: 1200,
    featured: false,
    trending: true,
    inStock: true,
    bestFor: 'Modern Indian households seeking convenience and durability.',
    verdict: 'Well-engineered and reliable with verified merchant customer ratings.',
    pros: ['High build quality and durable finish', 'Practical everyday utility for Indian cooking'],
    cons: ['Slightly heavier than plastic alternatives'],
    specifications: {
      'Material': 'Stainless Steel / BPA-Free Polymer',
      'Warranty': '1 Year Manufacturer Warranty'
    }
  });

  // Verify passcode (Staff demo code 'avnivo2026' or env variable)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validPin = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'avnivo2026';
    if (passcode.trim() === validPin) {
      setIsAuthenticated(true);
      setPasscodeError(false);
      // Load merged products
      setProductsList(getAllMergedProducts());
    } else {
      setPasscodeError(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setProductsList(getAllMergedProducts());
    }
  }, [isAuthenticated]);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Quick Inline URL & Price Update
  const handleQuickSave = (product: Product) => {
    saveCustomProduct(product);
    setProductsList(getAllMergedProducts());
    showToast(`Updated "${product.name.slice(0, 30)}..." successfully!`);
    setEditingProduct(null);
  };

  // Delete product
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product from the management system?')) {
      deleteCustomProduct(id);
      setProductsList(getAllMergedProducts().filter(p => p.id !== id));
      showToast('Product removed.');
    }
  };

  // Add Product Submit
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.slug || !newProduct.brand) {
      alert('Please fill all required fields');
      return;
    }

    const created: Product = {
      ...(newProduct as Product),
      id: `custom-prod-${Date.now()}`,
      discountPercent: Math.round(((newProduct.originalPrice! - newProduct.price!) / newProduct.originalPrice!) * 100),
    };

    saveCustomProduct(created);
    setProductsList(getAllMergedProducts());
    setIsAddModalOpen(false);
    showToast(`Added product "${created.name}"!`);
  };

  // Export Catalog JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(productsList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `avnivo-products-export-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported catalog JSON file.');
  };

  // Filtered table rows
  const filteredProducts = productsList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 1. Passcode Authentication Gate
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-navy text-white flex items-center justify-center mx-auto shadow-md">
            <Lock size={28} className="text-brand-orange" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-black text-gray-900">AVNIVO Management Portal</h1>
            <p className="text-xs text-gray-500">
              Authorized staff access for managing products, affiliate links, and pricing.
            </p>
          </div>

          {passcodeError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-center gap-2">
              <AlertCircle size={15} />
              <span>Invalid admin passcode. Hint: Use <strong>avnivo2026</strong> for demo access.</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Staff Passcode"
                required
                className="w-full h-11 px-4 text-center text-sm font-semibold tracking-widest bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <KeyRound size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold transition-all shadow-md shadow-brand-orange/20"
            >
              Authenticate & Unlock Admin Panel
            </button>

            <p className="text-[11px] text-gray-400">
              Demo Access Code: <span className="font-mono font-bold text-gray-700">avnivo2026</span>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Admin Portal' }]} />

      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-brand-navy text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-brand-orange" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-brand-navy text-white rounded-3xl shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <Database size={15} />
            <span>Product Management & Affiliate Hub</span>
          </div>
          <h1 className="text-2xl font-black text-white">AVNIVO Catalog Dashboard</h1>
          <p className="text-xs text-gray-300">
            Easily update affiliate URLs, pricing, and specs without manual code redeployments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold transition-all shadow-md"
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            title="Download JSON file for Git commits"
          >
            <Download size={16} />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Dashboard KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-1">
          <div className="text-[11px] font-bold uppercase text-gray-400">Total Products</div>
          <div className="text-2xl font-black text-brand-navy">{productsList.length}</div>
          <div className="text-[11px] text-emerald-600 font-semibold">Active in Catalog</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-1">
          <div className="text-[11px] font-bold uppercase text-gray-400">Categories</div>
          <div className="text-2xl font-black text-brand-navy">{CATEGORIES.length}</div>
          <div className="text-[11px] text-gray-500 font-medium">All 8 Curated Categories</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-1">
          <div className="text-[11px] font-bold uppercase text-gray-400">Affiliate Program</div>
          <div className="text-2xl font-black text-brand-orange">Amazon Associates</div>
          <div className="text-[11px] text-gray-500 font-medium">India Store (Amazon.in)</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-1">
          <div className="text-[11px] font-bold uppercase text-gray-400">Verified Reviews</div>
          <div className="text-2xl font-black text-emerald-700">100%</div>
          <div className="text-[11px] text-emerald-600 font-semibold">Zero Fake Testimonials</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title, brand, or category..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        <div className="text-xs font-semibold text-gray-500">
          Showing {filteredProducts.length} items
        </div>
      </div>

      {/* Product Management Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price / MRP</th>
                <th className="p-3.5">Merchant</th>
                <th className="p-3.5">Affiliate Link</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => {
                const isEditing = editingProduct?.id === p.id;
                return (
                  <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg border border-gray-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 line-clamp-1">{p.name}</div>
                          <div className="text-[11px] text-gray-400">{p.brand} • {p.slug}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 font-medium text-gray-700 whitespace-nowrap">
                      {p.category}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                            className="w-16 h-7 px-1 text-xs border border-gray-300 rounded"
                          />
                          <span className="text-gray-400">/</span>
                          <input
                            type="number"
                            value={editingProduct.originalPrice}
                            onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                            className="w-16 h-7 px-1 text-xs border border-gray-300 rounded"
                          />
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-gray-900">{formatPrice(p.price)}</span>
                          <span className="text-[10px] text-gray-400 line-through ml-1">{formatPrice(p.originalPrice)}</span>
                        </div>
                      )}
                    </td>

                    <td className="p-3.5 font-semibold text-gray-800 whitespace-nowrap">
                      {p.merchantName}
                    </td>

                    <td className="p-3.5 max-w-xs">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingProduct.affiliateUrl}
                          onChange={(e) => setEditingProduct({ ...editingProduct, affiliateUrl: e.target.value })}
                          className="w-full h-7 px-2 text-[11px] border border-gray-300 rounded"
                        />
                      ) : (
                        <a
                          href={p.affiliateUrl}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                          className="text-brand-orange hover:underline font-mono text-[11px] truncate block"
                          title={p.affiliateUrl}
                        >
                          {p.affiliateUrl}
                        </a>
                      )}
                    </td>

                    <td className="p-3.5 whitespace-nowrap font-bold text-gray-800">
                      ★ {p.rating.toFixed(1)}
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleQuickSave(editingProduct)}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-brand-navy hover:bg-gray-100"
                            title="Edit Product"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                            title="Delete Product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD NEW PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-brand-navy text-white flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-base">
                <Plus size={18} className="text-brand-orange" />
                <span>Add Product to AVNIVO Catalog</span>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-gray-300 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Prestige Tri-Ply Kadhai"
                    className="w-full h-9 px-3 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Slug (URL-friendly) *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.slug}
                    onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
                    placeholder="e.g. prestige-tri-ply-kadhai-2.5l"
                    className="w-full h-9 px-3 rounded-xl border border-gray-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Brand *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    placeholder="e.g. Prestige"
                    className="w-full h-9 px-3 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category *</label>
                  <select
                    value={newProduct.categorySlug}
                    onChange={(e) => {
                      const cat = CATEGORIES.find(c => c.slug === e.target.value);
                      setNewProduct({
                        ...newProduct,
                        categorySlug: e.target.value,
                        category: cat?.name || 'Kitchen Gadgets',
                      });
                    }}
                    className="w-full h-9 px-2 rounded-xl border border-gray-300"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Merchant *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.merchantName}
                    onChange={(e) => setNewProduct({ ...newProduct, merchantName: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Current Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full h-9 px-3 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Original Price / MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })}
                    className="w-full h-9 px-3 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Verified Rating (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={newProduct.rating}
                    onChange={(e) => setNewProduct({ ...newProduct, rating: Number(e.target.value) })}
                    className="w-full h-9 px-3 rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Affiliate Destination URL *</label>
                <input
                  type="url"
                  required
                  value={newProduct.affiliateUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, affiliateUrl: e.target.value })}
                  placeholder="https://www.amazon.in/dp/...?tag=avnivo-demo-21"
                  className="w-full h-9 px-3 rounded-xl border border-gray-300 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value, shortDescription: e.target.value.slice(0, 100) })}
                  className="w-full p-2.5 rounded-xl border border-gray-300"
                  placeholder="Comprehensive description of the product, build quality, and use cases..."
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white font-bold"
                >
                  Save & Publish Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

