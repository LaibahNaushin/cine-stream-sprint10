import "./globals.css";
import ReduxProvider from "../components/ReduxProvider";

export const metadata = {
  title: "Cine-Stream | Movie Discovery",
  description:
    "A modern movie discovery platform powered by Next.js and Redux Toolkit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
