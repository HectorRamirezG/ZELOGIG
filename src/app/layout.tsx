import type { ReactNode } from "react";
import "../styles/globals.css";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
