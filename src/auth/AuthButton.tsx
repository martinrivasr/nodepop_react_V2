import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context";
import { logout } from "../services/api";


export default function AuthButton() {
  const { isLogged, onLogout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("Estado de islogged al presionar el boton de login: ", isLogged)
    if (!isLogged){
      console.log(" Click en Login - Navegando a /login");
      navigate("/login");
    }
  };


  const handleLogoutClick = async () => {
    const rememberMe = localStorage.getItem("rememberLogin") === "true";
    console.log("Valor de rememberMe al hacer logout:", rememberMe);
    await logout(rememberMe)
    console.log("Valor de rememberMe al hacer logout:", rememberMe);
    onLogout();
  };

  return isLogged ? (
    <button  className="btn btn-primary  ms-3" onClick={handleLogoutClick}>
      Logout
    </button>
  ) : (
    <button className="btn btn-primary ms-auto" onClick={handleLoginClick}>
      Login
    </button>
  );
}
