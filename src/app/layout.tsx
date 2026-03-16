import "@/app/globals.css";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { Analytics } from "@/scripts/Analytics";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Vyndrix | Ramon Fernandes",
  description:
    "Digital craftsman and developer, in search of the perfect layout.",
  authors: [{ name: "Ramon Fernandes", url: "https://vyndrix.me" }],
  applicationName: "Vyndrix",
  keywords: [
    "Next.js",
    "React",
    "React Native",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Frontend",
    "Portfolio",
    "Ramon Fernandes",
    "Vyndrix",
    "Software Engineer",
    "Web Designer",
    "Tech Enthusiast",
    "Coding",
    "Open Source",
    "Tech Blog",
    "Developer Portfolio",
  ],
  openGraph: {
    title: "Vyndrix | Ramon Fernandes",
    description:
      "Digital craftsman and developer, in search of the perfect layout.",
    url: "https://vyndrix.me",
    siteName: "Vyndrix",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/favicons/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
};

/**
 * *** ATTENTION ***
 *
 * Very sensitive information is is being accessed in this file, which are:
 *
 * - Light and Dark colors. Inlined here reflecting globals.css definition. Might mismatch.
 *
 * TODO-THEME:
 *      - Create a theme folder, and move globals.css into it -- Finally! --
 *      - Create a constants file for the theme and store global colors there
 *      - Remove colors from globals.css and inject them on init
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020618" },
  ],
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html
      suppressHydrationWarning
      className={`data-ready:transition-colors 
          data-ready:duration-750 
          data-ready:ease-in-out 
          motion-reduce:duration-0`}
    >
      <body
        suppressHydrationWarning
        className={`data-ready:transition-colors 
          data-ready:duration-750 
          data-ready:ease-in-out 
          motion-reduce:duration-0 
          antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
      <Analytics />
    </html>
  );
}
