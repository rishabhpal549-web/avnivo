import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-2.5 text-xs text-gray-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link 
            href="/" 
            className="flex items-center gap-1 hover:text-brand-navy transition-colors"
            title="AVNIVO Home"
          >
            <Home size={13} />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-gray-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-gray-800 line-clamp-1 max-w-[240px] sm:max-w-md">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="hover:text-brand-navy hover:underline transition-colors line-clamp-1 max-w-[180px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

