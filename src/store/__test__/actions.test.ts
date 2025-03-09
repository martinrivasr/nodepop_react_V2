import { describe, test, expect } from "vitest";
import { authLogout } from "../actions";

describe("Redux - Actions", () => {
  test("authLogout debe devolver el tipo de acción correcto", () => {
    const expectedAction = { type: "auth/logout" };
    expect(authLogout()).toEqual(expectedAction);
  });
});