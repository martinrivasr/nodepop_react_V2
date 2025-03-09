import { applyMiddleware, combineReducers, createStore } from "redux";
import * as reducers from "./reducers"
import { useDispatch, useSelector } from "react-redux";
import type {State } from "./reducers"
import { composeWithDevTools} from "@redux-devtools/extension"
import * as thunk from "redux-thunk"
import * as apiservices from "../services/api"
import { createBrowserRouter } from "react-router-dom";
import { Actions } from "./actions";

type Router = ReturnType<typeof createBrowserRouter>

type Api = {
    services: typeof apiservices;
  };

type ExtraArgument = {
    api: Api;
    router: Router;
}

// @ts-expect-error: any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const timestamp = (store) => (next) => (action) =>{
    const newAction = {
        ...action,
        meta:{
            ...action.meta,
            timestamp:new Date(),
        },
    };
    return next (newAction)
}

// @ts-expect-error: any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const failureRedirects = (router:Router) => (store) => (next) => (action) =>{
    const result = next(action);

    if(!action.type.endsWith("/rejected")){
        return result;
    }

    if(action.payload.code === "NOT_FOUND"){
        return router.navigate( "/404")
    }
    if(action.payload.code === "UNAUTHORIZED"){
        return router.navigate("/login")
    }

    return result;
}

export default function configureStore (
    prealoadedState:Partial<State>,
    router:Router,
){
    const rootReducer = combineReducers(reducers)
    const store = createStore(
        rootReducer,
        prealoadedState as never,
        composeWithDevTools(
            applyMiddleware(
                thunk.withExtraArgument<State, Actions, ExtraArgument>({
                    api: { services: apiservices },
                    router,
                }),
                timestamp,
                failureRedirects(router),
            ),
        ),
    );
    return store;
}

export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type Appthunk<ReturnType = void> = thunk.ThunkAction<
ReturnType,
RootState,
ExtraArgument,
Actions
>
