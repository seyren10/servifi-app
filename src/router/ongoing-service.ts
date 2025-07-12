import type { RouteObject } from "react-router";

export const ongoingServiceRoutes: RouteObject = {
  path: "ongoing-services",
  children: [
    {
      index: true,
      lazy: {
        Component: async () =>
          (await import("../pages/admin/ongoing-services/Index")).default,
        loader: async () =>
          (
            await import("../features/ongoing-service/loader")
          ).getOngoingServicesLoader.bind(null, { completed: false }),
      },
    },
    {
      path: "request",
      lazy: {
        action: async () =>
          (await import("../features/ongoing-service/action"))
            .createOngoingServiceAction,
      },
    },
    {
      path: ":id/complete",
      lazy: {
        action: async () =>
          (await import("../features/ongoing-service/action"))
            .completeOngoingServiceAction,
      },
    },
  ],
};
