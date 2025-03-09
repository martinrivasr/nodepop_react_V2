import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getIslogged } from "../store/selectors";
import { useAppSelector } from "../store";

function RequireAuth({ children }: { children:ReactNode}){
    const { isLogged } = useAppSelector(getIslogged);
    const location = useLocation();

    return isLogged ? 
    children : <Navigate to="/login" 
    state={{ from: location.pathname }} replace />;
}

export default RequireAuth;
