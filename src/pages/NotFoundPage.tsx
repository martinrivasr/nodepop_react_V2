import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => navigate('/adverts');

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="text-dark">Oops! Página no encontrada</h2>
      <p className="text-muted text-center">
        
        La página que estas buscado no existe o ha sido movida.
      </p>
      <button
        className="btn btn-primary mt-4 px-4 py-2"
        onClick={goHome}
      >
        Regresar a Inicio
      </button>
    </div>
  );
};

export default NotFoundPage;
