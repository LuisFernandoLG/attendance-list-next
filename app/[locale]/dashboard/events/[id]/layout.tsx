"use client";

import QRCodesWizzardProvider from "@/contexts/QRCodeWizzardContext";

function layout({ children }: { children: React.ReactNode }) {
  return <QRCodesWizzardProvider>{children}</QRCodesWizzardProvider>;
}

export default layout;
