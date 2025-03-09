import React, { useEffect, useRef, useState } from "react";
import { login as loginApi } from "../services/api";
import { useAuth } from "../auth/context";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Message from "../components/message";
import { ApiClientError } from "../utils/error";
import { isApiClientError } from "../services/connection";
import FormField from "../components/inputForm";
import { useAppDispatch, useAppSelector } from "../store";
import { authLogin } from "../store/actions";
import { getIslogged } from "../store/selectors";

export default function LoginPage () {
  //const location = useLocation()
  //const navigate = useNavigate();
  const [credentials, setCredentials] = useState(() => ({
    email: "",
    password: "",
  }));
  //const [error, setError] = useState<ApiClientError | null>(null);
  //const [isLoading, setIsLoading ] = useState(false)
  const [rememberMe, setRememberMe ] = useState(false)
  //const [isLogged, setisLogged ] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  //const { onLogin } = useAuth();
  const dispatch = useAppDispatch ();
  const isLogged = useAppSelector(getIslogged);
  //const { pending, error } = useAppSelector(getui)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
 //   try {
     // setIsLoading(true);
     // console.log("estado de Rememberme: ", rememberMe)
      //const response = await loginApi(credentials, rememberMe);
      //console.log("valor de islogged en loginpage:", isLogged)
      //console.log("valor de Rememberme en loginpage:", rememberMe)
      dispatch(authLogin(credentials, rememberMe))
      setMessage({ type: "success", text: "Inicio de sesión exitoso. Redirigiendo..." });
     

     // useEffect(() => {
     //     console.log("Estado de isLogged en Redux:", isLogged);
     // }, [isLogged]);
      console.log("ya paso el dispatch")
      //onLogin(rememberMe);
      //const to = location.state?.from ?? "/"
      //navigate(to, { replace: true}); 
   // } 
    //catch (error) {
    //  if(isApiClientError(error)){
     //   setError
     // }
  //    setMessage({ type: "error", text: "Credenciales incorrectas. Intenta nuevamente." });
  //  }
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
