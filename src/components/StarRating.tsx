import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { formatCompactNumber } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  ratingCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function StarRating({ rating, ratingCount, size = 'sm', showCount = true }: StarRatingProps) {
  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18,
  }[size];

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="inline-flex items-center gap-1.5" title={`Verified Rating: ${rating.toFixed(1)} out of 5`}>
      <div className="flex items-center text-amber-500">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={iconSize} className="fill-amber-400 text-amber-400" />
        ))}
        {hasHalfStar && (
          <StarHalf size={iconSize} className="fill-amber-400 text-amber-400" />
        )}
        {[...Array(Math.max(0, emptyStars))].map((_, i) => (
          <Star key={`empty-${i}`} size={iconSize} className="text-gray-300" />
        ))}
      </div>
      <span className="text-xs font-semibold text-gray-800">
        {rating.toFixed(1)}
      </span>
      {showCount && ratingCount !== undefined && (
        <span className="text-xs text-gray-500">
          ({formatCompactNumber(ratingCount)})
        </span>
      )}
    </div>
  );
}

