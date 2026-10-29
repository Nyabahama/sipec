import React from 'react';

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="bg-white py-28 px-4 max-w-3xl mx-auto text-center space-y-6">
      <div className="h-4 w-28 bg-slate-100 rounded-full mx-auto skeleton-shimmer" />
      <div className="h-12 w-3/4 bg-slate-100 rounded-xl mx-auto skeleton-shimmer" />
      <div className="h-6 w-1/2 bg-slate-100 rounded-lg mx-auto skeleton-shimmer" />
      <div className="h-10 w-44 bg-slate-100 rounded-full mx-auto skeleton-shimmer mt-6" />
    </div>
  );
};

export const AboutSkeleton: React.FC = () => {
  return (
    <div className="bg-white py-20 px-4 max-w-3xl mx-auto space-y-6">
      <div className="h-8 w-48 bg-slate-100 rounded-xl mx-auto skeleton-shimmer" />
      <div className="h-44 w-full bg-slate-100 rounded-2xl skeleton-shimmer" />
    </div>
  );
};

export const DepartmentsSkeleton: React.FC = () => {
  return (
    <div className="bg-white py-20 px-4 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-44 bg-slate-100 rounded-2xl skeleton-shimmer" />
      ))}
    </div>
  );
};

export const MediaSkeleton: React.FC = () => {
  return (
    <div className="bg-white py-20 px-4 max-w-3xl mx-auto space-y-6">
      <div className="aspect-video w-full bg-slate-100 rounded-2xl skeleton-shimmer" />
    </div>
  );
};
