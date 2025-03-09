import { describe, test, expect } from "vitest";
import { getIslogged } from "../selectors";

describe("Selector test", () => {
  test("should return the correct autentication state"
, () => {
    const state = {
      auth: {
        isLogged: true,
        rememberMe: true,
      },
      ui: { pending: false, error: null }
    };
    expect(getIslogged(state)).toEqual({ isLogged: true, rememberMe: true });

    const stateLoggedOut = {
      auth: {
        isLogged: false,
        rememberMe: false,
      },
      ui: { pending: false, error: null }
    };

    expect(getIslogged(stateLoggedOut)).toEqual({ isLogged: false, rememberMe: false });
  });
});
