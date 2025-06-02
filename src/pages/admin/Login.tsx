import { useFetcher } from "react-router";
import { Button } from "../../components/button";
import { Alert } from "../../components/alert";
import { Input } from "../../components/input";

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
          <Input name="email" type="email" placeholder="juan@delacruz.com" label="Email" />
          <Input name="password" type="password" label="password" />

          <Button type="submit" className="w-full" loading={busy}>
            Login
          </Button>
        </fetcher.Form>
      </div>
    </div>
  );
}
