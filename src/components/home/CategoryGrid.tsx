import React from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Home,
  Watch,
  Sparkles,
  Smartphone,
  Dumbbell,
  BookOpen,
  Baby,
  Compass,
  ShoppingBag,
  Layers,
  ArrowRight,
} from "lucide-react";

const categoryList = [
  {
    name: "Kitchen Accessories",
    nameHindi: "रसोई के सामान",
    slug: "kitchen-accessories",
    icon: UtensilsCrossed,
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50 text-amber-700",
    description: "Slicers, silicone lids, organizers & cooking hacks",
    itemCount: "Under ₹299",
  },
  {
    name: "Home & Living",
    nameHindi: "गृह एवं दैनिक जीवन",
    slug: "home-living",
    icon: Home,
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50 text-blue-700",
    description: "Motion sensor lights, cable tidy clips & organizers",
    itemCount: "Under ₹499",
  },
  {
    name: "Mobile Accessories",
    nameHindi: "मोबाइल एक्सेसरीज",
    slug: "mobile-accessories",
    icon: Smartphone,
    color: "from-cyan-500 to-blue-600",
    bgLight: "bg-cyan-50 text-cyan-700",
    description: "Aluminum phone stands, braided fast cables & mounts",
    itemCount: "Under ₹249",
  },
  {
    name: "Fashion Accessories",
    nameHindi: "फैशन एक्सेसरीज",
    slug: "fashion-accessories",
    icon: Watch,
    color: "from-purple-500 to-fuchsia-600",
    bgLight: "bg-purple-50 text-purple-700",
    description: "Minimalist card holders, polarized sunglasses & belts",
    itemCount: "Under ₹399",
  },
  {
    name: "Beauty & Personal Care",
    nameHindi: "सौंदर्य एवं व्यक्तिगत देखभाल",
    slug: "beauty-personal-care",
    icon: Sparkles,
    color: "from-rose-500 to-pink-600",
    bgLight: "bg-rose-50 text-rose-700",
    description: "Jade rollers, scalp massage brushes & grooming tools",
    itemCount: "Under ₹299",
  },
  {
    name: "Fitness Accessories",
    nameHindi: "फिटनेस एक्सेसरीज",
    slug: "fitness-accessories",
    icon: Dumbbell,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50 text-emerald-700",
    description: "Loop resistance workout bands & hand grip strengtheners",
    itemCount: "Under ₹299",
  },
  {
    name: "Books & Stationery",
    nameHindi: "किताबें एवं स्टेशनरी",
    slug: "books-stationery",
    icon: BookOpen,
    color: "from-indigo-500 to-violet-600",
    bgLight: "bg-indigo-50 text-indigo-700",
    description: "A5 dot grid journals, study supplies & desk caddies",
    itemCount: "Under ₹299",
  },
  {
    name: "Toys & Baby Products",
    nameHindi: "खिलौने एवं शिशु उत्पाद",
    slug: "toys-baby-products",
    icon: Baby,
    color: "from-yellow-500 to-amber-600",
    bgLight: "bg-yellow-50 text-yellow-700",
    description: "LCD doodle drawing pads, infant safety & teething aids",
    itemCount: "Under ₹249",
  },
  {
    name: "Travel Accessories",
    nameHindi: "यात्रा एक्सेसरीज",
    slug: "travel-accessories",
    icon: Compass,
    color: "from-teal-500 to-emerald-600",
    bgLight: "bg-teal-50 text-teal-700",
    description: "Memory foam neck pillows, packing organizers & locks",
    itemCount: "Under ₹449",
  },
  {
    name: "Daily-use Products",
    nameHindi: "दैनिक उपयोग के उत्पाद",
    slug: "daily-use-products",
    icon: ShoppingBag,
    color: "from-orange-500 to-red-600",
    bgLight: "bg-orange-50 text-orange-700",
    description: "14-in-1 pocket multi-tools & practical lifestyle hacks",
    itemCount: "Under ₹499",
  },
  {
    name: "Other Small Accessories",
    nameHindi: "अन्य किफायती उत्पाद",
    slug: "other-affordable-accessories",
    icon: Layers,
    color: "from-slate-600 to-slate-800",
    bgLight: "bg-slate-100 text-slate-700",
    description: "COB keychain lights, cleaning putty & mini gadgets",
    itemCount: "Under ₹199",
  },
];

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[11px] uppercase font-extrabold text-secondary tracking-widest">
            11 Multi-Category Shopping Hub
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-primary font-display mt-0.5">
            Explore Small & Useful Daily Essentials
          </h2>
        </div>

        <Link
          href="/shop"
          className="text-xs sm:text-sm font-semibold text-secondary hover:text-secondary-dark flex items-center gap-1 group"
        >
          <span>View All Products</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Responsive Compact Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
        {categoryList.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-secondary/40 hover:shadow-md transition-all p-3 flex flex-col justify-between group"
            >
              <div>
                <div className={`w-9 h-9 rounded-xl ${cat.bgLight} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>

                <h3 className="font-bold text-xs sm:text-[13px] text-primary group-hover:text-secondary transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-gray-400 font-medium mb-1 truncate">
                  {cat.nameHindi}
                </p>
                <p className="text-[10px] text-gray-500 line-clamp-2 leading-tight">
                  {cat.description}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
                <span className="font-extrabold text-secondary">{cat.itemCount}</span>
                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
