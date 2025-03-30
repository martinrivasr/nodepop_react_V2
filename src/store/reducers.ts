import { Advert, Tag } from "../models/models";
import { Actions } from "./actions";

export type State = {
    auth:{ isLogged:boolean; rememberMe: boolean};
    adverts: { data:Advert[] | null; loaded: boolean};
tags: {data:Tag[] | null; loaded: boolean}
    ui: {
        pending:boolean;
        message: { type: "success" | "error" | "info"; text: string} | null;
    };
};

const defaultState: State = {
    auth:{ isLogged:false, rememberMe: false },
    adverts: {data:null, loaded:false},
    tags:{data:null, loaded:false},
    ui: {
        pending:false,
        message: null,
    }
};

export function auth(
    state = defaultState.auth,
    action: Actions
    ):State["auth"]{
        switch (action.type){
            case "auth/login/fulfilled":
                return {
                    isLogged : true,
                    rememberMe: action.payload.rememberMe
               }
            case "auth/logout":
                return {
                     isLogged : false,
                     rememberMe: state.rememberMe
                }
            default:
                return state;
        }
    }

    export function ui(state = defaultState.ui, action:Actions): State["ui"] {
        switch(action.type){
            case "ui/reset-error":
                return { ...state, message:null}
            case "auth/login/pending":
                return { pending: true, message: null}
            case "auth/login/fulfilled":
                return {... state, message: {type: "success", text: "Inicio de sesión existoso"}}
            case "auth/login/rejected":
                return { pending:false, message:{type: "error", text : action.payload}};
            case "auth/logout":
                return { ...state, message:{type: "success", text: "Sesión cerrada correctamente"}}
            case "advert/rejected":
                return { pending:false, message:{type: "error", text : action.payload}};
            case "advert/pending":
                return { pending: true, message:{type:"info", text : action.payload}}
            case "advert/loaded/fulfilled":
                return { pending: false, message: null}
            case "tags/rejected":
                return { pending:false, message:{type: "error", text : action.payload}};
            default:
                return state;
        }
    }

    export function adverts (
        state = defaultState.adverts,
        action: Actions,
    ): State["adverts"] {
        switch(action.type) {
            case "advert/loaded/fulfilled":
                return state.data === action.payload.data
                        ? state
                        : { ...state, data: action.payload.data, loaded: action.payload.loaded };
            case "adverts/created/fulfilled":
                    return { ...state, data: [...(state.data || []), action.payload] };
            case "advert/deleted/fulfilled":
                    return { 
                            ...state, 
                                data: (state.data || []).filter(advert => advert.id !== action.payload.id)
                            };
            default:
                return state;
        }
    }


    export function tags (
        state = defaultState.tags,
        action: Actions,
    ): State["tags"] {
        switch(action.type) {
            case "tags/loaded/fulfilled":
                return  {
                        data: action.payload.data, 
                        loaded: true};

            case "tags/pending":
                return  {
                    data: null, 
                    loaded: false
                };

            default:
                return state;
        }
    }
