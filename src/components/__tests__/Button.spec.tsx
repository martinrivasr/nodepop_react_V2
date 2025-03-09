import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import AuthButton from "../../auth/AuthButton";
import { Provider } from "react-redux";
import configureStore from "../../store";
import { MemoryRouter } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";


describe("AuthButton Snapshot Test", () => {
  test("shpuld match with the snapshot when the user is not logged", () => {
    
    const router = createBrowserRouter([{ path: "*", element: <AuthButton /> }]);
    const store = configureStore({ auth: { isLogged: false, rememberMe: false } }, router);
    

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthButton />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("shpuld match with the snapshot when the user is logged", () => {
    const router = createBrowserRouter([{ path: "*", element: <AuthButton /> }]);
    const store = configureStore({ auth: { isLogged: false, rememberMe: false } }, router);

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthButton />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
