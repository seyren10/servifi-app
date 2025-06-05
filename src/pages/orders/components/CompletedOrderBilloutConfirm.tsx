import { createPortal } from "react-dom";
import { Button } from "../../../components/button";
import { CheckSquare, LoaderCircle, X } from "lucide-react";
import { useFetcher, useNavigate } from "react-router";
import { useToastDispatch } from "../../../components/toast";
import { useDispatch } from "react-redux";
import { resetStore } from "../../../store";

type Props = {
  onClose?: () => void;
};

export default function CompletedOrderBilloutConfirm({ onClose }: Props) {
  const fetcher = useFetcher();
  const loading = fetcher.state !== "idle";
  const navigate = useNavigate();
  const toast = useToastDispatch();
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    await fetcher.submit(null, {
      action: "/orders/completed",
      method: "DELETE",
    });

    dispatch(resetStore());

    toast({
      type: "toast/add",
      payload: {
        title: "Success",
        type: "success",
        description: "Thank you for using Servifi! Come back soon.",
        duration: 10000,
      },
    });

    navigate("/", { replace: true });
  };
  return createPortal(
    <div className="absolute inset-0 grid place-content-center bg-white">
      <Button
        size="icon"
        variant="link"
        className="absolute top-2 right-2 !p-2"
        onClick={() => onClose?.()}
        aria-label="Close"
      >
        {loading && <LoaderCircle className="animate-spin" />}
        <X />
      </Button>

      <section className="space-y-4">
        <CheckSquare className="stroke-primary mx-auto" />
        <h3 className="font-medium">Please confirm to proceed billing out.</h3>
        <div className="grid space-y-2">
          <Button onClick={handleConfirm}>
            {loading && <LoaderCircle className="animate-spin" />}
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => onClose?.()}>
            I'd like to order more
          </Button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
