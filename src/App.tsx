import { Link, Outlet, useNavigation } from "react-router";
import {
  Beef,
  CircleSmall,
  Clipboard,
  CreditCard,
  Flame,
  GlassWater,
  HandPlatter,
  Menu,
  Salad,
} from "lucide-react";
import { Nav, NavItem } from "./components/nav";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./store";
import { useEffect, useReducer } from "react";
import { selectTable, setTableFromLocalStorage } from "./features/tables/slice";
import { selectHasOrders } from "./features/orders/slice";
import Loader from "./components/app/Loader";
import {
  Toast,
  ToastDispatchContext,
  toastReducer,
  ToastStateContext,
} from "./components/toast";
import { Popover, PopoverContent, PopoverTrigger } from "./components/popover";
import { Button } from "./components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./components/dropdown-menu";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const hasOrders = useSelector(selectHasOrders);
  const table = useSelector(selectTable);
  const { state } = useNavigation();

  const [toastState, toastDispatch] = useReducer(toastReducer, { toasts: [] });

  useEffect(() => {
    const table = localStorage.getItem("table-session");
    if (table) dispatch(setTableFromLocalStorage(table));
  }, [dispatch]);

  return (
    <ToastDispatchContext.Provider value={toastDispatch}>
      <ToastStateContext.Provider value={toastState}>
        <div className="container mx-auto flex h-dvh flex-col justify-between">
          <div className="overflow-auto">
            {state === "loading" ? <Loader /> : <Outlet />}
          </div>
          <Toast />
          {!!table && (
            <Nav>
              <NavItem
                title="grill"
                Icon={Beef}
                to="menu/682fbbdf73a89bea93bc03ae"
              />
              <NavItem
                title="sides"
                Icon={Salad}
                to="menu/682fbd9473a89bea93bc03c7"
              />

              <NavItem
                title="drinks"
                Icon={GlassWater}
                to="menu/68300aa394237aae06484d8f"
              />
              <div className="relative isolate">
                <NavItem title="orders" Icon={Clipboard} to="orders" />
                {hasOrders && (
                  <CircleSmall className="fill-primary absolute -top-1.5 -right-0 size-5" />
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <NavItem title="more" Icon={Menu} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
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
                  <DropdownMenuItem asChild>
                    <Link to="/orders/completed">
                      <CreditCard /> Bill Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Nav>
          )}
        </div>
      </ToastStateContext.Provider>
    </ToastDispatchContext.Provider>
  );
}
