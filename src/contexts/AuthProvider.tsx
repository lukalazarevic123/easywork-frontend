import { FC, createContext, useEffect, useState } from "react";

export interface IAuthContext {
  walletUser: boolean;
  loggedIn: boolean;
  user: any;
  connectWallet: () => Promise<boolean>;
}

export const AuthContext = createContext<IAuthContext>(null);

const AuthProvider = ({ children }) => {
  const [walletUser, setWalletUser] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [wallet, setWallet] = useState<string>("");
  const [user, setUser] = useState<any>({});

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
    try{
      // @ts-ignore
      const accs = await window.ethereum.request({ method: "eth_requestAccounts" });

      if(accs.length === 0) {
        setWalletUser(false);
        return false;
      }


      //send request to the back so you get jwt in return.
      setWallet(accs[0])
      setLoggedIn(true);
      return true;
    }catch(e) {
      return false;
    }
  };

  const value: IAuthContext = {
    walletUser,
    loggedIn,
    user,
    connectWallet,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
