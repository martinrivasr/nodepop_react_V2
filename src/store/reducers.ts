import { Advert } from "../models/models";
import { Actions } from "./actions";

export type State = {
    auth:{ isLogged:boolean; rememberMe: boolean};
    adverts: { data:Advert[] | null; loaded: boolean};
    ui: {
        pending:boolean;
        error:Error| null;
    };
};

const defaultState: State = {
    auth:{ isLogged:false, rememberMe: false },
    adverts: {data:null, loaded:false},
    ui: {
        pending:false,
        error:null,
    }
};

export function auth(
    state = defaultState.auth,
    action: Actions
    ):State["auth"]{
        switch (action.type){
            case "auth/login/fulfilled":
                console.log("Redux: Acción de login ejecutada")
                return {
                    isLogged : true,
                    rememberMe: state.rememberMe
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
                return { ...state, error:null}
            case "auth/login/rejected":
                return { pending:false, error:action.payload};
            default:
                return state;
        }
    }