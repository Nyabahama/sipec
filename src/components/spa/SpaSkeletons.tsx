import React from 'react';

export const SpaSkeletons: React.FC = () => {
  return (
    <div className="space-y-24 py-16 px-4 max-w-7xl mx-auto animate-pulse">
      {/* Hero Skeleton */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="h-6 w-36 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto skeleton-shimmer" />
        <div className="h-16 w-3/4 rounded-3xl bg-slate-200 dark:bg-slate-800 mx-auto skeleton-shimmer" />
        <div className="h-6 w-1/2 rounded-xl bg-slate-200 dark:bg-slate-800 mx-auto skeleton-shimmer" />
        <div className="flex justify-center gap-4 pt-4">
          <div className="h-12 w-48 rounded-full bg-slate-200 dark:bg-slate-800 skeleton-shimmer" />
          <div className="h-12 w-48 rounded-full bg-slate-200 dark:bg-slate-800 skeleton-shimmer" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 skeleton-shimmer" />
        ))}
      </div>

      {/* Gallery Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-72 rounded-3xl bg-slate-200 dark:bg-slate-800 skeleton-shimmer" />
        ))}
      </div>
    </div>
  );
};
