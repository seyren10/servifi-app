import { useLoaderData } from "react-router";
import type { Product } from "../../features/products/type";
import MenuItem from "./components/MenuItem";

export default function Menu() {
  const { products } = useLoaderData<{ products: Product[] }>();

  return (
    <div>
      <ul className="grid gap-2">
        {products.map((p) => (
          <MenuItem product={p} key={p._id}/>
        ))}
      </ul>
    </div>
  );
}
