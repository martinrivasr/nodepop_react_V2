import { describe, test, expect } from "vitest";
import { auth } from "../reducers";
import { authLoginFulfilled, authLogout } from "../actions";

describe("Auth Reducer", () => {
  test("should manage  'auth/login/fulfilled' and update the state", () => {
    const initialState = { isLogged: false, rememberMe: false };
    const action = authLoginFulfilled();

    const expectedState = { isLogged: true, rememberMe: false };

    expect(auth(initialState, action)).toEqual(expectedState);
  });

  test("shuld manage 'auth/logout' and restart the state", () => {
    const initialState = { isLogged: true, rememberMe: true };
    const action = authLogout();

    const expectedState = { isLogged: false, rememberMe: true };

    expect(auth(initialState, action)).toEqual(expectedState);
  });

  test("Should return current state when the action is Unknown", () => {
    const initialState = { isLogged: false, rememberMe: false };
    const action = {} as any

    expect(auth(initialState, action)).toEqual(initialState);
  });
});
