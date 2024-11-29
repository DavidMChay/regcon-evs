import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './LoadingLogin.css';

const Loading = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const actionType = location.state?.actionType || "login";
  const userType = location.state?.userType || "user";
  const [message, setMessage] = useState("Creando cuenta...");

  useEffect(() => {
    if (actionType === "register") {
      // Primero muestra "Creando cuenta..."
      const creationTimer = setTimeout(() => {
        setMessage("Iniciando sesión...");
        
        // Luego de cambiar a "Iniciando sesión...", inicia sesión y redirige
        const loginTimer = setTimeout(() => {
          setIsAuthenticated(true);
          navigate("/Inicio");
        }, 1500);
        
        return () => clearTimeout(loginTimer);
      }, 1500);

      return () => clearTimeout(creationTimer);
    } else if (actionType === "login") {
      // Si solo está iniciando sesión directamente
      setMessage("Iniciando sesión...");
      const loginTimer = setTimeout(() => {
        setIsAuthenticated(true);
        if (userType === "admin") {
          navigate("/admin");
        } else {
          navigate("/Inicio");
        }
      }, 1500);

      return () => clearTimeout(loginTimer);
    } else if (actionType === "logout") {
      // Manejo de cierre de sesión
      setMessage("Cerrando Sesión...");
      const logoutTimer = setTimeout(() => {
        setIsAuthenticated(false);
        navigate("/");
      }, 1500);

      return () => clearTimeout(logoutTimer);
    }
  }, [actionType, userType, navigate, setIsAuthenticated]);

  return (
    <div className="loading-screen">
      <div className="lds-circle">
        <div>
          <img src="/src/assets/images/LogoApp.png" alt="App Icon" className="loading-icon" />
        </div>
      </div>
      <h2 className="text-xl font-bold leading-tight mb-4 text-gray-600 mt-0">
        {message}
      </h2>
    </div>
  );
};

export default Loading;
