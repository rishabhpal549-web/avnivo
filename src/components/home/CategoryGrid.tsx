import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  BookOpen,
  Baby,
  Compass,
  ArrowRight,
} from "lucide-react";

const categoryList = [
  {
    name: "Electronics & Gadgets",
    slug: "electronics-gadgets",
    icon: Smartphone,
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    description: "Smartphones, Laptops, Audio & Wearables",
  },
  {
    name: "Fashion & Clothing",
    slug: "fashion-clothing",
    icon: Shirt,
    color: "from-pink-500 to-rose-600",
    bgLight: "bg-pink-50",
    description: "Men's, Women's Wear & Footwear",
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    icon: Home,
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    description: "Appliances, Cookware & Modern Decor",
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    icon: Sparkles,
    color: "from-purple-500 to-fuchsia-600",
    bgLight: "bg-purple-50",
    description: "Skincare, Grooming & Cosmetics",
  },
  {
    name: "Sports & Fitness",
    slug: "sports-fitness",
    icon: Dumbbell,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    description: "Gym Gear, Running Shoes & Yoga",
  },
  {
    name: "Books & Stationery",
    slug: "books-stationery",
    icon: BookOpen,
    color: "from-sky-500 to-cyan-600",
    bgLight: "bg-sky-50",
    description: "Best-sellers, Exam Guides & Supplies",
  },
  {
    name: "Toys & Baby Products",
    slug: "toys-baby-products",
    icon: Baby,
    color: "from-yellow-400 to-amber-500",
    bgLight: "bg-yellow-50",
    description: "Learning Toys, Diapers & Strollers",
  },
  {
    name: "Travel & Lifestyle",
    slug: "travel-lifestyle",
    icon: Compass,
    color: "from-teal-500 to-blue-600",
    bgLight: "bg-teal-50",
    description: "Trolleys, Backpacks & Accessories",
  },
];

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs uppercase font-extrabold text-secondary tracking-widest">
            Multi-Category Marketplace
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary font-display mt-1">
            Shop by Category
          </h2>
        </div>

        <Link
          href="/shop"
          className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categoryList.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl ${cat.bgLight} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-secondary group-hover:translate-x-0.5 transition-all" />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-primary group-hover:text-secondary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {cat.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
