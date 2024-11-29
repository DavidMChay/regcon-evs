import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarLandingPage from '../Navbar/NavLanding/NavbarLandingPage'; // Asegúrate de que este es el navbar que quieres usar
import Footer from '../Footer/Footer';

const GuestLayout = ({ setIsAuthenticated }) => {
  return (
    <div className="relative">
      {/* Navbar transparente */}
      <NavbarLandingPage 
       
        setIsAuthenticated={setIsAuthenticated} 
      />

      {/* Contenedor principal con la imagen de fondo */}
      <main>
        {/* Capa oscura encima de la imagen de fondo */}
        
          <Outlet /> {/* Esto cargará el contenido de las páginas */}
    
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GuestLayout;
