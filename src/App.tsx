import {
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "react-router";
import { CircleSmall, Clipboard, CreditCard, Menu } from "lucide-react";
import { Nav, NavItem } from "./components/nav";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./store";
import { lazy, Suspense, useEffect } from "react";
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
import { toast, Toaster } from "sonner";
import type { createOngoingServiceAction } from "./features/ongoing-service/action";

const ServicesDropdownGroup = lazy(
  () => import("./components/app/ServicesDropdownGroup"),
);

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

  const fetcher = useFetcher();

  useEffect(() => {
    const table = localStorage.getItem("table-session");
    if (table) dispatch(setTableFromLocalStorage(table));
  }, [dispatch]);

  const handleServiceSelect = async (serviceId: string) => {
    fetcher.submit(
      {
        serviceId,
        tableId: table?._id as string,
      },
      {
        action: "/admin/ongoing-services/request",
        method: "POST",
      },
    );
  };

  useEffect(() => {
    if (fetcher.data) {
      const { message, ok } = fetcher.data as Awaited<
        ReturnType<typeof createOngoingServiceAction>
      >;
      if (!ok) {
        toast.error(message);
      } else toast.success(message);
    }
  }, [fetcher.data]);

  return (
    <>
      <div className="container mx-auto flex h-dvh flex-col justify-between">
        <div className="overflow-auto">
          {state === "loading" ? <Loader /> : <Outlet />}
        </div>
        {!!table && categories.length && (
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
              <DropdownMenuContent align="end" className="min-w-48 rounded-xl">
                {restCategories.length > 0 && (
                  <>
                    <DropdownMenuLabel>More Categories</DropdownMenuLabel>
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
                <Suspense fallback={<div>Loading...</div>}>
                  <ServicesDropdownGroup
                    onServiceSelect={handleServiceSelect}
                  />
                </Suspense>

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
        )}
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
