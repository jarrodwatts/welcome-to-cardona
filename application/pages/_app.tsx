import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CHAIN } from "../const/chains";
import localFont from "next/font/local";
import { Nav } from "../components/Navbar";
import Head from "next/head";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

import type { AppProps } from "next/app";

const myFont = localFont({
  src: [
    {
      path: "../public/fonts/generalsans/GeneralSans-Bold.otf",
      style: "normal",
      weight: "700", // Bold
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-BoldItalic.otf",
      style: "italic",
      weight: "700", // Bold Italic
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-Extralight.otf",
      style: "normal",
      weight: "200", // Extra Light
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-ExtralightItalic.otf",
      style: "italic",
      weight: "200", // Extra Light Italic
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-Italic.otf",
      style: "italic",
      weight: "400", // Italic (assuming Regular Italic)
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-Light.otf",
      style: "normal",
      weight: "300", // Light
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-LightItalic.otf",
      style: "italic",
      weight: "300", // Light Italic
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-Medium.otf",
      style: "normal",
      weight: "500", // Medium
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-MediumItalic.otf",
      style: "italic",
      weight: "500", // Medium Italic
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-Regular.otf",
      style: "normal",
      weight: "400", // Regular
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-Semibold.otf",
      style: "normal",
      weight: "600", // Semi Bold
    },
    {
      path: "../public/fonts/generalsans/GeneralSans-SemiboldItalic.otf",
      style: "italic",
      weight: "600", // Semi Bold Italic
    },
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={myFont.className}>
      <Head>
        <title>Polygon @ ETH Denver</title>
        <meta
          name="description"
          content="Create or join a team to participate in Polygon's set of challengers at ETH Denver!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ThirdwebProvider
          // Set active chain for app
          activeChain={CHAIN}
          clientId={process.env.NEXT_PUBLIC_THIRDWEB_API_KEY}
        >
          <Nav />
          <Component {...pageProps} />
          <Toaster />
        </ThirdwebProvider>
      </main>
    </div>
  );
}

export default MyApp;
