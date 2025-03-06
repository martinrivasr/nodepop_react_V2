import  { createContext, useContext } from "react";

export interface AuthContextValue {
    isLogged: boolean;
    rememberLogin: boolean;
    onLogin: () => void; 
    onLogout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
    isLogged: false,
    rememberLogin: false,
    onLogin: () =>{},
    onLogout: () => {},
});

export function useAuth(){
    const authValue = useContext(AuthContext);
    return authValue
}