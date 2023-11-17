import { FC, createContext, useEffect, useState } from "react";

export interface IAuthContext {
  walletUser: boolean;
  connectWallet: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>(null);

const AuthProvider = ({ children }) => {
  const [walletUser, setWalletUser] = useState<boolean>(false);
  const [wallet, setWallet] = useState<string>("");

  useEffect(() => {
    const checkWindow = () => {
      // @ts-ignore
      if (window.ethereum?.isMetaMask) {
        console.log("METAMASK DETECTED");
        setWalletUser(true);
      }
    };

    checkWindow();
  }, []);

  const connectWallet = async () => {
    // @ts-ignore
    const accs = await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log(accs);
    if(accs.length === 0) {
        setWalletUser(false);
        return;
    }

    setWallet(accs[0])
  };

  const value: IAuthContext = {
    walletUser,
    connectWallet,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
