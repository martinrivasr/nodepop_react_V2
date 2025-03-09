import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/index.ts";
import { logout } from "../services/api";
import storage from "../utils/storage.ts"
import { setAuthorizationHeader } from "../services/connection.ts";
import { getIslogged } from "../store/selectors.ts";
import { authLogout } from "../store/actions.ts";


export default function AuthButton() {
  const location = useLocation()
  const navigate = useNavigate();
  const accessToken = storage.get("auth");
  const { isLogged, rememberMe } = useAppSelector(getIslogged);
  const dispatch = useAppDispatch()

  console.log("estado de isLogged en authbutton:", isLogged)
  console.log("estado de rememberMe en authbutton:", rememberMe)
  console.log("estado de accessToken en authbutton:", accessToken)
  useEffect(() => {
    if (accessToken) {
      setAuthorizationHeader(accessToken);
    }
  }, [accessToken]);


  const handleLoginClick = () => {
    if (!isLogged && !accessToken){
      navigate("/login");
    } else {
      const to = location.state?.from ?? "/adverts"
      navigate(to, { replace: true}); 
    }
  };


  const handleLogoutClick = async (rememberMe?:boolean) => {
    await logout(rememberMe ?? false)
    dispatch(authLogout())
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
