import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AOS from 'aos'; // Importar AOS
import 'aos/dist/aos.css'; // Importar los estilos de AOS
import './index.css'; // Se importa todos los estilos CSS



//Layouts
import GuestLayout from './components/Layouts/GuestLayout';
import AuthenticatedLayout from './components/Layouts/AuthenticatedLayout';
import AdminLayout from './components/Layouts/AdminLayout';

//Guest
import Login from './components/Modals/Login/Login';
import Register from './components/Modals/Login/Register';
import PasswordRecovery from './components/Modals/Login/PasswordRecovery';
import LoadingLogin from './components/Modals/Login/LoadingLogin';
import LandingPage from './pages/Guest/LandingPage';

import UserManual from './pages/Guest/UserManual';
import Demo from './pages/Guest/Demo';
import LocalInstallationGuide from './pages/Guest/LocalInstallationGuide';
import Price from './pages/Guest/Price';

//Footer
import AboutUs from './components/Footer/AboutUs';
import ContactUs from './components/Footer/ContactUs';
import PrivacyPolicy from './components/Footer/PrivacyPolice';
import TermsAndConditions from './components/Footer/TermsAndConditions';

//Users
import Home from './pages/Users/Home';
import EventDetailPage from './pages/Users/EventDetailPage';
import TicketsDetailPage from './pages/Users/TicketsDetailsPage';

//Dashboard
import UsersTable from './pages/Admin/UserTable';
import TicketsPage from './pages/Admin/TicketsPage';
import EventsTable from './pages/Admin/EventsTable';
import WorkgroupsTable from './pages/Admin/WorksgroupsTable';
import AdminsTable from './pages/Admin/AdminsTable';
import TicketSelectionPage from './pages/Users/TicketConfirmationPage';
import TicketConfirmationPage from './pages/Users/TicketConfirmationPage';
import PaymentForm from './pages/Users/PaymentForm';
import ResultadosPage from './pages/Users/ResultadosPage';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);
  

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      once: true, // La animación se ejecuta solo una vez
    });
    
  }, []);

  return (
    <Router>
      <Routes>
        {/* Ruta de Loading para inicio o cierre de sesión */}
        <Route path="/Cargando" element={<LoadingLogin setIsAuthenticated={setIsAuthenticated} />} />

        {/* Rutas para usuarios no autenticados */}
        <Route element={<GuestLayout setIsAuthenticated={setIsAuthenticated} />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Iniciar Sesión" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Registro" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Recuperar Contraseña" element={<PasswordRecovery />} />
          <Route path="/ManualDeUsuario" element={<UserManual />} />
          <Route path="/Solicitar Demo" element={<Demo />} />
          <Route path="/Descargar" element={<LocalInstallationGuide />} />
          <Route path="/Precio" element={<Price />} />
          <Route path="/Acerca de" element={<AboutUs />} />
          <Route path="/Contáctanos" element={<ContactUs />} />
          <Route path="/Política de Privacidad" element={<PrivacyPolicy />} />
          <Route path="/Términos y Condiciones" element={<TermsAndConditions />} />
          <Route path="/Metodo-de-pago" element={<PaymentForm />} /> {/*Prueba de metodo de pago */}
        </Route>

        {/* Rutas para usuarios autenticados */}
        {isAuthenticated && (
          <Route element={<AuthenticatedLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}>
            <Route path="/Inicio" element={<Home />} />
            <Route path="/DetallesdeEvento/:eventId" element={<EventDetailPage />} />
            <Route path="/ProcesoDeCompra" element={<TicketConfirmationPage />} />
            <Route path="/Resultados" element={<ResultadosPage />} />

            <Route path="/MisBoletos" element={<TicketsDetailPage />} />
            <Route path="/Acerca de" element={<AboutUs />} />
            <Route path="/Contáctanos" element={<ContactUs />} />
            <Route path="/Política de Privacidad" element={<PrivacyPolicy />} />
            <Route path="/Términos y Condiciones" element={<TermsAndConditions />} />
          </Route>
        )}

        {/* Rutas del panel de administración */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="Usuarios" element={<UsersTable />} />
          <Route path="Boletos" element={<TicketsPage />} />
          <Route path="Eventos" element={<EventsTable />} />
          <Route path="Grupos de trabajo" element={<WorkgroupsTable />} />
          <Route path="Administradores" element={<AdminsTable />} />
        </Route>

        {/* Redirección para rutas no definidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
