import { Advert } from "../models/models";
import { Actions } from "./actions";

export type State = {
    auth:{ isLogged:boolean; rememberMe: boolean};
    adverts: { data:Advert[] | null; loaded: boolean};
    ui: {
        pending:boolean;
        message: { type: "success" | "error" | "info"; text: string} | null;
    };
};

const defaultState: State = {
    auth:{ isLogged:false, rememberMe: false },
    adverts: {data:null, loaded:false},
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
            case "advert/loaded/rejected":
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
            default:
                return state;
        }
    }