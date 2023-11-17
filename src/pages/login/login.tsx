import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { toastCss } from "../../App";

export const LoginPage = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const connectWallet = async () => {
    const resp = await authContext.connectWallet();

    if(!resp){
      toast.error("Something went wrong connecting to Metamask", toastCss)
      return;
    }

    toast.success("Success", toastCss);
    navigate("/jobs")
  }

  const onSubmit = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    if(res.status === 400){
      toast.error("Wrong credentials", toastCss);
      return;
    }

    
  }

  return (
    <div className="login-wrapper">
      <h2 className="login-title">Log in to EASyWork</h2>

      <form className="login-form">
        <div className="login-group">
          <div className="group-label">E-mail</div>
          <div className="login-input-wrap">
            <input
              className="login-input"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@easywork.com"
              required
            />
          </div>
        </div>

        <div className="login-group">
          <div className="group-label">Password</div>
          <div className="login-input-wrap">
            <input
              className="login-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="submit-btn" onClick={() => onSubmit()}>
          Submit
        </div>

        <div className="separator">
          <div className="line"></div>
          or
          <div className="line"></div>
        </div>

        <div className="d-flex">
          <div className="wallet-login" onClick={() => connectWallet()}>Connect Wallet</div>
        </div>
      </form>
    </div>
  );
};
