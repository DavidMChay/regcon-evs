import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiLogOut, FiSearch, FiHome, FiFileText, FiHeart, FiFilter } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbarhome.css";

const categories = ["Música", "Cine", "Teatro", "Deportes", "Arte", "Tecnología", "Conferencias", "Exposiciones"];
const filters = ["Fecha", "Ubicación", "Popularidad"];

const NavbarHome = ({ showSecondaryNav = true, setIsAuthenticated, favorites }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ubicación actual

  const dropdownRef = useRef(null);

  // Hook para actualizar la clase de la ruta activa
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-[#C65A1E]" // Ruta activa
      : "text-gray-600 hover:text-[#C65A1E]"; // Ruta inactiva
  };

  // Escucha los cambios de ubicación para limpiar el término de búsqueda
  useEffect(() => {
    setSearchTerm(""); // Limpia el input cada vez que cambia la ruta
  }, [location.pathname]);

  // Determinar si la ruta está activa
  const isActiveRoute = (route) => {
    return location.pathname.split('/')[1] === route.split('/')[1];
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleFilterDropdown = () => {
    if (filterDropdownOpen) {
      setIsExiting(true);
      setTimeout(() => {
        setFilterDropdownOpen(false);
        setIsExiting(false);
      }, 300);
    } else {
      setFilterDropdownOpen(true);
      setInitialRender(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/Cargando", { state: { actionType: "logout" } });
  };

  // Verificar si la ruta activa está entre las permitidas para la barra secundaria
  const shouldShowSecondaryNav = location.pathname === "/Inicio";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/resultados?query=${searchTerm}`);
    }
  };

  return (
    <div>
      <nav className="w-full z-50 bg-gradient-to-b from-gray-300 shadow relative" data-aos="fade-down">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/Inicio" className="flex items-center space-x-3">
            <img src="/src/assets/images/LogoNegro.png" className="h-6 sm:h-8" alt="Logo RegCon" />
          </Link>
           {/* Campo de búsqueda */}
           <div className="flex-grow max-w-md mx-auto w-full md:w-auto">
              <form className="relative flex" onSubmit={handleSearch}>
                <input
                  type="search"
                  id="default-search"
                  className="w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-gray-400 focus:border-gray-400"
                  placeholder="Buscar evento"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="px-4 bg-[#C65A1E] text-white rounded-r-lg flex items-center justify-center transition-colors duration-300">
                  <FiSearch />
                </button>
              </form>
            </div>

          <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-black rounded-lg md:hidden hover:bg-[#C65A1E] hover:text-white focus:outline-none">
            <span className="sr-only">Abrir menú</span>
            <FiMenu className="w-5 h-5" />
          </button>

          <div className={`overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} md:max-h-full md:opacity-100 w-full md:flex md:items-center md:justify-between md:w-auto`} id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 md:flex-row md:mt-0 md:items-center">
              <li>
                <Link
                  to="/Inicio"
                  className={`flex items-center space-x-2 py-2 px-4 transition-all duration-300 rounded-md ${isActiveRoute("/Inicio") ? "text-[#C65A1E]" : "text-gray-600 hover:text-[#C65A1E]"}`}
                >
                  <FiHome />
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/MisBoletos"
                  className={`flex items-center space-x-2 py-2 px-4 transition-all duration-300 rounded-md ${isActiveRoute("/MisBoletos") ? "text-[#C65A1E]" : "text-gray-600 hover:text-[#C65A1E]"}`}
                >
                  <FiFileText />
                  <span>Mis Boletos</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/MisFavoritos"
                  className={`flex items-center space-x-2 py-2 px-4 transition-all duration-300 rounded-md ${isActiveRoute("/MisFavoritos") ? "text-[#C65A1E]" : "text-gray-600 hover:text-[#C65A1E]"}`}
                >
                  <FiHeart />
                  <span>Mis Favoritos</span>
                  {favorites && Array.isArray(favorites) && favorites.length > 0 && (
                    <span className="ml-1 text-xs text-[#C65A1E]">{favorites.length}</span>
                  )}
                </Link>
              </li>
              <li onClick={handleLogout} className="flex items-center space-x-2 py-2 px-4 text-gray-600 hover:bg-[#C65A1E] hover:text-white rounded-md transition-all duration-300 cursor-pointer">
                <FiLogOut />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Barra secundaria solo visible en /Inicio */}
      {shouldShowSecondaryNav && (
        <div className="bg-gray-100 shadow-md py-2 px-4">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center">
           

            {/* Categorías en Swiper */}
            <div className="flex space-x-4 overflow-auto">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-2xl hover:bg-gray-900 hover:text-white transition-colors duration-500"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Botón de filtro destacado en dispositivos pequeños */}
            <div className="relative ml-4 md:ml-8" ref={dropdownRef}>
              <button
                onClick={toggleFilterDropdown}
                className="flex items-center px-4 py-3 bg-gray-200 border border-gray-300 rounded-md transition-colors duration-500 hover:bg-[#C65A1E] hover:text-white sm:px-6 sm:py-3 text-sm md:text-base font-semibold"
              >
                <FiFilter />
                Filtros
              </button>

              {filterDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 ${initialRender ? "slide-in" : isExiting ? "dropdown-exit" : "dropdown-enter"}`}>
                  {filters.map((filter, index) => (
                    <button
                      key={index}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-white rounded-md hover:bg-gray-900 transition-colors duration-300"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarHome;
