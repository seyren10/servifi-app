import { useCallback, useEffect, useRef } from "react";
import QrCode from "react-qr-code";
import { useActionData, useNavigate } from "react-router";
import Brand from "../../../components/app/Brand";

export default function GenerateSession() {
  const url = useActionData<string>();
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const close = useCallback(() => {
    navigate('/admin/tables');
  }, [navigate]);

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    document.body.classList.add("invisible");
    node.classList.add(
      "visible",
      "absolute",
      "left-1/2",
      "-translate-x-1/2",
      "top-0",
    );
    window.addEventListener("afterprint", close);
    window.print();

    return () => {
      document.body.classList.remove("invisible");
      node.classList.remove(
        "visible",
        "absolute",
        "left-1/2",
        "-translate-x-1/2",
        "top-0",
      );
      window.removeEventListener("afterprint", close);
    };
  }, [close]);

  if (!url) throw new Error("No URL generated");

  return (
    <div ref={ref} className="grid w-fit gap-2">
      <Brand className="flex justify-center" />
      <QrCode value={url} />
    </div>
  );
}
