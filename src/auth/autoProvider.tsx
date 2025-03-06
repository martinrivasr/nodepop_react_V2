import { ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./context";
import storage from '../utils/storage';


interface Props {
    defaultIsLogged: boolean;
    children : ReactNode;
}

export function AuthProvider ({ defaultIsLogged, children }: Props){
    const [isLogged, setIsLogged] = useState(defaultIsLogged || !!storage.get("auth"));
    const [rememberLogin, setRememberLogin] = useState(false);


    useEffect(() => {
        if (storage.get("auth")) {
            setIsLogged(true);
        }else {
            setIsLogged(false);
        }
    }, []);

    const handleLogin = () =>{
        setIsLogged(true);
    };

    const handleLogout = () =>{
        const rememberMe = storage.get("rememberLogin") === "true";
        console.log("Estado de rememberMe en logout:", rememberMe);
        if (!rememberMe) {
            storage.remove("auth");
            setIsLogged(false);
        } else {
            setIsLogged(false);
        }
        
    }

    const authValue = {
        isLogged,
        rememberLogin,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
      );
;}