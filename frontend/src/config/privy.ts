import { PrivyClientConfig } from "@privy-io/react-auth";

export const privyConfig: PrivyClientConfig = {
  // Replace with your actual Privy App ID
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID || "your-privy-app-id",

  // Customize the login experience
  loginMethods: ["email", "wallet", "google", "twitter"],

  // Appearance customization
  appearance: {
    theme: "light",
    accentColor: "#676FFF",
    logo: "/logo.png", // Add your logo path
  },

  // Wallet configuration
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    requireUserPasswordOnCreate: false,
  },

  // Legal requirements
  legalRequirements: {
    termsAndConditionsUrl: "/terms",
    privacyPolicyUrl: "/privacy",
  },

  // Supported chains - customize based on your needs
  supportedChains: [
    {
      id: 1, // Ethereum Mainnet
      name: "Ethereum",
      network: "homestead",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: {
        default: {
          http: ["https://eth-mainnet.alchemyapi.io/v2/your-api-key"],
        },
        public: {
          http: ["https://cloudflare-eth.com"],
        },
      },
      blockExplorers: {
        default: {
          name: "Etherscan",
          url: "https://etherscan.io",
        },
      },
    },
    {
      id: 11155111, // Sepolia Testnet
      name: "Sepolia",
      network: "sepolia",
      nativeCurrency: {
        name: "Sepolia Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: {
        default: {
          http: ["https://eth-sepolia.g.alchemy.com/v2/your-api-key"],
        },
        public: {
          http: ["https://rpc.sepolia.org"],
        },
      },
      blockExplorers: {
        default: {
          name: "Etherscan",
          url: "https://sepolia.etherscan.io",
        },
      },
    },
  ],

  // Default chain
  defaultChain: {
    id: 11155111, // Start with Sepolia for development
  },
};
