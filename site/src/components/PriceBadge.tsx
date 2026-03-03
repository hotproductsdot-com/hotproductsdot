export default function PriceBadge({ price, size = "md" }: { price: string; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-sm";
  return <span className={`${sizeClass} font-bold text-white`}>{price}</span>;
}
