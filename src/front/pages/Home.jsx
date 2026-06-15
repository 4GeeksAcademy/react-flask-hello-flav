import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const token = sessionStorage.getItem("token");

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow p-5 text-center">
            <h1 className="mb-3">Bienvenido a mi aplicación</h1>

            <p className="lead mb-4">
              Regístrate, inicia sesión y accede a tu zona privada.
            </p>

            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              {!token ? (
                <>
                  <Link to="/signup" className="btn btn-primary">
                    Crear cuenta
                  </Link>

                  <Link to="/login" className="btn btn-success">
                    Iniciar sesión
                  </Link>
                </>
              ) : (
                <Link to="/private" className="btn btn-dark">
                  Ir a mi zona privada
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};