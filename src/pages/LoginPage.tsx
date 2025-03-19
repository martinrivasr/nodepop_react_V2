import React, { useState } from "react";
import {  Link } from "react-router-dom";
import Message from "../components/message";
import FormField from "../components/inputForm";
import { useAppDispatch, useAppSelector } from "../store";
import { authLogin } from "../store/actions";
import { getUi } from "../store/selectors";


export default function LoginPage () {

  const [credentials, setCredentials] = useState(() => ({
    email: "",
    password: "",
  }));
 
  const [rememberMe, setRememberMe ] = useState(false)
  const dispatch = useAppDispatch ();
  const {pending, message} = useAppSelector(getUi)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      dispatch(authLogin(credentials, rememberMe))
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((credentials) => {
      return { ...credentials, [event.target.name]: event.target.value };
    });
  };


  const { email, password } = credentials;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "24rem" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Sign in to your account</h2>
          <p className="text-muted">Or start your 14-day free trial</p>
        </div >
        <div role="alert">
        {message && <Message type={message.type} text={message.text} />}
        </div>
        
        <form onSubmit={handleSubmit}>
          <FormField
              type="text"
              name="email"
              label="Email address"
              value={email}
              onChange={handleChange}
          /> 
          <FormField
              type="password"
              name="password"
              label="Password"
              value={password}
              onChange={handleChange}
          />
      
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() =>setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe" className="form-check-label">
                Remember me
              </label>
            </div>
            <a href="#" className="text-decoration-none text-primary">
              Forgot password?
            </a>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100 mb-3"
            >
            Sign in
          </button>
        </form>
        <div className="text-center">
          <span className="text-muted">Or continue with</span>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-secondary w-45">Google</button>
          <button className="btn btn-outline-secondary w-45">GitHub</button>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">
            Not a member?{" "}
            <Link to="/signup" className="text-decoration-none text-primary">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

//export default function LoginPagePortal() {
//  const portalContainer = useRef<HTMLDivElement>(document.createElement("div"));

//  useEffect(() => {
//    portalContainer.current.className = "container";

//    const externalWindow = window.open("", "", "width=400, height=550");

//    externalWindow?.document.body.appendChild(portalContainer.current);
 //   portalStyles(window.document, externalWindow!.document);

 //   return () => {
 //     externalWindow?.close();
 //   };
//  }, []);

//  return createPortal(<LoginPage />, portalContainer.current);
//}
