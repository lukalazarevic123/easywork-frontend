import { useContext, useState } from "react";
import "./register.css"
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { toastCss } from "../../App";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<string>("FREELANCER")

  const registerWithWallet = async () => {
    if(password === "") {
        toast.error("You must provide a password!", toastCss);
        return;
    }

    const resp = await authContext.connectWallet();

    if(!resp){
      toast.error("Something went wrong connecting to Metamask", toastCss)
      return;
    }

    const res = await authContext.registerWeb3(resp.toString(), password, type);

    if(!res){
        toast.error("Something went wrong registering with wallet", toastCss)
        return;
    }

    toast.success("Success", toastCss);
    navigate("/jobs")
  }

//   web2 register
  const onSubmit = async () => {
    if(email === "" || password === ""){
      toast.error("Can't leave field empty", toastCss);
      return;
    }
    const res = await authContext.registerWeb2(email, password, type);

    if(!res){
      toast.error("Something went wrong", toastCss);
      return;
    }

    toast.success("Success", toastCss);
    navigate("/jobs");
  }

  return (
    <div className="login-wrapper">
      <h2 className="login-title">Sign up to EASyWork</h2>

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

        <div className="login-group">
            <div className="group-label">Type</div>
            <div className="login-input-wrapp">
                <select className="login-input easy-select" onChange={(e) => setType(e.target.value)}>
                    <option value={"FREELANCER"}>Freelancer</option>
                    <option value={"CLIENT"}>Client</option>
                </select>
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
          <div className="wallet-login" onClick={() => registerWithWallet()}>Connect Wallet</div>
        </div>
      </form>
    </div>
  );
};
