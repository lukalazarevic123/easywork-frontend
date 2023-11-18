import { FC, createContext, useEffect, useState } from "react";

export interface IAuthContext {
  walletUser: boolean;
  loggedIn: boolean;
  user: any;
  wallet: string;
  registerWeb3: (
    address: string,
    password: string,
    type: string
  ) => Promise<boolean>;
  registerWeb2: (
    email: string,
    password: string,
    type: string,
  ) => Promise<boolean>;
  loginWeb2: (
    email: string,
    password: string
  ) => Promise<boolean>;
  loginWeb3: (
    chainAddress: string,
    password: string
  ) => Promise<boolean>;
  connectWallet: () => Promise<boolean> | Promise<string>;
}

export const AuthContext = createContext<IAuthContext>(null);

const AuthProvider = ({ children }) => {
  const [walletUser, setWalletUser] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [wallet, setWallet] = useState<string>("");
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<any>("");

  useEffect(() => {
    const checkWindow = () => {
      // @ts-ignore
      if (window.ethereum?.isMetaMask) {
        console.log("METAMASK DETECTED");
        setWalletUser(true);
      }
    };

    checkWindow();
  }, [wallet]);

  const connectWallet = async () => {
    try {
      // @ts-ignore
      const accs = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accs.length === 0) {
        setWalletUser(false);
        return false;
      }

      //send request to the back so you get jwt in return.
      setWallet(accs[0]);
      setLoggedIn(true);
      return accs[0];
    } catch (e) {
      return false;
    }
  };

  const loginWeb3 = async (chainAddress, password) => {
    const resp = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login-web3`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          chainAddress,
        }),
      }
    );

    const resData = await resp.json();

    if (resData.msg) {
      return false;
    }

    if (resData.token) {
      localStorage.setItem("token", resData.token);
      setLoggedIn(true);
      setToken(resData.token);
      return true;
    }

    return true;
  };

  const registerWeb3 = async (chainAddress, password, type) => {
    const resp = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register-web3`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          chainAddress,
          type,
        }),
      }
    );

    const resData = await resp.json();

    if (resData.msg) {
      return false;
    }

    if (resData.token) {
      localStorage.setItem("token", resData.token);
      setLoggedIn(true);
      setToken(resData.token);
      return true;
    }

    return true;
  };

  const loginWeb2 = async (email, password) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const resData = await res.json();

    if (resData.msg) {
      return false;
    }

    if (resData.token) {
      localStorage.setItem("token", resData.token);
      setLoggedIn(true);
      setToken(resData.token);
      return true;
    }

    return true;
  };

  const registerWeb2 = async (email, password, type) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          type,
        }),
      }
    );

    const resData = await res.json();

    if (resData.msg) {
      return false;
    }

    if (resData.token) {
      localStorage.setItem("token", resData.token);
      setLoggedIn(true);
      setToken(resData.token);
      return true;
    }

    return true;
  };



  const value: IAuthContext = {
    walletUser,
    loggedIn,
    user,
    wallet,
    connectWallet,
    registerWeb3,
    registerWeb2,
    loginWeb2,
    loginWeb3
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
