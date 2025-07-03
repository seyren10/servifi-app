export type Category = {
  _id: string;
  name: string;
  icon: CategoryIconType;
  updatedAt: string;
  createdAt: string;
};

export type CategoryIconType =
  | "apple"
  | "banana"
  | "bean"
  | "beef"
  | "beer"
  | "cake"
  | "cake-slice"
  | "candy"
  | "candy-cane"
  | "carrot"
  | "chef-hat"
  | "citrus"
  | "coffee"
  | "cookie"
  | "cooling-pot"
  | "croissant"
  | "cup-soda"
  | "dessert"
  | "donut"
  | "egg"
  | "fish"
  | "glass-water"
  | "hamburger"
  | "pizza"
  | "popsicle"
  | "salad"
  | "soup"
  | "utensils"
  | "wheat"
  | "wine";

export const categoryIcons = [
  "apple",
  "banana",
  "bean",
  "beef",
  "beer",
  "cake",
  "cake-slice",
  "candy",
  "candy-cane",
  "carrot",
  "chef-hat",
  "citrus",
  "coffee",
  "cookie",
  "cooling-pot",
  "croissant",
  "cup-soda",
  "dessert",
  "donut",
  "egg",
  "fish",
  "glass-water",
  "hamburger",
  "pizza",
  "popsicle",
  "salad",
  "soup",
  "utensils",
  "wheat",
  "wine",
] as const satisfies CategoryIconType[];

export type CreateCategoryPayload = Pick<Category, "icon" | "name">;

export type GetCategoryQueryParams = {
  populates: "";
};

export type MoveProductsCategoryPayload = {
  from: string;
  to: string;
};
