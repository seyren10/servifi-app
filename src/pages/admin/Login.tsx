import { useFetcher } from "react-router";
import { Button } from "../../components/button";
import { Alert } from "../../components/alert";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { LoaderCircle } from "lucide-react";

type Props = {};

export default function Login({}: Props) {
  const fetcher = useFetcher();
  const error = fetcher.data?.error;

  const busy = fetcher.state !== "idle";

  return (
    <div className="grid h-dvh sm:place-content-center">
      <div className="max-w-[30em] space-y-4 p-6">
        <h3 className="text-center text-2xl font-bold tracking-wide capitalize">
          Servifi admin panel
        </h3>

        {error && <Alert type="error">{error}</Alert>}

        <fetcher.Form className="mt-4 space-y-4" action="" method="post">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="juan@delacruz.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </div>

          <Button type="submit" className="w-full">
            {busy && <LoaderCircle className="animate-spin" />}
            Login
          </Button>
        </fetcher.Form>
      </div>
    </div>
  );
}
