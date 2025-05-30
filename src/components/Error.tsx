import { isRouteErrorResponse, Link } from "react-router";
import { useRouteError } from "react-router";
import { Button } from "./button";
import { Home } from "lucide-react";
import type { AxiosError } from "axios";

type ErrorPageProps = {
  type?: number;
  message?: string;
  stackTrace?: string;
};

export const ErrorPage = ({
  type = 404,
  message,
  stackTrace,
}: ErrorPageProps) => {
  const errorMessage = () => {
    if (message) return message;
    switch (type) {
      case 404:
        return "Page not found.";
      case 401:
        return "Unauthorized access.";
      case 500:
        return "Internal server error";
    }
  };

  return (
    <div className="grid h-dvh place-content-center">
      <div className="text-center">
        <h1 className="text-xl font-bold md:text-4xl">Error {type}</h1>
        <p className="text-muted-foreground text-sm">{errorMessage()}</p>
        <Link to="/">
          <Button className="mx-auto mt-4">
            <Home /> Home
          </Button>
        </Link>
        {import.meta.env.DEV && stackTrace && <pre>{stackTrace}</pre>}
      </div>
    </div>
  );
};

export default function Error() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorPage
        type={error.status}
        message={error.statusText}
        stackTrace={error.data}
      />
    );
  }

  const axiosError = error as AxiosError<{ message: string; type: string }>;

  return (
    <ErrorPage
      type={axiosError.status}
      message={axiosError.response?.data?.message}
      stackTrace={axiosError.stack}
    />
  );
}
