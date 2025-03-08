import  { createContext, useContext } from "react";

export interface AuthContextValue {
    isLogged: boolean;
    rememberMe:boolean;
    onLogin: (remember: boolean) => void;
    onLogout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
    isLogged: false,
    rememberMe: false,
    onLogin: () =>{},
    onLogout: () => {},
});

export function useAuth(){
    const authValue = useContext(AuthContext);
    return authValue
}