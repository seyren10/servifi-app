import { useLoaderData } from "react-router";
import type { Product } from "../../features/products/type";
import MenuItem from "./components/MenuItem";

export default function Menu() {
  const { products } = useLoaderData<{ products: Product[] }>();
  console.log(products);
  return (
    <div>
      <ul className="grid  gap-2">
        {products.map((p) => (
          <MenuItem product={p} />
        ))}
      </ul>
    </div>
  );
}
