// Privy configuration constants
export const PRIVY_APP_ID =
  process.env.NEXT_PUBLIC_PRIVY_APP_ID || "your-privy-app-id";

export const PRIVY_CONFIG = {
  // Customize the login experience
  loginMethods: ["email", "wallet", "google", "twitter"] as const,

  // Appearance customization
  appearance: {
    theme: "light" as const,
    accentColor: "#676FFF",
    logo: "/logo.png", // Add your logo path
  },

  // Wallet configuration
  embeddedWallets: {
    createOnLogin: "users-without-wallets" as const,
    requireUserPasswordOnCreate: false,
  },

  // Legal requirements
  legalRequirements: {
    termsAndConditionsUrl: "/terms",
    privacyPolicyUrl: "/privacy",
  },
};
