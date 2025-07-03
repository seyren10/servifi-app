import { Link, Outlet, useLoaderData, useNavigation } from "react-router";
import {
  CircleSmall,
  Clipboard,
  CreditCard,
  Flame,
  HandPlatter,
  Menu,
} from "lucide-react";
import { Nav, NavItem } from "./components/nav";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./store";
import { useEffect } from "react";
import { selectTable, setTableFromLocalStorage } from "./features/tables/slice";
import { selectHasOrders } from "./features/orders/slice";
import Loader from "./components/app/Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./components/dropdown-menu";
import CategoryIcon from "./components/app/CategoryIcon";
import { getCategories } from "./features/category/api";
import type { Category } from "./features/category/type";
import { Toaster } from "sonner";

export const loader = async () => {
  try {
    const categories = await getCategories();

    return categories;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return [] as Category[];
  }
};

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const hasOrders = useSelector(selectHasOrders);
  const table = useSelector(selectTable);
  const { state } = useNavigation();

  const categories = useLoaderData<Awaited<ReturnType<typeof loader>>>();
  const first3Categories = categories.slice(0, 3);
  const restCategories = categories.slice(3);

  useEffect(() => {
    const table = localStorage.getItem("table-session");
    if (table) dispatch(setTableFromLocalStorage(table));
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto flex h-dvh flex-col justify-between">
        <div className="overflow-auto">
          {state === "loading" ? <Loader /> : <Outlet />}
        </div>
        {!!table ||
          (categories.length > 0 && (
            <Nav>
              {first3Categories.map((category) => (
                <NavItem
                  title={category.name}
                  icon={<CategoryIcon name={category.icon} />}
                  to={`menu/${category._id}`}
                  key={category._id}
                />
              ))}
              <div className="relative isolate">
                <NavItem title="orders" icon={<Clipboard />} to="orders" />
                {hasOrders && (
                  <CircleSmall className="fill-primary absolute -top-1.5 -right-0 size-5" />
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <NavItem title="more" icon={<Menu />} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-48 rounded-xl"
                >
                  {restCategories.length > 0 && (
                    <>
                      <DropdownMenuLabel>More</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        {restCategories.map((category) => (
                          <DropdownMenuItem key={category._id} asChild>
                            <Link to={`menu/${category._id}`}>
                              <CategoryIcon name={category.icon} />
                              {category.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuLabel>Services</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HandPlatter />
                      Call Waiter
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Flame />
                    Replace Grill Plate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Flame />
                    Add Charcoal
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/orders/completed" className="text-primary">
                        <CreditCard className="stroke-primary/50" /> Bill Out
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </Nav>
          ))}
      </div>

      <Toaster
        toastOptions={{
          classNames: {
            info: "!text-primary",
          },
        }}
        position="top-center"
      />
    </>
  );
}
