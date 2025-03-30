import { describe, test, expect, afterEach, vi } from "vitest";
import { authLogin, authLoginPending, authLoginRejected, authLogout } from "../actions";
import { Credentials } from "../../models/models";
import { ApiClientError } from "../../utils/error";
//import portalStyles from "../../utils/portalStyles";



describe("Login Test", () => {
    test ('should return an "auth/login/pending" action', () =>{
        const expectedAction = { type: "auth/login/pending"}
        expect(authLoginPending()).toEqual(expectedAction)
    });

    test ('Should return the rejected action "auth/login/rejected"', () =>{
        const error = new Error ("Error en login")
        const expectedAction = { type: "auth/login/rejected", payload: error.message}
        expect(authLoginRejected(error)).toEqual(expectedAction)
    })

    test ('Should return the "auth/logout", action', () =>{
        const expectedAction = { type: "auth/logout"}
        expect(authLogout ()).toEqual(expectedAction)
    } )
})

describe("Login test", () =>{
    afterEach(() => {
        dispatch.mockClear();
        router.navigate.mockClear();
    })
    const dispatch = vi.fn()
    const from = "/from"
    const router = {
        state: { location: {state: {from } } },
        navigate: vi.fn()
    }
    const api = {
        services: {
            login: vi.fn()
        }
    }

    const credentials: Credentials = {
        email: "admin@test.com",
        password: "1234"
    }

    const credentialsrejected: Credentials = {
        email: "admin@test.com",
        password: "password"
    }

    const rememberMe = false
    const thunk = authLogin(credentials, rememberMe)
    const thunkFailed = authLogin(credentialsrejected, rememberMe)
    

    test("when Login resolves", async () =>{
        api.services.login = vi.fn().mockResolvedValue(undefined);
        
        
        //@ts-expect-error: getState not used
        await thunk(dispatch, undefined, {api, router})

        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: "auth/login/pending"})
        expect(api.services.login).toHaveBeenCalledWith(credentials, rememberMe);
        expect(dispatch).toHaveBeenNthCalledWith(2,{
            type: "auth/login/fulfilled", 
            payload: { rememberMe }
        });
        expect(router.navigate).toHaveBeenCalledWith(from, { replace:true})
    })

    test( "When Login fails", async () =>{
        const error = new ApiClientError("Unauthorized", "UNAUTHORIZED")
        api.services.login = vi.fn().mockRejectedValue(error)


        //@ts-expect-error: getState not used
        await thunkFailed(dispatch, undefined, {api, router})

        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: "auth/login/pending"})
        expect(api.services.login).toHaveBeenCalledWith(credentialsrejected, rememberMe);
        expect(dispatch).toHaveBeenNthCalledWith(2,{
            type: "auth/login/rejected",
            payload: error.message 
        })
        expect(router.navigate).not.toHaveBeenCalled()
    })
})