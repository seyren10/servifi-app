import { useLoaderData } from "react-router";
import type { Product } from "../../features/products/type";
import MenuItem from "./components/MenuItem";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function Menu() {
  const { products } = useLoaderData<{ products: Product[] }>();
  const table = useSelector((state: RootState) => state.tables.table);
  return (
    <div>
      {!!table && (
        <div className="my-4 px-2">
          <h3 className="text-lg font-medium">
            Currently serving as Table number {table.number}
          </h3>
          <p className="text-muted-foreground text-sm">
            For {table.capacity} persons
          </p>
        </div>
      )}
      <ul className="grid gap-2">
        {products.map((p) => (
          <MenuItem product={p} key={p._id} />
        ))}
      </ul>
    </div>
  );
}
