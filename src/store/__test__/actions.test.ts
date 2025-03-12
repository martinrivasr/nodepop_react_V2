import { describe, test, expect } from "vitest";
import { authLogout,
        authLoginFulfilled,
        authLoginRejected,
        authLoginPending,
        advertLoadedFulfilled,
        } from "../actions";

describe("Actions test ", () => {
  test("authLogout should return the correct action", () => {
    const expectedAction = { type: "auth/logout" };
    expect(authLogout()).toEqual(expectedAction);
  });
  test("authLoginFulfilled should be the loginfultilled", () => {
    const expectedAction = { type: "auth/login/fulfilled", payload: { rememberMe: true } };
    expect(authLoginFulfilled({ rememberMe: true })).toEqual(expectedAction);
  });

  test("authLoginRejected should return the rejected action", () => {
    const error = new Error("Error de login");
    const expectedAction = { type: "auth/login/rejected", payload: error };
    expect(authLoginRejected(error)).toEqual(expectedAction);
  });

  test("authLoginPending should return the status pending for login process", () => {
    const expectedAction = { type: "auth/login/pending" };
    expect(authLoginPending()).toEqual(expectedAction);
  });

});