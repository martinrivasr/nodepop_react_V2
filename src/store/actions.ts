import { Advert, Credentials } from "../models/models";
import { Appthunk } from ".";
import { isApiClientError } from "../services/connection";

type AuthLoginPending = {
    type: "auth/login/pending"
}

type AuthLoginFulfilled = {
    type: "auth/login/fulfilled";
    payload: { rememberMe: boolean };
}

type AuthLoginRejected = {
    type: "auth/login/rejected";
    payload: string
}

type AuthLogout = {
    type:"auth/logout"
};

type UiResetError = {
    type: "ui/reset-error"
}

type AdvertsLoadedFulfilled = {
    type: "advert/loaded/fulfilled"
    payload: { data: Advert[], loaded: boolean}
}

type AdvertsLoadedRejected = {
    type: "advert/loaded/rejected";
    payload: string
}

export const authLoginPending = (): AuthLoginPending => ({
    type: "auth/login/pending"
})

export const authLoginFulfilled = (payload: { rememberMe: boolean }): AuthLoginFulfilled =>({
    type: "auth/login/fulfilled",
    payload,
})

export const authLoginRejected = (error: Error): AuthLoginRejected =>({
    type:"auth/login/rejected",
    payload:error.message
})

export const authLogout = (): AuthLogout =>({
    type: "auth/logout"
})

export const uiResetError = (): UiResetError =>({
    type: "ui/reset-error"
})

export const advertLoadedFulfilled = (
    adverts: Advert[],
    loaded?: boolean,
): AdvertsLoadedFulfilled =>({
    type: "advert/loaded/fulfilled",
    payload: { data: adverts, loaded: !!loaded}
})

export const advertLoadedRejected = (error:Error): AdvertsLoadedRejected =>({
    type: "advert/loaded/rejected",
    payload: error.message
})


export function authLogin(credentials:Credentials, rememberMe:boolean): Appthunk<Promise<void>>{
    return async function (dispatch, _getState, {api, router }){
        dispatch(authLoginPending())
        try {
            await api.services.login(credentials,rememberMe)
            dispatch(authLoginFulfilled({ rememberMe }));
            const to = router.state.location.state?.from ?? "/";
            router.navigate(to, { replace:true});
        } catch (error) {
            if(isApiClientError(error)){
                dispatch(authLoginRejected(error))
            }
        }

    }
}

export function advertsLoaded(): Appthunk<Promise<void>> {
    return async function (dispatch, getState, { api }) {
        const state = getState();
        if (state.adverts.loaded) {
            return;
        }

        try {
            const adverts = await api.services.getAdverts();
            dispatch(advertLoadedFulfilled(adverts, true));
        } catch (error) {
            if(isApiClientError(error)){
                console.error("Error al cargar anuncios:", error);
                dispatch(advertLoadedRejected(error));
            }

        }
    };
}


export type Actions = 
| AuthLoginPending
| AuthLogout
| AuthLoginFulfilled
| AuthLoginRejected
| UiResetError
| AdvertsLoadedFulfilled
| AdvertsLoadedRejected