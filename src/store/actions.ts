import { Credentials } from "../models/models";
import { Appthunk, useAppSelector } from ".";
import { isApiClientError } from "../services/connection";


type AuthLoginFulfilled = {
    type: "auth/login/fulfilled"
}

type AuthLoginRejected = {
    type: "auth/login/rejected";
    payload: Error;
}

type AuthLogout = {
    type:"auth/logout"
};

type UiResetError = {
    type: "ui/reset-error"
}


export const authLoginFulfilled = (): AuthLoginFulfilled =>({
    type: "auth/login/fulfilled"
})


export const authLoginRejected = (error: Error): AuthLoginRejected =>({
    type:"auth/login/rejected",
    payload:error
})

export const authLogout = (): AuthLogout =>({
    type: "auth/logout"
})

export const uiResetError = (): UiResetError =>({
    type: "ui/reset-error"
})

export function authLogin(credentials:Credentials, rememberMe:boolean): Appthunk<Promise<void>>{
    return async function (dispatch, _getState, {api, router }){
        console.log("Ejecutando authLogin");
        dispatch(authLoginFulfilled());
        try {
            await api.services.login(credentials,rememberMe)
            dispatch(authLoginFulfilled())
            const to = router.state.location.state?.from ?? "/";
            router.navigate(to, { replace:true});
        } catch (error) {
            if(isApiClientError(error)){
                dispatch(authLoginRejected(error))
                console.log(error)
            }
            
        }

    }
}

export type Actions = 
| AuthLogout
| AuthLoginFulfilled
| AuthLoginRejected
| UiResetError