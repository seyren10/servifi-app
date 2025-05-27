import { Outlet, useNavigation } from "react-router";
import {
  Beef,
  CircleSmall,
  Clipboard,
  GlassWater,
  Menu,
  Salad,
} from "lucide-react";
import { Nav, NavItem } from "./components/nav";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./store";
import { useEffect, useReducer } from "react";
import { setTableFromLocalStorage } from "./features/tables/slice";
import { selectHasOrders } from "./features/orders/slice";
import Loader from "./components/Loader";
import {
  Toast,
  ToastDispatchContext,
  toastReducer,
  ToastStateContext,
} from "./components/toast";
import { Popover, PopoverContent, PopoverTrigger } from "./components/popover";

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
                <NavItem title="menu" Icon={Menu} to="menu" />
              </PopoverTrigger>
              <PopoverContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt ut molestiae illo iusto nam modi assumenda cumque
                recusandae rerum, expedita nulla cupiditate magnam veritatis
                nihil officiis, eius sapiente similique dolore?
              </PopoverContent>
            </Popover>
          </Nav>
        </div>
      </ToastStateContext.Provider>
    </ToastDispatchContext.Provider>
  );
}
