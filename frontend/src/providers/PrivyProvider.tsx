"use client";

import { PrivyProvider } from "@privy-io/react-auth";

interface PrivyWalletProviderProps {
  children: React.ReactNode;
}

export function PrivyWalletProvider({ children }: PrivyWalletProviderProps) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "your-privy-app-id";

  return (
    <PrivyProvider
      appId={appId}
      config={{
        // Customize the login experience
        loginMethods: ["email", "wallet", "google", "twitter"],

        // Appearance customization
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },

        // Wallet configuration
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          requireUserPasswordOnCreate: false,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
