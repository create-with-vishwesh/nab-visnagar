import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccessibilityControls from "@/components/accessibility/AccessibilityControls";
import WebsiteTourExperience from "@/components/accessibility/WebsiteTourExperience";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  title: "NAB Visnagar",
  description: "National Association for the Blind - NAB Visnagar official website",
  icons: {
    icon: "/images/logos/nab-logo.jpg",
    shortcut: "/images/logos/nab-logo.jpg",
    apple: "/images/logos/nab-logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <AccessibilityProvider>
          <LanguageProvider>
            <a
              href="#main-content"
              className="fixed left-4 top-4 z-[70] -translate-y-16 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            >
              Skip to Main Content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <WebsiteTourExperience />
            <AccessibilityControls />
          </LanguageProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}