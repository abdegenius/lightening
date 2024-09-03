"use client";

import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { WagmiProvider } from "wagmi";

import { useTheme } from "next-themes";
import { config } from "../wagmi";
import { useWindowWidth } from "./hooks/windowX";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const width = useWindowWidth() > 500 ? "wide" : "compact";

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize={width}
          theme={
            theme === "dark"
              ? darkTheme({
                  accentColor: "#333",
                  accentColorForeground: "white",
                  borderRadius: "small",
                  fontStack: "system",
                  overlayBlur: "small",
                })
              : lightTheme({
                  accentColor: "#7b3fe4",
                  accentColorForeground: "white",
                  borderRadius: "medium",
                  fontStack: "system",
                })
          }
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
