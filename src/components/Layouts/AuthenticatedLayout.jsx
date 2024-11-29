
import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import NavbarHome from '../Navbar/NavHome/NavbarHome';
import Footer from '../Footer/Footer';


const AuthenticatedLayout = ({ setIsAuthenticated }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
      setSearchTerm(term);  // Actualizamos el término de búsqueda
  };

  return (
    <div>
      <NavbarHome setIsAuthenticated={setIsAuthenticated} onSearch={handleSearch}/> {/* Navbar para usuarios autenticados */}
      <main>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
