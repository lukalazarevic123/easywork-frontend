import "./navbar.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Toaster } from "react-hot-toast";

const defAvatar = "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg";

const links = [
  {
    name: "Home",
    href: "/",
    role: "ALL"
  },
  {
    name: "Find work",
    href: "/jobs",
    role: "ALL"
  },
  {
    name: "Posted jobs",
    href: "/posted",
    role: "CLIENT"
  },
  {
    name: "My jobs",
    href: "/posted",
    role: "FREELANCER"
  }
];

interface LinkItem {
  name: string;
  href: string;
  role: string;
}

const authLinks = [
  {
    name: "Register",
    href: "/register",
  },
  {
    name: "Login",
    href: "/login",
  },
];

export const Navbar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const renderWalletAuthentication = () => {
    return (
      <div
        className="wallet-button"
        onClick={() => authContext.connectWallet()}
      >
        Connect Wallet
      </div>
    );
  };

  const renderWeb2Authentication = () => {
    return (
      <div className="links-list">
        {authLinks.map((link, idx) => (
          <div
            className="link-item"
            key={idx}
            onClick={() => navigate(link.href)}
          >
            {link.name}
          </div>
        ))}
      </div>
    );
  };

  const filterLinksByRole = (link: LinkItem) => {
    if(link.role === authContext.type || link.role === "ALL") {
      return true;
    }

    return false;
  }

  const openSnap =  async () => {
    // @ts-ignore
    await window.ethereum.request({
      method: "wallet_requestSnaps",
      params: {
        "local:http://localhost:8080": {}
      }
    })

    // @ts-ignore
    const res = await window.ethereum.request({
      method: "wallet_invokeSnap",
      params: {snapId: "local:http://localhost:8080", request: { method: "hello" }}
    });
  }

  const renderAvatar = () => {
    return (
      <div onClick={() => openSnap()}>
        <img
          className="user-avatar"
          src={defAvatar}
        />
      </div>
    );
  };

  const renderAuth = () => {
    if (authContext.loggedIn) {
      return renderAvatar();
    }

    return authContext.walletUser
      ? renderWalletAuthentication()
      : renderWeb2Authentication();
  };

  return (
    <div className="navbar-wrapper">
      <Toaster position="top-right" />
      <div className="d-flex">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <div className="brand-logo">
            <img className="brand-img" src={logo} />
          </div>
          <div className="brand-name">EASyWork</div>
        </div>

        <div className="links-list">
          {links.filter((link) => filterLinksByRole(link)).map((link, idx) => (
            <div
              className="link-item"
              key={idx}
              onClick={() => navigate(link.href)}
            >
              {link.name}
            </div>
          ))}
        </div>
      </div>

      <div className="authentication">{renderAuth()}</div>
    </div>
  );
};
