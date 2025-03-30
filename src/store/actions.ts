import { Advert, CreateAdvertDto, Credentials, Tag } from "../models/models";
import { Appthunk } from ".";
import { isApiClientError } from "../services/connection";
import { getAdvert } from "./selectors";

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

type AdvertCreatedFulfilled = {
    type : "adverts/created/fulfilled",
    payload: Advert,
}

type AdvertsRejected = {
    type: "advert/rejected";
    payload: string
}

type AdvertPending = {
    type: "advert/pending"
    payload: string
}

type AdvertsDeletedFulfilled = {
    type: "advert/deleted/fulfilled"
    payload: { id: string}
}


type TagsLoadedFulfilled = {
    type: "tags/loaded/fulfilled"
    payload: { data: Tag[], loaded: boolean}
}

type TagsRejected = {
    type: "tags/rejected";
    payload: string
}

type TagsPending = {
    type: "tags/pending"
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


export const advertRejected = (error:string | Error, customMessage?: string): AdvertsRejected =>({
    type: "advert/rejected",
    payload: customMessage
        ? `${customMessage}: ${typeof error === "string" ? error : error.message}`
        : typeof error === "string" ? error: error.message
})

export const advertPending = (message: string): AdvertPending =>({
    type: "advert/pending",
    payload: message
})

export const advertCreatedFulfilled = (
    advert: Advert,
) : AdvertCreatedFulfilled => ({
    type: "adverts/created/fulfilled",
    payload: advert,
})

export const advertDeletedFulfilled = (id: string ): AdvertsDeletedFulfilled =>({
    type: "advert/deleted/fulfilled",
    payload:  {id }
})


export const tagsLoadedFulfilled = (
    tags: Tag[],
    loaded?: boolean,
): TagsLoadedFulfilled =>({
    type: "tags/loaded/fulfilled",
    payload: { data: tags, loaded: !!loaded}
})

export const tagsPending = (message: string): TagsPending =>({
    type: "tags/pending",
    payload: message
})

export const tagsRejected = (error:string | Error, customMessage?: string): TagsRejected =>({
    type: "tags/rejected",
    payload: customMessage
        ? `${customMessage}: ${typeof error === "string" ? error : error.message}`
        : typeof error === "string" ? error: error.message
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
        dispatch(advertPending ("Cargando Anuncios..."))
        const state = getState();
        if (state.adverts.loaded) {
            dispatch(uiResetError())
            return;
        }
        try {
            const adverts = await api.services.getAdverts();
            dispatch(advertLoadedFulfilled(adverts, true));
        } catch (error) {
            if(isApiClientError(error)){
                console.error("Error al cargar anuncios:", error);
                dispatch(advertRejected(error, "Error al cargar los anuncions. intente nuevamente"));
            }

        }
    };
}


export function advertLoaded (advertId: string): Appthunk<Promise<void>>{
    return async function(dispatch, getState, { api }){
        dispatch(advertPending ("Cargando Anuncio..."))
        const state = getState();
        if(getAdvert(advertId)(state)){
            dispatch(uiResetError())
            return
        }
        try {
            const advert = await api.services.getAdvertById(advertId);
            dispatch(advertLoadedFulfilled([advert], true ))
        } catch (error) {
            if(isApiClientError(error)){
                dispatch(advertRejected(error, "Error al cargar el anuncio. Intente nuevamente"))
            }
        }
    }
}


export function advertDelete(advertId: string): Appthunk<Promise<void>>{
    return async function (dispatch, getstate, { api, router }){
        dispatch(advertPending("Eliminando anuncio ..."))
        const state = getstate();
        const advert = getAdvert(advertId)(state)
        if(!advert){
            dispatch(advertRejected("El anuncio no existe en el estado", "Error al eliminar el anuncio"));
            return
        }
            try {
                await api.services.deleteAdvert(advertId);
                dispatch(advertDeletedFulfilled(advertId))
                await router.navigate(`/adverts`)
            } catch (error) {
                if(isApiClientError(error)){
                    console.log("Error al borrar el anuncio.Intenta nuevamente.", error)
                    dispatch(advertRejected(error, "Error al borrar  el anuncio.Intenta nuevamente"));
                }
            } 
    }
}


export function advertCreate(
    advertContent: CreateAdvertDto
) : Appthunk<Promise<Advert>>{
    return async function (dispatch, _getState, {api, router }){
        dispatch(advertPending ("Creando Anuncio..."))
        try {
            const advertCreated = await api.services.createAdvert(advertContent);
            const advert = await api.services.getAdvertById(advertCreated.id.toString())
            dispatch(advertCreatedFulfilled(advert));
            await router.navigate(`/adverts/${advert.id}`)
            return advert
        } catch (error) {
            if(isApiClientError(error)){
                console.log("Error al crear el anuncio.Intenta nuevamente.", error)
                dispatch(advertRejected(error, "Error al crear el anuncio.Intenta nuevamente"));
            }
            throw error;
        }
    }
}


export function tagsLoaded(): Appthunk<Promise<void>> {
    return async function (dispatch, getState, { api }) {
        dispatch(tagsPending ("Cargando Anuncios..."))
        const state = getState();
        if (state.tags.loaded) {
            dispatch(uiResetError())
            return;
        }
        try {
            const tags = await api.services.getTags();
            dispatch(tagsLoadedFulfilled(tags, true));
        } catch (error) {
            if(isApiClientError(error)){
                console.error("Error al cargar anuncios:", error);
                dispatch(tagsRejected(error, "Error al cargar los tags. "));
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
| AdvertsRejected
| AdvertCreatedFulfilled
| AdvertPending
| AdvertsDeletedFulfilled
| TagsLoadedFulfilled
| TagsPending
| TagsRejected