import {Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "./containers/Header/Navbar";
import AdvertsPage from "./pages/AdvertsPage";
import SignupPage from "./pages/SignupPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import NotFoundPage from "./pages/NotFoundPage"
import AdvertDetailPage from "./pages/AdvertDetailPage"
import RequireAuth from "./auth/requireAuth";
import LoginPagePortal from "./pages/LoginPage";


function App() {

  return (
        <div className="app">
          <Navbar /> 
          <Routes>
            <Route 
              path="/login" 
              element={
                  <LoginPagePortal />
              } 
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/adverts" 
              element={
                <RequireAuth>
                  <AdvertsPage />
                </RequireAuth>
              } 
            />
            <Route 
              path="/adverts/:id" 
              element={
                <RequireAuth>
                    <AdvertDetailPage />
                </RequireAuth>
                
              } 
            />
            <Route 
              path="/adverts/new" 
              element={
                <RequireAuth>
                  <NewAdvertPage />
                </RequireAuth>
              } 
            />
            <Route path="/" element={<Navigate to="/adverts"/>}/>
            <Route path="404" element={<Navigate to="/404"/>}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
  );
}

export default App;