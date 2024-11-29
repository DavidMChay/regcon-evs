import React, { useState } from "react";

import Main from "../../components/Main/MainLanding/MainLandingPage";

import Login from "../../components/Modals/Login/Login"; // Asegúrate de importar tu componente de Login

const LandingPage = ({ setIsAuthenticated }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div>
      {/* Botón o evento que abre el modal de inicio de sesión */}
      <Main onOpenLogin={openLoginModal} />
      {isLoginModalOpen && (
        <Login
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          setIsAuthenticated={setIsAuthenticated} // Pasa la función para actualizar el estado
        />
      )}
     
    </div>
  );
};

export default LandingPage;
