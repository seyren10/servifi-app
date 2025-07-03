import QRCode from "react-qr-code";
import { useLoaderData, useNavigate } from "react-router";
import Brand from "../../../components/app/Brand";
import { usePrintArea } from "../../../hooks/usePrintArea";
import { useCallback } from "react";

export default function ReprintSession() {
  const tableActiveSession = useLoaderData<string>();
  const url = window.location.origin;
  const sessionUrl = `${url}?token=${tableActiveSession}`;
  const navigate = useNavigate();
  const close = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const printRef = usePrintArea<HTMLDivElement>(close);

  return (
    <div className="flex w-fit flex-col justify-center gap-2" ref={printRef}>
      <Brand className="flex self-center" />
      <QRCode value={sessionUrl} />
    </div>
  );
}
