import React, { useEffect, useRef, useState } from "react";
import { login as loginApi } from "../services/api";
import { useAuth } from "../auth/context";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Message from "../components/message";
import { ApiClientError } from "../utils/error";
import { isApiClientError } from "../services/connection";
import { createPortal } from "react-dom";
import portalStyles from "../utils/portalStyles"
import FormField from "../components/inputForm";
import storage from "../utils/storage";


const LoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(() => ({
    email: "",
    password: "",
  }));
  const [error, setError] = useState<ApiClientError | null>(null);
  const [isLoading, setIsLoading ] = useState(false)
  const [rememberMe, setRememberMe ] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const { onLogin } = useAuth();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await loginApi(credentials);
      console.log("respuesta de API",response)
      setMessage({ type: "success", text: "Inicio de sesión exitoso. Redirigiendo..." });
      onLogin();
      storage.set("rememberLogin", rememberMe.toString());
      const to = location.state?.from ?? "/adverts"
      navigate(to, { replace: true}); 
    } catch (error) {
      if(isApiClientError(error)){
        setError(error)
      }
      setMessage({ type: "error", text: "Credenciales incorrectas. Intenta nuevamente." });
    } finally{
      setIsLoading(false)
    }
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((credentials) => {
      return { ...credentials, [event.target.name]: event.target.value };
    });
  };

  const handleRememberMe = () =>{
    setRememberMe((prev) => !prev)
  } 

  const { email, password } = credentials;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "24rem" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Sign in to your account</h2>
          <p className="text-muted">Or start your 14-day free trial</p>
        </div>
        {message && <Message type={message.type} text={message.text} />}
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
                onChange={handleRememberMe}
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

export default function LoginPagePortal() {
  const portalContainer = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    portalContainer.current.className = "container";

    const externalWindow = window.open("", "", "width=400, height=550");

    externalWindow?.document.body.appendChild(portalContainer.current);
    portalStyles(window.document, externalWindow!.document);

    return () => {
      externalWindow?.close();
    };
  }, []);

  return createPortal(<LoginPage />, portalContainer.current);
}
