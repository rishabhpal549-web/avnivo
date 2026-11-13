import React from 'react';
import Link from 'next/link';
import { 
  UtensilsCrossed, 
  Flame, 
  Boxes, 
  Sparkles, 
  Tv, 
  Wrench, 
  Brush, 
  Home, 
  ArrowRight 
} from 'lucide-react';
import { Category } from '@/types';

const ICON_MAP: Record<string, React.ElementType> = {
  UtensilsCrossed,
  Flame,
  Boxes,
  Sparkles,
  Tv,
  Wrench,
  Brush,
  Home,
};

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = ICON_MAP[category.icon] || Home;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-brand-orange/40 transition-all duration-300"
    >
      {/* Category Image Background */}
      <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-gray-100">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
        
        {/* Floating Icon badge */}
        <div className="absolute top-3 left-3 p-2 rounded-xl bg-white/95 text-brand-navy shadow-md group-hover:bg-brand-orange group-hover:text-white transition-colors">
          <IconComponent size={18} />
        </div>

        {/* Product Count Pill */}
        <div className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm">
          {category.productCount} Products
        </div>

        {/* Title over image on bottom */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-brand-orange transition-colors">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Description & Action */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
          {category.description}
        </p>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
          <span>Explore Category</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

