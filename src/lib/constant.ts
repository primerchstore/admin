import { Nav } from "@/types/nav.type";
import {
  Package01Icon,
  GitBranchIcon,
  GridIcon,
  Tag01Icon,
  ShoppingCart01Icon,
  UserIcon,
  RulerIcon,
  Palette,
  Image01Icon,
  CouponPercentIcon,
  DashboardBrowsingFreeIcons,
} from "@hugeicons/core-free-icons";

export const nav: Nav[] = [
  { name: "Dashboard", url: "/dashboard", icon: DashboardBrowsingFreeIcons },
  { name: "Product", url: "/dashboard/products", icon: Package01Icon },
  { name: "Variant", url: "/dashboard/variants", icon: GitBranchIcon },
  { name: "Categories", url: "/dashboard/categories", icon: GridIcon },
  { name: "Tag", url: "/dashboard/tags", icon: Tag01Icon },
  { name: "Order", url: "/dashboard/orders", icon: ShoppingCart01Icon },
  { name: "User", url: "/dashboard/users", icon: UserIcon },
  { name: "Size", url: "/dashboard/sizes", icon: RulerIcon },
  { name: "Colour", url: "/dashboard/colours", icon: Palette },
  { name: "Media", url: "/dashboard/medias", icon: Image01Icon },
  { name: "Promo", url: "/dashboard/promos", icon: CouponPercentIcon },
];

export const serverUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
