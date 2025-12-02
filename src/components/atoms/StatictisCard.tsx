import React from 'react';

import { LucideIcon } from 'lucide-react';

export default function StatictisCard({
  icon,
  number,
  title,
}: {
  icon: LucideIcon;
  number: string;
  title: string;
}) {
  const Icon = icon;
  return (
    <div className="flex min-h-[129px] min-w-[182px] flex-col gap-[12px] rounded-xl border border-gray-200 p-[16px] shadow-sm shadow-gray-200">
      <Icon className="text-primary size-6" />
      <h2 className="text-3xl font-semibold">{number}</h2>
      <p className="text-gray-400">{title}</p>
    </div>
  );
}
