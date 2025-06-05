import { useCallback } from "react";
import QrCode from "react-qr-code";
import { useActionData, useNavigate } from "react-router";
import Brand from "../../../components/app/Brand";
import { usePrintArea } from "../../../hooks/usePrintArea";

export default function GenerateSession() {
  const url = useActionData<string>();
  const navigate = useNavigate();

  const close = useCallback(() => {
    navigate("/admin/tables");
  }, [navigate]);

  const printRef = usePrintArea<HTMLDivElement>(close);

  if (!url) throw new Error("No URL generated");

  return (
    <div ref={printRef} className="grid w-fit gap-2">
      <Brand className="flex justify-center" />
      <QrCode value={url} />
    </div>
  );
}
