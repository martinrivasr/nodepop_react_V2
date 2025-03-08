import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context";
import { logout } from "../services/api";
import storage from "../utils/storage.ts"
import { setAuthorizationHeader } from "../services/connection.ts";


export default function AuthButton() {
  const location = useLocation()
  const navigate = useNavigate();
  const accessToken = storage.get("auth");
  const { isLogged, rememberMe, onLogin, onLogout } = useAuth();

  if (accessToken){
    setAuthorizationHeader(accessToken)
  }

  //console.log("estado de login cuando presionas login:", isLogged)
  const handleLoginClick = () => {
    if (!isLogged && !accessToken){
      navigate("/login");
    } else {
      onLogin(rememberMe);
      const to = location.state?.from ?? "/adverts"
      navigate(to, { replace: true}); 
    }
  };


  const handleLogoutClick = async (rememberMe?:boolean) => {
    await logout(rememberMe ?? false)
    onLogout();
  };

  return isLogged ? (
    <button className="btn btn-primary  ms-3" onClick={() => handleLogoutClick(rememberMe) }>
      Logout
    </button>
  ) : (
    <button className="btn btn-primary ms-auto" onClick={handleLoginClick}>
      Login
    </button>
  );
}
