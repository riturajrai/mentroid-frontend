import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";
import LayoutContent from "./components/LayoutContent";

export const metadata = {
  title: "My App",
  description: "Next.js Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
