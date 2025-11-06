"use client";

import { useWalletConnection } from "@/hooks/useWalletConnection";

// Admin wallet addresses - add your wallet address here
const ADMIN_ADDRESSES = ["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"];

interface AdminAuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
  checkAdminStatus: () => void;
}

export function useAdminAuth(): AdminAuthContextType {
  const { walletAddress, isAuthenticated, isReady } = useWalletConnection();

  const isLoading = !isReady;

  const isAdmin =
    isReady && isAuthenticated && walletAddress
      ? ADMIN_ADDRESSES.some(
          (address) => address.toLowerCase() === walletAddress.toLowerCase()
        )
      : false;

  const checkAdminStatus = () => {
    if (!isAdmin && !isLoading) {
      return false;
    }
    return isAdmin;
  };

  return {
    isAdmin,
    isLoading,
    checkAdminStatus,
  };
}
