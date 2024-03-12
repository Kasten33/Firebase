import { providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <providers>{children}</providers>
      </body>
    </html>
  );
}
