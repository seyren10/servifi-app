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
import { setTableFromLocalStorage } from "./features/tables/slice";
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

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const hasOrders = useSelector(selectHasOrders);
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
            <Popover>
              <PopoverTrigger>
                <NavItem title="more" Icon={Menu} />
              </PopoverTrigger>
              <PopoverContent>
                <div className="border-muted rounded-xl border bg-white py-4 text-sm shadow [&_button]:w-full">
                  <p className="text-muted-foreground mb-2 px-4 text-xs">
                    Services
                  </p>
                  <Button variant="none" className="justify-start gap-2">
                    <HandPlatter /> Call Waiter
                  </Button>
                  <Button variant="none" className="justify-start gap-2">
                    <Flame />
                    Replace Grill Plate
                  </Button>
                  <Button variant="none" className="justify-start gap-2">
                    <Flame />
                    Add Charcoal
                  </Button>
                  <Link to="/orders/completed">
                    <Button variant="none" className="justify-start gap-2">
                      <CreditCard /> Bill Out
                    </Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </Nav>
        </div>
      </ToastStateContext.Provider>
    </ToastDispatchContext.Provider>
  );
}
