import { LucideIcon } from "lucide-react";
import React from "react";

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
    <div className="min-w-[182px] min-h-[129px] rounded-xl p-[16px] flex flex-col gap-[12px] border border-gray-200 shadow-sm shadow-gray-200">
      <Icon className="size-6 text-primary" />
      <h2 className="font-semibold text-3xl">{number}</h2>
      <p className="text-gray-400">{title}</p>
    </div>
  );
}
