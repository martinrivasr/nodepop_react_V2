import { ReactNode, useState } from "react";
import { AuthContext } from "./context";
import storage from '../utils/storage';


interface Props {
    defaultIsLogged: boolean;
    children : ReactNode;
    rememberMeProps?: boolean
}

export function AuthProvider ({ defaultIsLogged, children, rememberMeProps }: Props){
    const [isLogged, setIsLogged] = useState(defaultIsLogged || !!storage.get("auth"));
    const [rememberMe, setRememberMe ] = useState(rememberMeProps || false)

    const handleLogin = (remember: boolean) => {
        setIsLogged(true);
        setRememberMe(remember); 
    };

    const handleLogout = () =>{
        setIsLogged(false); 
    }

    const authValue = {
        isLogged,
        rememberMe,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
      );
;}