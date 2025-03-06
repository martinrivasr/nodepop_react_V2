import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from './App.tsx'
import storage from "./utils/storage.ts"
import { setAuthorizationHeader } from "./services/connection.ts";
import { AuthProvider } from "./auth/autoProvider.tsx"
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const accessToken = storage.get("auth");
if (accessToken){
  setAuthorizationHeader(accessToken)
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('No se encontró el elemento "root" en el HTML.');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider defaultIsLogged={false}>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);

