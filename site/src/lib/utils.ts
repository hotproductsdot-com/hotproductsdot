export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

export const CATEGORY_COLORS: Record<string, string> = {
  laptops: "bg-blue-500/20 text-blue-400",
  "gaming-laptops": "bg-purple-500/20 text-purple-400",
  "gaming-desktops": "bg-purple-500/20 text-purple-400",
  "gaming-peripherals": "bg-violet-500/20 text-violet-400",
  "gaming-headsets": "bg-violet-500/20 text-violet-400",
  headphones: "bg-cyan-500/20 text-cyan-400",
  audio: "bg-cyan-500/20 text-cyan-400",
  speakers: "bg-teal-500/20 text-teal-400",
  monitors: "bg-indigo-500/20 text-indigo-400",
  "smart-home": "bg-green-500/20 text-green-400",
  "smart-displays": "bg-green-500/20 text-green-400",
  security: "bg-red-500/20 text-red-400",
  photography: "bg-amber-500/20 text-amber-400",
  drones: "bg-sky-500/20 text-sky-400",
  kitchen: "bg-orange-500/20 text-orange-400",
  home: "bg-emerald-500/20 text-emerald-400",
  furniture: "bg-yellow-500/20 text-yellow-400",
  fitness: "bg-rose-500/20 text-rose-400",
  tablets: "bg-blue-500/20 text-blue-400",
  computers: "bg-blue-500/20 text-blue-400",
  streaming: "bg-pink-500/20 text-pink-400",
  "personal-care": "bg-fuchsia-500/20 text-fuchsia-400",
  electronics: "bg-slate-500/20 text-slate-400",
};

export function getCategoryColor(slug: string): string {
  return CATEGORY_COLORS[slug] || "bg-zinc-500/20 text-zinc-400";
}
