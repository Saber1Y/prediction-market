"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { createConfig } from "@privy-io/wagmi";
import { privyConfig } from "@/config/privy";

// Create wagmi config
const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Create query client
const queryClient = new QueryClient();

interface PrivyWalletProviderProps {
  children: React.ReactNode;
}

export function PrivyWalletProvider({ children }: PrivyWalletProviderProps) {
  return (
    <PrivyProvider appId={privyConfig.appId} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
