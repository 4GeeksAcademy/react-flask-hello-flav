import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/private`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setMessage(data.msg);
        setUser(data.user);
        setLoading(false);

      } catch (error) {
        console.error(error);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        navigate("/login");
      }
    };

    validateToken();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Cargando...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1>Zona privada</h1>

        <p>{message}</p>

        {user && (
          <div>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}

        <button
          className="btn btn-danger mt-3"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};