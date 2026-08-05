import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bestandem | Elektrisüsteemide terviklahendused",
  description: "Elektri-, automaatika- ja nõrkvoolusüsteemide terviklahendused.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const key = "bnd-home-transition-down";

                document.addEventListener("click", (event) => {
                  const target = event.target;
                  if (target instanceof Element && target.closest('[data-home-transition="down"]')) {
                    sessionStorage.setItem(key, "1");
                  }
                }, true);

                window.addEventListener("pageswap", (event) => {
                  if (sessionStorage.getItem(key) === "1" && event.viewTransition) {
                    event.viewTransition.types.add("home-down");
                  }
                });

                window.addEventListener("pagereveal", (event) => {
                  if (sessionStorage.getItem(key) === "1") {
                    if (event.viewTransition) event.viewTransition.types.add("home-down");
                    sessionStorage.removeItem(key);
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
