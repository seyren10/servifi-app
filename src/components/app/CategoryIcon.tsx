import type { CategoryIconType } from "../../features/category/type";
import {
  Apple,
  Banana,
  Bean,
  Beef,
  Beer,
  Cake,
  CakeSlice,
  Candy,
  CandyCane,
  Carrot,
  ChefHat,
  Citrus,
  Coffee,
  Cookie,
  CookingPot,
  Croissant,
  CupSoda,
  Dessert,
  Donut,
  Egg,
  Fish,
  GlassWater,
  Hamburger,
  Pizza,
  Popsicle,
  Salad,
  Soup,
  Utensils,
  Wheat,
  Wine,
  type LucideProps,
} from "lucide-react";
import type { FunctionComponent } from "react";

type Props = {
  name: CategoryIconType;
} & LucideProps;

const iconMap: Record<CategoryIconType, FunctionComponent<LucideProps>> = {
  apple: Apple,
  banana: Banana,
  bean: Bean,
  beef: Beef,
  beer: Beer,
  wine: Wine,
  cake: Cake,
  "cake-slice": CakeSlice,
  candy: Candy,
  "candy-cane": CandyCane,
  carrot: Carrot,
  "chef-hat": ChefHat,
  citrus: Citrus,
  coffee: Coffee,
  cookie: Cookie,
  "cooling-pot": CookingPot,
  croissant: Croissant,
  "cup-soda": CupSoda,
  dessert: Dessert,
  donut: Donut,
  egg: Egg,
  fish: Fish,
  "glass-water": GlassWater,
  hamburger: Hamburger,
  pizza: Pizza,
  popsicle: Popsicle,
  salad: Salad,
  soup: Soup,
  utensils: Utensils,
  wheat: Wheat,
};

export default function CategoryIcon({ name, ...rest }: Props) {
  const Icon = iconMap[name];

  if (!Icon) throw new Error("Invalid category icon name");
  
  return <Icon {...rest} />;
}
