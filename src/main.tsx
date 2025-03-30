import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "./index.css";
import "./styles/index.css"
import App from './App.tsx'
import storage from "./utils/storage.ts"
import { setAuthorizationHeader } from "./services/connection.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import configureStore from "./store/index.ts";
import { Provider } from "react-redux";
import { State } from "./store/reducers.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const accessToken = storage.get("auth");
if (accessToken){
  setAuthorizationHeader(accessToken)
}


const preloadedState: Partial<State>  = {
  auth:{
    isLogged :!!accessToken,
    rememberMe: false,
  }
}
const router = createBrowserRouter([{ path: "*", element:<App/>}])
const store = configureStore(preloadedState , router)

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('No se encontró el elemento "root" en el HTML.');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        < RouterProvider router={router}/>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);

