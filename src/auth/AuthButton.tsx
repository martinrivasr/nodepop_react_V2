import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context";
import { logout } from "../services/api";


export default function AuthButton() {
  const { isLogged, rememberMe, onLogout } = useAuth();
  console.log("estado de rememberme cuando ingresas a boton de auth:", rememberMe)
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("Estado de islogged al presionar el boton de login: ", isLogged)
    if (!isLogged){
      console.log(" Click en Login - Navegando a /login");
      navigate("/login");
    }
  };


  const handleLogoutClick = async (rememberMe?:boolean) => {
    console.log("estado de rememberMe en authButton-logout(): ", rememberMe)
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
